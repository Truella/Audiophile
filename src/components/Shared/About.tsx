import Image from "next/image";
import React from "react";

export default function About() {
	return (
		<section className=" lg:min-w-[1110px] mx-auto my-[120px] md:my-24 lg:my-40 flex flex-col lg:flex-row-reverse      justify-between lg:gap-[125px] md:gap-[93px] gap-10 items-center ">
			<div className="lg:min-w-[540px] overflow-hidden rounded-lg">
				<Image
					src={"/assets/man.png"}
					alt={"Image of man"}
					width={540}
					height={588}
				/>
			</div>
			<div className="text-center lg:text-left    ">
				<h2 className="text-h4 text-center lg:text-left md:text-h2 mb-8">
					{" "}
					BRINGING YOU THE <span className="text-primary">BEST</span> AUDIO GEAR
				</h2>
				<p className="text-black/50 lg:w-[445px] md:w-[573px] text-body   ">
					Located at the heart of New York City, Audiophile is the premier store
					for high end headphones, earphones, speakers, and audio accessories.
					We have a large showroom and luxury demonstration rooms available for
					you to browse and experience a wide range of our products. Stop by our
					store to meet some of the fantastic people who make Audiophile the
					best place to buy your portable audio equipment.
				</p>
			</div>
		</section>
	);
}
