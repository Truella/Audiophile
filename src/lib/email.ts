import nodemailer from "nodemailer";

// Create a transporter
export const transporter = nodemailer.createTransport({
	service: "gmail", // or 'smtp.gmail.com'
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
	},
	// Alternative SMTP configuration:
	// host: process.env.SMTP_HOST,
	// port: process.env.SMTP_PORT,
	// secure: true, // true for 465, false for other ports
});

// Email template for order confirmation
export const orderConfirmationTemplate = (orderDetails) => {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .order-details { background-color: white; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <p>Hi ${orderDetails.customerName},</p>
            <p>Thank you for your order! Your order has been confirmed.</p>
            
            <div class="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
              <p><strong>Order Date:</strong> ${orderDetails.orderDate}</p>
              
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderDetails.items
										.map(
											(item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price}</td>
                    </tr>
                  `
										)
										.join("")}
                </tbody>
              </table>
              
              <p style="text-align: right; font-size: 18px; margin-top: 20px;">
                <strong>Total: $${orderDetails.total}</strong>
              </p>
            </div>
            
            <p>We'll send you another email when your order ships.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
