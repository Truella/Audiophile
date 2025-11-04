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
	category
}) {
	return (
		<div
			className={`max-w-[1110px] flex justify-between items-center my-40 rounded-lg overflow-hidden ${reverse ? "flex-row-reverse" : ""} `}
		>
			<div className="w-[540px] h-[560px] bg-off-white flex justify-center items-center">
				<Image src={image} alt={slug} width={500} height={200} />{" "}
			</div>
			<div className=" w-[445px] h-auto">
				{newTag && <p className="text-primary text-overline">NEW PRODUCT</p>}

				<h1 className="text-h1 mt-4">{name}</h1>
				<p className="text-black/50 text-body mt-8">{description}</p>
				<Link href={`/${category}/${slug}`}>
					<button className="bg-primary-light w-40 py-3 mt-10 cursor-pointer">
						SEE PRODUCT
					</button>
				</Link>
			</div>
		</div>
	);
}
