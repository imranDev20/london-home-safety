"use server";

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import exceljs from "exceljs";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";
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

import { CreateOrderFormInput } from "./new/schema";

export default async function generateInvoice(orderId: string) {
  try {
    if (!orderId) {
      console.error("No order ID available");
      return null;
    }

    const orderDetails = await prisma.order.findUnique({
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML content based on orderDetails (similar to your PDF structure)
    const content = `
      <html>
      <head><style>/* Add your styles here */</style></head>
      <body>
        <h1>London Home Safety</h1>
        <p>43 Felton Road, Barking, London IG11 7YA</p>
        <p>Email: info@londonhomesafety.co.uk</p>
        <p>Phone: 020 8146 6698</p>
        <h2>INVOICE</h2>
        <p>Invoice Number: ${orderDetails?.invoiceId}</p>
        <p>Date: ${orderDetails?.date}</p>
        <h3>Billing Address:</h3>
        <p>${orderDetails?.user.name}</p>
        <p>${orderDetails?.user?.address?.street}</p>
        <p>${orderDetails?.user?.address?.city} ${
      orderDetails?.user?.address?.postcode
    }</p>
        <table>
          <tr><th>Service</th><th>Quantity</th><th>Total</th></tr>
          ${orderDetails?.services
            .map(
              (service) => `
            <tr>
              <td>${service?.name}</td>
              <td>${service.category}</td>
              <td>£${service.propertyType}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <p>Subtotal: £${orderDetails?.totalPrice}</p>
        <p>Parking Charge: £${orderDetails?.parkingOptions}</p>
        <p>Congestion Zone Charge: £${
          orderDetails?.isCongestionZone ? "Yes" : "No"
        }</p>
        <h3>Total: £${orderDetails?.totalPrice}</h3>
        <p>Terms and conditions apply.</p>
        <p>Thank you for your business!</p>
      </body>
      </html>
    `;

    await page.setContent(content, { waitUntil: "networkidle0", timeout: 0 });
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return {
      message: "Invoice Generated Successfully",
      data: pdfBuffer,
      success: true,
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      message: "An error occured when generating invoice" + error,
      success: false,
    };
  }
}

export async function createOrder(data: CreateOrderFormInput) {
  try {
    // Calculate the total price based on the selected services
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: data.services.map((service) => service.serviceId),
        },
      },
    });

    // Create the order with the associated services
    const createdOrder = await prisma.order.create({
      data: {
        userId: data.userId,
        assignedEngineerId: data.assignedEngineer,
        isCongestionZone: data.isCongestionZone,
        parkingOptions: data.parkingOptions,
        date: data.date,
        inspectionTime: data.inspectionTime,
        totalPrice: 500,
        invoiceId: data.invoiceId,
        status: "CONFIRMED", // Assuming default status is PENDING, adjust as needed
        paymentStatus: "UNPAID", // Default as per the schema
        paymentMethod: data.PaymentMethod, // Default as per the schema
        services: {
          connect: data.services.map((service) => ({ id: service.serviceId })),
        },
      },
    });

    // Revalidate paths if needed
    revalidatePath("/admin/orders");
    revalidatePath("/admin/orders/new");

    return {
      message: "Order created successfully!",
      data: createdOrder,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while creating the order.",
      success: false,
    };
  }
}

interface CreateUserInput {
  name: string;
  email: string;
  phone: string | "";
  address: {
    city: string | "";
    street: string | "";
    postcode: string | "";
  };
}
export async function createUser(data: CreateUserInput) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name, // Set name to null if not provided
        password: "123456",
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
        address: true, // Include the address in the returned data
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/orders/new");
    return {
      message: "User created successfully!",
      data: newUser,
      success: true,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "An error occurred while creating the user.",
      success: false,
    };
  }
}
