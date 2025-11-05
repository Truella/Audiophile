'use client'
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CategoryProductContainer({
	name,
	description,
	newTag,
	image,
	slug,
	price,
	product
}) {
	const { addToCart } = useCart();
	return (
		<div
			className={`w-full max-w-[1110px] flex flex-col md:gap-[50px] md:flex-row justify-between items-center overflow-hidden  `}
		>
			<div className="lg:w-[540px] md:min-w-[230px] md:h-[480px] lg:h-[560px] bg-off-white flex justify-center items-center">
				<Image src={image} alt={slug} width={500} height={200} />{" "}
			</div>
			<div className="w-full lg:w-[445px] h-auto">
				{newTag && <p className="text-primary text-overline">NEW PRODUCT</p>}

				<h1 className="text-h4  lg:hidden mt-[17px]">{name}</h1>
				<h1 className="text-h1  hidden lg:block">{name}</h1>
				<p className="text-black/50 text-body my-8">{description}</p>
				<p className="">${price}</p>
				<div className=" flex gap-4 items-center mt-12">
					<div className="bg-off-white w-[120px] flex  gap-5 justify-around items-center h-12">
						<span className="cursor-pointer">
							<Minus size={14} color="gray" />
						</span>{" "}
						<span>1</span>{" "}
						<span className="cursor-pointer">
							<Plus size={14} color="gray" />
						</span>
					</div>
					<button
						className="bg-primary hover:bg-primary-light text-white text-subtitle w-40 py-3 cursor-pointer transition-all duration-300 ease-in"
						onClick={() => addToCart(product)}
					>
						ADD TO CART
					</button>
				</div>
			</div>
		</div>
	);
}
