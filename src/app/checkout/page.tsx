"use client";
import { useCart } from "@/context/CartContext";
import { useState, FormEvent, ChangeEvent } from "react";
import { useAction } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import HeroSection from "@/components/layout/HeroSection";

interface FormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	zip: string;
	city: string;
	country: string;
	eMoneyNumber: string;
	eMoneyPin: string;
}

type PaymentMethod = "e-money" | "cash";

export default function CheckoutPage() {
	const { cart, getCartTotal, clearCart, sessionId } = useCart();
	const router = useRouter();
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("e-money");
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [orderNumber, setOrderNumber] = useState<string>("");
	const [confirmedOrder, setConfirmedOrder] = useState<{
		items: typeof cart;
		total: number;
	} | null>(null);

	const processOrder = useAction(api.orders.processOrder);

	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		address: "",
		zip: "",
		city: "",
		country: "",
		eMoneyNumber: "",
		eMoneyPin: "",
	});

	const subtotal = getCartTotal();
	const shipping = 50;
	const vat = Math.round(subtotal * 0.2);
	const grandTotal = subtotal + shipping;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsProcessing(true);

		try {
			// Generate order number
			const orderNum = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
			setOrderNumber(orderNum);

			// Prepare order data
			const orderData = {
				orderNumber: orderNum,
				customerInfo: {
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					address: formData.address,
					zip: formData.zip,
					city: formData.city,
					country: formData.country,
				},
				paymentMethod,
				items: cart.map((item) => ({
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: item.image,
				})),
				subtotal,
				shipping,
				vat,
				total: grandTotal,
			};

			// Process order in Convex
			await processOrder(orderData);

			// Send confirmation email
			const emailResponse = await fetch("/api/send-order-confirmation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(orderData),
			});

			if (!emailResponse.ok) {
				console.error("Failed to send confirmation email");
			}

			// Save order data before clearing cart
			setConfirmedOrder({
				items: [...cart],
				total: grandTotal,
			});

			// Clear cart and show confirmation
			await clearCart();
			setShowConfirmation(true);
		} catch (error) {
			console.error("Order processing failed:", error);
			alert("Failed to process order. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const handleConfirmationClose = () => {
		setShowConfirmation(false);
		router.push("/");
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (cart.length === 0 && !showConfirmation) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
					<Link href="/">
						<button className="bg-primary-light text-white px-8 py-3 font-bold uppercase">
							Continue Shopping
						</button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<HeroSection></HeroSection>{" "}
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-6xl mx-auto px-6 py-8">
					<Link href="/" className="text-gray-600 hover:text-gray-900">
						Go back
					</Link>

					<form
						onSubmit={handleSubmit}
						className="grid lg:grid-cols-3 gap-8 mt-8"
					>
						{/* Checkout Form */}
						<div className="lg:col-span-2 bg-white rounded-lg p-8 space-y-8">
							<h1 className="text-3xl font-bold uppercase">Checkout</h1>

							{/* Billing Details */}
							<div className="space-y-4">
								<h2 className="text-primary text-sm font-bold uppercase tracking-wider">
									Billing Details
								</h2>

								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-bold mb-2">Name</label>
										<input
											type="text"
											name="name"
											required
											placeholder="Alexei Ward"
											value={formData.name}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
										/>
									</div>

									<div>
										<label className="block text-xs font-bold mb-2">
											Email Address
										</label>
										<input
											type="email"
											name="email"
											required
											placeholder="alexei@mail.com"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
										/>
									</div>

									<div>
										<label className="block text-xs font-bold mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											name="phone"
											required
											placeholder="+1 202-555-0136"
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
										/>
									</div>
								</div>
							</div>

							{/* Shipping Info */}
							<div className="space-y-4">
								<h2 className="text-primary text-sm font-bold uppercase tracking-wider">
									Shipping Info
								</h2>

								<div className="space-y-4">
									<div>
										<label className="block text-xs font-bold mb-2">
											Address
										</label>
										<input
											type="text"
											name="address"
											required
											placeholder="1137 Williams Avenue"
											value={formData.address}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
										/>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-bold mb-2">
												ZIP Code
											</label>
											<input
												type="text"
												name="zip"
												required
												placeholder="10001"
												value={formData.zip}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
											/>
										</div>

										<div>
											<label className="block text-xs font-bold mb-2">
												City
											</label>
											<input
												type="text"
												name="city"
												required
												placeholder="New York"
												value={formData.city}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
											/>
										</div>

										<div>
											<label className="block text-xs font-bold mb-2">
												Country
											</label>
											<input
												type="text"
												name="country"
												required
												placeholder="United States"
												value={formData.country}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Details */}
							<div className="space-y-4">
								<h2 className="text-primary text-sm font-bold uppercase tracking-wider">
									Payment Details
								</h2>

								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-bold mb-2">
											Payment Method
										</label>
									</div>

									<div className="space-y-2">
										<label className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded cursor-pointer hover:border-primary-light">
											<input
												type="radio"
												name="payment"
												value="e-money"
												checked={paymentMethod === "e-money"}
												onChange={(e) =>
													setPaymentMethod(e.target.value as PaymentMethod)
												}
												className="accent-primary-light"
											/>
											<span className="text-sm font-bold">e-Money</span>
										</label>

										<label className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded cursor-pointer hover:border-primary-light">
											<input
												type="radio"
												name="payment"
												value="cash"
												checked={paymentMethod === "cash"}
												onChange={(e) =>
													setPaymentMethod(e.target.value as PaymentMethod)
												}
												className="accent-primary-light"
											/>
											<span className="text-sm font-bold">
												Cash on Delivery
											</span>
										</label>
									</div>
								</div>

								{paymentMethod === "e-money" && (
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-bold mb-2">
												e-Money Number
											</label>
											<input
												type="text"
												name="eMoneyNumber"
												required
												placeholder="238521993"
												value={formData.eMoneyNumber}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
											/>
										</div>

										<div>
											<label className="block text-xs font-bold mb-2">
												e-Money PIN
											</label>
											<input
												type="text"
												name="eMoneyPin"
												required
												placeholder="6891"
												value={formData.eMoneyPin}
												onChange={handleInputChange}
												className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary-light"
											/>
										</div>
									</div>
								)}

								{paymentMethod === "cash" && (
									<p className="text-gray-600 text-sm">
										The 'Cash on Delivery' option enables you to pay in cash
										when our delivery courier arrives at your residence. Just
										make sure your address is correct so that your order will
										not be cancelled.
									</p>
								)}
							</div>
						</div>

						{/* Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg p-6 space-y-6 sticky top-8">
								<h2 className="text-lg font-bold uppercase">Summary</h2>

								<div className="space-y-4">
									{cart.map((item) => (
										<div
											key={item.productId}
											className="flex items-center gap-4"
										>
											<div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
												<Image
													src={item.image || ""}
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

											<span className="text-gray-600 font-bold text-sm">
												x{item.quantity}
											</span>
										</div>
									))}
								</div>

								<div className="space-y-2 pt-4">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600 uppercase">Total</span>
										<span className="font-bold">
											$ {subtotal.toLocaleString()}
										</span>
									</div>

									<div className="flex justify-between text-sm">
										<span className="text-gray-600 uppercase">Shipping</span>
										<span className="font-bold">$ {shipping}</span>
									</div>

									<div className="flex justify-between text-sm">
										<span className="text-gray-600 uppercase">
											VAT (Included)
										</span>
										<span className="font-bold">$ {vat.toLocaleString()}</span>
									</div>

									<div className="flex justify-between pt-4">
										<span className="text-gray-600 uppercase text-sm">
											Grand Total
										</span>
										<span className="text-primary font-bold text-lg">
											$ {grandTotal.toLocaleString()}
										</span>
									</div>
								</div>

								<button
									type="submit"
									disabled={isProcessing}
									className="w-full bg-primary hover:bg-primary-light text-white py-3 font-bold uppercase tracking-wider transition-all duration-300 ease-in disabled:opacity-50"
								>
									{isProcessing ? "Processing..." : "Continue & Pay"}
								</button>
							</div>
						</div>
					</form>
				</div>

				{/* Confirmation Modal */}
				{showConfirmation && confirmedOrder && (
					<>
						<div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
						<div className="fixed inset-0 flex items-center justify-center z-50 p-4">
							<div className="bg-white rounded-lg p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mb-4 sm:mb-6">
									<svg
										className="w-6 h-6 sm:w-8 sm:h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>

								<h2 className="text-xl sm:text-2xl font-bold uppercase mb-2 sm:mb-3">
									Thank you
									<br />
									for your order
								</h2>

								<p className="text-gray-500 text-sm sm:text-base mb-6">
									You will receive an email confirmation shortly.
								</p>

								{/* Order Items */}
								<div className="bg-gray-50 rounded-lg mb-4">
									{confirmedOrder.items.slice(0, 1).map((item) => (
										<div
											key={item.productId}
											className="flex items-center gap-4 p-4 border-b border-gray-200"
										>
											<img
												src={item.image}
												alt={item.name}
												className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
											/>
											<div className="flex-1">
												<p className="font-bold text-sm sm:text-base">
													{item.name}
												</p>
												<p className="text-gray-500 text-xs sm:text-sm">
													${item.price.toLocaleString()}
												</p>
											</div>
											<p className="text-gray-500 text-sm">x{item.quantity}</p>
										</div>
									))}

									{confirmedOrder.items.length > 1 && (
										<div className="p-4 text-center border-t border-gray-200">
											<p className="text-gray-500 text-xs sm:text-sm">
												and {confirmedOrder.items.length - 1} other item(s)
											</p>
										</div>
									)}
								</div>

								{/* Grand Total */}
								<div className="bg-black text-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
									<p className="text-gray-400 text-xs sm:text-sm uppercase mb-2">
										Grand Total
									</p>
									<p className="text-xl sm:text-2xl font-bold">
										${confirmedOrder.total.toLocaleString()}
									</p>
								</div>

								<button
									onClick={handleConfirmationClose}
									className="w-full bg-primary hover:bg-primary-light text-white py-3 sm:py-4 font-bold uppercase tracking-wider transition-all duration-300 ease-in text-sm sm:text-base"
								>
									Back to Home
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
