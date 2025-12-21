'use client';
export default function Navbar({ onNavigateHome }) {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md  z-50 mx-auto max-w-md rounded-full">
      <div className="flex justify-center px-4 py-3">
        {/* Centered Navigation Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateHome}
            className="text-gray-700 hover:text-violet-600 font-semibold transition-colors px-4 py-2 rounded-full hover:bg-violet-50"
          >
            Home
          </button>
          <a
            href="/privacy"
            className="text-gray-700 hover:text-violet-600 font-semibold transition-colors px-4 py-2 rounded-full hover:bg-violet-50"
          >
            Privacy
          </a>
          <a
            href="/faq"
            className="text-gray-700 hover:text-violet-600 font-semibold transition-colors px-4 py-2 rounded-full hover:bg-violet-50"
          >
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
}
