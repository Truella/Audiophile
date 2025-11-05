import { getAllProducts, getProductBySlug } from "@/lib/retrieveDateHelpers";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import About from "@/components/Shared/About";
import CategoryProductContainer from "@/components/Shared/ProductDataWithPrice";
import HeroSection from "@/components/layout/HeroSection";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
import GoBackLink from "@/components/Shared/GoBAckLink";

export async function generateStaticParams() {
	const products = getAllProducts();

	return products.map((product) => ({
		category: product.category,
		slug: product.slug,
	}));
}

export default async function ProductDetails({ params }) {
	const { category, slug } = await params;
	const product = getProductBySlug(category, slug);

	if (!product) return notFound();

	return (
		<>
			<HeroSection></HeroSection>
			<div className="min-h-screen w-[80%] max-w-[1110px] mx-auto">
				{/* Back Navigation */}
				<GoBackLink path={category} />
				{/* Product Header Section */}
				<div className="mt-6 lg:mt-14">
					<CategoryProductContainer
						name={product.name}
						description={product.description}
						newTag={product.new}
						image={product.image.desktop}
						slug={slug}
						price={product.price}
						product={product}
					/>
				</div>

				{/* Features and In The Box Section */}
				<div className="mx-auto my-[120px]">
					<div className="flex gap-[125px] flex-col lg:flex-row">
						{/* Features */}
						<div className="max-w-[635px]">
							<h3 className="text-h3 uppercase mb-8">Features</h3>
							<div className="text-body text-black/50 leading-relaxed whitespace-pre-line">
								{product.features}
							</div>
						</div>

						{/* In The Box */}
						<div className=" md:flex md:gap-[164px] lg:block">
							<h2 className="text-h3 mb-8 uppercase">In The Box</h2>
							<ul className="space-y-2">
								{product.includes?.map((item, index) => (
									<li key={index} className="flex gap-4">
										<span className="text-orange-600 font-bold w-8">
											{item.quantity}x
										</span>
										<span className="text-body text-black/50">{item.item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Gallery Section */}
				{product.gallery && (
					<div className="not-sm:h-[756px] md:max-h-[592px] lg:h-[592px] md:h-[368px] mx-auto grid not-sm:grid-rows-4 not-sm:grid-cols-1 grid-cols-[1fr_57.5%] grid-rows-2 md:gap-[18px] gap-[30px]">
						<div className="overflow-hidden rounded-lg">
							<div className="relative aspect-square rounded-lg overflow-hidden">
								<Image
									src={product.gallery.first.desktop}
									alt="Gallery 1"
									fill
									className="object-cover"
								/>
							</div>
						</div>
						<div className="overflow-hidden row-span-2 ">
							<div className="relative w-full h-full rounded-lg overflow-hidden">
								<Image
									src={product.gallery.third.desktop}
									alt="Gallery 3"
									fill
									className="object-cover"
								/>
							</div>
						</div>
						<div className="overflow-hidden rounded-lg row-start-2 row-end-3">
							<div className="relative aspect-square rounded-lg overflow-hidden">
								<Image
									src={product.gallery.second.desktop}
									alt="Gallery 2"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				)}

				{/* You May Also Like Section */}
				{product.others && (
					<div className="my-[120px] mx-auto overflow-hidden">
						<h2 className="text-3xl font-bold uppercase text-center mb-12">
							You May Also Like
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{product.others.map((item) => (
								<div key={item.slug} className="text-center space-y-6">
									<div className="relative aspect-square bg-off-white rounded-lg overflow-hidden">
										<Image
											src={item.image.desktop}
											alt={item.name}
											fill
											className="object-contain p-8"
										/>
									</div>
									<h3 className="text-2xl font-bold uppercase">{item.name}</h3>
									<Link href={`/${category}/${item.slug}`}>
										<button className="bg-primary hover:bg-primary-light text-subtitle px-8 py-3 text-white uppercase tracking-wider transition-all duration-300 ease-in">
											See Product
										</button>
									</Link>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Bottom Category Navigation */}
				<CategoryDisplaySection />

				{/* Best Audio Gear Section */}
				<About />
			</div>
		</>
	);
}
