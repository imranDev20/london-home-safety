"use server";

import { CartItem, CustomerDetails } from "@/hooks/use-order-store";
import { generateInvoiceId } from "@/lib/generate-invoice";
import prisma from "@/lib/prisma";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
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

export async function createOrder(orderData: OrderData) {
  const { customerDetails, cartItems, userId, paymentDetails } = orderData;

  const packageIds = cartItems.map((pkg) => pkg.id);
  const packages = await prisma.package.findMany({
    where: { id: { in: packageIds } },
  });

  const parkingFee = customerDetails.parkingOptions === "FREE" ? 0 : 5;
  const congestionFee = customerDetails.isCongestionZone ? 5 : 0;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = cartTotal + parkingFee + congestionFee;

  const invoiceNumber = await generateInvoiceId();

  try {
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
        paymentStatus: "PAID",
        status: "PENDING",
        packages: {
          connect: packageIds.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
      data: order,
      message: "Order created successfully!",
    };
  } catch (error) {
    console.error("Failed to create order:", error);
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while creating order.",
    };
  }
}
