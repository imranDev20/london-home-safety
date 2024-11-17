import {
  AREA_NAME,
  BUSINESS_NAME,
  EMAIL_ADDRESS,
  LANDLINE,
  PHONE_NO,
  POSTCODE,
  STREET_NAME,
  WEBSITE_URL,
} from "@/shared/data";
import { OrderWithRelation } from "@/types/order";

export const notifyCustomerOrderCancelledEmailHtml = (
  orderDetails: OrderWithRelation
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>London Home Safety - Email Template</title>
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
        padding: 40px 20px 32px;
        text-align: center;
      }
      
      .header h2 {
        margin: 0;
        color: #1c3556;
        font-size: 26px;
        font-weight: bold;
      }
      
      .content {
        padding: 32px 24px;
      }
      
      .footer {
        background-color: #f8fafc;
        padding: 24px;
        text-align: center;
      }
      
      .footer p {
        margin: 8px 0;
        font-size: 14px;
        color: #000000;
      }
  
      .reference-box {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 16px;
        margin: 24px 0;
      }
  
      @media screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f7fafc;">
    <!-- Outer container with padding and shadow simulation -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7fafc;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <!-- Main content container -->
          <table class="container" cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <tr>
              <td class="header">
                <div class="logo">
                  <img src="https://i.ibb.co.com/N30tcFm/london-home-safety-logo.png" 
                    alt="london-home-safety-logo" 
                    border="0" 
                    width="80" 
                    style="margin-bottom: 16px; max-width: 80px; height: auto;"
                  >
                </div>
                 <h2 style="margin: 0; color: #1c3556; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Order Cancelled</h2>
                <p style="margin: 8px 0 0; color: #64748b; font-size: 15px;">Your order has been cancelled as requested</p>
              </td>
            </tr>
            
            <tr>
              <td class="content" style="color: #000000;">
                <p>Dear ${orderDetails.user.firstName} ${orderDetails.user.lastName},</p>
                
                <p>As requested, we have cancelled your order with ${BUSINESS_NAME}. We're sorry we couldn't serve you this time.</p>
  
                <div class="reference-box">
                  <p style="margin: 0 0 8px 0; font-weight: bold;">Cancelled Order Reference</p>
                  <p style="margin: 0; color: #64748b;">Invoice No: ${orderDetails.invoice}</p>
                </div>
                
                <p>If this cancellation was made in error or if you would like to reschedule your service for a different date, please don't hesitate to contact our customer service team:</p>
                
                <p style="color: #1c3556; margin: 24px 0;">
                  ☎️ Mobile: ${PHONE_NO}<br>
                  ☎️ Landline: ${LANDLINE}<br>
                  ✉️ ${EMAIL_ADDRESS}
                </p>
                
                <p>We value your interest in our services and hope to have the opportunity to serve you in the future. If you would like to book a new appointment, you can visit our website or contact our customer service team.</p>
                
                <p style="margin-bottom: 0;">Best regards,<br>
                <strong>${BUSINESS_NAME} Team</strong></p>
              </td>
            </tr>
            
            <tr>
              <td class="footer">
                <p style="color: #000000;">${BUSINESS_NAME}</p>
                <p style="color: #000000;">${STREET_NAME}, ${AREA_NAME}</p>
                <p style="color: #000000;">London, ${POSTCODE}</p>
                <p style="color: #000000;">Mobile: ${PHONE_NO} | Landline: ${LANDLINE}</p>
                <p style="color: #000000;">Email: ${EMAIL_ADDRESS}</p>
                <p><a href="https://${WEBSITE_URL}" style="color: #1c3556;">${WEBSITE_URL}</a></p>
                <p style="margin-top: 16px; font-size: 12px; color: #000000;">This email was sent to ${orderDetails.user.email}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
