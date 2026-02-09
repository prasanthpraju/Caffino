import React from "react";

const Navbar = ({ cartCount = 0 }) => {
  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#E8DCC4]/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tighter text-[#2D4F1E]">
          BREW<span className="text-[#4B3621]">&</span>BASK
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4B3621]">
          <a href="/" className="hover:text-[#2D4F1E] transition-all">Home</a>
          <a href="/shop" className="hover:text-[#2D4F1E] transition-all underline-offset-8 hover:underline text-[#2D4F1E]">Shop</a>
          <a href="/story" className="hover:text-[#2D4F1E] transition-all">Our Story</a>
          
          <button className="relative bg-[#4B3621] text-white px-7 py-3 rounded-full hover:bg-[#2D4F1E] transition-all shadow-lg active:scale-95">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A3B899] text-[#2D4F1E] text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;