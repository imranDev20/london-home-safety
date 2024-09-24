"use server";

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma, Role } from "@prisma/client";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";
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
import { generateInvoiceHtml } from "@/lib/invoice-html";
import { handlePrismaError } from "@/lib/prisma-error";

type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    packages: true;
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
      message: handlePrismaError(error).message,
      data: null,
      success: false,
    };
  }
}

export async function createOrder(data: CreateOrderFormInput) {
  try {
    const validatedData = createOrderSchema.parse(data);
    const packageIds = validatedData.packages.map((pkg) => pkg.packageId);

    let createdOrder: OrderWithUser;

    // Database transaction
    createdOrder = await prisma.$transaction(async (prismaTransaction) => {
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

      const packageTotal = packages.reduce(
        (total, pkg) => total + pkg.price,
        0
      );

      const totalPrice =
        packageTotal +
        (data.isCongestionZone ? 5 : 0) +
        (data.parkingOptions === "NO" || data.parkingOptions === "PAID"
          ? 5
          : 0);

      return await prismaTransaction.order.create({
        data: {
          userId: data.userId,
          assignedEngineerId: data.assignedEngineer,
          propertyType: data.propertyType,
          residentialType: data.residentialType,
          isCongestionZone: data.isCongestionZone,
          parkingOptions: data.parkingOptions,
          date: data.date,
          inspectionTime: data.inspectionTime,
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
          user: {
            include: {
              address: true,
            },
          },
          assignedEngineer: true,
        },
      });
    });

    // Email sending (outside of transaction)
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

    // Revalidate paths if needed
    revalidatePath("/admin", "layout");

    return {
      message: "Order created successfully!",
      emailMessage: "Email sent successfully!",
      data: createdOrder,
      success: true,
      emailSuccess: true,
    };
  } catch (error) {
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
