import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  category: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.thumbnail,
      images: data.images || [],
      rating: data.rating,
      category: data.category,
    };
  } catch {
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const priceInINR = product.price * 83;

  return (
    <section className="bg-gray-50 min-h-screen py-14 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

        {/* LEFT - Images */}
        <div>
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[420px] object-contain"
              priority
            />
          </div>

          {product.images.length > 0 && (
            <div className="flex gap-4 mt-6 overflow-x-auto">
              {product.images.slice(0, 5).map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-xl bg-white shadow-md p-2 object-contain hover:ring-2 hover:ring-black transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Details */}
        <div className="space-y-8">

          {/* Category */}
          <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full capitalize">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="text-yellow-500 text-xl">
              {"⭐".repeat(Math.round(product.rating))}
            </div>
            <span className="text-gray-600 font-medium">
              {product.rating.toFixed(1)} Rating
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-black text-gray-900">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(priceInINR)}
            </span>

            <span className="text-lg line-through text-gray-400">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(priceInINR * 1.2)}
            </span>

            <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              20% OFF
            </span>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed text-lg">
            {product.description}
          </div>

          {/* Add to Cart */}
          <div className="pt-6 border-t">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: priceInINR,
                image: product.image,
              }}
            />
          </div>

          {/* Back Link */}
          <Link
            href="/products"
            className="inline-block text-gray-500 hover:text-black font-medium mt-6"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </section>
  );
}