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

export const notifyCustomerOrderCompletedEmailHtml = (
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
                 <h2 style="margin: 0; color: #1c3556; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Service Completed</h2>
                <p style="margin: 8px 0 0; color: #64748b; font-size: 15px;">Thank you for choosing London Home Safety</p>
              </td>
            </tr>
            
            <tr>
              <td class="content" style="color: #000000;">
                <p>Dear ${orderDetails.user.firstName} ${orderDetails.user.lastName},</p>
                
                <p>We're pleased to inform you that our engineer has successfully completed the service at your property. We hope everything meets your expectations and you're satisfied with our service.</p>
                
                <p>Your feedback is important to us. If you have a moment, we'd love to hear about your experience with our service. This helps us maintain our high standards and continue improving our services for you and other customers.</p>
  
                <p>Should you have any questions or concerns about the completed service, please don't hesitate to contact our customer service team:</p>
                
                <p style="color: #1c3556; margin: 24px 0;">
                  ☎️ Mobile: ${PHONE_NO}<br>
                  ☎️ Landline: ${LANDLINE}<br>
                  ✉️ ${EMAIL_ADDRESS}
                </p>
                
                <p>Thank you for trusting ${BUSINESS_NAME} with your safety needs. We look forward to serving you again in the future.</p>
                
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
