'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, FlipHorizontal, Loader2, Download, Mail, RotateCcw, Settings, Upload, Type, Frame, X } from 'lucide-react';

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
    setCurrentStep('welcome');
    setIsCapturing(false);
  };

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setCurrentStep('settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'welcome' && (
          <WelcomeScreen onStart={() => setCurrentStep('email')} />
        )}
        
        {currentStep === 'email' && (
          <EmailEntryScreen onSubmit={handleEmailSubmit} onBack={() => setCurrentStep('welcome')} />
        )}
        
        {currentStep === 'settings' && (
          <SettingsPanel 
            settings={settings} 
            setSettings={setSettings} 
            userEmail={userEmail}
            onStart={() => setCurrentStep('camera')}
            onBack={() => setCurrentStep('email')} 
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
  );
}

// Welcome Screen Component
function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl font-bold mb-4 animate-pulse">📸 Photobooth</h1>
        <p className="text-2xl mb-8 text-white/90">
          Capture your perfect moments in 4 classic photos!
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="bg-white text-violet-600 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Start Photo Session
          </button>
        </div>
        
        <div className="mt-12 text-white/70 text-sm space-y-2">
          <p>✨ 4 photos in classic strip format</p>
          <p>🎨 Customizable borders and text</p>
          <p>📧 Instant email delivery</p>
          <p>🖼️ Upload your own border image</p>
        </div>
      </div>
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
      handwritten: 'font-mono italic'
    };
    return fontMap[style] || 'font-sans';
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Customize Your Photobooth</h2>
        <p className="text-gray-600 mt-1">Photos will be sent to: <strong>{userEmail}</strong></p>
      </div>
      
      <div className="space-y-6">
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
            <div className="space-y-3">
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">Border Preview:</span>
                  <button
                    onClick={removeBorder}
                    className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg max-h-80 overflow-auto flex justify-center">
                  <img 
                    src={previewBorder} 
                    alt="Border preview" 
                    className="max-h-72 object-contain"
                  />
                </div>
              </div>
              
              {/* Preview with sample photos */}
              <div className="border-2 border-violet-200 rounded-lg p-4 bg-violet-50">
                <p className="text-xs text-violet-700 font-medium mb-2">Preview with photos:</p>
                <div className="flex justify-center">
                  <div className="relative inline-block scale-50 origin-top">
                    {/* Left border */}
                    <img 
                      src={previewBorder} 
                      alt="Left Border" 
                      className="absolute left-0 top-0 bottom-0 w-24 h-full object-cover pointer-events-none z-10"
                      style={{ objectPosition: 'left center' }}
                    />
                    {/* Right border */}
                    <img 
                      src={previewBorder} 
                      alt="Right Border" 
                      className="absolute right-0 top-0 bottom-0 w-24 h-full object-cover pointer-events-none z-10"
                      style={{ objectPosition: 'right center' }}
                    />
                    <div className="bg-white p-6 relative">
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-80 aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-4xl">Photo {i}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center bg-white relative z-20">
                        <p className="text-sm text-gray-800 font-medium">Your Custom Text</p>
                        <p className="text-xs text-gray-600">Date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              { value: 'handwritten', label: 'Handwritten', preview: 'Aa' }
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
                { value: 'minimal', label: 'Minimal' }
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
          <div className="bg-gradient-to-br from-violet-50 to-pink-50 p-6 rounded-lg">
            <div className="flex justify-center">
              <div className="scale-[0.35] origin-top">
                <PhotoStrip 
                  photos={[
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EPhoto 1%3C/text%3E%3C/svg%3E',
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EPhoto 2%3C/text%3E%3C/svg%3E',
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EPhoto 3%3C/text%3E%3C/svg%3E',
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EPhoto 4%3C/text%3E%3C/svg%3E'
                  ]} 
                  settings={settings} 
                />
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              This is how your photo strip will look
            </p>
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
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.save();
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(video, 0, 0);
    ctx.restore();
    
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);
    
    return canvas.toDataURL('image/jpeg', 0.9);
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
      <div className="grid lg:grid-cols-[1fr,300px] gap-6">
        <div className="relative">
          <div className="relative aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
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
            
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                Photo {currentPhotoIndex + 1} of 4
              </span>
            </div>
            
            <button
              onClick={() => setIsMirrored(!isMirrored)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex justify-center gap-4">
            {!sessionStarted ? (
              <button
                onClick={handleStartSession}
                disabled={isLoading}
                className="bg-white text-violet-600 px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              >
                <Camera className="w-6 h-6" />
                Take Photos
              </button>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-medium">
                <Camera className="w-6 h-6 inline mr-2" />
                {isCapturing ? (showGetReady ? 'Get Ready...' : `${countdown}`) : 'Next photo in 2 seconds...'}
              </div>
            )}
            
            {photos.length > 0 && (
              <button
                onClick={onReset}
                className="bg-white/20 text-white px-6 py-4 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Start Over
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Photos Taken</h3>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className={`aspect-square rounded-lg overflow-hidden ${
                  photos[index] ? 'bg-gray-200' : 'bg-gray-100 border-2 border-dashed border-gray-300'
                }`}
              >
                {photos[index] ? (
                  <img src={photos[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
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
    handwritten: 'font-mono italic'
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
    }
  };

  const config = borderConfigs[settings.borderStyle] || borderConfigs.classic;

  return (
    <div className="relative inline-block">
      {settings.borderImage ? (
        <div className="bg-white shadow-2xl relative overflow-hidden" style={{ width: '450px' }}>
          {/* Left border */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${settings.borderImage})` }}
          />
          {/* Right border */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${settings.borderImage})` }}
          />
          
          <div className="relative z-0 px-20 py-6">
            <div className="space-y-3">
              {photos.map((photo, index) => (
                <div key={index} className="w-full aspect-square overflow-hidden bg-gray-100 rounded">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className={`mt-4 text-center ${fontStyles[settings.fontStyle]} bg-white relative z-20 py-2`}>
              <p className="text-sm text-gray-800 font-medium">
                {settings.customText}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={config.wrapper}>
          <div className={config.inner} style={{ width: '450px' }}>
            <div className="space-y-3 p-6">
              {photos.map((photo, index) => (
                <div key={index} className="aspect-square w-full overflow-hidden bg-gray-100 rounded">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className={`pb-6 text-center ${fontStyles[settings.fontStyle]} ${config.textColor}`}>
              <p className="text-sm font-medium">
                {settings.customText}
              </p>
              <p className="text-xs mt-1 opacity-80">
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

    // Create a canvas combining all photos
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions for photo strip
    const stripWidth = 450;
    const photoSize = 310; // Width of each photo area (450 - 2*70 for borders)
    const borderWidth = 70;
    const padding = 24;
    const spacing = 12;
    const textHeight = 80;
    
    canvas.width = stripWidth;
    canvas.height = (photoSize * 4) + (spacing * 3) + padding * 2 + textHeight;
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw borders if custom border exists
    if (settings.borderImage) {
      const borderImg = new Image();
      borderImg.crossOrigin = 'anonymous';
      borderImg.onload = () => {
        // Left border
        ctx.drawImage(borderImg, 0, 0, borderWidth, canvas.height);
        // Right border
        ctx.drawImage(borderImg, canvas.width - borderWidth, 0, borderWidth, canvas.height);
        
        // Continue with photos
        drawPhotos();
      };
      borderImg.src = settings.borderImage;
    } else {
      // Draw default border style background
      drawDefaultBorder();
      drawPhotos();
    }
    
    function drawDefaultBorder() {
      // Apply gradient or solid color based on border style
      const style = settings.borderStyle;
      if (style === 'modern' || style === 'film') {
        ctx.fillStyle = '#1f2937';
      } else if (style === 'retro') {
        ctx.fillStyle = '#fef3c7';
      } else {
        ctx.fillStyle = '#f3f4f6';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawPhotos() {
      let loadedCount = 0;
      const xOffset = borderWidth + padding;
      
      photos.forEach((photoData, index) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const y = padding + (index * (photoSize + spacing));
          ctx.drawImage(img, xOffset, y, photoSize, photoSize);
          loadedCount++;
          
          if (loadedCount === photos.length) {
            // Add text at bottom
            const textColor = settings.borderStyle === 'modern' || settings.borderStyle === 'film' ? '#ffffff' : '#000000';
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.font = 'bold 18px Arial';
            ctx.fillText(settings.customText, canvas.width / 2, canvas.height - 45);
            ctx.font = '14px Arial';
            ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 20);
            
            // Download
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `photobooth-strip-${Date.now()}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              } else {
                alert('Download failed. Please try again.');
              }
            }, 'image/png');
          }
        };
        img.onerror = () => {
          alert('Failed to load photos. Please try again.');
        };
        img.src = photoData;
      });
    }
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">All Done!</h2>
          <p className="text-gray-600">
            Your amazing photo strip is ready!
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div ref={stripRef}>
            <PhotoStrip photos={photos} settings={settings} />
          </div>
        </div>
        
        <div className="max-w-md mx-auto space-y-4">
          {!emailSent ? (
            <>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="w-full bg-violet-600 text-white px-6 py-4 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg font-medium"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending to {userEmail}...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send to {userEmail}
                  </>
                )}
              </button>
              
              <button
                onClick={handleDownload}
                className="w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>
            </>
          ) : (
            <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <p className="text-green-800 font-medium">
                ✓ Photos sent to {userEmail}!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Check your inbox in a few minutes
              </p>
            </div>
          )}
          
          <button
            onClick={onRestart}
            className="w-full text-gray-600 hover:text-gray-800 py-3"
          >
            Start New Session
          </button>
        </div>
      </div>
    </div>
  );
}