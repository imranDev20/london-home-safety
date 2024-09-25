"use server";

import { CustomerDetails } from "@/hooks/use-order-store";
import { generateInvoiceId } from "@/lib/generate-invoice";
import { generateInvoiceHtml } from "@/lib/invoice-html";
import { notifyAdminOrderPlacedEmailHtml } from "@/lib/notify-admin-order-placed";
import { placedOrderEmailHtml } from "@/lib/placed-order-html";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/lib/prisma-error";
import { sendEmail } from "@/lib/send-email";
import { CONGESTION_FEE, EMAIL_ADDRESS, PARKING_FEE } from "@/shared/data";
import { Order, Package, PaymentMethod, Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";

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

export default async function generateInvoice(order: OrderWithRelation) {
  try {
    if (!order) {
      return {
        message: "No order found",
        success: false,
      };
    }

    const parkingFee = order.parkingOptions === "FREE" ? 0 : PARKING_FEE;
    const congestionFee = order.isCongestionZone ? CONGESTION_FEE : 0;
    const cartTotal = order.packages.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = cartTotal + parkingFee + congestionFee;

    const htmlContent = generateInvoiceHtml(order, cartTotal, totalPrice);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page to the provided HTML
    await page.setContent(htmlContent);

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");
    await browser.close();

    return {
      message: "Invoice Generated Successfully",
      data: pdfBase64,
      success: true,
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      success: false,
      data: null,
      message: handlePrismaError(error).message,
    };
  }
}

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
            password: "12345678", // Store the hashed password
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

        // Package fetching and validation
        const packageIds = cartItems.map((pkg) => pkg.id);
        const packages = await transactionPrisma.package.findMany({
          where: { id: { in: packageIds } },
          select: { price: true, propertyType: true },
        });

        if (packages.length !== packageIds.length) {
          throw new Error("One or more packages not found");
        }

        // Price calculation
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

        // Order creation
        const invoiceNumber = await generateInvoiceId();
        const createdOrder = await transactionPrisma.order.create({
          data: {
            userId: upsertedUser.id,
            propertyType: packages[0].propertyType,
            date: customerDetails.orderDate,
            inspectionTime: customerDetails.inspectionTime ?? "MORNING",
            parkingOptions: customerDetails.parkingOptions,
            isCongestionZone: customerDetails.isCongestionZone ?? false,
            orderNotes: customerDetails.orderNotes,
            totalPrice,
            invoice: invoiceNumber,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === "CREDIT_CARD" ? "PAID" : "UNPAID",
            status: "PENDING",
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

        // Invoice generation
        const invoice = await generateInvoice(createdOrder);
        if (!invoice?.data) {
          throw new Error("Invoice generation failed");
        }

        // Email sending
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

        // Then, send a copy to the admin
        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: EMAIL_ADDRESS, // This is the admin's email address
          subject: `New Order Received - ${createdOrder.invoice}`,
          html: notifyAdminOrderPlacedEmailHtml(createdOrder),
          attachments,
        });

        console.log("All steps completed successfully within the transaction");
        return createdOrder;
      },
      {
        maxWait: 5000, // 5 seconds max to wait for a transaction slot
        timeout: 30000, // 30 seconds max to allow the transaction to run
      }
    );

    // Transaction succeeded, now we can revalidate paths
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
