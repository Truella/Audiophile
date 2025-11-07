'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackLink() {
	const router = useRouter()
	const handleClick =()=>{
		if (window.history.length > 1) {
			router.back()
		}else{
			router.push("/")
		}
	}
	return (
		<div className="mt-[33px] lg:mt-20">
			<button
			onClick={handleClick}
				className="text-black/50 transition-all duration-300 ease-in hover:text-gray-900 text-subtitle"
			>
				Go back
			</button>
		</div>
	);
}
