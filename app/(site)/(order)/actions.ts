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
    revalidatePath("/admin/orders/new");

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

export async function createOrder(orderData: OrderData) {
  try {
    const { customerDetails, cartItems, userId, paymentDetails } = orderData;

    const packageIds = cartItems.map((pkg) => pkg.id);

    const packages = await prisma.package.findMany({
      where: {
        id: {
          in: packageIds,
        },
      },
      select: {
        price: true,
        propertyType: true,
      },
    });

    const packageTotal = packages.reduce((total, pkg) => total + pkg.price, 0);

    const totalPrice =
      packageTotal +
      (customerDetails.isCongestionZone ? 5 : 0) +
      (customerDetails.parkingOptions === "NO" ||
      customerDetails.parkingOptions === "PAID"
        ? 5
        : 0);

    const invoiceNumber = await generateInvoiceId();

    const createdOrder = await prisma.order.create({
      data: {
        userId: userId,
        assignedEngineerId: null,
        propertyType: packages[0].propertyType,
        isCongestionZone: customerDetails.isCongestionZone ?? false,
        parkingOptions: customerDetails.parkingOptions,
        date: customerDetails.orderDate,
        inspectionTime: customerDetails.inspectionTime ?? "MORNING",
        totalPrice: totalPrice,
        invoice: invoiceNumber,
        status: "CONFIRMED",
        paymentStatus: paymentDetails.status,
        paymentMethod: paymentDetails.method,
        packages: {
          connect: cartItems.map((pack) => ({ id: pack.id })),
        },
      },

      include: {
        user: true,
        assignedEngineer: true,
      },
    });

    if (!createdOrder || !createdOrder.user?.name) {
      throw new Error("Order creation failed or user details are missing");
    }

    const invoice = await generateInvoice(createdOrder.id);

    if (!invoice?.data) {
      throw new Error("Invoice creation failed");
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
      subject: "Your Order Confirmation",
      html: placedOrderEmailHtml(
        createdOrder.user.name ?? "",
        createdOrder.invoice
      ),
      attachments: attachments,
    });

    // Revalidate paths if needed
    revalidatePath("/admin/orders");
    revalidatePath("/admin/orders/[order_id]", "page");
    revalidatePath(`/admin/customers/${createdOrder.userId}`);
    revalidatePath("/admin/engineers/[engineer_id]", "page");

    return {
      message: "Order created successfully!",
      emailMessage: "Email sent successrylly!",
      data: createdOrder,
      success: true,
      emailSuccess: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while creating the order.",
      emailMessage: "An error occoured while sending email",
      emailSuccess: false,
    };
  }
}
