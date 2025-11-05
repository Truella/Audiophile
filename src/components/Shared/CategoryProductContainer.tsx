import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryProductContainer({
	reverse,
	name,
	description,
	newTag,
	image,
	slug,
	category,
}) {
	return (
		<div
			className={`     max-w-[1110px] gap-8 flex flex-col md:gap-13  lg:flex-row justify-between items-center my-40 rounded-lg overflow-hidden ${reverse ? "lg:flex-row-reverse" : ""} `}
		>
			<div className="w-[540px] not-sm:h-[327px] overflow-hidden      md:h-[325px] lg:h-[560px] bg-off-white flex justify-center items-center">
				<Image
					src={image.desktop}
					alt={slug}
					width={540}
					height={560}
					className="hidden lg:block w-[350px]"
				/>
				<Image
					src={image.tablet}
					alt={slug}
					width={689}
					height={352}
					className="hidden md:block lg:hidden w-[215px]"
				/>
				<Image
					src={image.mobile}
					alt={slug}
					width={500}
					height={200}
					className="not-sm:block md:hidden w-[220px]"
				/>{" "}
			</div>
			<div className="w-full md:w-[445px]      h-auto text-center lg:text-left">
				{newTag && <p className="text-primary text-overline">NEW PRODUCT</p>}

				<h1 className="text-h1-mobile  md:hidden mt-4">{name}</h1>
				<h1 className="hidden md:block text-h1 mt-4">{name}</h1>
				<p className="text-black/50 text-body mt-8">{description}</p>
				<Link href={`/${category}/${slug}`}>
					<button className="bg-primary transition-all text-white text-subtitle duration-300 ease-in hover:bg-primary-light w-40 py-3 mt-10 cursor-pointer">
						SEE PRODUCT
					</button>
				</Link>
			</div>
		</div>
	);
}
