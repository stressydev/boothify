import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, FlipHorizontal, RotateCcw, Loader2 } from 'lucide-react';

export default function CameraView({ onPhotoTaken, countdownSeconds, currentPhotoIndex, isCapturing, setIsCapturing, photos, onReset }) {
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

    const targetAspect = 4 / 3;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoAspect = videoWidth / videoHeight;

    let sx, sy, sw, sh;

    if (videoAspect > targetAspect) {
      sh = videoHeight;
      sw = sh * targetAspect;
      sx = (videoWidth - sw) / 2;
      sy = 0;
    } else {
      sw = videoWidth;
      sh = sw / targetAspect;
      sx = 0;
      sy = (videoHeight - sh) / 2;
    }

    canvas.width = 1200;
    canvas.height = 900;

    ctx.save();

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    ctx.restore();

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