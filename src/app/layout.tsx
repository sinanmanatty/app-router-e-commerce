import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/cartContext";
import Footer from "../components/Footer";

export const metadata = {
  title: "ShopSy - Modern E-commerce Store",
  description: "Buy the best products at amazing prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
