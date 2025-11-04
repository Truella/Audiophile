import React from "react";
import ShopItemContainer from "../Home/ShopItemContainer";
const SHOPITEMPROPS = [
	{ text: "HEADPHONES", url: "headphone-1.png" },
	{ text: "SPEAKERS", url: "speaker-1.png" },
	{ text: "EARPHONES", url: "earphone-1.png" },
];
export default function CategoryDisplaySection() {
	return (
		<section className="border my-[92px] lg:my-0 flex flex-col lg:flex-row shrink-0 justify-between gap-[30px] items-center">
			{SHOPITEMPROPS.map((item) => (
				<ShopItemContainer key={item.text} text={item.text} imgUrl={item.url} />
			))}
		</section>
	);
}
