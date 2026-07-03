import React from 'react';
import { useStore } from '../../store/useStore';
import { useKeyboardControls } from '@react-three/drei';

export default function HUD() {
  const started = useStore((state) => state.started);
  const setStarted = useStore((state) => state.setStarted);
  
  // Mobile virtual joystick could be implemented here

  if (started) {
    return (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="glass px-6 py-3 rounded-full text-white/50 text-sm font-mono flex items-center gap-4">
          <span>W/A/S/D to sail</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-1000">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white font-space tracking-tighter">
          MANIFEST
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-inter font-light">
          The AI Operating System for Global Trading
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 mt-8 font-inter shadow-2xl shadow-white/20"
        >
          Press to Begin
        </button>
      </div>
    </div>
  );
}
