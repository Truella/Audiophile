"use client";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
	const { getCartCount, setIsCartOpen } = useCart();
	const count = getCartCount();

	return (
		<button
			onClick={() => setIsCartOpen(true)}
			className="relative p-2 hover:opacity-70 transition"
			aria-label="Shopping cart"
		>
			<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
				<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
			</svg>
			{count > 0 && (
				<span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
					{count}
				</span>
			)}
		</button>
	);
}
