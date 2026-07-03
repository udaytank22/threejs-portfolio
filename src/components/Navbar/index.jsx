import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4 rounded-full pointer-events-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tighter">M</span>
          </div>
          <span className="font-space font-bold text-xl tracking-tight text-white">MANIFEST</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#product" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Product</a>
          <a href="#solutions" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Solutions</a>
          <a href="#customers" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Customers</a>
          <a href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Log in</a>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            Request Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-24 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-4 pointer-events-auto md:hidden border border-white/10">
          <a href="#product" className="text-lg font-medium text-white/70 hover:text-white transition-colors">Product</a>
          <a href="#solutions" className="text-lg font-medium text-white/70 hover:text-white transition-colors">Solutions</a>
          <a href="#customers" className="text-lg font-medium text-white/70 hover:text-white transition-colors">Customers</a>
          <a href="#pricing" className="text-lg font-medium text-white/70 hover:text-white transition-colors">Pricing</a>
          <div className="h-[1px] bg-white/10 my-2" />
          <a href="#login" className="text-lg font-medium text-white/70 hover:text-white transition-colors">Log in</a>
          <button className="bg-white text-black px-5 py-3 rounded-full text-lg font-semibold mt-2 w-full">
            Request Demo
          </button>
        </div>
      )}
    </motion.nav>
  );
}
