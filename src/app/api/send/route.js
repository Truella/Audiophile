import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		const body = await request.json();
		const {
			to,
			orderNumber,
			customerInfo,
			items,
			subtotal,
			shipping,
			vat,
			total,
		} = body;

		const { data, error } = await resend.emails.send({
			from: "Audiophile <orders@yourdomain.com>", // Update with your domain
			to: [to],
			subject: `Order Confirmation #${orderNumber}`,
			react: OrderConfirmationEmail({
				orderNumber,
				customerName: customerInfo.name,
				items: items.map((item) => ({
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: `${process.env.NEXT_PUBLIC_APP_URL}${item.image}`,
				})),
				subtotal,
				shipping,
				vat,
				total,
			}),
		});

		if (error) {
			return NextResponse.json({ error }, { status: 400 });
		}

		return NextResponse.json({ data });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
