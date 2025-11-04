import React, { ReactNode } from "react";
import Header from "./Header";

interface HeroSectionProps {
	children?: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
	return (
		<section className="bg-dark2 text-white min-h-[97px]">
			<Header />
			<div>{children}</div>
		</section>
	);
}
