import CategoryHero from "@/components/Category/CategoryHero";
import HeroSection from "@/components/layout/HeroSection";
import About from "@/components/Shared/About";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
import CategoryProductContainer from "@/components/Shared/CategoryProductContainer";
import GoBackLink from "@/components/Shared/GoBAckLink";
import { getProductsByCategory } from "@/lib/retrieveDateHelpers";
import React from "react";

export default function Speakers() {
	const SPEAKERS = getProductsByCategory("speakers");
	return (
		<>
			<HeroSection>
				<CategoryHero text={"SPEAKERS"} />
			</HeroSection>
			<section className="w-[90%] max-w-[1110px] mx-auto">
				<GoBackLink path="/" /> 
				{SPEAKERS.reverse().map((speaker, index) => (
					<CategoryProductContainer
						key={speaker.id}
						name={speaker.name}
						description={speaker.description}
						newTag={speaker.new}
						reverse={index % 2 !== 0}
						image={speaker.image}
						slug={speaker.slug}
						category={speaker.category}
					/>
				))}
				<CategoryDisplaySection />
				<About />
			</section>
		</>
	);
}
