// components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/cartContext";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;// maps to API thumbnail
  rating?: { rate: number; count: number };
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const originalPrice = (product.price * 1.25).toFixed(2);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      <Link
        href={`/products/${product.id}`}
        className="p-6 bg-gray-50 flex items-center justify-center"
      >
        <Image
          src={
            product.image ||
            "/images/placeholder.jpg"
          }
          alt={product.title || "Product"}
          width={250}
          height={176}
          className="h-44 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </Link>

      <div className="p-5 flex flex-col grow">
        <Link href={`/products/${product.id}`}>
          <h2 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition">
            {product.title}
          </h2>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium text-gray-700">{product.rating.rate}</span>
            <span className="text-gray-500">({product.rating.count})</span>
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">₹ {product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹ {originalPrice}</span>
        </div>

        <div className="mt-auto pt-5 flex flex-col gap-3">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-xl transition active:scale-95"
          >
            Add to Cart
          </button>

          <Link
            href={`/products/${product.id}`}
            className="w-full text-center text-gray-400 border border-gray-500 hover:border-blue-600 hover:text-blue-600 py-2.5 rounded-xl transition font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}