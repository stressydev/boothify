'use client';

import Navbar from '@/components/NavBar';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 flex flex-col">
      <Navbar onNavigateHome={() => (window.location.href = '/')} />

      <div className="flex-1 container mx-auto px-4 py-8 mt-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h1>

          <p className="text-gray-700 text-center mb-8">
            Have a question, feedback, or need help with your photobooth
            experience? Send us a message and we’ll get back to you shortly.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}
