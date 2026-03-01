export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">About ShopSy</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Your trusted online shopping partner for quality products,
          unbeatable prices, and lightning-fast delivery.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            ShopSy is a modern e-commerce platform inspired by industry leaders.
            We bring you electronics, fashion, accessories, and daily essentials
            with a seamless and secure shopping experience.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Built with Next.js and modern technologies, ShopSy ensures speed,
            reliability, and smooth performance across all devices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
          <div className="bg-white shadow-md rounded-xl p-8">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">5K+</h3>
            <p className="text-gray-600">Products Available</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-8 rounded-xl text-center shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Reliable and quick delivery across the country with real-time tracking.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl text-center shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Safe checkout with multiple trusted payment methods.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl text-center shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Quality Products</h3>
            <p className="text-gray-600">
              Handpicked, top-rated products to ensure customer satisfaction.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Ready to Start Shopping?
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            Explore Products
          </button>
        </div>

      </div>
    </div>
  );
}