"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopSy</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for electronics, fashion, and home essentials.
            Discover amazing deals every day.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="#" className="hover:text-white transition">Shipping</Link></li>
            <li><Link href="#" className="hover:text-white transition">Returns</Link></li>
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Get updates on new arrivals and special offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Facebook className="hover:text-white cursor-pointer transition" />
            <Instagram className="hover:text-white cursor-pointer transition" />
            <Twitter className="hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-sm">
        © {new Date().getFullYear()} ShopSy. All rights reserved.
      </div>
    </footer>
  );
}