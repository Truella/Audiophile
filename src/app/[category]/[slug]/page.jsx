import { getAllProducts, getProductBySlug } from "@/lib/retrieveDateHelpers";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import About from "@/components/Shared/About";
import CategoryProductContainer from "@/components/Shared/ProductDataWithPrice";
import HeroSection from "@/components/layout/HeroSection";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";

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
			<div className="min-h-screen max-w-[1110px] mx-auto">
				{/* Back Navigation */}
				<div className="max-w-6xl mx-auto px-6 py-8">
					<Link
						href={`/${category}`}
						className="text-gray-600 hover:text-gray-900 text-sm"
					>
						Go back
					</Link>
				</div>

				{/* Product Header Section */}
				<div className="max-w-6xl mx-auto px-6 pb-16">
					<CategoryProductContainer
						name={product.name}
						description={product.description}
						newTag={product.new}
						image={product.image.desktop}
						slug={slug}
					/>
				</div>

				{/* Features and In The Box Section */}
				<div className="max-w-6xl mx-auto px-6 pb-16">
					<div className="grid md:grid-cols-5 gap-12">
						{/* Features */}
						<div className="md:col-span-3 space-y-6">
							<h2 className="text-3xl font-bold uppercase">Features</h2>
							<div className="text-gray-600 leading-relaxed whitespace-pre-line">
								{product.features}
							</div>
						</div>

						{/* In The Box */}
						<div className="md:col-span-2 space-y-6">
							<h2 className="text-3xl font-bold uppercase">In The Box</h2>
							<ul className="space-y-2">
								{product.includes?.map((item, index) => (
									<li key={index} className="flex gap-4">
										<span className="text-orange-600 font-bold w-8">
											{item.quantity}x
										</span>
										<span className="text-gray-600">{item.item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Gallery Section */}
				{product.gallery && (
					<div className="max-w-6xl mx-auto px-6 pb-16">
						<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
							<div className="md:col-span-2 space-y-4">
								<div className="relative aspect-square rounded-lg overflow-hidden">
									<Image
										src={product.gallery.first.desktop}
										alt="Gallery 1"
										fill
										className="object-cover"
									/>
								</div>
								<div className="relative aspect-square rounded-lg overflow-hidden">
									<Image
										src={product.gallery.second.desktop}
										alt="Gallery 2"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div className="md:col-span-3 col-span-2">
								<div className="relative w-full h-full rounded-lg overflow-hidden">
									<Image
										src={product.gallery.third.desktop}
										alt="Gallery 3"
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* You May Also Like Section */}
				{product.others && (
					<div className="max-w-6xl mx-auto px-6 pb-24">
						<h2 className="text-3xl font-bold uppercase text-center mb-12">
							You May Also Like
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{product.others.map((item) => (
								<div key={item.slug} className="text-center space-y-6">
									<div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
										<Image
											src={item.image.desktop}
											alt={item.name}
											fill
											className="object-contain p-8"
										/>
									</div>
									<h3 className="text-2xl font-bold uppercase">{item.name}</h3>
									<Link href={`/${category}/${item.slug}`}>
										<button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 font-bold uppercase tracking-wider transition">
											See Product
										</button>
									</Link>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Bottom Category Navigation */}
				<CategoryDisplaySection/>

				{/* Best Audio Gear Section */}
				<About />
			</div>
		</>
	);
}
