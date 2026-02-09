import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center bg-[#2D4F1E] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D4F1E] via-transparent to-transparent z-10" />
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Coffee Roastery"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <span className="text-[#A3B899] uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">
            Est. 2024 — Artisan Roastery
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] mb-8">
            The Art of <br /> 
            <span className="italic font-light text-[#A3B899] ml-12 md:ml-24">Slow Brewing.</span>
          </h1>
          <button className="bg-white text-[#4B3621] px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-[#A3B899] hover:text-[#2D4F1E] transition-all shadow-2xl">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;