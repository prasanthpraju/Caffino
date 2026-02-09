import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4B3621] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white/10 pb-16">
        <div className="md:col-span-1">
          <div className="text-3xl font-serif font-bold tracking-tighter text-[#A3B899] mb-8">
            BREW<span className="text-white">&</span>BASK
          </div>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed font-light">
            Bringing artisan coffee culture to your home since 2024. Ethically sourced, small-batch roasted.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-[#A3B899]">Contact</h4>
          <ul className="space-y-3 text-xs text-white/40 font-medium">
            <li>hello@brewandbask.com</li>
            <li>Chennai, Tamil Nadu</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-[#A3B899]">Social</h4>
          <ul className="space-y-3 text-xs text-white/40 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
          </ul>
        </div>
      </div>
      
      <p className="max-w-7xl mx-auto pt-10 text-[9px] uppercase tracking-widest text-white/20 text-center md:text-left">
        © 2026 Brew & Bask Coffee Roasters. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;