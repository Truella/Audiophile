import React from "react";

export default function CategoryHero({ text }) {
	return (
		<div className="h-[239px] max-w-[1110px] mx-auto bg-dark2 border-t border-t-white/20 flex justify-center items-center">
			<h2 className="text-h2">{text}</h2>
		</div>
	);
}
