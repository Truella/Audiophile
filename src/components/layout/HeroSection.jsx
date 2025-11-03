import React from "react";
import Header from "./Header";

export default function HeroSection({children}) {
	return (
		<section className="bg-dark2 text-white min-h-[97px]">
			<Header />
            <div>{children}</div>
		</section>
	);
}
