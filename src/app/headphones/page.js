import { getProductsByCategory } from "../../lib/retrieveDateHelpers";

export default function HeadphonesPage() {
	const headphones = getProductsByCategory("headphones");

	return (
		<div>
			<h1>Headphones</h1>
			{headphones.map((product) => (
                <hh1 key={product.id}>{product.name}</hh1>
			))}
		</div>
	);
}
