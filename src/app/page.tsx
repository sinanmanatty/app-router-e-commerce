import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error("API failed with status:", res.status);
      return [];
    }

    const text = await res.text();

    if (!text) {
      console.error("Empty API response");
      return [];
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Fetch crashed:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Hero />

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight">
            Featured Products
          </h2>

          {featuredProducts.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}