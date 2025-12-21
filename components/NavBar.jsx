'use client';

export default function Navbar({ onNavigateHome }) {
  return (
    <nav className="sticky top-4 z-50 flex justify-center">
      <div className="bg-white/90 backdrop-blur-md shadow-md rounded-full px-6 py-2 flex gap-6">
        <button
          onClick={onNavigateHome}
          className="text-gray-700 hover:text-violet-600 font-medium transition-colors"
        >
          Home
        </button>

        <a
          href="/privacy"
          className="text-gray-700 hover:text-violet-600 font-medium transition-colors"
        >
          Privacy
        </a>

        <a
          href="/faq"
          className="text-gray-700 hover:text-violet-600 font-medium transition-colors"
        >
          FAQ
        </a>

        <a
          href="/contact"
          className="text-gray-700 hover:text-violet-600 font-medium transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
