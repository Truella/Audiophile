"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartModal() {
	const {
		cart,
		isCartOpen,
		setIsCartOpen,
		updateQuantity,
		clearCart,
		getCartTotal,
	} = useCart();

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isCartOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isCartOpen]);

	if (!isCartOpen) return null;

	const total = getCartTotal();

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40"
				onClick={() => setIsCartOpen(false)}
			/>

			{/* Modal */}
			<div className="fixed top-24 right-4 md:right-8 lg:right-24 w-full max-w-md bg-white rounded-lg p-6 z-50 shadow-2xl">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-lg font-bold uppercase">Cart ({cart.length})</h2>
					<button
						onClick={clearCart}
						className="text-gray-500 hover:text-gray-700 underline text-sm"
					>
						Remove all
					</button>
				</div>

				{cart.length === 0 ? (
					<p className="text-gray-500 text-center py-8">Your cart is empty</p>
				) : (
					<>
						{/* Cart Items */}
						<div className="space-y-4 max-h-64 overflow-y-auto mb-6">
							{cart.map((item) => (
								<div key={item.id} className="flex items-center gap-4">
									<div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
										<Image
											src={item.image?.desktop || item.categoryImage?.desktop}
											alt={item.name}
											fill
											className="object-contain p-2"
										/>
									</div>

									<div className="flex-1 min-w-0">
										<h3 className="font-bold text-sm truncate">
											{item.name
												.replace("Headphones", "")
												.replace("Earphones", "")
												.replace("Speaker", "")}
										</h3>
										<p className="text-gray-600 text-sm">
											$ {item.price.toLocaleString()}
										</p>
									</div>

									{/* Quantity Controls */}
									<div className="flex items-center bg-gray-100">
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className="px-3 py-2 hover:bg-gray-200 text-gray-600"
										>
											−
										</button>
										<span className="px-3 py-2 font-bold text-sm">
											{item.quantity}
										</span>
										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className="px-3 py-2 hover:bg-gray-200 text-gray-600"
										>
											+
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Total */}
						<div className="flex justify-between items-center mb-6">
							<span className="text-gray-600 uppercase text-sm">Total</span>
							<span className="text-xl font-bold">
								$ {total.toLocaleString()}
							</span>
						</div>

						{/* Checkout Button */}
						<Link href="/checkout" onClick={() => setIsCartOpen(false)}>
							<button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-bold uppercase tracking-wider transition">
								Checkout
							</button>
						</Link>
					</>
				)}
			</div>
		</>
	);
}
