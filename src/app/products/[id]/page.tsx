export const dynamic = "force-dynamic";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store"
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// ✅ FIXED - No async
function AddToCartSection({ product }: { product: any }) {
  return (
    <div className="mt-6">
      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-semibold">
        Add to Cart
      </button>
    </div>
  );
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
      <div className="min-h-screen flex items-center justify-center p-10 text-center">
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
      {/* Your JSX stays exactly the same */}
      <AddToCartSection product={product} />
    </section>
  );
}
