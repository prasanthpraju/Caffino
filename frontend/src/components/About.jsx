 import React, { useRef } from "react";
import {
  StarIcon,
  GlobeAmericasIcon,
  HeartIcon,
  PlayCircleIcon,
  ArrowLongRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      icon: <GlobeAmericasIcon className="h-6 w-6" />,
      title: "Ethically Sourced",
      desc: "We build direct, long-term partnerships with small-lot farmers in Coorg and Chikmagalur, ensuring fair wages.",
    },
    {
      icon: <StarIcon className="h-6 w-6" />,
      title: "Masterfully Roasted",
      desc: "Our small-batch roasting process in Chennai is a blend of art and science, unlocking each bean's potential.",
    },
    {
      icon: <HeartIcon className="h-6 w-6" />,
      title: "Community Driven",
      desc: "We believe in coffee as a catalyst for connection. A percentage of every purchase is reinvested into our partner communities.",
    },
  ];

  const journeySteps = [
    {
      id: "01",
      title: "The Harvest",
      img: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=2671&auto=format&fit=crop",
      desc: "Hand-picked cherries at peak ripeness from high-altitude estates.",
    },
    {
      id: "02",
      title: "The Roast",
      img: "https://images.unsplash.com/photo-1515696023798-842dfbd56914?q=80&w=2670&auto=format&fit=crop",
      desc: "Precision roasting in small batches to highlight distinct flavor notes.",
    },
    {
      id: "03",
      title: "The Pour",
      img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop",
      desc: "Expertly brewed to bring people together over the perfect cup.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Parallax for the Marquee
  const xMove = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAFAF8] font-sans antialiased text-[#1A1A1A] pt-32 overflow-hidden"
    >
      {/* --- HERO SECTION --- */}
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 mb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
            <motion.span
              variants={itemVariants}
              className="text-[#142d16] text-xs font-bold uppercase tracking-[0.3em] mb-6 block pl-4 border-l-2 border-[#142d16]"
            >
              Our Story • Est. 2024
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-serif font-bold text-[#142d16] tracking-tight mb-8 leading-[1.1]"
            >
              The Art of <br />
              <span className="italic font-light">Considered</span> Coffee.
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-xl"
            >
              <p>
                At{" "}
                <span className="font-serif font-bold text-[#142d16]">
                  Brew & Bask
                </span>
                , we don't just roast coffee; we curate experiences. Our
                philosophy is rooted in a deep respect for the craft, from the
                soil to the sip.
              </p>
              <p>
                Born in Chennai from a collective passion for exceptional flavor
                and ethical sourcing, we are dedicated to transparency and
                quality.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-6"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg"
                alt="Signature"
                className="h-12 opacity-80 grayscale contrast-12 mix-blend-multiply"
              />
              <button className="group flex items-center gap-3 text-[#142d16] font-medium text-sm hover:opacity-80 transition-opacity">
                <PlayCircleIcon className="w-10 h-10 stroke-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="uppercase tracking-widest text-xs">
                  Play Our Film
                </span>
              </button>
            </motion.div>
          </div>

          {/* Layered Visual Composition */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 order-1 lg:order-2 relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center lg:justify-end"
          >
            <div className="absolute top-0 right-0 lg:right-12 w-4/5 h-4/5 bg-[#3b3737] overflow-hidden rounded-sm">
              <video
                className="w-full h-full object-cover opacity-60 grayscale-[20%]"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=2670&auto=format&fit=crop"
              >
                <source
                  src="https://videos.pexels.com/video-files/2869566/2869566-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Rotating Badge */}
            <motion.div
              className="absolute top-10 left-0 lg:-left-8 z-30"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-[#142d16] rounded-full flex items-center justify-center border-[1px] border-[#FAFAF8] shadow-xl">
                <svg
                  className="w-full h-full absolute inset-0 animate-spin-slow"
                  viewBox="0 0 100 100"
                  width="100"
                  height="100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text
                    fill="#FAFAF8"
                    fontSize="11"
                    fontWeight="bold"
                    letterSpacing="2px"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      • BREW & BASK • EST 2024 • CHENNAI
                    </textPath>
                  </text>
                </svg>
                <StarIcon className="w-8 h-8 text-[#FAFAF8]" />
              </div>
            </motion.div>

            {/* Front Photo */}
            <motion.div
              className="absolute bottom-10 left-4 lg:left-12 w-3/5 h-4/5 bg-white p-2 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-20"
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
            >
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop"
                  alt="Barista crafting coffee"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

       

      {/* --- FEATURES SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group p-8 border border-[#142d16]/10 hover:border-[#142d16] transition-colors duration-500 bg-white"
            >
              <div className="w-12 h-12 rounded-full bg-[#142d16]/5 flex items-center justify-center text-[#142d16] mb-6 group-hover:bg-[#142d16] group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#142d16] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed text-sm md:text-base">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- VISUAL JOURNEY SECTION (New) --- */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#142d16] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#142d16]">
              From Farm to Cup
            </h2>
          </motion.div>

          
        </div>

        {/* --- IMPACT STATS (New) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[#142d16]/10">
          {[
            { label: "Partner Farms", value: "12" },
            { label: "Cups Served", value: "50k+" },
            { label: "Varietals", value: "08" },
            { label: "Roast Batches", value: "100%" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <h4 className="text-4xl md:text-6xl font-serif text-[#142d16] mb-2">
                {stat.value}
              </h4>
              <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/60 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER CTA (New) --- */}
       
    </div>
  );
};

export default About;