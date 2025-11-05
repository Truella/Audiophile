"use client";

import HeroSection from "@/components/layout/HeroSection";
import HomeHeroSection from "@/components/Home/HomeHeroSection";
import ShopItemContainer from "@/components/Home/ShopItemContainer";
import Image from "next/image";
import About from "@/components/Shared/About";
import CategoryDisplaySection from "@/components/Shared/CategoryDisplaySection";
export default function Home() {
	return (
		<section>
			<HeroSection>
				<HomeHeroSection />
			</HeroSection>
			<section className="min-w-[327px] w-[327px] md:w-[80%]  lg:w-[1110px] mx-auto">
				<CategoryDisplaySection />
				<section className="bg-primary  w-full h-[700px] flex flex-col lg:flex-row justify-center lg:gap-[138px] md:gap-16 items-center lg:h-[560px] overflow-hidden relative rounded-lg">
					<img
						src="/assets/home/desktop/pattern-circles.svg"
						alt="svg line image"
						className="absolute lg:right-[315px] lg:-top-9 z-5 md:-top-9 w-[944px]"
					/>
					<div className=" lg:h-[493px] md:h-[197px] z-50">
						<Image
							src={"/assets/home/desktop/image-speaker-zx9.png"}
							width={410.23}
							height={493}
							alt="zx9"
							className="hidden md:hidden lg:block relative top-10"
						/>
						<Image
							src={"/assets/home/tablet/image-speaker-zx9.png"}
							width={150.23}
							height={293}
							alt="zx9"
							className="hidden md:block lg:hidden"
						/>
						<Image
							src={"/assets/home/mobile/image-speaker-zx9.png"}
							width={100.23}
							height={493}
							alt="zx9"
							className="md:hidden"
						/>
					</div>
					<div className="px-4 w-[349px] h-[303px] z-50 text-center lg:text-left">
						<h1 className="text-h1 mb-6 text-white">ZX9 SPEAKER</h1>
						<p className="text-white/75">
							Upgrade to premium speakers that are phenomenally built to deliver
							truly remarkable sound.
						</p>
						<button className="transition-all duration-300 ease-in bg-dark2 hover:bg-[#4C4C4C] w-40 py-3 mt-10 cursor-pointer text-white">
							SEE PRODUCT
						</button>
					</div>
				</section>
				<section className="h-80 my-6 md:my-8 lg:my-12 relative overflow-hidden rounded-lg">
					<Image
						src={"/assets/home/desktop/image-speaker-zx7.jpg"}
						width={1110}
						height={320}
						className="hidden lg:block"
						alt="Image of zx7 speaker"
					/>
					<Image
						src={"/assets/home/tablet/image-speaker-zx7.jpg"}
						width={1110}
						height={320}
						className="hidden md:block lg:hidden h-full"
						alt="Image of zx7 speaker"
					/>

					<Image
						src={"/assets/home/mobile/image-speaker-zx7.jpg"}
						width={375}
						height={380}
						alt="Image of zx7 speaker"
						className="object-cover md:hidden h-full"
					/>
					<div className="absolute md:left-[95px] left-6 top-[101px]">
						<h4 className="text-h4">ZX7 SPEAKER</h4>
						<button className="hover:bg-black w-40 py-3 mt-8 cursor-pointer hover:text-white border border-dark2 transition-all duration-300 ease-in">
							SEE PRODUCT
						</button>
					</div>
				</section>
				<section className=" mx-auto md:w-full h-[424px]  md:h-[285px] flex flex-col md:flex-row gap-2 lg:gap-[30px] mb-[200px]">
					<div className="rounded-lg flex-1 overflow-hidden">
						<Image
							src={"/assets/home/desktop/image-earphones-yx1.jpg"}
							width={740}
							height={320}
							alt="image of earphone"
							className="object-contain hidden lg:block"
						/>
						<Image
							src={"/assets/home/mobile/earphone.png"}
							width={740}
							height={320}
							alt="image of earphone"
							className="object-cover h-full md:hidden"
						/>
						<Image
							src={"/assets/home/tablet/image-earphones-yx1.jpg"}
							width={740}
							height={320}
							alt="image of earphone"
							className="object-contain h-full hidden md:block lg:hidden"
						/>
					</div>
					<div className="bg-off-white rounded-lg flex-1 flex items-center">
						{" "}
						<div className="md:ml-[95px] ml-6">
							<h4 className="text-h4">YX1 EARPHONES</h4>
							<button className="hover:bg-black w-40 py-3 transition-all duration-300 ease-in mt-8 cursor-pointer border hover:text-white">
								SEE PRODUCT
							</button>
						</div>{" "}
					</div>
				</section>
				<About />
			</section>
		</section>
	);
}
