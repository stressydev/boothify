'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, FlipHorizontal, Loader2, Download, Mail, RotateCcw, Settings, Upload, Type, Frame, X } from 'lucide-react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
// Main App Component
export default function PhotoboothApp() {
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, email, settings, camera, complete
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [settings, setSettings] = useState({
    countdownSeconds: 3,
    borderImage: null,
    customText: 'Photo Booth Memories',
    fontStyle: 'modern',
    borderStyle: 'classic'
  });

  const handlePhotoTaken = (photoData) => {
    setPhotos(prev => [...prev, photoData]);
    setIsCapturing(false);
    
    if (photos.length + 1 < 4) {
      setCurrentPhotoIndex(prev => prev + 1);
    } else {
      setCurrentStep('complete');
    }
  };

  const resetSession = () => {
    setPhotos([]);
    setCurrentPhotoIndex(0);
    setCurrentStep('camera');
    setIsCapturing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-4">
        <Navbar onNavigateHome={() => setCurrentStep('welcome')} />

      <div className="container mx-auto px-2 py-2 mt-20 mb-10">
        {currentStep === 'welcome' && (
          <WelcomeScreen onStart={() => setCurrentStep('settings')} />
        )}
        
        {currentStep === 'settings' && (
          <SettingsPanel 
            settings={settings} 
            setSettings={setSettings} 
            userEmail={userEmail}
            onStart={() => setCurrentStep('camera')}
            onBack={() => setCurrentStep('welcome')} 
          />
        )}
        
        {currentStep === 'camera' && (
          <CameraView
            onPhotoTaken={handlePhotoTaken}
            countdownSeconds={settings.countdownSeconds}
            currentPhotoIndex={currentPhotoIndex}
            isCapturing={isCapturing}
            setIsCapturing={setIsCapturing}
            photos={photos}
            onReset={resetSession}
          />
        )}
        
        {currentStep === 'complete' && (
          <CompleteScreen 
            photos={photos} 
            settings={settings} 
            userEmail={userEmail}
            onRestart={resetSession} 
          />
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Welcome Screen Component
function WelcomeScreen({ onStart }) {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFeatures(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white pb-20">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Animated Badge */}
          <div className="inline-block mb-2 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2.5 border border-white/20">
              <span className="text-white font-semibold text-sm">📸 FREE Forever • No Sign-Up • Instant Download</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight animate-slide-up">
            <span className="block mb-2">Create Stunning</span>
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Photo Booth Strips
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
            Turn any moment into a classic 4-photo memory strip with <span className="font-bold text-cyan-300">Boothify</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 animate-fade-in-more-delayed">
            <button
              onClick={onStart}
              className="group bg-white text-cyan-600 px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Camera className="w-7 h-7" />
              Start Free Session
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-full text-xl font-semibold border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Explore Features
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto animate-fade-in-delayed">
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-cyan-300">100%</div>
              <div className="text-white/70 text-sm font-medium">Free Forever</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-cyan-300">4</div>
              <div className="text-white/70 text-sm font-medium">Perfect Photos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-cyan-300">∞</div>
              <div className="text-white/70 text-sm font-medium">Unlimited Strips</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Why Choose Boothify?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to create stunning photo strips, completely free
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Classic Photo Strips</h3>
              <p className="text-white/80 leading-relaxed">
                Capture 4 photos in the timeless photo strip format — perfect for events, parties, and cherished memories
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Custom Designs</h3>
              <p className="text-white/80 leading-relaxed">
                Personalize with stylish borders, custom text, and upload your own frame designs
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant Download</h3>
              <p className="text-white/80 leading-relaxed">
                Get your photo strip instantly — no waiting, no sign-up required, just pure fun
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">⏱️</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Perfect Timing</h3>
              <p className="text-white/80 leading-relaxed">
                Set your countdown timer and strike the perfect pose for every shot
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Preview</h3>
              <p className="text-white/80 leading-relaxed">
                See exactly how your photos will look with real-time camera preview
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">💯</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">100% Free</h3>
              <p className="text-white/80 leading-relaxed">
                No hidden costs, no subscriptions — completely free photobooth experience forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/80">
              Three simple steps to create your photo strip
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex-shrink-0 bg-white text-cyan-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3">Customize Your Style</h3>
                <p className="text-white/80 text-lg">
                  Choose your border design, add custom text, and set your countdown timer
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex-shrink-0 bg-white text-cyan-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                2
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3">Take Your Photos</h3>
                <p className="text-white/80 text-lg">
                  Capture 4 amazing photos with live preview and perfect timing
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex-shrink-0 bg-white text-cyan-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                3
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3">Download & Share</h3>
                <p className="text-white/80 text-lg">
                  Get your beautiful photo strip instantly and share with friends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/30">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Start capturing unforgettable moments right now — no sign-up, no payment, just pure photobooth fun!
          </p>
          <button
            onClick={onStart}
            className="group bg-white text-cyan-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 hover:bg-cyan-50"
          >
            <Camera className="w-7 h-7" />
            Start Your Free Session
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

// Email Entry Screen Component
function EmailEntryScreen({ onSubmit, onBack }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    onSubmit(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter Your Email</h2>
        <p className="text-gray-600 mb-6">We'll send your photos here when you're done!</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
          >
            Continue to Customization
          </button>
          
          <button
            onClick={onBack}
            className="w-full text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel({ settings, setSettings, userEmail, onStart, onBack }) {
  const fileInputRef = useRef(null);
  const [previewBorder, setPreviewBorder] = useState(null);

  const handleBorderUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings({...settings, borderImage: event.target.result});
        setPreviewBorder(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBorder = () => {
    setSettings({...settings, borderImage: null});
    setPreviewBorder(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFontClass = (style) => {
    const fontMap = {
      modern: 'font-sans',
      classic: 'font-serif',
      playful: 'font-mono',
      elegant: 'font-serif italic',
      bold: 'font-sans font-bold',
      handwritten: 'font-mono italic',
      retro: 'font-serif font-bold',
      minimal: 'font-sans font-light tracking-wide',
      comic: 'font-mono font-bold',
      fancy: 'font-serif italic font-semibold'
    };
    return fontMap[style] || 'font-sans';
  };

  const getBorderPreviewClass = (style) => {
    const borderMap = {
      classic: 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl rounded border-4 border-white',
      modern: 'bg-gradient-to-br from-gray-900 to-black shadow-xl rounded border-2 border-gray-700',
      retro: 'bg-gradient-to-br from-amber-200 to-yellow-100 shadow-xl rounded border-4 border-amber-100',
      polaroid: 'bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl rounded border-8 border-white',
      film: 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl rounded border-2 border-gray-700',
      minimal: 'bg-white shadow-lg rounded border border-gray-200',
      neon: 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 shadow-xl rounded border-2 border-pink-500',
      vintage: 'bg-gradient-to-br from-stone-300 to-amber-200 shadow-xl rounded border-4 border-amber-900/30',
      gradient: 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-xl rounded border-4 border-white'
    };
    return borderMap[style] || borderMap.classic;
  };

  const getBorderTextColor = (style) => {
    const colorMap = {
      classic: 'text-gray-800',
      modern: 'text-white',
      retro: 'text-amber-900',
      polaroid: 'text-gray-800',
      film: 'text-gray-300',
      minimal: 'text-gray-800',
      neon: 'text-pink-400',
      vintage: 'text-stone-800',
      gradient: 'text-gray-800'
    };
    return colorMap[style] || 'text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-6 border border-white/20">
        <h2 className="text-4xl font-bold text-white mb-3">⚙️ Customize Your Experience</h2>
        <p className="text-white/80 text-lg">Personalize your photo booth strip before taking photos</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Countdown Duration
          </label>
          <select
            value={settings.countdownSeconds}
            onChange={(e) => setSettings({...settings, countdownSeconds: parseInt(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
          >
            <option value={3}>3 seconds</option>
            <option value={5}>5 seconds</option>
            <option value={10}>10 seconds</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Frame className="w-4 h-4" />
            Custom Border Image (Optional)
          </label>
          <p className="text-xs text-gray-500 mb-3">
            📐 <strong>Recommended size:</strong> Vertical image for left/right borders<br/>
            The border will appear on the LEFT and RIGHT sides of your photo strip<br/>
            Max 5MB | PNG with transparency recommended for best results
          </p>
          
          {previewBorder ? (
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-medium">✓ Border uploaded</span>
                <button
                  onClick={removeBorder}
                  className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500">Your border is ready! See the preview at the bottom of this page.</p>
            </div>
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBorderUpload}
                className="hidden"
                id="border-upload"
              />
              <label
                htmlFor="border-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Click to upload border image</span>
              </label>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Bottom Text
          </label>
          <input
            type="text"
            value={settings.customText}
            onChange={(e) => setSettings({...settings, customText: e.target.value})}
            placeholder="Enter custom text for photo strip"
            maxLength={50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-xs text-gray-500 mt-1">{settings.customText.length}/50 characters</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'modern', label: 'Modern', preview: 'Aa' },
              { value: 'classic', label: 'Classic', preview: 'Aa' },
              { value: 'playful', label: 'Playful', preview: 'Aa' },
              { value: 'elegant', label: 'Elegant', preview: 'Aa' },
              { value: 'bold', label: 'Bold', preview: 'Aa' },
              { value: 'handwritten', label: 'Handwritten', preview: 'Aa' },
              { value: 'retro', label: 'Retro', preview: 'Aa' },
              { value: 'minimal', label: 'Minimal', preview: 'Aa' },
              { value: 'comic', label: 'Comic', preview: 'Aa' },
              { value: 'fancy', label: 'Fancy', preview: 'Aa' }
            ].map(style => (
              <button
                key={style.value}
                onClick={() => setSettings({...settings, fontStyle: style.value})}
                className={`px-4 py-3 border-2 rounded-lg ${
                  settings.fontStyle === style.value
                    ? 'border-violet-600 bg-violet-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-sm font-medium">{style.label}</div>
                <div className={`text-xs text-gray-500 mt-1 ${getFontClass(style.value)}`}>
                  {style.preview}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {!settings.borderImage && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Style (when no custom border)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'classic', label: 'Classic White' },
                { value: 'modern', label: 'Modern Black' },
                { value: 'retro', label: 'Retro Cream' },
                { value: 'polaroid', label: 'Polaroid' },
                { value: 'film', label: 'Film Strip' },
                { value: 'minimal', label: 'Minimal' },
                { value: 'neon', label: 'Neon Glow' },
                { value: 'vintage', label: 'Vintage' },
                { value: 'gradient', label: 'Gradient' }
              ].map(style => (
                <button
                  key={style.value}
                  onClick={() => setSettings({...settings, borderStyle: style.value})}
                  className={`px-4 py-3 border-2 rounded-lg ${
                    settings.borderStyle === style.value
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-sm font-medium">{style.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Live Preview Section */}
        <div className="border-t pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Frame className="w-4 h-4" />
            Preview
          </label>
          <div className="bg-gradient-to-br from-violet-50 to-pink-50 p-4 rounded-lg flex justify-center">
            <div className="w-[200px]">
              {settings.borderImage ? (
                <div className="bg-black shadow-xl rounded">
                  <div className="p-2">
                    <div className="space-y-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                          <div 
                            className="p-3"
                            style={{
                              backgroundImage: `url(${settings.borderImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">Photo {i}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-center text-white py-1">
                      <p className="text-[10px] font-medium">{settings.customText}</p>
                      <p className="text-[8px] opacity-80">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={getBorderPreviewClass(settings.borderStyle)}>
                  <div className="p-2">
                    <div className="space-y-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded">
                          <span className="text-gray-500 text-xs">Photo {i}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`mt-2 text-center py-1 ${getBorderTextColor(settings.borderStyle)}`}>
                      <p className="text-[10px] font-medium">{settings.customText}</p>
                      <p className="text-[8px]">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onStart}
          className="flex-1 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
        >
          Start Taking Photos →
        </button>
      </div>
    </div>
  );
}

// Camera View Component
function CameraView({ onPhotoTaken, countdownSeconds, currentPhotoIndex, isCapturing, setIsCapturing, photos, onReset }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [flashActive, setFlashActive] = useState(false);
  const [showGetReady, setShowGetReady] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setIsLoading(true);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Camera error:', err);
        alert('Unable to access camera. Please ensure you have granted camera permissions.');
        setIsLoading(false);
      }
    };

    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Desired aspect ratio (same as preview container)
    const targetAspect = 4 / 3;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoAspect = videoWidth / videoHeight;

    let sx, sy, sw, sh;

    if (videoAspect > targetAspect) {
      // Video is wider than target → crop sides
      sh = videoHeight;
      sw = sh * targetAspect;
      sx = (videoWidth - sw) / 2;
      sy = 0;
    } else {
      // Video is taller than target → crop top/bottom
      sw = videoWidth;
      sh = sw / targetAspect;
      sx = 0;
      sy = (videoHeight - sh) / 2;
    }

    // Output canvas size (matches preview ratio)
    canvas.width = 1200;
    canvas.height = 900;

    ctx.save();

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      video,
      sx, sy, sw, sh,          // source crop
      0, 0, canvas.width, canvas.height // destination
    );

    ctx.restore();

    // Flash effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);

    return canvas.toDataURL('image/jpeg', 0.92);
  }, [isMirrored]);


  const startCountdown = useCallback(() => {
    if (isCapturing) return;

    setIsCapturing(true);
    setShowGetReady(true);

    setTimeout(() => {
      setShowGetReady(false);
      setCountdown(countdownSeconds);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  }, [countdownSeconds, isCapturing, setIsCapturing]);


  // 🔔 Take photo when countdown reaches 0
useEffect(() => {
  if (countdown === 0 && isCapturing && !showGetReady) {
    const photo = capturePhoto();
    if (photo) {
      onPhotoTaken(photo);
    }

    setIsCapturing(false);
  }
}, [
  countdown,
  isCapturing,
  showGetReady,
  capturePhoto,
  onPhotoTaken,
  setIsCapturing
]);


  // Handle initial button click to start session
  const handleStartSession = () => {
    setSessionStarted(true);
    startCountdown();
  };

  // Auto-continue after each photo (except the first)
  useEffect(() => {
    if (sessionStarted && !isCapturing && photos.length > 0 && photos.length < 4) {
      // Wait 2 seconds between photos, then start next countdown
      const timer = setTimeout(() => {
        startCountdown();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [photos.length, isCapturing, sessionStarted, startCountdown]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">
          {photos.length === 0 ? 'Get Ready!' : `Photo ${photos.length}/4`}
        </h2>
        <p className="text-white/80 text-sm">Strike your best pose and smile! 📸</p>
      </div>

      {/* Main Content: Camera */}
      <div className="max-w-3xl mx-auto">
        
        {/* Camera Section - Left Side */}
        <div className="relative">
          <div className="relative aspect-[4/3] bg-gray-900 rounded-xl overflow-hidden shadow-xl border-2 border-white/20 max-w-xl mx-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              </div>
            )}
            
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isMirrored ? 'scale-x-[-1]' : ''}`}
            />
            
            <canvas ref={canvasRef} className="hidden" />
            
            {showGetReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                <div className="text-white text-7xl font-bold animate-pulse">
                  Get Ready! 📸
                </div>
              </div>
            )}
            
            {isCapturing && !showGetReady && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                <div className="text-white text-9xl font-bold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
            
            {flashActive && (
              <div className="absolute inset-0 bg-white z-30" />
            )}
            
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="text-white text-xs font-medium">
                Photo {currentPhotoIndex + 1} of 4
              </span>
            </div>
            
            <button
              onClick={() => setIsMirrored(!isMirrored)}
              className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <FlipHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4 flex justify-center gap-3">
            {!sessionStarted ? (
              <button
                onClick={handleStartSession}
                disabled={isLoading}
                className="bg-white text-cyan-600 px-6 py-3 rounded-full text-base font-medium shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Take Photos
              </button>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-medium">
                <Camera className="w-5 h-5 inline mr-2" />
                {isCapturing ? (showGetReady ? 'Get Ready...' : `${countdown}`) : 'Next photo in 2 seconds...'}
              </div>
            )}
            
            {photos.length > 0 && (
              <button
                onClick={onReset}
                className="bg-white/20 text-white px-5 py-3 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Photo Strip Component
function PhotoStrip({ photos, settings }) {
  const fontStyles = {
    modern: 'font-sans',
    classic: 'font-serif',
    playful: 'font-mono',
    elegant: 'font-serif italic',
    bold: 'font-sans font-bold',
    handwritten: 'font-mono italic',
    retro: 'font-serif font-bold',
    minimal: 'font-sans font-light tracking-wide',
    comic: 'font-mono font-bold',
    fancy: 'font-serif italic font-semibold'
  };

  const borderConfigs = {
    classic: {
      wrapper: 'bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-2xl',
      inner: 'bg-white border-8 border-white',
      textColor: 'text-gray-800'
    },
    modern: {
      wrapper: 'bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl',
      inner: 'bg-gray-800 border-4 border-gray-700',
      textColor: 'text-white'
    },
    retro: {
      wrapper: 'bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200 p-8 shadow-2xl',
      inner: 'bg-amber-50 border-8 border-amber-100',
      textColor: 'text-amber-900'
    },
    polaroid: {
      wrapper: 'bg-gradient-to-br from-slate-100 to-slate-200 p-6 shadow-2xl',
      inner: 'bg-white border-[16px] border-white border-b-[48px]',
      textColor: 'text-gray-800'
    },
    film: {
      wrapper: 'bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl',
      inner: 'bg-black border-4 border-gray-700',
      textColor: 'text-gray-300'
    },
    minimal: {
      wrapper: 'bg-gradient-to-br from-white to-gray-50 p-4 shadow-lg',
      inner: 'bg-white border-2 border-gray-200',
      textColor: 'text-gray-800'
    },
    neon: {
      wrapper: 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 p-8 shadow-2xl',
      inner: 'bg-black border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]',
      textColor: 'text-pink-400'
    },
    vintage: {
      wrapper: 'bg-gradient-to-br from-stone-300 via-amber-200 to-yellow-100 p-8 shadow-2xl',
      inner: 'bg-sepia border-8 border-amber-900/30',
      textColor: 'text-stone-800'
    },
    gradient: {
      wrapper: 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-8 shadow-2xl',
      inner: 'bg-white border-4 border-white',
      textColor: 'text-gray-800'
    }
  };

  const config = borderConfigs[settings.borderStyle] || borderConfigs.classic;

  return (
    <div className="relative inline-block">
      {settings.borderImage ? (
        <div className="bg-black shadow-2xl rounded-xl overflow-hidden" style={{ width: '100%', maxWidth: '280px' }}>
          <div className="p-3">
            <div className="space-y-2">
              {photos.map((photo, index) => (
                <div key={index}>
                  <div 
                    className="p-3 rounded-lg"
                    style={{
                      backgroundImage: `url(${settings.borderImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-md shadow-inner">
                      <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-3 text-center ${fontStyles[settings.fontStyle]} text-white py-2 border-t border-white/20`}>
              <p className="text-sm font-semibold">
                {settings.customText}
              </p>
              <p className="text-[10px] opacity-70 mt-0.5">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={config.wrapper + ' rounded-xl overflow-hidden'} style={{ width: '100%', maxWidth: '280px' }}>
          <div className={config.inner}>
            <div className="space-y-2 p-4">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-lg shadow-md">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className={`pb-3 text-center ${fontStyles[settings.fontStyle]} ${config.textColor} border-t border-gray-200/50 pt-2 px-4`}>
              <p className="text-sm font-semibold">
                {settings.customText}
              </p>
              <p className="text-[10px] mt-0.5 opacity-70">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Complete Screen Component
function CompleteScreen({ photos, settings, userEmail, onRestart }) {
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const stripRef = useRef(null);

    const handleDownload = () => {
    const stripElement = stripRef.current;
    if (!stripElement) {
      alert('Unable to generate download. Please try again.');
      return;
    }

    const SCALE = 3; // 3x higher resolution

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // New constants for border around each photo
    const STRIP_WIDTH = 450;
    const OUTER_PADDING = 24; // Black background padding
    const BORDER_THICKNESS = 24; // Border thickness around each photo
    const PHOTO_SPACING = 16; // Space between photos
    const TEXT_HEIGHT = 80;

    // Scale everything
    const stripWidth = STRIP_WIDTH * SCALE;
    const outerPadding = OUTER_PADDING * SCALE;
    const borderThickness = BORDER_THICKNESS * SCALE;
    const photoSpacing = PHOTO_SPACING * SCALE;
    const textHeight = TEXT_HEIGHT * SCALE;

    // Photo dimensions (4:3 aspect ratio)
    const photoWidth = (stripWidth - (outerPadding * 2));
    const photoHeight = photoWidth * (3 / 4);

    canvas.width = stripWidth;
    canvas.height =
      (photoHeight + borderThickness * 2) * photos.length +
      photoSpacing * (photos.length - 1) +
      outerPadding * 2 +
      textHeight;

    // Fill background (black for custom borders)
    ctx.fillStyle = settings.borderImage ? '#000000' : '#ffffff';
    ctx.fillRect(0, 0, stripWidth, canvas.height);

    const drawPhotos = () => {
      let loadedCount = 0;

      photos.forEach((photoData, index) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const yPosition = outerPadding + index * (photoHeight + borderThickness * 2 + photoSpacing);

          if (settings.borderImage) {
            // Draw border around photo
            const borderImg = new Image();
            borderImg.crossOrigin = 'anonymous';
            borderImg.onload = () => {
              // Draw border frame
              ctx.drawImage(
                borderImg,
                outerPadding,
                yPosition,
                photoWidth,
                photoHeight + borderThickness * 2
              );

              // Draw photo inside border
              ctx.drawImage(
                img,
                outerPadding + borderThickness,
                yPosition + borderThickness,
                photoWidth - borderThickness * 2,
                photoHeight
              );

              loadedCount++;
              if (loadedCount === photos.length) {
                finishDrawing();
              }
            };
            borderImg.src = settings.borderImage;
          } else {
            // Draw photo without custom border
            ctx.drawImage(
              img,
              outerPadding,
              yPosition,
              photoWidth,
              photoHeight
            );

            loadedCount++;
            if (loadedCount === photos.length) {
              finishDrawing();
            }
          }
        };

        img.onerror = () => {
          alert('Failed to load photos. Please try again.');
        };

        img.src = photoData;
      });
    };

    const finishDrawing = () => {
      // Draw text at bottom
      const textColor = settings.borderImage ? '#ffffff' : '#000000';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.font = `bold ${18 * SCALE}px Arial`;
      ctx.fillText(settings.customText, stripWidth / 2, canvas.height - 45 * SCALE);

      ctx.font = `${14 * SCALE}px Arial`;
      ctx.fillText(new Date().toLocaleDateString(), stripWidth / 2, canvas.height - 20 * SCALE);

      // Trigger download
      canvas.toBlob((blob) => {
        if (!blob) return alert('Download failed');

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `photobooth-strip-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    };

    drawPhotos();
  };


  const handleSendEmail = () => {
    setIsSending(true);
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setEmailSent(true);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <span className="text-4xl">✨</span>
          </div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-3">Perfect! All Photos Captured</h2>
        <p className="text-white/80 text-xl">
          Your awesome photo strip is ready to download and share!
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">📸 Your Photo Strip</h3>
          <div ref={stripRef} className="flex justify-center">
            <PhotoStrip photos={photos} settings={settings} />
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Download & Share</h3>
            
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-5 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg font-semibold mb-4"
            >
              <Download className="w-6 h-6" />
              Download Photo Strip
            </button>
            
            <button
              onClick={onRestart}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Create Another Strip
            </button>
          </div>
          
          {/* Tips */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="text-lg font-bold text-white mb-3">💡 Pro Tips</h4>
            <ul className="space-y-2 text-white/90 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-300 mt-0.5">•</span>
                <span>Save your photo strip to your device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-300 mt-0.5">•</span>
                <span>Share it on social media with friends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-300 mt-0.5">•</span>
                <span>Print it out for a keepsake</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-300 mt-0.5">•</span>
                <span>Create more strips - it's completely free!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}