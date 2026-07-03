import React from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../../store/useStore';

export function HologramScreen({ imagePath, title, description, isVisible }) {
  if (!isVisible) return null;

  return (
    <Html transform occlude center position={[0, 4, 0]} className="pointer-events-none">
      <div className="w-[400px] p-6 rounded-2xl glass shadow-2xl flex flex-col gap-4" style={{
        background: 'rgba(20, 20, 30, 0.8)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 className="text-2xl font-bold text-white font-space">{title}</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        <div className="w-full h-[200px] bg-black/50 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center relative">
          {imagePath ? (
            <img src={imagePath} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 font-mono text-sm">Screenshot Placeholder</span>
          )}
        </div>
      </div>
    </Html>
  );
}
