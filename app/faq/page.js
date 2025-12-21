'use client';

import Navbar from '@/components/NavBar';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 flex flex-col">
      {/* Navbar */}
      <Navbar onNavigateHome={() => window.location.href = '/'} />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 mt-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h1>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">How do I take photos?</h2>
              <p className="text-gray-700">
                Click on the "Take Photos" button on the camera screen. You will have a countdown before each photo is captured. Four photos will automatically be taken in sequence.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Can I customize my photo strip?</h2>
              <p className="text-gray-700">
                Yes! You can choose a countdown duration, add custom text, select a font style, choose a default border style, or upload your own custom border image.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Are my photos saved on a server?</h2>
              <p className="text-gray-700">
                No. All photos are temporarily stored in your browser. Nothing is uploaded to our servers unless you choose to share it manually.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">How can I download my photo strip?</h2>
              <p className="text-gray-700">
                Once all four photos are taken, go to the completion screen and click "Download Now" to save your photo strip as a high-resolution PNG.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Can I retake photos?</h2>
              <p className="text-gray-700">
                Absolutely! On the camera screen, you can click "Start Over" at any time to reset the session and retake your photos.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Is this app free to use?</h2>
              <p className="text-gray-700">
                Yes, the Photobooth app is completely free. You can take photos and download your photo strip without any cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
