import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Pipeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 bg-black overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-space font-bold mb-6 text-white"
            >
              The Intelligent<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                Inquiry Pipeline
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/60 mb-8"
            >
              Watch your inquiries move seamlessly from AI Email Extraction to Quotation, 
              Confirmation, and Purchase Order. A kanban board that actually works for 
              the complex trading lifecycle.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {[
                "AI-powered email parsing for instant RFQs",
                "Automated supplier matching and quoting",
                "One-click conversion to Purchase Orders"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </motion.ul>
          </div>
          
          <div className="relative aspect-square">
            {/* Abstract visual workflow representation */}
            <div className="absolute inset-0 flex flex-col justify-center gap-4">
               {['Email Received', 'AI Extraction', 'RFQ Sent', 'Quoted', 'Confirmed'].map((step, i) => (
                 <motion.div
                   key={step}
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="glass p-4 rounded-xl border border-white/10 flex items-center gap-4"
                 >
                   <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-sm">
                     0{i+1}
                   </div>
                   <span className="text-white font-medium">{step}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling screenshot mockups */}
      <div className="w-full flex flex-col gap-8 mt-20 perspective-1000">
        
        <motion.div style={{ x: x1 }} className="flex gap-6 pl-[10vw]">
          {/* Mockup 1 */}
          <div className="w-[800px] flex-shrink-0 glass rounded-2xl p-2 border border-white/10 shadow-2xl overflow-hidden group">
            <img 
              src="/assets/images/inquiries-1.png" 
              alt="Inquiries Board 1"
              className="w-full h-auto rounded-xl object-cover transform transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1600';
              }}
            />
          </div>
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-6 justify-end pr-[10vw]">
          {/* Mockup 2 */}
          <div className="w-[800px] flex-shrink-0 glass rounded-2xl p-2 border border-white/10 shadow-2xl overflow-hidden group">
            <img 
              src="/assets/images/inquiries-2.png" 
              alt="Inquiries Board 2"
              className="w-full h-auto rounded-xl object-cover transform transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600';
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
