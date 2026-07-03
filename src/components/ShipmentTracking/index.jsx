import { motion } from 'framer-motion';

export function ShipmentTracking() {
  return (
    <section className="relative min-h-screen py-32 bg-[#000510] overflow-hidden border-t border-white/5 flex flex-col items-center">
      
      <div className="text-center mb-12 relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-200">Live Global Tracking</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-space font-bold mb-6 text-white"
        >
          Your Supply Chain,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
            Visible in Real-Time
          </span>
        </motion.h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[600px] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl shadow-blue-500/5 z-10 px-4 md:px-0">
        
        {/* Placeholder for the 3D map tracking scene.
            In a full production build, this would be another React Three Fiber canvas 
            rendering a world map, moving glowing dots for ships and airplanes, 
            connecting lines, and UI overlays. 
        */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544257121-654dbdb30312?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Mock Live Tracking Overlays */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="glass p-4 rounded-xl border border-white/10">
              <div className="text-sm text-white/60 mb-1">Active Shipments</div>
              <div className="text-3xl font-mono text-white font-bold">14.2K</div>
            </div>
            <div className="glass p-4 rounded-xl border border-white/10 flex flex-col items-end">
              <div className="text-sm text-white/60 mb-1">On-Time Delivery</div>
              <div className="text-3xl font-mono text-green-400 font-bold">98.1%</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
             {/* Mock tracking cards */}
             {['MT Pacific Dawn - Shanghai to NY', 'Airbus A330 - Dubai to London', 'Maersk Line - Rotterdam'].map((vessel, i) => (
               <div key={vessel} className="glass p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                 <div className="flex items-center gap-2 mb-2">
                   <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                   <div className="text-xs font-mono text-white/60">IN TRANSIT</div>
                 </div>
                 <div className="font-medium text-white text-sm">{vessel}</div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
}
