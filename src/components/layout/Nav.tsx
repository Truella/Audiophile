"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav({ isOpen, onClose }) {
	const pathname = usePathname();

	const navItems = [
		{ name: "HOME", path: "/" },
		{ name: "HEADPHONES", path: "/headphones" },
		{ name: "SPEAKERS", path: "/speakers" },
		{ name: "EARPHONES", path: "/earphones" },
	];

	const handleLinkClick = () => {
		if (onClose) onClose();
	};

	return (
		<>
			{/* Desktop Nav - Hidden on tablet/mobile */}
			<nav className="hidden lg:block">
				<ul className="w-[430px] flex justify-between items-center">
					{navItems.map((item) => (
						<li
							key={item.path}
							className="hover:text-primary transition-all duration-300 ease-in text-subtitle"
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

			{/* Mobile/Tablet Overlay */}
			<div
				className={`
					lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
					${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
				`}
				onClick={onClose}
			/>

			{/* Mobile/Tablet Menu */}
			<nav
				className={`
					lg:hidden fixed top-[90px] left-0 right-0 bg-dark z-50
					transition-transform duration-300 ease-in-out
					${isOpen ? "translate-y-0" : "-translate-y-[calc(100%+90px)]"}
				`}
			>
				<ul className="flex flex-col p-8">
					{navItems.map((item) => (
						<li
							key={item.path}
							className="border-b border-gray-200 last:border-0"
						>
							<Link
								href={item.path}
								onClick={handleLinkClick}
								className={`
									block py-4 text-lg font-bold tracking-wider
									hover:text-primary transition-all duration-300
									${pathname === item.path ? "text-primary" : ""}
								`}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
