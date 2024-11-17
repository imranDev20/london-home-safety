import { ADDRESS, BUSINESS_NAME, PHONE_NO, WEBSITE_URL } from "@/shared/data";
import { OrderWithRelation } from "@/types/order";
import dayjs from "dayjs";

// Reusable CSS styles
const styles = `
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .header {
    background-color: #007BFF;
    color: white;
    padding: 20px;
    text-align: center;
  }
  .content {
    padding: 20px;
  }
  .message-box {
    margin: 20px 0;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }
  .footer {
    background-color: #f1f1f1;
    padding: 15px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  .order-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  .order-table th, .order-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  .order-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  .total-row {
    font-weight: bold;
    background-color: #f0f0f0 !important;
  }
  .detail-item {
    margin: 5px 0;
  }
  @media (max-width: 600px) {
    .container { width: 100%; margin: 20px; }
  }
`;

// Helper function to generate the order items table
const generateOrderTable = (cartItems: OrderWithRelation["cartItems"]) => `
  <table class="order-table">
    <thead>
      <tr>
        <th>Service Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      ${cartItems
        .map(
          (item) => `
          <tr>
            <td>${item.package.name}</td>
            <td>£${item.price.toFixed(2)}</td>
          </tr>
        `
        )
        .join("")}
      <tr class="total-row">
        <td>Total</td>
        <td>£${cartItems
          .reduce((sum, item) => sum + (item.price || 0), 0)
          .toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
`;

// Helper function to generate customer details
const generateCustomerDetails = (orderDetails: OrderWithRelation) => `
  <div class="detail-item">
    <strong>Address:</strong> ${orderDetails.user.address?.street}, 
    ${orderDetails.user.address?.postcode}, ${orderDetails.user.address?.city}
  </div>
  <div class="detail-item">
    <strong>Phone:</strong> ${orderDetails.user.phone}
  </div>
  <div class="detail-item">
    <strong>Email:</strong> ${orderDetails.user.email}
  </div>
  <div class="detail-item">
    <strong>Scheduled:</strong> ${orderDetails.timeSlot?.slotType}, 
    ${dayjs(orderDetails.date).format("DD MMMM YYYY")}
  </div>
`;

export const notifyEngineerEmailHtml = (
  orderDetails: OrderWithRelation | null,
  customMessage?: string
) => {
  if (!orderDetails || !orderDetails.assignedEngineer) return "";

  const greeting = `Dear ${orderDetails.assignedEngineer.name},

You have been assigned a new order. The order number is ${orderDetails.invoice}. Please review the details and proceed with the necessary steps to complete the assigned tasks.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Order</title>
  <style>${styles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Service Order</h2>
    </div>
    <div class="content">
      <p>${greeting}</p>
      <div class="message-box">
        <h3 style="margin-top: 0;">Customer Details</h3>
        ${generateCustomerDetails(orderDetails)}
        
        <h3>Order Details</h3>
        ${generateOrderTable(orderDetails.cartItems)}
        
        ${
          customMessage
            ? `
          <h3>Additional Information</h3>
          <p style="margin-left: 20px;">${customMessage}</p>
        `
            : ""
        }
      </div>
      <p style="margin-top: 20px;">
        Please contact the customer to schedule the visit and provide the requested services.
      </p>
      <p>
        Best regards,<br/>
        <strong>${BUSINESS_NAME} Team</strong>
      </p>
    </div>
    <div class="footer">
      <p>${BUSINESS_NAME} | ${PHONE_NO} | ${ADDRESS}</p>
      <p><a href="https://${WEBSITE_URL}">${WEBSITE_URL}</a></p>
    </div>
  </div>
</body>
</html>
`;
};
