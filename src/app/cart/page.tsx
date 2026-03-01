"use client";

import { useCart } from "../../context/cartContext";

export default function Cart() {
  const {
    cart,
    totalPrice,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Your Shopping Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white shadow-xl rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">

            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-2xl p-6 flex gap-6 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-contain bg-gray-100 rounded-xl p-2"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-gray-700 mb-2">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 mb-3">
                      ₹ {item.price}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-200 transition"
                        >
                          −
                        </button>

                        <span className="px-4 font-medium text-gray-600">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold text-lg text-gray-600">
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 h-fit sticky top-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-700">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-6 text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6 text-gray-700">
                <span>Total</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-4 bg-red-400 text-gray-800 py-3 rounded-xl hover:bg-red-500 transition"
              >
                Clear Cart
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}