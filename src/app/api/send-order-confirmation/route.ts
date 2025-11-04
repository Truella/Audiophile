import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

// Email template
const orderConfirmationTemplate = (orderDetails) => {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            background-color: #D87D4A; 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 30px 20px; 
            background-color: #f9f9f9; 
          }
          .order-details { 
            background-color: white; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px;
          }
          .order-details h2 {
            margin-top: 0;
            color: #D87D4A;
          }
          .info-row {
            margin: 10px 0;
          }
          .info-row strong {
            display: inline-block;
            width: 120px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
          }
          th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
          }
          th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .total-row {
            font-size: 18px;
            font-weight: bold;
            color: #D87D4A;
            text-align: right;
            padding-top: 15px;
            border-top: 2px solid #D87D4A;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            font-size: 12px; 
            color: #666; 
          }
          .shipping-address {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          
          <div class="content">
            <p>Hi ${orderDetails.customerInfo.name},</p>
            <p>Thank you for your order! We've received your order and will process it shortly.</p>
            
            <div class="order-details">
              <h2>Order Details</h2>
              
              <div class="info-row">
                <strong>Order Number:</strong> ${orderDetails.orderNumber}
              </div>
              <div class="info-row">
                <strong>Order Date:</strong> ${new Date().toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
              </div>
              <div class="info-row">
                <strong>Payment Method:</strong> ${orderDetails.paymentMethod === "e-money" ? "e-Money" : "Cash on Delivery"}
              </div>
              
              <div class="shipping-address">
                <strong>Shipping Address:</strong><br>
                ${orderDetails.customerInfo.address}<br>
                ${orderDetails.customerInfo.city}, ${orderDetails.customerInfo.zip}<br>
                ${orderDetails.customerInfo.country}<br>
                Phone: ${orderDetails.customerInfo.phone}
              </div>
              
              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderDetails.items
										.map(
											(item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td style="text-align: center;">${item.quantity}</td>
                      <td style="text-align: right;">$${item.price.toLocaleString()}</td>
                      <td style="text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  `
										)
										.join("")}
                </tbody>
              </table>
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                  <span>Subtotal:</span>
                  <span style="font-weight: bold;">$${orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                  <span>Shipping:</span>
                  <span style="font-weight: bold;">$${orderDetails.shipping}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                  <span>VAT (Included):</span>
                  <span style="font-weight: bold;">$${orderDetails.vat.toLocaleString()}</span>
                </div>
                <div class="total-row" style="margin-top: 15px; padding-top: 15px;">
                  <span>Grand Total: $${orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <p>We'll send you another email with tracking information once your order ships.</p>
            <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function POST(request) {
	try {
		const orderDetails = await request.json();

		const mailOptions = {
			from: `"Audiophile Store" <${process.env.EMAIL_USER}>`,
			to: orderDetails.customerInfo.email,
			subject: `Order Confirmation - ${orderDetails.orderNumber}`,
			html: orderConfirmationTemplate(orderDetails),
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email", details: error.message },
			{ status: 500 }
		);
	}
}
