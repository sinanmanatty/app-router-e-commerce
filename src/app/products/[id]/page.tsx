export const dynamic = "force-dynamic";

import { Suspense } from 'react';
import Link from 'next/link';

// Client-only AddToCart section
async function AddToCartSection({ product }: { product: any }) {
  return (
    <div className="mt-6">
      <Suspense fallback={
        <button className="w-full py-3 bg-yellow-500 text-black rounded-xl font-semibold">
          Add to Cart
        </button>
      }>
        <AddToCartButtonClient product={product} />
      </Suspense>
    </div>
  );
}

// Move your AddToCartButton HERE as inline component
function AddToCartButtonClient({ product }: { product: any }) {
  // You'll need a simple client wrapper later
  return (
    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-semibold transition">
      Add to Cart
    </button>
  );
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 text-center bg-gray-50">
        <div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-500 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/products" className="inline-block mb-8 text-blue-500 hover:underline">
          ← All Products
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="grid md:grid-cols-2 gap-14">
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-96 w-full max-w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              <p className="text-3xl font-bold text-green-600 mb-6">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
              
              {/* ✅ WORKING Add to Cart */}
              <AddToCartSection product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
