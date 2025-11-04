// src/components/layout/Footer.jsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-black text-white h-[365px] py-[75px]">
			<div className="max-w-[1110px] mx-auto">
				{/* Logo */}
				<div className="flex justify-between items-center mb-9">
					<Link href="/" className="text-2xl font-bold">
						<Image
							src={"./assets/shared/desktop/logo.svg"}
							width={100}
							height={100}
							alt="logo"
						/>
					</Link>
					{/* Navigation */}
					<nav >
						<ul className="flex gap-[34px]">
							<li className="hover:text-primary transition-all duration-300 ease-in">
								<Link href="/">HOME</Link>
							</li>
							<li className="hover:text-primary transition-all duration-300 ease-in">
								<Link href="/headphones">HEADPHONES</Link>
							</li>
							<li className="hover:text-primary transition-all duration-300 ease-in">
								<Link href="/speakers">SPEAKERS</Link>
							</li>
							<li className="hover:text-primary transition-all duration-300 ease-in">
								<Link href="/earphones">EARPHONES</Link>
							</li>
						</ul>
					</nav>
				</div>

				{/* Description */}
				<p className="text-white/50  max-w-[540px] text-body mb-14">
					Audiophile is an all in one stop to fulfill your audio needs. We're a
					small team of music lovers and sound specialists who are devoted to
					helping you get the most out of personal audio.
				</p>

				{/* Copyright & Social */}
				<div className="flex justify-between items-center">
					<p className="text-white/50 text-body">Copyright 2024. All Rights Reserved</p>
					<div className="flex gap-4">
						<a href="#" className="hover:text-primary transition-all duration-300 ease-in">
							FB
						</a>
						<a href="#" className="hover:text-primary transition-all duration-300 ease-in">
							TW
						</a>
						<a href="#" className="hover:text-primary transition-all duration-300 ease-in">
							IG
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
