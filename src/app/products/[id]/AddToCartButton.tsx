"use client";

import { useState } from "react";
import { useCart } from "../../../context/cartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setLoading(true);

    setTimeout(() => {
      addToCart(product);
      setLoading(false);
      setAdded(true);

      setTimeout(() => setAdded(false), 2000);
    }, 500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`mt-6 w-full py-3 rounded-xl font-semibold transition 
        ${
          added
            ? "bg-green-500 text-white"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {loading
        ? "Adding..."
        : added
        ? "✓ Added to Cart"
        : "Add to Cart"}
    </button>
  );
}