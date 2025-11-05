'use client'
import { navItems } from "@/lib/data/navLinks";
import { usePathname } from "next/navigation";
import { FacebookIcon, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const pathname = usePathname()
	return (
		<footer className="bg-black text-white h-auto lg:h-[365px] py-[75px]">
			<div className="w-[80%] lg:max-w-[1110px] mx-auto text-center md:text-left  ">
				{/* Logo */}
				<div className="flex flex-col lg:flex-row justify-center md:justify-between items-center md:items-start md:gap-8 mb-9">
					<Link href="/" className="mb-12 md:mb-0  ">
						<Image
							src={"/assets/shared/desktop/logo.svg"}
							width={150}
							height={100}
							alt="audiophile logo"
						/>
					</Link>
					{/* Navigation */}
					<nav className=" ">
						<ul className="flex md:gap-[34px] gap-4 flex-col md:flex-row  ">
							{navItems.map((item) => ( 
								<li
									key={item.path}
									className="hover:text-primary transition-all   duration-300 ease-in text-subtitle"
								>
									<Link
										href={item.path}
										className={pathname === item.path ? "text-primary" : ""}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Description */}
				<p className="text-white/50 w-full  lg:max-w-[540px] text-body md:mb-14">
					Audiophile is an all in one stop to fulfill your audio needs. We're a
					small team of music lovers and sound specialists who are devoted to
					helping you get the most out of personal audio. Come and Visit our demo facility- we're open 7 days a week
				</p>

				{/* Copyright & Social */}
				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-white/50 text-body my-12 md:my-0">
						Copyright 2024. All Rights Reserved
					</p>
					<div className="flex gap-4  ">
						<a
							href="#"
							className="hover:text-primary transition-all duration-300 ease-in"
						>
							<FacebookIcon />
						</a>
						<a
							href="#"
							className="hover:text-primary transition-all duration-300 ease-in"
						>
							<Twitter />
						</a>
						<a
							href="#"
							className="hover:text-primary transition-all duration-300 ease-in"
						>
							<Instagram />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
