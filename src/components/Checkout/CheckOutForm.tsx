import { FormData, PaymentMethod } from "@/app/checkout/page";
import { CartItem } from "@/context/CartContext";
import Image from "next/image";
import React from "react";
interface CheckOutFormProps {
	formData: FormData;
	paymentMethod: PaymentMethod;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setPaymentMethod: (value: PaymentMethod) => void;
	isProcessing: boolean;
	cart: CartItem[];
	shipping: number;
	vat: number;
	grandTotal: number;
	subtotal: number;
}

export default function CheckOutForm({
	formData,
	handleSubmit,
	handleInputChange,
	paymentMethod,
	setPaymentMethod,
	isProcessing,
	cart,
	shipping,
	vat,
	grandTotal,
	subtotal,
}:CheckOutFormProps) {
	return (
		<form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 mt-8">
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
							<label className="block text-xs font-bold mb-2">Address</label>
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
								<label className="block text-xs font-bold mb-2">ZIP Code</label>
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
								<label className="block text-xs font-bold mb-2">City</label>
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
								<label className="block text-xs font-bold mb-2">Country</label>
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
								<span className="text-sm font-bold">Cash on Delivery</span>
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
							The 'Cash on Delivery' option enables you to pay in cash when our
							delivery courier arrives at your residence. Just make sure your
							address is correct so that your order will not be cancelled.
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
							<div key={item.productId} className="flex items-center gap-4">
								<div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
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
							<span className="font-bold">$ {subtotal.toLocaleString()}</span>
						</div>

						<div className="flex justify-between text-sm">
							<span className="text-gray-600 uppercase">Shipping</span>
							<span className="font-bold">$ {shipping}</span>
						</div>

						<div className="flex justify-between text-sm">
							<span className="text-gray-600 uppercase">VAT (Included)</span>
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
	);
}
