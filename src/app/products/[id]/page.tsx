export const dynamic = "force-dynamic";

import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API failed: ${res.status} for ID ${id}`);
      return null;
    }

    const data = await res.json();
    return data; // ✅ Return data directly
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ params is now Promise
}) {
  const { id } = await params; // ✅ AWAIT params!
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found.
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
                className="h-96 object-contain max-w-full"
              />
            ) : (
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
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
              ₹{(product.price || 0).toLocaleString()}
            </p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
