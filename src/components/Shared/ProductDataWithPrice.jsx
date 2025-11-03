import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CategoryProductContainer({
	name,
	description,
	newTag,
	image,
	slug,
}) {
	return (
		<div
			className={`max-w-[1110px] flex justify-between items-center my-40 rounded-lg overflow-hidden  `}
		>
			<div className="w-[540px] h-[560px] bg-off-white flex justify-center items-center">
				<Image src={image} alt={slug} width={500} height={200} />{" "}
			</div>
			<div className=" w-[445px] h-auto">
				{newTag && <p className="text-primary text-overline">NEW PRODUCT</p>}

				<h1 className="text-h1 mt-4">{name}</h1>
				<p className="text-black/50 text-body my-8">{description}</p>
                <p className="">$3000.5</p>
				<div className=" flex gap-4 items-center mt-12">
					<div className="bg-off-white w-[120px] flex  gap-5 justify-around items-center h-12">
						<span>
							<Minus size={14} color="gray"/>
						</span>{" "}
						<span>1</span>{" "}
						<span>
							<Plus size={14} color="gray"/>
						</span>
					</div>
					<button className="bg-primary hover:bg-primary-light text-white text-subtitle w-40 py-3 cursor-pointer transition-all duration-300 ease-in">
						ADD TO CART
					</button>
				</div>
			</div>
		</div>
	);
}
