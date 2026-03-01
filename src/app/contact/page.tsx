"use client";

import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Submitted:", form);

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-gray-50 min-h-screen">

      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact ShopSy</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Have questions about your order or products? Our support team is here to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-semibold text-lg text-gray-600 mb-2">Email Support</h3>
            <p className="text-gray-600">support@shopsy.com</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-semibold text-lg text-gray-600 mb-2">Call Us</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="font-semibold text-lg text-gray-600 mb-2">Our Office</h3>
            <p className="text-gray-600">Kerala, India</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

          {submitted && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 text-center font-medium">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;