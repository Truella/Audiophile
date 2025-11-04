"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { MenuIcon, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import CartButton from "../Cart/CartButton";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header
			className="px-4 lg:px-0 max-w-[1110px] min-h-[97px] mx-auto flex justify-between items-center sticky z-100 bg-dark2 top-0 left-0
		"
		>
			<div
				className="lg:hidden"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-label="Toggle menu"
			>
				{!isOpen ? <MenuIcon size={32} /> : <X size={32} />}
			</div>
			<Image
				src={"/assets/shared/desktop/logo.svg"}
				width={100}
				height={100}
			/>

			<Nav isOpen={isOpen} onClose={() => setIsOpen((prev) => !prev)} />
			<div>
				<CartButton/>
			</div>
		</header>
	);
}
