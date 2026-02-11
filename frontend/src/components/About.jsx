import { StarIcon, GlobeAmericasIcon, HeartIcon } from "@heroicons/react/24/outline";

const About = () => {
  const features = [
    {
      icon: <GlobeAmericasIcon className="h-6 w-6" />,
      title: "Ethically Sourced",
      desc: "We build direct, long-term partnerships with small-lot farmers, ensuring fair wages and sustainable agricultural practices."
    },
    {
      icon: <StarIcon className="h-6 w-6" />,
      title: "Masterfully Roasted",
      desc: "Our small-batch roasting process in Chennai is a blend of art and science, designed to unlock each bean's unique potential."
    },
    {
      icon: <HeartIcon className="h-6 w-6" />,
      title: "Community Driven",
      desc: "We believe in coffee as a catalyst for connection. A percentage of every purchase is reinvested into our partner communities."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans antialiased text-[#1A1A1A] pt-32 pb-20">
      
      {/* --- HERO SECTION WITH LAYERED PHOTOS --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-[#142d16] text-xs font-bold uppercase tracking-[0.3em] mb-6 block pl-1 border-l-2 border-[#142d16]">
              Our Story • Est. 2024
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#142d16] tracking-tight mb-8 leading-tight">
              The Art of <br/> Considered Coffee.
            </h1>
            <div className="space-y-6 text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-xl">
              <p>
                At <span className="font-serif font-bold text-[#142d16]">Brew & Bask</span>, we don't just roast coffee; we curate experiences. Our philosophy is rooted in a deep respect for the craft, from the soil to the sip.
              </p>
              <p>
                Born in Chennai from a collective passion for exceptional flavor and ethical sourcing, we are dedicated to transparency and quality. We invite you to slow down, savor the moment, and appreciate the journey in every cup.
              </p>
            </div>
            <div className="mt-12">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg" 
                alt="Signature" 
                className="h-10 opacity-80 grayscale contrast-125 mix-blend-multiply" 
              />
            </div>
          </div>

          {/* Layered Photo Composition */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[500px]">
            {/* Back Photo */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-[#ECEAE5] z-0">
               <img 
                 src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2670&auto=format&fit=crop" 
                 alt="Coffee farm" 
                 className="w-full h-full object-cover opacity-90 grayscale-[20%]"
               />
            </div>
            {/* Front Photo (Overlapping) */}
            <div className="absolute bottom-0 left-0 w-3/5 h-4/5 bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10">
               <div className="w-full h-full overflow-hidden relative">
                 <img 
                   src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop" 
                   alt="Barista crafting coffee" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 border border-[#142d16]/10 pointer-events-none"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- VISUAL JOURNEY GALLERY --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#142d16] mb-4">A Visual Journey</h2>
          <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto">From the lush hills of our partner farms to the final pour in our roastery, witness the dedication behind our process.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            "https://images.unsplash.com/photo-1447933601400-b8a9dc8da731?q=80&w=2670&auto=format&fit=crop", // Green beans/sack
            "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop", // Roasting machine
            "https://images.unsplash.com/photo-1552345365-545b9853440b?q=80&w=2670&auto=format&fit=crop"  // Pour over/serving
          ].map((src, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-[#ECEAE5] shadow-sm transition-all duration-500 hover:shadow-xl">
              <img src={src} alt="Process shot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0" />
              <div className="absolute inset-0 border border-[#142d16]/5 pointer-events-none transition-colors group-hover:border-[#142d16]/20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- VALUES SECTION --- */}
      <div className="bg-[#142d16] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-8 md:px-12 pt-12 md:pt-8">
                   <div className="p-4 border border-white/20 rounded-full mb-6 text-[#ECEAE5]">
                      {feature.icon}
                   </div>
                   <h3 className="text-xl font-serif font-bold mb-4 tracking-wide">{feature.title}</h3>
                   <p className="text-[#ECEAE5]/80 leading-relaxed text-sm">
                     {feature.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
};

export default About;