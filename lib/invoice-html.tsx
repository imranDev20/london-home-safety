import { Order, Prisma } from "@prisma/client";
const dayjs = require("dayjs");

type OrderWithPackages = Prisma.OrderGetPayload<{
  include: {
    packages: true;
    user: {
      include: {
        address: true;
      };
    };
  };
}>;

export function generateInvoiceHtml(
  order: OrderWithPackages,
  cartTotal: number,
  totalPrice: number
) {
  const logoSvg = `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266.62 215.6">
    <path fill="#267ECE" d="M177.01 215.6v-46.48h-17.53v46.48h-13.87v-46.48h-17.53v46.48h-13.87v-46.48h-36.4v-15.5h36.4V98.48h-35.06v-15.5h35.06V27.85H83.85v67.14H48.79V27.85H0V0h266.62v27.85h-48.79v67.14h-35.06v55.14h35.06v15.5h-35.06v70.98h-5.76zm-31.4-61.97V98.48h-17.53v55.14h17.53zm-31.4 0V98.48h-17.53v55.14h17.53zm76.31-70.64V27.85h-31.26v55.14h31.26zM66.32 82.99V27.85H35.06v55.14h31.26z"></path>
  </svg>`;

  const packageRows = order.packages
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td class="amount-column">£${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  const congestionFee = order.isCongestionZone
    ? `<p><strong>Congestion Zone Fee:</strong> £5.00</p>`
    : "";
  const parkingFee =
    order.parkingOptions !== "FREE"
      ? `<p><strong>Parking Fee:</strong> £5.00</p>`
      : "";

  const bankDetails =
    order.paymentMethod !== "CREDIT_CARD"
      ? `
    <div class="bank-details">
      <div class="bank-details-grid">
        <span><strong>Bank:</strong></span>
        <span>International Bank of Commerce</span>
        <span><strong>Account:</strong></span>
        <span>London Home Safety Limited</span>
        <span><strong>Account No:</strong></span>
        <span>1234567890</span>
        <span><strong>Sort Code:</strong></span>
        <span>12-34-56</span>
      </div>
    </div>
    <div class="footer">
      <p>Thank you for your business. Please make payment within 15 days of the invoice date.</p>
    </div>
  `
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Invoice - London Home Safety Limited</title>
    <style>
        :root {
            --primary-color: #267ECE;
            --secondary-color: #FFC527;
            --text-color: #2c3e50;
            --border-color: #bdc3c7;
            --background-color: #f8fafc;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            background-color: white;
            padding: 40px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 20px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo-container {
            display: flex;
            align-items: center;
        }
        .logo {
            width: 150px;
            height: auto;
        }
        .company-details {
            text-align: right;
            font-size: 0.9em;
        }
        .invoice-title {
            font-size: 32px;
            color: var(--primary-color);
            margin: 0 0 10px 0;
        }
        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .client-details, .invoice-info {
            flex-basis: 48%;
        }
        .section-title {
            font-size: 20px;
            color: var(--primary-color);
            margin-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        thead {
            background-color: var(--primary-color);
            color: white;
        }
        .amount-column {
            text-align: right;
        }
        .total-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 20px;
        }
        .payment-status-section {
            flex-basis: 48%;
        }
        .totals {
            flex-basis: 48%;
            text-align: right;
        }
        .total-row {
            font-size: 1.2em;
            font-weight: bold;
            color: var(--primary-color);
        }
        .bank-details {
            margin-top: 20px;
            font-size: 0.9em;
            border-top: 1px solid var(--border-color);
            padding-top: 10px;
        }
        .bank-details-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 5px 10px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: var(--text-color);
        }
        .payment-status {
            font-weight: bold;
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 10px;
        }
        .status-UNPAID { background-color: #fecaca; color: #991b1b; }
        .status-PARTIALLY_PAID { background-color: #fef3c7; color: #92400e; }
        .status-PAID { background-color: #d1fae5; color: #065f46; }
        .status-REFUNDED { background-color: #e0e7ff; color: #3730a3; }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo-container">
                ${logoSvg}
            </div>
            <div class="company-details">
                <h1 class="invoice-title">INVOICE</h1>
                <p>London Home Safety Limited<br>
                43 Felton Road, Barking<br>
                London IG11 7YA<br>
                United Kingdom</p>
            </div>
        </header>

        <div class="invoice-details">
            <div class="client-details">
                <h2 class="section-title">Bill To</h2>
                <p>
                    ${order.user.name}<br>
                    ${order.user.address?.street},<br>
                    ${order.user.address?.city}, ${
    order.user.address?.postcode
  }<br>
                    United Kingdom
                </p>
            </div>
            <div class="invoice-info">
                <h2 class="section-title">Invoice Details</h2>
                <p>
                    <strong>Invoice Number:</strong> ${order.invoice}<br>
                    <strong>Date:</strong> ${dayjs(order.date).format(
                      "MMMM DD, YYYY"
                    )}<br>
                    <strong>Due Date:</strong> ${dayjs(order.date)
                      .add(3, "day")
                      .format("MMMM DD, YYYY")}
                </p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="amount-column">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${packageRows}
            </tbody>
        </table>

        <div class="total-section">
            <div class="payment-status-section">
                <div class="payment-status status-${order.paymentStatus}">
                    ${order.paymentStatus}
                </div>
            </div>
            <div class="totals">
                <p><strong>Subtotal:</strong> £${cartTotal.toFixed(2)}</p>
                ${congestionFee}
                ${parkingFee}
                <p class="total-row">Total: £${totalPrice.toFixed(2)}</p>
            </div>
        </div>

        ${bankDetails}
    </div>
</body>
</html>
  `;
}

module.exports = generateInvoiceHtml;
