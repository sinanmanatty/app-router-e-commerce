// app/products/page.tsx
import ProductCard, { Product } from "../../components/ProductCard";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=20", {
    cache: "no-store",
  });
  const data = await res.json();

  return data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.thumbnail,
    rating: { rate: p.rating, count: p.stock },
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}