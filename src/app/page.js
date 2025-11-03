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
			<section className="min-w-[327px] w-[327px] md:w-[80%]  max-w-[1110px] mx-auto">
				<CategoryDisplaySection />
				<section className="bg-primary w-full h-[560px] overflow-hidden relative rounded-lg">
					<div className="w-[944px] h-[944px] rounded-[50%] border border-white flex justify-center items-center absolute right-[315px] -top-9">
						{" "}
					</div>
					<div className="w-[542px] h-[542px] rounded-[50%] left-[52px] top-[165px] border border-white flex justify-center items-center absolute">
						{" "}
					</div>
					<div className="w-[472px] h-[472px] rounded-[50%] border border-white absolute left-[87px] top-[200px]"></div>
					<div className="absolute left-[117.49px] h-[493px] top-[97px]">
						<Image src={"/assets/shared/zx9.png"} width={410.23} height={493} />
					</div>
					<div className=" w-[349px] h-[303px] absolute left-[670px] top-[133px]">
						<h1 className="text-h1 mb-6 text-white">ZX9 SPEAKER</h1>
						<p className="text-white/75">
							Upgrade to premium speakers that are phenomenally built to deliver
							truly remarkable sound.
						</p>
						<button className="bg-[#4C4C4C] w-40 py-3 mt-10 cursor-pointer text-white">
							SEE PRODUCT
						</button>
					</div>
				</section>
				<section className="bg-off-white h-80 my-12 relative overflow-hidden rounded-lg">
					<Image
						src={"/assets/home/desktop/image-speaker-zx7.jpg"}
						width={1110}
						height={320}
						className="hidden md:block"
						alt="Image of zx7 speaker"
					/>
					<Image
						src={"/assets/home/mobile/image-speaker-zx7.jpg"}
						width={375}
						height={380}
						alt="Image of zx7 speaker"
					/>
					<div className="absolute md:left-[95px] left-6 top-[101px]">
						<h4 className="text-h4">ZX7 SPEAKER</h4>
						<button className="hover:bg-black w-40 py-3 mt-8 cursor-pointer hover:text-white border border-dark2 transition-all duration-300 ease-in">
							SEE PRODUCT
						</button>
					</div>
				</section>
				<section className="w-full h-80 flex gap-[30px]">
					<div className="rounded-lg flex-1 overflow-hidden">
						<Image
							src={"/assets/home/desktop/image-earphones-yx1.jpg"}
							width={540}
							height={320}
						/>
					</div>
					<div className="bg-off-white rounded-lg flex-1 flex items-center">
						{" "}
						<div className="ml-[95px]">
							<h4 className="text-h4">YX1 EARPHONES</h4>
							<button className="bg-black w-40 py-3 mt-8 cursor-pointer text-white">
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
