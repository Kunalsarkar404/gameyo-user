import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient Background - Cyan to Magenta */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #00FFFF 0%, #8A2BE2 50%, #FF00FF 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Main Logo Text */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wide">
          GAMEYO
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-16 font-light tracking-wide">
          Elevate Your Game
        </p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div 
            className="w-4 h-4 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0s', animationDuration: '1.5s' }}
          />
          <div 
            className="w-4 h-4 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}
          />
          <div 
            className="w-4 h-4 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}
          />
        </div>
      </div>
    </div>
  );
}