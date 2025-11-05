import HeroSection from "@/components/layout/HeroSection";
import { getProductsByCategory } from "../../lib/retrieveDateHelpers";
import CategoryHero from "@/components/Category/CategoryHero";
import About from "@/components/Shared/About";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
import CategoryProductContainer from "@/components/Shared/CategoryProductContainer";
import GoBackLink from "@/components/Shared/GoBAckLink";

export default function HeadphonesPage() {
	const HEADPHONES = getProductsByCategory("headphones");
	return (
		<>
			<HeroSection>
				<CategoryHero text={"HEADPHONES"} />
			</HeroSection>
			<section className="w-[90%] max-w-[1110px] mx-auto">
				<GoBackLink path="/" /> 
				{HEADPHONES.reverse().map((headphone, index) => (
					<CategoryProductContainer
						key={headphone.id}
						name={headphone.name}
						description={headphone.description}
						newTag={headphone.new}
						reverse={index % 2 !== 0}
						image={headphone.image}
						slug={headphone.slug}
						category={headphone.category}
					/>
				))}
				<CategoryDisplaySection />
				<About />
			</section>
		</>
	);
}
