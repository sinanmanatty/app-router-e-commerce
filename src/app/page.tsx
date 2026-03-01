import Hero from "@/components/Hero";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
};

async function getProducts(): Promise<Product[]> {
  try {
    console.log('🌐 Home - Fetching products...');
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
      cache: 'no-store' // Force fresh data
    });
    
    console.log('✅ Home - Response status:', res.status);
    
    if (!res.ok) {
      console.error('❌ Home - API failed:', res.status);
      return [];
    }

    const data = await res.json();
    console.log('📦 Home - Products loaded:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('💥 Home - Fetch error:', error);
    return [];
  }
}


// ✅ PURE SERVER COMPONENT - No client imports
function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all">
      <div className="h-64 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-auto object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3">{product.title}</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{product.price}</p>
        <div className="text-sm text-gray-500">⭐ {product.rating?.rate || 'N/A'}</div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Hero />

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 tracking-tight">
            Featured Products
          </h2>

          {featuredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-20">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
