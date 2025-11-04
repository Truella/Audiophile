import CategoryHero from "@/components/Category/CategoryHero";
import HeroSection from "@/components/layout/HeroSection";
import About from "@/components/Shared/About";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
import CategoryProductContainer from "@/components/Shared/CategoryProductContainer";
import { getProductsByCategory } from "@/lib/retrieveDateHelpers";
import React from "react";

export default function Earphones() {
	const EARPHONES = getProductsByCategory("earphones");
	return (
		<>
			<HeroSection>
				<CategoryHero text={"EARPHONES"} />
			</HeroSection>
			<section className="max-w-[1110px] mx-auto">
				{EARPHONES.reverse().map((earphone, index) => (
					<CategoryProductContainer
						key={earphone.id}
						name={earphone.name}
						description={earphone.description}
						newTag={earphone.new}
						reverse={index % 2 !== 0}
						image={earphone.image.desktop}
						slug={earphone.slug}
						category={earphone.category}
					/>
				))}
				<CategoryDisplaySection />
				<About />
			</section>
		</>
	);
}
