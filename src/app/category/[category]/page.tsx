'use client'
import HeroSection from "@/components/layout/HeroSection";
import CategoryHero from "@/components/Category/CategoryHero";
import About from "@/components/Shared/About";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
import CategoryProductContainer from "@/components/Shared/CategoryProductContainer";
import GoBackLink from "@/components/Shared/GoBAckLink";
import { useParams } from "next/navigation";
import { getProductsByCategory } from "@/lib/retrieveDateHelpers";

export default function HeadphonesPage() {
    const {category} = useParams()
    const CATEGORYDATA = getProductsByCategory(category)
    return (
        <>
            <HeroSection>
                <CategoryHero text={category} />
            </HeroSection>
            <section className="w-[90%] max-w-[1110px] mx-auto">
                {CATEGORYDATA.reverse().map((category, index) => (
                    <CategoryProductContainer
                        key={category.id}
                        name={category.name}
                        description={category.description}
                        newTag={category.new}
                        reverse={index % 2 !== 0}
                        image={category.image}
                        slug={category.slug}
                        category={category.category}
                    />
                ))}
                <CategoryDisplaySection />
                <About />
            </section>
        </>
    );
}
