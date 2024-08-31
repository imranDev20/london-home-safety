"use server";

import generateInvoice from "@/app/admin/(require-auth)/orders/actions";
import { CartItem, CustomerDetails } from "@/hooks/use-order-store";
import { generateInvoiceId } from "@/lib/generate-invoice";
import { placedOrderEmailHtml } from "@/lib/placed-order-html";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { EMAIL_ADDRESS } from "@/shared/data";
import { Order, PaymentMethod, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertUser(userData: CustomerDetails) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (
      existingUser &&
      (existingUser.role === "ADMIN" || existingUser.role === "STAFF")
    ) {
      return {
        success: false,
        data: null,
        message: "Cannot update user with admin or staff role.",
      };
    }

    const upsertedUser = await prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {
        name: userData.customerName,
        address: {
          update: {
            city: userData.address.city,
            street: userData.address.street,
            postcode: userData.address.postcode,
          },
        },
      },
      create: {
        email: userData.email,
        name: userData.customerName,
        password: "123456",
        phone: userData.phoneNumber,
        role: "CUSTOMER",
        address: {
          create: {
            city: userData.address.city,
            street: userData.address.street,
            postcode: userData.address.postcode,
          },
        },
      },
    });

    revalidatePath("/admin/customers");
    return {
      success: true,
      data: upsertedUser,
      message: "User successfully upserted.",
    };
  } catch (error) {
    console.error("Error upserting user:", error);

    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while upserting user.",
    };
  }
}

type OrderData = {
  customerDetails: CustomerDetails;
  userId: string;
  cartItems: CartItem[];
  paymentDetails: {
    status: PaymentStatus;
    method: PaymentMethod;
  };
};

export async function createOrder(orderData: OrderData): Promise<{
  success: boolean;
  data: Order | null;
  message: string;
}> {
  const { customerDetails, cartItems, userId, paymentDetails } = orderData;

  try {
    const packageIds = cartItems.map((pkg) => pkg.id);
    const packages = await prisma.package.findMany({
      where: { id: { in: packageIds } },
    });

    if (packages.length !== packageIds.length) {
      throw new Error("One or more packages not found");
    }

    const parkingFee = customerDetails.parkingOptions === "FREE" ? 0 : 5;
    const congestionFee = customerDetails.isCongestionZone ? 5 : 0;

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = cartTotal + parkingFee + congestionFee;

    const invoiceNumber = await generateInvoiceId();

    const order = await prisma.order.create({
      data: {
        userId,
        propertyType: packages[0].propertyType,
        date: customerDetails.orderDate,
        inspectionTime: customerDetails.inspectionTime ?? "MORNING",
        parkingOptions: customerDetails.parkingOptions,
        isCongestionZone: customerDetails.isCongestionZone ?? false,
        orderNotes: customerDetails.orderNotes,
        totalPrice,
        invoice: invoiceNumber,
        paymentMethod: paymentDetails.method,
        paymentStatus: paymentDetails.status,
        status: "PENDING",
        packages: {
          connect: packageIds.map((id) => ({ id })),
        },
      },
      include: {
        user: true,
      },
    });

    if (!order || !order.user?.name) {
      throw new Error("Order creation failed or user details are missing");
    }

    const invoice = await generateInvoice(order.id);

    if (!invoice?.data) {
      throw new Error("Invoice creation failed");
    }

    const attachments = [
      {
        ContentType: "application/pdf",
        Filename: `Invoice_${order.invoice}.pdf`,
        Base64Content: invoice?.data,
      },
    ];

    await sendEmail({
      fromEmail: EMAIL_ADDRESS,
      fromName: "London Home Safety",
      to: customerDetails.email,
      subject: "Your Order Confirmation",
      html: placedOrderEmailHtml(order.user.name, order.invoice),
      attachments: attachments,
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
      data: order,
      message: "Order created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? `Failed to create order: ${error.message}`
          : "An unknown error occurred while creating the order.",
    };
  }
}
