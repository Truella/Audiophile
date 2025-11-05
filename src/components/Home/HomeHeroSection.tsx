import Image from "next/image";
import React from "react";

export default function HomeHeroSection() {
	return (
		<div className="h-[632px] max-w-[1110px] mx-auto border-t border-t-white/20 flex items-center lg:justify-between justify-center overflow-hidden relative">
			<div className="absolute not-sm:bottom-28  md:top-[100px] w-[328px] lg:static h-[290px] md:w-[382px] lg: md:h-[346px] z-30 lg:text-left text-center">
				<p className="text-white/50 text-overline mb-4">NEW PRODUCT</p>
				<h1 className="md:hidden text-h1-mobile text-bold leading-10  mb-6 lg:my-6">
					XX99 MARK II HEADPHONES
				</h1>
				<h1 className="hidden md:block text-h1 mb-6 lg:my-6">
					XX99 MARK II HEADPHONES
				</h1>
				<p className="text-white/75">
					Experience natural, lifelike audio and exceptional build quality made
					for passionate music enthusiast.
				</p>
				<button className="bg-primary w-40 py-3 mt-7 lg:mt-10 cursor-pointer transition-all duration-300 ease-in hover:bg-primary-light">
					SEE PRODUCT
				</button>
			</div>
			<div className="absolute right-0 bottom-6">
				<div className="w-full h-full bg-black/40 absolute lg:hidden"></div>
				<Image
					src={"/assets/home/desktop/Bitmap.svg"}
					width={709}
					height={886}
					alt="hero iamge"
					className="hidden lg:block"
				/>

				<Image
					src={"/assets/home/tablet/image-header.jpg"}
					width={709}
					height={886}
					alt="hero iamge"
					className=" hidden md:block lg:hidden w-full"
				/>
				<Image
					src={"/assets/home/mobile/image-header.jpg"}
					width={709}
					height={886}
					alt="hero iamge"
					className="md:hidden"
				/>
			</div>
		</div>
	);
}
