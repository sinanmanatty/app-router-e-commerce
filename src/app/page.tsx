// app/page.tsx
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: { rate: number; count: number };
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=8", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  return data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    price: p.price * 83, // convert to INR
    image: p.thumbnail,
    description: p.description,
    category: p.category,
    rating: { rate: p.rating, count: p.stock },
  }));
}

function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border"
    >
      {/* Image */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center p-6">
        <Image
          src={product.image}
          alt={product.title}
          width={250}
          height={192}
          className="h-48 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-yellow-500">
            {"⭐".repeat(Math.round(product.rating?.rate || 0))}
          </span>
          <span>
            {product.rating?.rate?.toFixed(1)} ({product.rating?.count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.price)}
          </span>

          <span className="text-sm line-through text-gray-400">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.price * 1.2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Products
            </h2>

            <Link
              href="/products"
              className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-black"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile Button */}
          <div className="mt-16 text-center md:hidden">
            <Link
              href="/products"
              className="inline-block bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition font-semibold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}