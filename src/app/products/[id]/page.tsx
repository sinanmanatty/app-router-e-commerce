export const dynamic = "force-dynamic";

import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`API failed: ${res.status} for ID ${id}`);
      return null;
    }

    const text = await res.text();
    if (!text) return null;

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let id: string;
  
  try {
    const resolvedParams = await params;
    id = String(resolvedParams.id);
  } catch (error) {
    console.error("Params error:", error);
    id = "1"; // fallback
  }

  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500 min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <a href="/products" className="text-blue-500 hover:underline">
            ← Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <div className="grid md:grid-cols-2 gap-14">
          <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-8">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title || "Product"}
                className="h-96 w-full max-w-full object-contain"
              />
            ) : (
              <div className="h-96 w-full bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-500">
                <div className="w-32 h-32 bg-gray-300 rounded-lg mb-2" />
                No image available
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title || "Unnamed Product"}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>
            <p className="text-3xl font-bold text-green-600 mb-6">
              ₹{(Number(product.price) || 0).toLocaleString('en-IN')}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
