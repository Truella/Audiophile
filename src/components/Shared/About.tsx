import Image from "next/image";
import React from "react";

export default function About() {
	return (
		<section className="border my-[200px] flex justify-between gap-[125px] items-center">
			<div>
				<h2 className="text-h2 mb-8">
					{" "}
					BRINGING YOU THE <span className="text-primary">BEST</span> AUDIO GEAR
				</h2>
				<p className="text-black/50 w-[445px] text-body">
					Located at the heart of New York City, Audiophile is the premier store
					for high end headphones, earphones, speakers, and audio accessories.
					We have a large showroom and luxury demonstration rooms available for
					you to browse and experience a wide range of our products. Stop by our
					store to meet some of the fantastic people who make Audiophile the
					best place to buy your portable audio equipment.
				</p>
			</div>
			<div className="min-w-[540px] overflow-hidden rounded-lg"> 
				<Image src={"/assets/man.png"} alt={"Image of man"} width={540} height={588} />
			</div>
		</section>
	);
}
