"use server";

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { unstable_cache as cache, revalidatePath } from "next/cache";
import dayjs from "dayjs";
import exceljs from "exceljs";
export const getOrders = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = "",
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc",
  filterStatus: OrderStatus | "" = ""
) => {
  try {
    const skip = (page - 1) * pageSize;

    const whereClause: Prisma.OrderWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { invoiceId: { contains: search, mode: "insensitive" } },
                { user: { email: { contains: search, mode: "insensitive" } } },
                { user: { name: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {},
        filterStatus ? { status: filterStatus } : {},
      ],
    };

    // Create orderBy clause
    const orderByClause: Prisma.OrderOrderByWithRelationInput = {};
    switch (sortBy) {
      case "name":
        orderByClause.user = { name: sortOrder };
        break;
      case "email":
        orderByClause.user = { email: sortOrder };
        break;
      case "price":
        orderByClause.totalPrice = sortOrder;
        break;
      case "createdAt":
        orderByClause.createdAt = sortOrder;
        break;
      default:
        orderByClause.createdAt = "desc";
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          user: {
            include: {
              address: true,
            },
          },
        },
        orderBy: orderByClause,
      }),
      prisma.order.count({ where: whereClause }),
    ]);
    // Generate Excel file

    return {
      orders,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const getOrdersById = async (orderId: string) => {
  try {
    if (!orderId) {
      console.error("No product ID available");
      return null;
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: {
          include: {
            address: true,            
          },          
        },
        services: true,
      },
    });

    const engineer = await prisma.user.findMany({
      where: {
        role: "STAFF",
      },
    });

    return order;
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export async function deleteOrder(orderId: string) {
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath("/orders");

    return {
      message: "Order deleted successfully!",
      data: deletedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      message: "An error occurred while deleting the order.",
      success: false,
    };
  }
}

export const getExportOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          include: {
            address: true,
          },
        },
      },
    });
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Orders");
    worksheet.columns = [
      { header: "Invoice ID", key: "invoice_id", width: 20 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Address", key: "address", width: 60 },
      { header: "Cost", key: "cost", width: 15 },
      { header: "Placed On", key: "createdAt", width: 20 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        invoice_id: order.invoiceId,
        name: order.user?.name,
        email: order.user?.email,
        // phone: order.user?.phone,
        address: `${
          order.user?.address?.street ? order.user?.address?.street + "," : ""
        } ${order.user?.address?.city ?? ""} ${
          order.user?.address?.postcode ?? ""
        }`,
        cost: order.totalPrice,
        createdAt: dayjs(order?.user?.createdAt).format("DD MMMM YYYY"),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const excelData = Buffer.from(buffer).toString("base64");
    return {
      message: "Orders Data Downloaded Successfully",
      data: excelData,
      success: true,
    };
  } catch (error) {
    return {
      message: "An error occured when downloading orders data" + error,
      success: false,
    };
  }
};
