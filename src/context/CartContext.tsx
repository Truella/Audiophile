"use client";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Types
interface CartItem {
	productId: number;
	slug: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	category: string;
}

interface Product {
	id: number;
	slug: string;
	name: string;
	price: number;
	category: string;
	image?: {
		mobile?: string;
		tablet?: string;
		desktop?: string;
	};
	categoryImage?: {
		mobile?: string;
		tablet?: string;
		desktop?: string;
	};
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product, quantity?: number) => Promise<void>;
	removeFromCart: (productId: number) => Promise<void>;
	updateQuantity: (productId: number, quantity: number) => Promise<void>;
	clearCart: () => Promise<void>;
	getCartTotal: () => number;
	getCartCount: () => number;
	isCartOpen: boolean;
	setIsCartOpen: (isOpen: boolean) => void;
	sessionId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
	children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
	const [sessionId, setSessionId] = useState<string>("");
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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

	const addToCart = async (
		product: Product,
		quantity: number = 1
	): Promise<void> => {
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

	const updateQuantity = async (
		productId: number,
		quantity: number
	): Promise<void> => {
		if (!sessionId) return;
		await updateQuantityMutation({ sessionId, productId, quantity });
	};

	const removeFromCart = async (productId: number): Promise<void> => {
		if (!sessionId) return;
		await removeFromCartMutation({ sessionId, productId });
	};

	const clearCart = async (): Promise<void> => {
		if (!sessionId) return;
		await clearCartMutation({ sessionId });
	};

	const getCartTotal = (): number => {
		if (!cart?.items) return 0;
		return cart.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const getCartCount = (): number => {
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

export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
};
