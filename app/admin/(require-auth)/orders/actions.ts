"use server";

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma, Role } from "@prisma/client";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { revalidatePath } from "next/cache";
import { jsPDF } from "jspdf";
import { CreateOrderFormInput, createOrderSchema } from "./new/schema";
import { sendEmail } from "@/lib/send-email";

import { CONGESTION_FEE, EMAIL_ADDRESS, PARKING_FEE } from "@/shared/data";
import { notifyCustomerOrderPlacedEmailHtml } from "@/lib/mail-templates/notify-customer-order-placed-email";
import { notifyEngineerEmailHtml } from "@/lib/mail-templates/notify-engineer-email";
import { unstable_cache as cache } from "next/cache";
import { handlePrismaError } from "@/lib/prisma-error";
import {
  generateInvoiceId,
  generateInvoiceTemplate,
} from "@/lib/generate-invoice";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { calculateSubtotal, calculateTotal } from "@/lib/utils";

export type OrderWithRelations = Prisma.OrderGetPayload<{
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
        cartItems: {
          include: {
            package: true,
          },
        },
        user: {
          include: {
            address: true,
          },
        },
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
    const deletedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        select: { timeSlotId: true },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      const timeSlot = await tx.timeSlot.findUnique({
        where: { id: order.timeSlotId },
      });

      if (timeSlot) {
        await tx.timeSlot.update({
          where: { id: order.timeSlotId },
          data: {
            currentBookings: { decrement: 1 },
            isAvailable: true,
          },
        });
      }

      return await tx.order.delete({
        where: { id: orderId },
      });
    });

    revalidatePath("/admin", "layout");

    return {
      message: "Order deleted successfully!",
      data: deletedOrder,
      success: true,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
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
        timeSlot: true,
        cartItems: {
          include: {
            package: true,
          },
        },
        assignedEngineer: true,
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

export async function createOrderByAdmin(data: CreateOrderFormInput) {
  try {
    const validatedData = createOrderSchema.parse(data);
    const packageIds = validatedData.cartItems.map((item) => item.packageId);

    const packageQuantities = validatedData.cartItems.reduce((acc, item) => {
      acc[item.packageId] = item.quantity || 1;
      return acc;
    }, {} as Record<string, number>);

    let createdOrder: OrderWithRelations;

    createdOrder = await prisma.$transaction(
      async (prismaTransaction) => {
        const timeSlot = await prismaTransaction.timeSlot.findUnique({
          where: { id: data.timeSlotId },
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

        const packages = await prismaTransaction.package.findMany({
          where: { id: { in: packageIds } },
        });

        if (packages.length !== packageIds.length) {
          throw new Error("One or more packages not found");
        }

        // calculating the price using server value since price can be altered from frontend
        const cartItems = packages.map((pkg) => {
          const quantity = packageQuantities[pkg.id] || 1;
          let packagePrice = pkg.price;

          if (pkg.isAdditionalPackage && quantity > (pkg.minQuantity || 1)) {
            const extraUnits = quantity - (pkg.minQuantity || 1);
            packagePrice += extraUnits * (pkg.extraUnitPrice || 0);
          }

          return {
            packageId: pkg.id,
            quantity: quantity,
            price: packagePrice,
          };
        });

        const cartTotal = cartItems.reduce(
          (total, item) => total + item.price,
          0
        );
        const congestionFee = data.isCongestionZone ? CONGESTION_FEE : 0;
        const parkingFee = data.parkingOptions !== "FREE" ? PARKING_FEE : 0;
        const totalPrice = cartTotal + congestionFee + parkingFee;

        await prismaTransaction.timeSlot.update({
          where: { id: data.timeSlotId },
          data: {
            currentBookings: { increment: 1 },
            isAvailable: {
              set: timeSlot.currentBookings + 1 < timeSlot.maxCapacity,
            },
          },
        });

        const invoiceNumber = await generateInvoiceId();

        return await prismaTransaction.order.create({
          data: {
            userId: data.userId,
            assignedEngineerId: data.assignedEngineer,
            propertyType: data.propertyType,
            isCongestionZone: data.isCongestionZone,
            parkingOptions: data.parkingOptions,
            date: data.date,
            timeSlotId: data.timeSlotId,
            totalPrice: totalPrice,
            invoice: invoiceNumber,
            status: "CONFIRMED",
            paymentStatus: "UNPAID",
            paymentMethod: data.paymentMethod,
            cartItems: {
              createMany: {
                data: cartItems,
              },
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

    // Generate invoice and send emails outside transaction
    try {
      const invoice = await generateInvoice(createdOrder.id);
      if (invoice?.data) {
        const attachments = [
          {
            ContentType: "application/pdf",
            Filename: `Invoice_${createdOrder.invoice}.pdf`,
            Base64Content: invoice.data,
          },
        ];

        // Send email to customer
        await sendEmail({
          fromEmail: EMAIL_ADDRESS,
          fromName: "London Home Safety",
          to: createdOrder.user.email ?? "",
          subject: `Order Request #${createdOrder.invoice} Received`,
          html: notifyCustomerOrderPlacedEmailHtml(createdOrder),
          attachments,
        });

        // Send email to engineer if assigned
        if (createdOrder.assignedEngineer) {
          await sendEmail({
            fromEmail: EMAIL_ADDRESS,
            fromName: "London Home Safety",
            to: createdOrder.assignedEngineer.email,
            subject: `New Service Order #${createdOrder.invoice} Assigned`,
            html: notifyEngineerEmailHtml(createdOrder),
            attachments,
          });
        }
      }
    } catch (emailError) {
      // Log error but don't fail the order creation
      console.error("Failed to send emails or generate invoice:", emailError);
    }

    revalidatePath("/admin", "layout");

    return {
      message: "Order created successfully!",
      data: createdOrder,
      success: true,
    };
  } catch (error) {
    return handlePrismaError(error);
  }
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
