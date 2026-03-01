"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        
        <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
          Limited Time Offer
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Big Billion Sale 🔥
        </h1>

        <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl">
          Up to <span className="font-bold">50% OFF</span> on electronics, fashion,
          home essentials and more. Don’t miss out!
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/products"
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>

          <Link
            href="/products"
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Explore Deals
          </Link>
        </div>
      </div>
    </section>
  );
}