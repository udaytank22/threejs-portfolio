import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Dashboard() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 px-6 bg-black overflow-hidden flex flex-col items-center">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-space font-bold mb-6 text-white"
          >
            Command Center for<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Global Operations
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Ditch the spreadsheets. Get real-time visibility into your entire supply chain, 
            active inquiries, profit margins, and logistics all in one beautifully designed interface.
          </motion.p>
        </div>

        {/* Dashboard Mockup with 3D Tilt */}
        <motion.div 
          style={{ y, rotateX, scale, opacity }}
          className="relative w-full max-w-6xl mx-auto perspective-1000"
        >
          {/* Glass browser frame */}
          <div className="glass rounded-2xl md:rounded-3xl p-2 md:p-4 border border-white/10 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            {/* The actual screenshot */}
            <div className="relative rounded-xl overflow-hidden bg-[#111] aspect-video">
              <img 
                src="/assets/images/dashboard.png" 
                alt="Manifest Dashboard"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000';
                }}
              />
              
              {/* Overlay reflection for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
            </div>
          </div>
          
          {/* Floating Elements (simulating UI components popping out) */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
            className="absolute -right-12 -bottom-12 w-64 glass p-6 rounded-2xl border border-white/10 hidden lg:block shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">↑</span>
              </div>
              <div>
                <div className="text-sm text-white/60 font-medium">Daily Profit</div>
                <div className="text-xl font-mono font-semibold text-white">₹44,28,569</div>
              </div>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-green-500 rounded-full" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
