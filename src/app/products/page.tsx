export const dynamic = "force-dynamic";

import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: { rate: number; count: number };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=20", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ✅ SIMPLE Server Component - NO CLIENT IMPORTS
function ProductCardSimple({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 text-center">
      <div className="h-64 flex items-center justify-center bg-gray-50 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-auto object-contain group-hover:scale-105 transition"
        />
      </div>
      <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{product.title}</h3>
      <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
    </Link>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">All Products</h1>
      
      {products.length === 0 ? (
        <p className="text-xl text-gray-500 text-center py-20">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
