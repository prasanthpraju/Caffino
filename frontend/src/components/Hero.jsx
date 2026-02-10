import React from "react";
// ✅ Only importing the video you have
import heroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#1a1a1a]">

      {/* ===== Background Video ===== */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay: Deep Green for text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#2D4F1E]/50 to-black/40" /> */}
      </div>

      {/* ===== Content ===== */}
      {/* 'pt-32' prevents navbar overlap */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full h-full flex flex-col justify-center pt-32">
        <div className="max-w-4xl">

          {/* Badge: Simplified to just the year and origin */}
          <div className="inline-block mb-8 px-4 py-2 bg-[#2D4F1E]/30 backdrop-blur-md border border-[#A3B899]/30 rounded-full shadow-lg">
            <span className="text-[#E8DCC4] uppercase tracking-[0.4em] text-xs md:text-sm font-bold">
              Est. 2024
            </span>
          </div>

          {/* Heading: Classic, minimal, high-impact */}
          <h1 className="text-7xl md:text-9xl font-serif text-[#FAF9F6] leading-[0.85] mb-10 drop-shadow-2xl">
            Pure <br />
            <span className="italic font-light text-[#A3B899] ml-16 md:ml-32 block">
              Origins.
            </span>
          </h1>

          {/* CTA: Shortened for elegance */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pl-2">
            <p className="hidden md:block text-stone-300 max-w-sm text-sm leading-relaxed border-l-2 border-[#A3B899] pl-6 tracking-wide">
              Small batch roasts. Sustainably sourced. Simply exceptional.
            </p>

            <button className="group bg-[#FAF9F6] text-[#2D4F1E] px-14 py-6 rounded-br-3xl font-black uppercase text-xs tracking-[0.25em] hover:bg-[#2D4F1E] hover:text-white transition-all duration-500 shadow-2xl border border-transparent hover:border-[#A3B899]">
              Shop Now
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;