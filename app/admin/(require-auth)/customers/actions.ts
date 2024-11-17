"use server";

import { notifyCustomerOrderCancelledEmailHtml } from "@/lib/mail-templates/notify-customer-order-cancelled-email";
import { notifyCustomerOrderCompletedEmailHtml } from "@/lib/mail-templates/notify-customer-order-completed-email";
import { notifyCustomerOrderConfirmedEmailHtml } from "@/lib/mail-templates/notify-customer-order-confirmed-email";
import { notifyCustomerOrderPlacedEmailHtml } from "@/lib/mail-templates/notify-customer-order-placed-email";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { EMAIL_ADDRESS } from "@/shared/data";
import { SendEmailDataType } from "@/types/misc";
import { OrderWithRelation } from "@/types/order";
import { Prisma, Role } from "@prisma/client";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getUsers = cache(
  async (
    type: Role,
    page: number = 1,
    pageSize: number = 10,
    search: string = "",
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc"
  ) => {
    try {
      const skip = (page - 1) * pageSize;

      const whereClause: Prisma.UserWhereInput = {
        AND: [
          { role: type },
          search
            ? {
                OR: [
                  { email: { contains: search, mode: "insensitive" } },
                  { name: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      };

      // Create orderBy clause for sorting users
      const orderByClause: Prisma.UserOrderByWithRelationInput = {};
      switch (sortBy) {
        case "name":
          orderByClause.name = sortOrder;
          break;
        case "email":
          orderByClause.email = sortOrder;
          break;
        case "createdAt":
          orderByClause.createdAt = sortOrder;
          break;
        default:
          orderByClause.createdAt = "desc";
      }

      // Fetch users and the total count
      const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where: whereClause,
          skip,
          take: pageSize,
          include: {
            address: true, // Include address if needed
          },
          orderBy: orderByClause,
        }),
        prisma.user.count({ where: whereClause }),
      ]);

      return {
        users,
        pagination: {
          currentPage: page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
);

export async function deleteCustomer(customerId: string) {
  try {
    const deletedCustomer = await prisma.user.delete({
      where: {
        id: customerId,
      },
    });

    revalidatePath("/admin/customers");
    revalidatePath("/admin/orders/new");
    revalidatePath("/admin/orders");

    return {
      message: "Customer deleted successfully!",
      data: deletedCustomer,
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      message: "An error occurred while deleting the user.",
      success: false,
    };
  }
}

export async function exportCustomers() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      include: {
        address: true,
      },
    });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Address", key: "address", width: 60 },
      { header: "Placed On", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user?.firstName + " " + user.lastName,
        email: user?.email,
        phone: user?.phone,
        address: `${user?.address?.street ? user?.address?.street + "," : ""} ${
          user?.address?.city ?? ""
        } ${user?.address?.postcode ?? ""}`,
        createdAt: dayjs(user?.createdAt).format("DD MMMM YYYY"),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const excelData = Buffer.from(buffer).toString("base64");

    return {
      message: "Customer Data Downloaded Successfully",
      data: excelData,
      success: true,
    };
  } catch (error) {
    return {
      message: "An error occured when downloading customers data" + error,
      success: false,
    };
  }
}

export const getCustomerById = cache(async (customerId: string) => {
  try {
    const customer = await prisma.user.findUnique({
      where: { id: customerId },
      include: {
        address: true,
        orders: {
          include: {
            cartItems: {
              include: {
                package: true,
              },
            },
          },
        },
      },
    });

    if (!customer) {
      return null;
    }

    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Failed to fetch customer");
  }
});

export const getOrdersByUsers = cache(async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          include: {
            package: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
});

interface EmailData {
  receiver: string;
  orderDetails: OrderWithRelation;
}

export async function sendOrderStatusEmail(emailData: EmailData) {
  try {
    const allowedStatuses = ["CONFIRMED", "COMPLETED", "CANCELLED"] as const;
    type AllowedStatus = (typeof allowedStatuses)[number];

    if (
      !allowedStatuses.includes(emailData.orderDetails.status as AllowedStatus)
    ) {
      return { success: true, message: "No email required for this status" };
    }

    const statusSubjects: Record<AllowedStatus, string> = {
      CONFIRMED: `Order #${emailData.orderDetails.invoice} Confirmed`,
      COMPLETED: `Order #${emailData.orderDetails.invoice} Completed`,
      CANCELLED: `Order #${emailData.orderDetails.invoice} Cancelled`,
    };

    const statusTemplates: Record<
      AllowedStatus,
      (orderDetails: any) => string
    > = {
      CONFIRMED: notifyCustomerOrderConfirmedEmailHtml,
      COMPLETED: notifyCustomerOrderCompletedEmailHtml,
      CANCELLED: notifyCustomerOrderCancelledEmailHtml,
    };

    await sendEmail({
      fromEmail: EMAIL_ADDRESS,
      fromName: "London Home Safety",
      to: emailData.receiver,
      subject: statusSubjects[emailData.orderDetails.status as AllowedStatus],
      html: statusTemplates[emailData.orderDetails.status as AllowedStatus](
        emailData.orderDetails
      ),
    });

    revalidatePath(`/admin/orders`);
    revalidatePath(`/admin/orders/${emailData.orderDetails.id}`);

    return {
      success: true,
      message: `Order status email sent successfully to customer!`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        "An error occurred while sending the email. Please try again later.",
    };
  }
}
