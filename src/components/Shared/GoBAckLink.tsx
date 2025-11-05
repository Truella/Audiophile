import Link from "next/link";
import React from "react";

type LinkProps ={
    path : string
}
export default function GoBackLink({ path}:LinkProps) {
	return (
		<div className="mt-[33px] lg:mt-20">
			<Link
				href={path}
				className="text-black/50 transition-all duration-300 ease-in hover:text-gray-900 text-subtitle"
			>
				Go back
			</Link>
		</div>
	);
}
