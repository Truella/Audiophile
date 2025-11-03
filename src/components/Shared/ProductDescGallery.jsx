import React from "react";

export default function ProductDescGallery() {
	return (
		<div className="max-w-6xl mx-auto px-6 pb-16">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				<div className="md:col-span-2 space-y-4">
					<div className="relative aspect-square rounded-lg overflow-hidden">
						<Image
							src={product.gallery.first.desktop}
							alt="Gallery 1"
							fill
							className="object-cover"
						/>
					</div>
					<div className="relative aspect-square rounded-lg overflow-hidden">
						<Image
							src={product.gallery.second.desktop}
							alt="Gallery 2"
							fill
							className="object-cover"
						/>
					</div>
				</div>
				<div className="md:col-span-3 col-span-2">
					<div className="relative w-full h-full rounded-lg overflow-hidden">
						<Image
							src={product.gallery.third.desktop}
							alt="Gallery 3"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
