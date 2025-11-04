"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CartProvider } from "@/context/CartContext";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function Providers({ children }) {
	return (
		<ConvexProvider client={convex}>
			<CartProvider>{children}</CartProvider>
		</ConvexProvider>
	);
}
