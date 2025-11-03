import {Manrope} from 'next/font/google'
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Providers from './Providers';
import CartModal from './cart/CartModal';
const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				<Providers>
					<main className="min-h-screen">{children}</main>
					<CartModal/>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
