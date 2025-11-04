import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get cart by session ID
export const getCart = query({
	args: { sessionId: v.string() },
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.first();
		return cart;
	},
});

// Add item to cart
export const addToCart = mutation({
	args: {
		sessionId: v.string(),
		item: v.object({
			productId: v.number(),
			slug: v.string(),
			name: v.string(),
			price: v.number(),
			quantity: v.number(),
			image: v.string(),
			category: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		const existingCart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.first();

		if (existingCart) {
			const existingItemIndex = existingCart.items.findIndex(
				(item) => item.productId === args.item.productId
			);

			let updatedItems;
			if (existingItemIndex >= 0) {
				// Update quantity of existing item
				updatedItems = [...existingCart.items];
				updatedItems[existingItemIndex].quantity += args.item.quantity;
			} else {
				// Add new item
				updatedItems = [...existingCart.items, args.item];
			}

			await ctx.db.patch(existingCart._id, { items: updatedItems });
			return existingCart._id;
		} else {
			// Create new cart
			const newCartId = await ctx.db.insert("carts", {
				sessionId: args.sessionId,
				items: [args.item],
			});
			return newCartId;
		}
	},
});

// Update item quantity
export const updateQuantity = mutation({
	args: {
		sessionId: v.string(),
		productId: v.number(),
		quantity: v.number(),
	},
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.first();

		if (!cart) return null;

		const updatedItems = cart.items
			.map((item) =>
				item.productId === args.productId
					? { ...item, quantity: args.quantity }
					: item
			)
			.filter((item) => item.quantity > 0);

		await ctx.db.patch(cart._id, { items: updatedItems });
		return cart._id;
	},
});

// Remove item from cart
export const removeFromCart = mutation({
	args: {
		sessionId: v.string(),
		productId: v.number(),
	},
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.first();

		if (!cart) return null;

		const updatedItems = cart.items.filter(
			(item) => item.productId !== args.productId
		);

		await ctx.db.patch(cart._id, { items: updatedItems });
		return cart._id;
	},
});

// Clear cart
export const clearCart = mutation({
	args: { sessionId: v.string() },
	handler: async (ctx, args) => {
		const cart = await ctx.db
			.query("carts")
			.withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
			.first();

		if (!cart) return null;

		await ctx.db.patch(cart._id, { items: [] });
		return cart._id;
	},
});
