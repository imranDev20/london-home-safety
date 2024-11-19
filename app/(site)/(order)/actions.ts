"use server";

import { CartItem, CustomerDetails } from "@/hooks/use-order-store";
import {
  generateInvoiceId,
  generateInvoiceTemplate,
} from "@/lib/generate-invoice";
import { notifyAdminOrderPlacedEmailHtml } from "@/lib/mail-templates/notify-admin-order-placed";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prisma-error";
import { sendEmail } from "@/lib/send-email";
import { CONGESTION_FEE, EMAIL_ADDRESS, PARKING_FEE } from "@/shared/data";
import { Order, PaymentMethod, Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { jsPDF } from "jspdf";
import { calculateSubtotal, calculateTotal } from "@/lib/utils";
import { notifyCustomerOrderPlacedEmailHtml } from "@/lib/mail-templates/notify-customer-order-placed-email";

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    cartItems: {
      include: {
        package: true;
      };
    };
    timeSlot: true;
    user: {
      include: {
        address: true;
      };
    };
    assignedEngineer: true;
  };
}>;

export async function generateInvoice(order: OrderWithRelation) {
  try {
    if (!order) {
      console.error("No order available to generate invoice");
      return null;
    }

    const parkingFee = order.parkingOptions === "FREE" ? 0 : PARKING_FEE;
    const congestionFee = order.isCongestionZone ? CONGESTION_FEE : 0;
    const cartTotal = parseFloat(calculateSubtotal(order));
    const totalPrice = parseFloat(calculateTotal(order));

    // Create a new PDF document
    const doc = new jsPDF();

    // Generate the invoice template
    generateInvoiceTemplate(doc, {
      order,
      cartTotal,
      parkingFee,
      congestionFee,
      totalPrice,
    });

    // Get the PDF as a base64 string
    const pdfBase64 = doc.output("datauristring").split(",")[1];

    return {
      message: "Invoice Generated Successfully",
      data: pdfBase64,
      success: true,
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      message: handlePrismaError(error).message,
      data: null,
      success: false,
    };
  }
}

type OrderData = {
  customerDetails: CustomerDetails;
  cartItems: CartItem[];
  paymentMethod: PaymentMethod;
};

export async function createOrder(orderData: OrderData): Promise<{
  success: boolean;
  data: Order | null;
  message: string;
}> {
  const { customerDetails, cartItems, paymentMethod } = orderData;

  try {
    const result = await prisma.$transaction(
      async (transactionPrisma) => {
        // User role check
        const existingUser = await transactionPrisma.user.findUnique({
          where: { email: customerDetails.email },
          select: { id: true, role: true },
        });

        if (
          existingUser &&
          (existingUser.role === Role.ADMIN || existingUser.role === Role.STAFF)
        ) {
          throw new Error(
            "Admins and staff members are not allowed to place orders."
          );
        }

        // Verify time slot availability
        const timeSlot = await transactionPrisma.timeSlot.findUnique({
          where: { id: customerDetails.timeSlotId },
        });

        if (!timeSlot) {
          throw new Error("Selected time slot not found");
        }

        if (
          !timeSlot.isAvailable ||
          timeSlot.currentBookings >= timeSlot.maxCapacity
        ) {
          throw new Error("Selected time slot is no longer available");
        }

        // User upsert
        const upsertedUser = await transactionPrisma.user.upsert({
          where: { email: customerDetails.email },
          update: {
            firstName: customerDetails.firstName,
            lastName: customerDetails.lastName,
            name: customerDetails.firstName + " " + customerDetails.lastName,
            phone: customerDetails.phoneNumber,
            address: {
              update: {
                city: customerDetails.address.city,
                street: customerDetails.address.street,
                postcode: customerDetails.address.postcode,
              },
            },
          },
          create: {
            firstName: customerDetails.firstName,
            lastName: customerDetails.lastName,
            email: customerDetails.email,
            name: customerDetails.firstName + " " + customerDetails.lastName,
            password: "12345678",
            phone: customerDetails.phoneNumber,
            role: Role.CUSTOMER,
            address: {
              create: {
                city: customerDetails.address.city,
                street: customerDetails.address.street,
                postcode: customerDetails.address.postcode,
              },
            },
          },
        });

        // Package validation and price calculation
        const packageIds = cartItems.map((pkg) => pkg.package.id);
        const packages = await transactionPrisma.package.findMany({
          where: { id: { in: packageIds } },
          select: { price: true, propertyType: true },
        });

        if (packages.length !== packageIds.length) {
          throw new Error("One or more packages not found");
        }

        const cartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.price,
          0
        );
        const congestionFee = customerDetails.isCongestionZone
          ? CONGESTION_FEE
          : 0;
        const parkingFee =
          customerDetails.parkingOptions === "FREE" ? 0 : PARKING_FEE;
        const totalPrice = cartTotal + congestionFee + parkingFee;

        // Update time slot to increment bookings
        await transactionPrisma.timeSlot.update({
          where: { id: customerDetails.timeSlotId },
          data: {
            currentBookings: { increment: 1 },
            isAvailable: {
              set: timeSlot.currentBookings + 1 < timeSlot.maxCapacity,
            },
          },
        });

        // Create order
        const invoiceNumber = await generateInvoiceId();

        return await transactionPrisma.order.create({
          data: {
            userId: upsertedUser.id,
            propertyType: packages[0].propertyType,
            date: customerDetails.orderDate || "",
            timeSlotId: customerDetails.timeSlotId,
            parkingOptions: customerDetails.parkingOptions,
            isCongestionZone: customerDetails.isCongestionZone ?? false,
            orderNotes: customerDetails.orderNotes,
            totalPrice,
            invoice: invoiceNumber,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === "CREDIT_CARD" ? "PAID" : "UNPAID",
            status: "PENDING",
            cartItems: {
              create: cartItems.map((item) => ({
                packageId: item.package.id,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
          include: {
            cartItems: {
              include: {
                package: true,
              },
            },
            timeSlot: true,
            user: {
              include: {
                address: true,
              },
            },
            assignedEngineer: true,
          },
        });
      },
      {
        maxWait: 5000,
        timeout: 30000,
      }
    );

    // Generate invoice outside transaction
    try {
      const invoice = await generateInvoice(result);
      if (invoice?.data) {
        const attachments = [
          {
            ContentType: "application/pdf",
            Filename: `Invoice_${result.invoice}.pdf`,
            Base64Content: invoice.data,
          },
        ];

        // Send emails outside transaction
        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: result.user.email,
          subject: `Order Request #${result.invoice} Received`,
          html: notifyCustomerOrderPlacedEmailHtml(result),
          attachments,
        });

        // Send copy to admin
        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: EMAIL_ADDRESS,
          subject: `New Order Received - ${result.invoice}`,
          html: notifyAdminOrderPlacedEmailHtml(result),
          attachments,
        });
      }
    } catch (emailError) {
      // Log error but don't fail the order creation
      console.error("Failed to send emails:", emailError);
    }

    revalidatePath("/admin", "layout");

    return {
      success: true,
      data: result,
      message: "Your order has been successfully placed",
    };
  } catch (error) {
    console.error(
      "Transaction failed, all changes have been rolled back:",
      error
    );
    const message = handlePrismaError(error).message;

    return {
      success: false,
      data: null,
      message,
    };
  }
}
