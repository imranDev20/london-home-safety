import prisma from "@/lib/prisma";
import {
  AREA_NAME,
  BANK_ACCOUNT_NUMBER,
  BANK_SORT_CODE,
  BUSINESS_NAME,
  POSTCODE,
  STREET_NAME,
} from "@/shared/data";
import { Prisma } from "@prisma/client";
import { jsPDF } from "jspdf";
import path from "path";
import fs from "fs";

export type OrderWithRelation = Prisma.OrderGetPayload<{
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

type InvoiceData = {
  order: OrderWithRelation;
  cartTotal: number;
  parkingFee: number;
  congestionFee: number;
  totalPrice: number;
};

export async function generateInvoiceId() {
  const mostRecentOrder = await prisma.order.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!mostRecentOrder || !mostRecentOrder.invoice) {
    return "INV00001A";
  }

  const match = mostRecentOrder.invoice.match(/INV(\d{5})([A-Z])/);
  if (!match) {
    console.error("Invalid invoice ID format:", mostRecentOrder.invoice);
    return "INV00001A";
  }

  let [, numericPart, alphabetPart] = match;
  let nextNumericPart = parseInt(numericPart, 10) + 1;

  if (nextNumericPart > 99999) {
    nextNumericPart = 1;
    alphabetPart = String.fromCharCode(alphabetPart.charCodeAt(0) + 1);
    if (alphabetPart > "Z") {
      throw new Error("Reached the maximum invoice ID");
    }
  }

  const paddedNumericPart = nextNumericPart.toString().padStart(5, "0");
  return `INV${paddedNumericPart}${alphabetPart}`;
}

export function generateInvoiceTemplate(doc: jsPDF, data: InvoiceData) {
  const { order, cartTotal, parkingFee, congestionFee, totalPrice } = data;

  // Colors - exactly matching the email template
  const primaryColor = "#1c3556";
  const backgroundColor = "#f7fafc";
  const sectionBackground = "#f8fafc";
  const borderColor = "#e2e8f0";
  const bodyColor = "#000000";
  const white = "#FFFFFF";

  doc.setFont("helvetica");

  // Header
  doc.setFillColor(white);
  doc.rect(0, 0, 210, 40, "F");

  // Add logo
  const currentDir = process.cwd();
  const publicFolderPath = path.join(currentDir, "public");
  const imagePath = path.join(publicFolderPath, "logo.png");

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const imgData = `data:image/png;base64,${base64Image}`;

  doc.addImage(imgData, "PNG", 20, 7, 30, 30);

  const rightMargin = 188;

  // Invoice title - using primaryColor (#1c3556)
  doc.setTextColor(primaryColor);
  doc.setFontSize(32);
  drawBolderText(doc, "INVOICE", rightMargin, 25, { align: "right" });

  // Add PAID stamp if payment status is PAID
  if (order.paymentStatus === "PAID") {
    // Set stamp styles
    doc.setTextColor("#28a745");

    // Create opacity state
    const gState = doc.GState({ opacity: 0.3 });
    doc.setGState(gState);

    doc.setFontSize(48);
    doc.setFont("helvetica", "bold");

    // Position stamp slightly below and to the left of the header
    const stampText = "PAID";

    // Draw the diagonal PAID text
    doc.text(stampText, 45, 210, {
      angle: 35,
    });

    // Reset opacity
    doc.setGState(doc.GState({ opacity: 1.0 }));
  }

  // Invoice number - using black
  doc.setTextColor(bodyColor);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`#${order.invoice}`, rightMargin, 35, {
    align: "right",
  });

  // Rest of the code remains exactly the same...
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(BUSINESS_NAME, 130, 55);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(STREET_NAME, rightMargin, 62, { align: "right" });
  doc.text(AREA_NAME, rightMargin, 69, { align: "right" });
  doc.text(`London ${POSTCODE}`, rightMargin, 76, { align: "right" });
  doc.text(
    `Date: ${new Date(order.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
    rightMargin,
    83,
    {
      align: "right",
    }
  );

  // Customer details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 20, 55);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${order.user.firstName} ${order.user.lastName}`, 20, 62);
  doc.text(order.user.email, 20, 69);
  if (order.user.address) {
    doc.text(`${order.user.address.street}`, 20, 76);
    doc.text(
      `${order.user.address.city}, ${order.user.address.postcode}`,
      20,
      83
    );
  }

  // Table header
  const tableTop = 100;
  doc.setFillColor(primaryColor);
  doc.rect(20, tableTop, 170, 10, "F");
  doc.setTextColor(white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Service Name", 25, tableTop + 7);
  doc.text("Amount", 185, tableTop + 7, { align: "right" });

  // Table content
  let yPos = tableTop + 20;
  doc.setTextColor(bodyColor);
  doc.setFont("helvetica", "normal");

  order.cartItems.forEach((cartItem, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? sectionBackground : white);
    doc.rect(20, yPos - 5, 170, 10, "F");

    // Format service name - only show quantity for additional packages
    let serviceName = `${cartItem.package.serviceName} - ${cartItem.package.name}`;
    if (cartItem.package.isAdditionalPackage) {
      const unitSuffix = cartItem.package.unitType
        ? ` ${cartItem.package.unitType}`
        : "items";
      serviceName += ` (${cartItem.quantity}${unitSuffix})`;
    }

    yPos = wrapText(doc, serviceName, 25, yPos, 130, 10);
    doc.text(`£${cartItem.price.toFixed(2)}`, 185, yPos, { align: "right" });
    yPos += 15;
  });

  // Subtotal and fees
  yPos += 10;
  doc.setDrawColor(borderColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 10;

  const addFeeLine = (label: string, amount: number) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, label === "Subtotal (inc Tax):" ? 135 : 140, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`£${amount.toFixed(2)}`, 190, yPos, { align: "right" });
    yPos += 10;
  };

  addFeeLine("Subtotal (inc Tax):", cartTotal);
  if (parkingFee > 0) addFeeLine("Parking Fee:", parkingFee);
  if (congestionFee > 0) addFeeLine("Congestion Fee:", congestionFee);

  // Total
  yPos += 5;
  doc.setFillColor(primaryColor);
  doc.rect(120, yPos - 5, 70, 10, "F");
  doc.setTextColor(white);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  const rectHeight = 10;
  const textDimensions = doc.getTextDimensions("Total (inc Tax):");
  const textHeight = textDimensions.h;
  const textY = yPos - 5 + (rectHeight - textHeight) / 2 + textHeight;

  doc.text("Total (inc Tax):", 125, textY);
  doc.text(`£${totalPrice.toFixed(2)}`, 185, textY, { align: "right" });

  // Bank details (if payment method is not credit card)
  if (order.paymentMethod !== "CREDIT_CARD" && order.paymentStatus !== "PAID") {
    yPos += 30;
    doc.setTextColor(bodyColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("BANK DETAILS", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Account Name: ${BUSINESS_NAME}`, 20, yPos);
    yPos += 7;
    doc.text(`Sort Code: ${BANK_SORT_CODE}`, 20, yPos);
    yPos += 7;
    doc.text(`Account No: ${BANK_ACCOUNT_NUMBER}`, 20, yPos);
  }

  // Footer
  doc.setTextColor(bodyColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your business!", 105, 280, { align: "center" });
  doc.text(
    "www.londonhomesafety.co.uk | info@londonhomesafety.co.uk",
    105,
    285,
    { align: "center" }
  );
}

function wrapText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let yPos = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = doc.getTextDimensions(testLine);
    const testWidth = metrics.w;

    if (testWidth > maxWidth && i > 0) {
      doc.text(line.trim(), x, yPos);
      line = words[i] + " ";
      yPos += lineHeight;
    } else {
      line = testLine;
    }
  }
  doc.text(line.trim(), x, yPos);
  return yPos;
}

function drawBolderText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  options?: { align: "right" | "center" | "left" }
) {
  doc.setFont("helvetica", "bold");
  const offset = 0.1;

  if (options?.align === "right") {
    const textWidth = doc.getTextWidth(text);
    x -= textWidth;
  }

  doc.text(text, x, y);
  doc.text(text, x + offset, y);
  doc.text(text, x, y + offset);
  doc.text(text, x + offset, y + offset);
}
