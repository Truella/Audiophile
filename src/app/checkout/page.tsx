"use client";
import { useCart } from "@/context/CartContext";
import { useState, FormEvent, ChangeEvent } from "react";
import { useAction } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import HeroSection from "@/components/layout/HeroSection";
import GoBackLink from "@/components/Shared/GoBAckLink";
import CheckOutForm from "@/components/Checkout/CheckOutForm";

export interface FormData {
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

export type PaymentMethod = "e-money" | "cash";

export default function CheckoutPage() {
	const { cart, getCartTotal, clearCart, sessionId } = useCart();
	const router = useRouter();
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("e-money");
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [orderNumber, setOrderNumber] = useState<string>("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
	// Basic validation before submission
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Enter a valid email address";
		if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
		if (!formData.address.trim()) newErrors.address = "Address is required";
		if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";
		if (!formData.city.trim()) newErrors.city = "City is required";
		if (!formData.country.trim()) newErrors.country = "Country is required";

		if (paymentMethod === "e-money") {
			if (!formData.eMoneyNumber.trim())
				newErrors.eMoneyNumber = "e-Money number is required";
			if (!formData.eMoneyPin.trim())
				newErrors.eMoneyPin = "e-Money PIN is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValid = validateForm();
		if (!isValid) return;  // Stop here if validation fails

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
		setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
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
					<GoBackLink />
					<CheckOutForm
						formData={formData}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
						vat={vat}
						subtotal={subtotal}
						grandTotal={grandTotal}
						cart={cart}
						isProcessing={isProcessing}
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
						shipping={shipping}
						errors={errors}
					/>
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
