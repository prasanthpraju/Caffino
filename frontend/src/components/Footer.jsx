import React from "react";
import { Link } from "react-router-dom";

// Icons
const ArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Twitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0C0A09] text-[#E8DCC4] overflow-hidden font-sans selection:bg-[#A3B899] selection:text-[#0C0A09]">
      
      {/* --- 1. Cinematic Background & Overlay --- */}
      <div className="absolute inset-0 z-0">
        <img 
          // High-quality atmospheric coffee shop detail (darker, moodier)
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
          alt="Atmospheric Background" 
          className="w-full h-full object-cover opacity-27 mix-blend-luminosity"
        />
        {/* Deep Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-[#0C0A09]/95 to-[#1c1917]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        
        {/* --- 2. Top Section: Newsletter & Brand --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b border-[#E8DCC4]/10 pb-16 mb-16">
          
          {/* Brand Area */}
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-white">
              BREW<span className="text-[#A3B899] italic">&</span>BASK
            </h2>
            <p className="text-[#E8DCC4]/60 text-sm leading-relaxed font-light">
              Crafting the perfect cup since 2024. We source the finest beans from sustainable farms worldwide to bring you an unparalleled coffee experience.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="w-full lg:max-w-md">
            <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#A3B899] mb-4">
              Subscribe to our journal
            </label>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border-b border-[#E8DCC4]/20 py-4 text-lg text-white placeholder-[#E8DCC4]/20 focus:outline-none focus:border-[#A3B899] transition-all duration-300"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-white/50 group-focus-within:text-[#A3B899] transition-colors hover:text-white">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-24">
          
          {/* Group 1 */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg">Shop</h4>
            <ul className="space-y-3 text-sm text-[#E8DCC4]/50 font-medium">
              <li><Link to="/coffee" className="hover:text-[#A3B899] transition-colors">All Coffee</Link></li>
              <li><Link to="/coffee?type=espresso" className="hover:text-[#A3B899] transition-colors">Espresso Roasts</Link></li>
              <li><Link to="/equipment" className="hover:text-[#A3B899] transition-colors">Brewing Gear</Link></li>
              <li><Link to="/accessories" className="hover:text-[#A3B899] transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Group 2 */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg">About</h4>
            <ul className="space-y-3 text-sm text-[#E8DCC4]/50 font-medium">
              <li><Link to="/story" className="hover:text-[#A3B899] transition-colors">Our Story</Link></li>
              <li><Link to="/impact" className="hover:text-[#A3B899] transition-colors">Sustainability</Link></li>
              <li><Link to="/locations" className="hover:text-[#A3B899] transition-colors">Locations</Link></li>
              <li><Link to="/careers" className="hover:text-[#A3B899] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Group 3 */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-lg">Help</h4>
            <ul className="space-y-3 text-sm text-[#E8DCC4]/50 font-medium">
              <li><Link to="/faq" className="hover:text-[#A3B899] transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-[#A3B899] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/wholesale" className="hover:text-[#A3B899] transition-colors">Wholesale</Link></li>
              <li><Link to="/contact" className="hover:text-[#A3B899] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

           {/* Group 4: Socials & Address */}
           <div className="space-y-6">
            <h4 className="text-white font-serif text-lg">Visit</h4>
            <address className="not-italic text-sm text-[#E8DCC4]/50 leading-relaxed">
              124, KNK Road<br/>
              Nungambakkam, Chennai<br/>
              Tamil Nadu 600006
            </address>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full border border-[#E8DCC4]/10 text-[#E8DCC4]/60 hover:text-[#0C0A09] hover:bg-[#A3B899] hover:border-[#A3B899] transition-all duration-300">
                <Instagram />
              </a>
              <a href="#" className="p-2 rounded-full border border-[#E8DCC4]/10 text-[#E8DCC4]/60 hover:text-[#0C0A09] hover:bg-[#A3B899] hover:border-[#A3B899] transition-all duration-300">
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        {/* --- 4. Bottom Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E8DCC4]/10 gap-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-[#E8DCC4]/30">
              © 2026 Brew & Bask.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/privacy" className="text-[10px] uppercase tracking-widest text-[#E8DCC4]/30 hover:text-[#A3B899] transition-colors">Privacy</Link>
              <Link to="/terms" className="text-[10px] uppercase tracking-widest text-[#E8DCC4]/30 hover:text-[#A3B899] transition-colors">Terms</Link>
            </div>
          </div>

          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#E8DCC4]/40 hover:text-[#A3B899] transition-colors"
          >
            <span>Back to Top</span>
            <div className="p-2 border border-[#E8DCC4]/10 rounded-full group-hover:border-[#A3B899] transition-colors">
              <ArrowUp />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;