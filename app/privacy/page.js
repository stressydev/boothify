'use client';

import Navbar from '@/components/NavBar';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 flex flex-col">
      {/* Navbar */}
      <Navbar onNavigateHome={() => window.location.href = '/'} />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 mt-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h1>
          
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This Privacy Policy explains how we handle any data while you use our Photobooth app.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            The Photobooth app does not collect personal information. The only data processed is:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Photos you take, which are temporarily stored in your browser to generate the photo strip.</li>
            <li>Technical information like browser type or device, used only for app functionality.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">How We Use Your Data</h2>
          <p className="text-gray-700 mb-4">
            Any data is used solely to provide the Photobooth experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Generating photo strips in your browser.</li>
            <li>Ensuring the app works correctly across devices and browsers.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Data Storage & Security</h2>
          <p className="text-gray-700 mb-4">
            All photos are stored temporarily in your browser and are not transmitted to any server. Standard security measures are applied by your browser to keep data safe while using the app.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">
            We do not share your photos or any data with third parties.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Your Consent</h2>
          <p className="text-gray-700 mb-4">
            By using the Photobooth app, you consent to the terms outlined in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at <strong>support@Boothify.app</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
