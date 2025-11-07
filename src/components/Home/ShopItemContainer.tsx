import Image from "next/image";
import React from "react";

export default function ShopItemContainer({ imgUrl, text }) {
	return (
		<div className=" max-w-[327px] h-[165px] lg:w-[350px] lg:h-[204px] bg-off-white relative lg:my-[200px] rounded-lg flex flex-col items-center justify-end p-[30px] gap-[15px]">
			<div>
				<Image
					src={`/assets/shared/${imgUrl}`}
					alt="Product Image"
					width={50}
					height={50}
					className="absolute top-0 p-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] lg:w-[125px] h-auto"
				/>
				<Image
					src={"/assets/shared/shadow-1.png"}
					width={200}
					height={100}
					alt="drop shadow"
					className="relative lg:top-8 top-5"
				/>
			</div>
			<h6 className="text-h6">{text}</h6>
			<p className="text-bold text-[13px] flex justify-center items-center gap-2">
				<span className="text-black/50 text-subtitle hover:text-primary transition-all duration-300 ease-in cursor-pointer">SHOP</span>{" "}
				<span>
					<img src="/assets/shared/desktop/icon-arrow-right.svg" alt="" />
				</span>
			</p>
		</div>
	);
}
