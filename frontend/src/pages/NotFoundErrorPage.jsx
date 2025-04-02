import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundErrorPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(10);
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);
  
  const getParallaxStyle = (strength = 20) => {
    return {
      transform: `translate(${mousePosition.x * strength}px, ${mousePosition.y * strength}px)`
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full opacity-20">
        <div className="w-full h-full bg-grid-pattern bg-black">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(to right, transparent 20px, rgba(40, 40, 200, 0.05) 20px), linear-gradient(to bottom, transparent 20px, rgba(40, 40, 200, 0.05) 20px)',
              backgroundSize: '40px 40px',
              animation: 'backgroundMove 20s linear infinite'
            }}
          />
        </div>
      </div>
      
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.2})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 15}s linear infinite`,
          }}
        />
      ))}
      
      <div 
        className={`relative z-10 max-w-3xl bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 shadow-2xl transition-all duration-300 ${glitchActive ? 'translate-x-1 -translate-y-1 scale-[1.01]' : ''}`}
      > 
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              <div 
                className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
                style={getParallaxStyle(10)}
              >
                404
              </div>
              <div 
                className="absolute top-0 left-0 text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 opacity-50"
                style={{
                  transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
                  filter: 'blur(8px)'
                }}
              >
                404
              </div>
            </div>
            
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full my-6" />
            
            <p 
              className="text-xl text-blue-100 text-center"
              style={getParallaxStyle(5)}
            >
              Page you are looking for is not found in this dimension.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg border border-gray-700 mb-8 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-sm ml-2">system.terminal</span>
            </div>
            
            <div className="p-4 font-mono text-sm">
              <p className="text-green-400">$ system.locate <span className="text-white">requested_page</span></p>
              <p className="text-red-400 mt-1">Error: Page not found in database</p>
              <p className="text-green-400 mt-1">$ system.suggest <span className="text-white">alternatives</span></p>
              <p className="text-blue-400 mt-1">Redirecting to home in {countdown} seconds...</p>
              <p className="mt-1 flex items-center">
                <span className="text-green-400 mr-1">$</span> 
                <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse" />
              </p>
            </div>
          </div>
          
          {/* Action buttons with hover effects */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate(-1)} 
              className="cursor-pointer group flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 transition-all duration-300 hover:bg-gray-700 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Go Back</span>
            </button>
            
            <button 
              onClick={() => window.location.reload()} 
              className="cursor-pointer group flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 transition-all duration-300 hover:bg-gray-700 hover:border-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/20"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-transform duration-300 group-hover:rotate-180"
              >
                <path d="M3 2v6h6" />
                <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
                <path d="M21 22v-6h-6" />
                <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
              </svg>
              <span>Retry</span>
            </button>
            
            <button 
              onClick={() => navigate('/')} 
              className="cursor-pointer group relative overflow-hidden px-6 py-3 rounded-lg text-white transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-xl transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home Page</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-10"
        viewBox="0 0 1440 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L80,0 L100,20 L160,20 L180,0 L240,0 L240,40 L200,40 L180,60 L100,60 L80,40 L0,40 Z"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
        />
        <circle cx="40" cy="20" r="6" fill="#4F46E5" />
        <circle cx="220" cy="20" r="6" fill="#4F46E5" />
        <circle cx="140" cy="40" r="6" fill="#4F46E5" />
        
        <path
          d="M320,0 L400,0 L420,20 L480,20 L500,0 L560,0 L560,40 L520,40 L500,60 L420,60 L400,40 L320,40 Z"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          transform="translate(100, 60)"
        />
        <circle cx="460" cy="80" r="6" fill="#8B5CF6" />
        <circle cx="640" cy="80" r="6" fill="#8B5CF6" />
        <circle cx="560" cy="100" r="6" fill="#8B5CF6" />
        
        <path
          d="M640,0 L720,0 L740,20 L800,20 L820,0 L880,0 L880,40 L840,40 L820,60 L740,60 L720,40 L640,40 Z"
          fill="none"
          stroke="#EC4899"
          strokeWidth="2"
          transform="translate(200, 120)"
        />
        <circle cx="980" cy="140" r="6" fill="#EC4899" />
        <circle cx="1160" cy="140" r="6" fill="#EC4899" />
        <circle cx="1080" cy="160" r="6" fill="#EC4899" />
        
        <path
          d="M960,0 L1040,0 L1060,20 L1120,20 L1140,0 L1200,0 L1200,40 L1160,40 L1140,60 L1060,60 L1040,40 L960,40 Z"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          transform="translate(100, 20)"
        />
        <circle cx="1100" cy="40" r="6" fill="#3B82F6" />
        <circle cx="1280" cy="40" r="6" fill="#3B82F6" />
        <circle cx="1200" cy="60" r="6" fill="#3B82F6" />
      </svg>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes backgroundMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>
    </div>
  );
};

export default NotFoundErrorPage;