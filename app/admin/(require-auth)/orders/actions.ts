"use server";

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma, Role } from "@prisma/client";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { revalidatePath } from "next/cache";
import { jsPDF } from "jspdf";
import { CreateOrderFormInput, createOrderSchema } from "./new/schema";
import { sendEmail } from "@/lib/send-email";

import {
  BUSINESS_NAME,
  CONGESTION_FEE,
  EMAIL_ADDRESS,
  PARKING_FEE,
} from "@/shared/data";
import { notifyUserOrderPlacedEmailHtml } from "@/lib/notify-customer-order-placed-email";
import { notifyEngineerEmailHtml } from "@/lib/notify-engineer-email";
import { unstable_cache as cache } from "next/cache";
import { handlePrismaError } from "@/lib/prisma-error";
import { generateInvoiceTemplate } from "@/lib/generate-invoice";
import { subDays, startOfDay, endOfDay } from "date-fns";

type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    packages: true;
    timeSlot: true;
    user: {
      include: {
        address: true;
      };
    };
    assignedEngineer: true;
  };
}>;

export const getOrders = cache(
  async (
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
                  { invoice: { contains: search, mode: "insensitive" } },
                  {
                    user: { email: { contains: search, mode: "insensitive" } },
                  },
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
  }
);

export const getTodayStats = async () => {
  const today = new Date();
  const yesterday = subDays(today, 1);

  try {
    const [todayOrders, yesterdayOrders] = await Promise.all([
      prisma.order.findMany({
        where: {
          date: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
        select: {
          id: true,
          status: true,
          totalPrice: true,
        },
      }),
      prisma.order.findMany({
        where: {
          date: {
            gte: startOfDay(yesterday),
            lt: startOfDay(today),
          },
        },
        select: {
          id: true,
          status: true,
          totalPrice: true,
        },
      }),
    ]);

    const todayTotalOrders = todayOrders.length;
    const yesterdayTotalOrders = yesterdayOrders.length;
    const todayCompletedOrders = todayOrders.filter(
      (order) => order.status === OrderStatus.COMPLETED
    ).length;
    const yesterdayCompletedOrders = yesterdayOrders.filter(
      (order) => order.status === OrderStatus.COMPLETED
    ).length;
    const todayEarnings = todayOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const yesterdayEarnings = yesterdayOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    return {
      todayTotalOrders,
      yesterdayTotalOrders,
      todayCompletedOrders,
      yesterdayCompletedOrders,
      todayEarnings,
      yesterdayEarnings,
    };
  } catch (error) {
    console.error("Error fetching today's stats:", error);
    throw error;
  }
};

export const getTodayOrders = async () => {
  const today = new Date();

  try {
    const orders = await prisma.order.findMany({
      where: {
        date: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
        status: {
          notIn: [OrderStatus.CANCELLED, OrderStatus.COMPLETED],
        },
      },
      select: {
        id: true,
        invoice: true,
        timeSlot: true,
        status: true,
        paymentStatus: true,
        date: true,
        createdAt: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching today's orders:", error);
    throw error;
  }
};

export const getOrderById = cache(async (orderId: string) => {
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
        assignedEngineer: true,
        timeSlot: true,
        user: {
          include: {
            address: true,
          },
        },
        packages: true,
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
});

export async function deleteOrder(orderId: string) {
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath("/admin/orders");

    return {
      message: "Order deleted successfully!",
      data: deletedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return handlePrismaError(error);
  }
}

export async function exportOrders() {
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
        invoice_id: order.invoice,
        name: order.user?.firstName + " " + order.user.lastName,
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
      data: null,
      success: false,
      message: handlePrismaError(error).message,
    };
  }
}

export default async function generateInvoice(orderId: string) {
  try {
    if (!orderId) {
      console.error("No order ID available");
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
        packages: true,
      },
    });

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

export async function createOrderByAdmin(data: CreateOrderFormInput) {
  try {
    const validatedData = createOrderSchema.parse(data);
    const packageIds = validatedData.packages.map((pkg) => pkg.packageId);

    let createdOrder: OrderWithUser;

    // Database transaction
    createdOrder = await prisma.$transaction(
      async (prismaTransaction) => {
        // Verify time slot availability first
        const timeSlot = await prismaTransaction.timeSlot.findUnique({
          where: { id: data.timeSlotId },
        });

        if (!timeSlot) {
          throw new Error("Selected time slot not found");
        }

        if (timeSlot.isBooked || !timeSlot.isAvailable) {
          throw new Error("Selected time slot is no longer available");
        }

        // Get package prices
        const packages = await prismaTransaction.package.findMany({
          where: {
            id: {
              in: packageIds,
            },
          },
          select: {
            price: true,
          },
        });

        if (packages.length !== packageIds.length) {
          throw new Error("One or more packages not found");
        }

        const packageTotal = packages.reduce(
          (total, pkg) => total + pkg.price,
          0
        );

        const totalPrice =
          packageTotal +
          (data.isCongestionZone ? CONGESTION_FEE : 0) +
          (data.parkingOptions === "NO" || data.parkingOptions === "PAID"
            ? PARKING_FEE
            : 0);

        // Update time slot to mark it as booked
        await prismaTransaction.timeSlot.update({
          where: { id: data.timeSlotId },
          data: {
            isBooked: true,
            isAvailable: false,
          },
        });

        // Create the order
        return await prismaTransaction.order.create({
          data: {
            userId: data.userId,
            assignedEngineerId: data.assignedEngineer,
            propertyType: data.propertyType,
            residentialType: data.residentialType,
            isCongestionZone: data.isCongestionZone,
            parkingOptions: data.parkingOptions,
            date: data.date,
            timeSlotId: data.timeSlotId,
            totalPrice: totalPrice,
            invoice: data.invoiceId,
            status: "CONFIRMED",
            paymentStatus: "UNPAID",
            paymentMethod: data.paymentMethod,
            packages: {
              connect: data.packages.map((pack) => ({ id: pack.packageId })),
            },
          },
          include: {
            packages: true,
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
        maxWait: 5000, // 5 seconds max to wait for a transaction slot
        timeout: 30000, // 30 seconds max to allow the transaction to run
      }
    );

    // Email notifications (outside transaction)
    await sendEmail({
      fromEmail: EMAIL_ADDRESS,
      fromName: "London Home Safety",
      to: createdOrder.user.email ?? "",
      subject: "Order Placed Successfully",
      html: notifyUserOrderPlacedEmailHtml(createdOrder),
    });

    if (createdOrder.assignedEngineer) {
      const content = `Dear ${createdOrder.assignedEngineer.name},\n\nYou have been assigned a new order. The order number is ${createdOrder.invoice}. Please review the details and proceed with the necessary steps to complete the assigned tasks. Ensure all protocols are followed, and keep the customer updated on the progress.\n\nIf you encounter any issues or need further assistance, feel free to reach out to the management team.\n\nThank you for your dedication and hard work.\n\nBest regards,\nThe ${BUSINESS_NAME} Management Team`;

      await sendEmail({
        fromEmail: EMAIL_ADDRESS,
        fromName: "London Home Safety",
        to: createdOrder.assignedEngineer.email,
        subject: "New Service Order",
        html: notifyEngineerEmailHtml(createdOrder, content),
      });
    }

    // Revalidate paths
    revalidatePath("/admin", "layout");

    return {
      message: "Order created successfully!",
      emailMessage: "Email sent successfully!",
      data: createdOrder,
      success: true,
      emailSuccess: true,
    };
  } catch (error) {
    // If there's an error, the transaction will automatically roll back
    return handlePrismaError(error);
  }
}

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | "";
  address: {
    city: string | "";
    street: string | "";
    postcode: string | "";
  };
  expertise?: string;
}

export async function createUser(data: CreateUserInput, userType: Role) {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        name: data.firstName + " " + data.lastName,
        password: "123456",
        role: userType,
        phone: data.phone,
        ...(userType === "STAFF" && { expertise: data.expertise }),
        address: data.address
          ? {
              create: {
                street: data.address.street,
                city: data.address.city,
                postcode: data.address.postcode,
              },
            }
          : undefined,
      },
      include: {
        address: true,
      },
    });

    revalidatePath("/admin", "layout");

    return {
      message: "User created successfully!",
      data: newUser,
      success: true,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return handlePrismaError(error);
  }
}
