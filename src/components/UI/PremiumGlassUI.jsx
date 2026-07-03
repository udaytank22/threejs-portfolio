import React from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../../store/useStore';

export function PremiumGlassUI({ title, description, imagePath, isVisible, portIndex }) {
  const setIsDocked = useStore((state) => state.setIsDocked);
  const setDockedPortIndex = useStore((state) => state.setDockedPortIndex);

  if (!isVisible) return null;

  const handleUndock = (e) => {
    e.stopPropagation();
    setIsDocked(false);
    setDockedPortIndex(-1);
  };

  return (
    <Html position={[0, 8, 0]} center transform sprite zIndexRange={[100, 0]}>
      <div className="w-[800px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
           style={{
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
             animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
           }}>
        
        {/* Glass Header */}
        <div className="p-6 border-b border-white/10 bg-black/40">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Screenshot Content */}
        <div className="p-8 bg-black/20 flex justify-center">
          <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {imagePath ? (
              <img src={imagePath} alt={title} className="w-full max-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center text-white/50 text-xl font-medium bg-slate-900/50">
                Screenshot Placeholder
              </div>
            )}
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-black/40 flex justify-end items-center border-t border-white/10">
          <button 
            onClick={handleUndock}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            Continue Journey
          </button>
        </div>
        
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </Html>
  );
}
