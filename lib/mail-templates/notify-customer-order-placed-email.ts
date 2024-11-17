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

export const notifyCustomerOrderPlacedEmailHtml = (
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
    
    .details-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 16px;
    }
    
    .details-table td {
      padding: 12px;
      vertical-align: top;
    }
    
    .details-label {
      font-weight: bold;
      color: #000000;
      width: 50%;
    }
    
    .details-value {
      color: #000000;
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
    
    .attachment-note {
      background-color: #f8fafc;
      padding: 16px;
      margin-top: 24px;
      font-size: 14px;
      color: #000000;
      border: 1px solid #e2e8f0;
    }

    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      
      .details-table {
        display: block;
        width: 100%;
      }
      
      .details-table td {
        display: block;
        width: 100%;
        box-sizing: border-box;
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
               <h2 style="margin: 0; color: #1c3556; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Order Received</h2>
              <p style="margin: 8px 0 0; color: #64748b; font-size: 15px;">Thank you for choosing London Home Safety</p>
            </td>
          </tr>
          
          <tr>
            <td class="content" style="color: #000000;">
              <p>Dear ${orderDetails.user.firstName} ${
  orderDetails.user.lastName
},</p>
              <p>Thank you for choosing ${BUSINESS_NAME}. We have successfully received your order request and it is currently under review by our team.</p>
              
              <!-- Order Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; margin: 24px 0; border-radius: 6px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin-top: 0; color: #000000;">Appointment Details</h3>
                    
                    <table class="details-table" width="100%">
                      <tr>
                        <td class="details-label">Invoice No</td>
                        <td class="details-value">${orderDetails.invoice}</td>
                      </tr>
                      <tr>
                        <td class="details-label">Appointment Date</td>
                        <td class="details-value">${new Date(
                          orderDetails.date
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}</td>
                      </tr>
                      <tr>
                        <td class="details-label">Address</td>
                        <td class="details-value">
                          ${orderDetails.user.address?.street}, ${
  orderDetails.user.address?.city
}<br />
                          London, ${orderDetails.user.address?.postcode}
                        </td>
                      </tr>
                      <tr>
                        <td class="details-label">Inspection Time</td>
                        <td class="details-value">
                          ${orderDetails.timeSlot.slotType} (${new Date(
  orderDetails.timeSlot.startTime
).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})} - ${new Date(orderDetails.timeSlot.endTime).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})})<br />
                          ${new Date(
                            orderDetails.timeSlot.date
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    </table>
                    
                    <div class="attachment-note">
                      📎 Please find your preliminary invoice attached to this email for your records.
                    </div>
                  </td>
                </tr>
              </table>

              <p>What happens next?</p>
              <!-- Steps using table for consistent alignment -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td width="24" valign="top" style="padding-right: 16px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="24" height="24">
                            <tr>
                              <td align="center" valign="middle" style="background-color: #1c3556; color: white; border-radius: 50%; font-size: 14px;">
                                1
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="color: #000000; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                          Our admin team will review your order details
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
                      <tr>
                        <td width="24" valign="top" style="padding-right: 16px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="24" height="24">
                            <tr>
                              <td align="center" valign="middle" style="background-color: #1c3556; color: white; border-radius: 50%; font-size: 14px;">
                                2
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="color: #000000; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                          You'll receive a confirmation email once your order is approved
                        </td>
                      </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="24" valign="top" style="padding-right: 16px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="24" height="24">
                            <tr>
                              <td align="center" valign="middle" style="background-color: #1c3556; color: white; border-radius: 50%; font-size: 14px;">
                                3
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="color: #000000;">
                          The confirmation email will include your final appointment time and engineer details
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p>Please note that your preferred inspection time is subject to availability and will be confirmed in our follow-up email. We aim to accommodate your preferred time whenever possible.</p>

              <p>If you need to make any changes to your order or have any questions before receiving our confirmation, please contact our customer service team:</p>
              
              <p style="color: #1c3556; margin: 24px 0;">
                ☎️ Mobile: ${PHONE_NO}<br>
                ☎️ Landline: ${LANDLINE}<br>
                ✉️ ${EMAIL_ADDRESS}
              </p>
              
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
              <p style="margin-top: 16px; font-size: 12px; color: #000000;">This email was sent to ${
                orderDetails.user.email
              }</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
