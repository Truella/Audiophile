import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

// Create order
export const createOrder = mutation({
	args: {
		orderNumber: v.string(),
		customerInfo: v.object({
			name: v.string(),
			email: v.string(),
			phone: v.string(),
			address: v.string(),
			zip: v.string(),
			city: v.string(),
			country: v.string(),
		}),
		paymentMethod: v.string(),
		items: v.array(
			v.object({
				productId: v.number(),
				name: v.string(),
				price: v.number(),
				quantity: v.number(),
				image: v.string(),
			})
		),
		subtotal: v.number(),
		shipping: v.number(),
		vat: v.number(),
		total: v.number(),
	},
	handler: async (ctx, args) => {
		const orderId = await ctx.db.insert("orders", {
			...args,
			status: "pending",
			createdAt: Date.now(),
		});
		return orderId;
	},
});

// Get order by order number
export const getOrder = query({
	args: { orderNumber: v.string() },
	handler: async (ctx, args) => {
		const order = await ctx.db
			.query("orders")
			.withIndex("by_order_number", (q) =>
				q.eq("orderNumber", args.orderNumber)
			)
			.first();
		return order;
	},
});

// Process order and send email
export const processOrder = action({
	args: {
		orderNumber: v.string(),
		customerInfo: v.object({
			name: v.string(),
			email: v.string(),
			phone: v.string(),
			address: v.string(),
			zip: v.string(),
			city: v.string(),
			country: v.string(),
		}),
		paymentMethod: v.string(),
		items: v.array(
			v.object({
				productId: v.number(),
				name: v.string(),
				price: v.number(),
				quantity: v.number(),
				image: v.string(),
			})
		),
		subtotal: v.number(),
		shipping: v.number(),
		vat: v.number(),
		total: v.number(),
	},
	handler: async (ctx, args) => {
		// Create order in database
		const orderId = await ctx.runMutation(api.orders.createOrder, args);

		// Send confirmation email
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						to: args.customerInfo.email,
						orderNumber: args.orderNumber,
						customerInfo: args.customerInfo,
						items: args.items,
						subtotal: args.subtotal,
						shipping: args.shipping,
						vat: args.vat,
						total: args.total,
					}),
				}
			);

			if (!response.ok) {
				console.error("Failed to send confirmation email");
			}
		} catch (error) {
			console.error("Email sending error:", error);
		}

		return orderId;
	},
});
