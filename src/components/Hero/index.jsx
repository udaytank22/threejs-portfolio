import { motion } from 'framer-motion';
import { EarthScene } from '../ThreeScene/EarthScene';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background 3D Earth */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <EarthScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-white/90">The AI Operating System for Global Trading</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-space font-bold tracking-tighter text-white mb-6 leading-[1.1]"
        >
          Trading & Logistics,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
            Reimagined.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-10"
        >
          MANIFEST is an AI-powered ERP platform designed specifically for Ship Chandlers, Trading Companies, and Procurement Teams. Fast, beautiful, and enterprise-ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            Start free trial
          </button>
          <button className="glass px-8 py-4 rounded-full text-lg font-medium text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
            Contact Sales
          </button>
        </motion.div>
      </div>

      {/* Gradient Overlay for bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
