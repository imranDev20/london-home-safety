import { ADDRESS, BUSINESS_NAME, PHONE_NO, WEBSITE_URL } from "@/shared/data";
import { OrderWithRelation } from "@/types/order";
import dayjs from "dayjs";

export const notifyEngineerEmailHtml = (
  orderDetails: OrderWithRelation | null,
  content: string
) =>{ 
  console.log("Debugging orderDetails:", orderDetails);
   return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Order</title>
  <style>
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
    .header h2 {
      margin: 0;
      font-size: 28px;
    }
    .header img {
      margin-bottom: 20px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #555;
    }
    .message-box {
      margin-top: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .order-table th,
    .order-table td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .order-table th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .order-table tr:nth-child(even) {
      background-color: #fafafa;
    }
    .total-row {
      font-weight: bold;
      background-color: #f0f0f0 !important;
    }
    @media (max-width: 600px) {
      .container {
        width: 100%;
        margin: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Service Order</h2>
    </div>
    <div class="content">
      <p>Dear Engineer,</p>
      <p>
        A new service order has been received. Details are as follows:
      </p>
      <div class="message-box">
        <p style="font-weight: bold;">Customer Details:</p>
        <p style="margin-left: 20px;">
          <strong>Address:</strong> ${orderDetails?.user.address?.street}, ${orderDetails?.user.address?.postcode}, ${orderDetails?.user.address?.city}<br>
          <strong>Phone:</strong> ${orderDetails?.user.phone}<br>
          <strong>Email:</strong> ${orderDetails?.user.email}<br>
          <strong>Scheduled:</strong> ${orderDetails?.inspectionTime}, ${dayjs(orderDetails?.date).format("DD MMMM YYYY")}
        </p>
        <p style="font-weight: bold;">Order Details:</p>
        <table class="order-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderDetails?.packages
              .map(
                (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>$${item.price}</td>
                </tr>
              `
              )
              .join("")}
            <tr class="total-row">
              <td>Total</td>
              <td>$${orderDetails?.packages.reduce(
                (sum, item) => sum + (parseFloat(item.price) || 0),
                0
              ).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <p style="font-weight: bold;">Message from Kamal:</p>
        <p style="margin-left: 20px;">${content}</p>
      </div>
      <p style="margin-top: 20px;">
        Please contact the customer to schedule the visit and provide the requested services.
      </p>
      <p>
        Best regards,<br/>
        <strong>Kamal Ahmed</strong>
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
}