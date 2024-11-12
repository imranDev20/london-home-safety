"use server";

import { CustomerDetails } from "@/hooks/use-order-store";
import {
  generateInvoiceId,
  generateInvoiceTemplate,
} from "@/lib/generate-invoice";
import { notifyAdminOrderPlacedEmailHtml } from "@/lib/notify-admin-order-placed";
import { placedOrderEmailHtml } from "@/lib/placed-order-html";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prisma-error";
import { sendEmail } from "@/lib/send-email";
import { CONGESTION_FEE, EMAIL_ADDRESS, PARKING_FEE } from "@/shared/data";
import { Order, Package, PaymentMethod, Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { jsPDF } from "jspdf";

type OrderData = {
  customerDetails: CustomerDetails;
  cartItems: Package[];
  paymentMethod: PaymentMethod;
};

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    packages: true;
    user: {
      include: {
        address: true;
      };
    };
  };
}>;

// Invoice generation function
export default async function generateInvoice(order: OrderWithRelation) {
  try {
    if (!order) {
      console.error("No order available to generate invoice");
      return null;
    }

    const parkingFee = order.parkingOptions === "FREE" ? 0 : PARKING_FEE;
    const congestionFee = order.isCongestionZone ? CONGESTION_FEE : 0;
    const cartTotal = order.packages.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = cartTotal + parkingFee + congestionFee;

    const doc = new jsPDF();
    generateInvoiceTemplate(doc, {
      order,
      cartTotal,
      parkingFee,
      congestionFee,
      totalPrice,
    });

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

// Order creation function
export async function createOrder(orderData: OrderData): Promise<{
  success: boolean;
  data: Order | null;
  message: string;
}> {
  const { customerDetails, cartItems, paymentMethod } = orderData;

  try {
    const result = await prisma.$transaction(
      async (transactionPrisma) => {
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

        const upsertedUser = await transactionPrisma.user.upsert({
          where: { email: customerDetails.email },
          update: {
            firstName: customerDetails.firstName,
            lastName: customerDetails.lastName,
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
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
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            password: "12345678", // Use hashed password in production
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

        const packageIds = cartItems.map((pkg) => pkg.id);
        const packages = await transactionPrisma.package.findMany({
          where: { id: { in: packageIds } },
          select: { price: true, propertyType: true },
        });

        if (packages.length !== packageIds.length) {
          throw new Error("One or more packages not found");
        }

        const packageTotal = packages.reduce(
          (total, pkg) => total + pkg.price,
          0
        );
        const congestionFee = customerDetails.isCongestionZone
          ? CONGESTION_FEE
          : 0;
        const parkingFee =
          customerDetails.parkingOptions === "FREE" ? 0 : PARKING_FEE;
        const totalPrice = packageTotal + congestionFee + parkingFee;

        const invoiceNumber = await generateInvoiceId();

        const timeSlotId = customerDetails.timeSlotId; // Ensure this is part of CustomerDetails

        if (!timeSlotId) {
          throw new Error("A valid time slot ID is required to create an order.");
        }

        const createdOrder = await transactionPrisma.order.create({
          data: {
            userId: upsertedUser.id,
            propertyType: packages[0].propertyType,
            date: customerDetails.orderDate,
            parkingOptions: customerDetails.parkingOptions,
            isCongestionZone: customerDetails.isCongestionZone ?? false,
            orderNotes: customerDetails.orderNotes,
            totalPrice,
            invoice: invoiceNumber,
            paymentMethod,
            paymentStatus: paymentMethod === "CREDIT_CARD" ? "PAID" : "UNPAID",
            status: "PENDING",
            timeSlotId,
            packages: { connect: packageIds.map((id) => ({ id })) },
          },
          include: {
            packages: true,
            user: {
              include: {
                address: true,
              },
            },
          },
        });
        console.log("Order created with timeSlotId:", createdOrder);

        const invoice = await generateInvoice(createdOrder);

        if (!invoice?.data) {
          console.log(invoice);
          throw new Error(invoice?.message);
        }

        const attachments = [
          {
            ContentType: "application/pdf",
            Filename: `Invoice_${createdOrder.invoice}.pdf`,
            Base64Content: invoice?.data,
          },
        ];

        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: createdOrder.user.email,
          subject: "Thank You for Your Order",
          html: placedOrderEmailHtml(
            createdOrder.user.firstName ?? "",
            createdOrder.invoice
          ),
          attachments,
        });

        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: EMAIL_ADDRESS,
          subject: `New Order Received - ${createdOrder.invoice}`,
          html: notifyAdminOrderPlacedEmailHtml(createdOrder),
          attachments,
        });

        console.log("All steps completed successfully within the transaction");
        return createdOrder;
      },
      {
        maxWait: 5000,
        timeout: 30000,
      }
    );

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
