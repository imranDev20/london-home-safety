import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { calculateSubtotal, calculateTotal } from "../utils";

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

export const notifyAdminOrderPlacedEmailHtml = (
  orderDetails: OrderWithRelation
) => {
  const subtotal = calculateSubtotal(orderDetails);
  const total = calculateTotal(orderDetails);
  const parkingFee = orderDetails.parkingOptions !== "FREE" ? PARKING_FEE : 0;
  const congestionFee = orderDetails.isCongestionZone ? CONGESTION_FEE : 0;

  return `
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification - Admin</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #000000;
      margin: 0;
      padding: 0;
      background-color: #f7fafc;
      -webkit-font-smoothing: antialiased;
    }
    
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    .header {
      background-color: #f8fafc;
      padding: 32px 20px;
      text-align: center;
    }
    
    .header h2 {
      margin: 0;
      color: #1c3556;
      font-size: 24px;
      font-weight: bold;
    }
    
    .content {
      padding: 24px;
    }
    
    .section {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 24px;
      padding: 20px;
    }
    
    .section h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #1c3556;
      font-size: 18px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    
    th {
      background-color: #f8fafc;
      font-weight: 600;
      color: #1c3556;
    }
    
    .services-table th:last-child,
    .services-table td:last-child {
      text-align: right;
    }
    
    .total-row td {
      font-weight: bold;
      border-top: 2px solid #e2e8f0;
    }
    
    .footer {
      background-color: #f8fafc;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }

    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      
      th, td {
        padding: 8px;
      }
    }
  </style>
</head>
<body>
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table class="container" cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <tr>
            <td class="header">
              <h2>New Order Received</h2>
              <p style="margin: 8px 0 0; color: #666;">Order #${
                orderDetails.invoice
              }</p>
            </td>
          </tr>
          
          <tr>
            <td class="content">
              <div class="section">
                <h3>Customer Details</h3>
                <table>
                  <tr>
                    <td style="width: 35%;"><strong>Name:</strong></td>
                    <td>${orderDetails.user.firstName} ${
    orderDetails.user.lastName
  }</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>${orderDetails.user.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone:</strong></td>
                    <td>${orderDetails.user.phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>${orderDetails.user.address?.street}, ${
    orderDetails.user.address?.city
  }, ${orderDetails.user.address?.postcode}</td>
                  </tr>
                </table>
              </div>

              <div class="section">
                <h3>Order Details</h3>
                <table>
                  <tr>
                    <td style="width: 35%;"><strong>Order Date:</strong></td>
                    <td>${dayjs(orderDetails.createdAt).format(
                      "DD MMMM YYYY, HH:mm"
                    )}</td>
                  </tr>
                  <tr>
                    <td><strong>Inspection Date:</strong></td>
                    <td>${dayjs(orderDetails.date).format("DD MMMM YYYY")}</td>
                  </tr>
                  <tr>
                    <td><strong>Time Slot:</strong></td>
                    <td>${orderDetails.timeSlot.slotType}</td>
                  </tr>
                  <tr>
                    <td><strong>Property Type:</strong></td>
                    <td>${orderDetails.propertyType}</td>
                  </tr>
                  <tr>
                    <td><strong>Congestion Zone:</strong></td>
                    <td>${orderDetails.isCongestionZone ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td><strong>Parking Type:</strong></td>
                    <td>${
                      orderDetails.parkingOptions === "FREE"
                        ? "Free Parking"
                        : orderDetails.parkingOptions === "PAID"
                        ? "Paid Parking"
                        : "No Parking"
                    }</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Method:</strong></td>
                    <td>${orderDetails.paymentMethod}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Status:</strong></td>
                    <td>${orderDetails.paymentStatus}</td>
                  </tr>
                </table>
              </div>

              <div class="section">
                <h3>Services</h3>
                <table class="services-table">
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th style="text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${orderDetails.cartItems
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.package.serviceName} - ${item.package.name}${
                        item.package.isAdditionalPackage
                          ? ` (${item.quantity} ${
                              item.package.unitType || "units"
                            })`
                          : ""
                      }</td>
                      <td style="text-align: right;">£${item.price.toFixed(
                        2
                      )}</td>
                    </tr>
                  `
                    )
                    .join("")}
                    <tr class="total-row">
                      <td>Subtotal</td>
                      <td style="text-align: right;">£${subtotal}</td>
                    </tr>
                    ${
                      parkingFee > 0
                        ? `
                    <tr>
                      <td>Parking Fee</td>
                      <td style="text-align: right;">£${parkingFee.toFixed(
                        2
                      )}</td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      congestionFee > 0
                        ? `
                    <tr>
                      <td>Congestion Zone Fee</td>
                      <td style="text-align: right;">£${congestionFee.toFixed(
                        2
                      )}</td>
                    </tr>
                    `
                        : ""
                    }
                    <tr class="total-row">
                      <td>Total</td>
                      <td style="text-align: right;">£${total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style="color: #666; font-size: 14px;">This order requires review and engineer assignment. Please process according to standard procedures.</p>
            </td>
          </tr>
          
          <tr>
            <td class="footer">
              <p>This is an automated notification from the order management system.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
