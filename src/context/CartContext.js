"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const CartContext = createContext();

export function CartProvider({ children }) {
	const [sessionId, setSessionId] = useState("");
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Generate or retrieve session ID
	useEffect(() => {
		let id = localStorage.getItem("audiophile-session-id");
		if (!id) {
			id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
			localStorage.setItem("audiophile-session-id", id);
		}
		setSessionId(id);
	}, []);

	// Query cart from Convex
	const cart = useQuery(api.cart.getCart, sessionId ? { sessionId } : "skip");

	// Mutations
	const addToCartMutation = useMutation(api.cart.addToCart);
	const updateQuantityMutation = useMutation(api.cart.updateQuantity);
	const removeFromCartMutation = useMutation(api.cart.removeFromCart);
	const clearCartMutation = useMutation(api.cart.clearCart);

	const addToCart = async (product, quantity = 1) => {
		if (!sessionId) return;

		await addToCartMutation({
			sessionId,
			item: {
				productId: product.id,
				slug: product.slug,
				name: product.name,
				price: product.price,
				quantity,
				image: product.image?.desktop || product.categoryImage?.desktop || "",
				category: product.category,
			},
		});
	};

	const updateQuantity = async (productId, quantity) => {
		if (!sessionId) return;
		await updateQuantityMutation({ sessionId, productId, quantity });
	};

	const removeFromCart = async (productId) => {
		if (!sessionId) return;
		await removeFromCartMutation({ sessionId, productId });
	};

	const clearCart = async () => {
		if (!sessionId) return;
		await clearCartMutation({ sessionId });
	};

	const getCartTotal = () => {
		if (!cart?.items) return 0;
		return cart.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const getCartCount = () => {
		if (!cart?.items) return 0;
		return cart.items.reduce((count, item) => count + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cart: cart?.items || [],
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				getCartCount,
				isCartOpen,
				setIsCartOpen,
				sessionId,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
};
