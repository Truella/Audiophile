import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	carts: defineTable({
		userId: v.optional(v.string()), // For authenticated users
		sessionId: v.string(), // For guest users
		items: v.array(
			v.object({
				productId: v.number(),
				slug: v.string(),
				name: v.string(),
				price: v.number(),
				quantity: v.number(),
				image: v.string(),
				category: v.string(),
			})
		),
	}).index("by_session", ["sessionId"]),

	orders: defineTable({
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
		status: v.string(), // 'pending', 'confirmed', 'shipped', 'delivered'
		createdAt: v.number(),
	})
		.index("by_email", ["customerInfo.email"])
		.index("by_order_number", ["orderNumber"]),
});
