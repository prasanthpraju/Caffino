import { useState } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 md:px-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#2D4F1E] tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-[#4B3621]/60 font-bold uppercase tracking-[0.2em] text-xs">
            We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-[#E8DCC4]/50">
          
          {/* INFO SIDEBAR */}
          <div className="lg:col-span-5 bg-[#2D4F1E] text-[#FDFCFB] p-12 flex flex-col justify-between relative overflow-hidden">
             {/* Abstract Background Pattern */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDFCFB]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             
             <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPinIcon className="h-6 w-6 text-[#A3B899] shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1 text-[#A3B899]">Visit Us</p>
                      <p className="leading-relaxed opacity-90">123 Artisan Avenue,<br/>Anna Nagar, Chennai,<br/>Tamil Nadu 600040</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <EnvelopeIcon className="h-6 w-6 text-[#A3B899] shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1 text-[#A3B899]">Email Us</p>
                      <p className="opacity-90">hello@brewandbask.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <PhoneIcon className="h-6 w-6 text-[#A3B899] shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1 text-[#A3B899]">Call Us</p>
                      <p className="opacity-90">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className="relative z-10 mt-12">
               <p className="text-[#A3B899] text-xs font-bold uppercase tracking-widest mb-4">Follow our journey</p>
               <div className="flex gap-4">
                 {/* Social Placeholders */}
                 {['Instagram', 'Twitter', 'Facebook'].map(social => (
                   <button key={social} className="h-10 w-10 rounded-full border border-[#FDFCFB]/20 flex items-center justify-center hover:bg-[#FDFCFB] hover:text-[#2D4F1E] transition-all">
                     <span className="sr-only">{social}</span>
                     <span className="text-xs font-bold">{social[0]}</span>
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* FORM SECTION */}
          <div className="lg:col-span-7 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#4B3621]/60 ml-1">Your Name</label>
                  <input 
                    type="text" name="name" required value={formState.name} onChange={handleChange}
                    className="w-full p-4 bg-[#FAF9F6] border border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#2D4F1E] focus:ring-1 focus:ring-[#2D4F1E] transition-all font-medium text-[#4B3621]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#4B3621]/60 ml-1">Email Address</label>
                  <input 
                    type="email" name="email" required value={formState.email} onChange={handleChange}
                    className="w-full p-4 bg-[#FAF9F6] border border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#2D4F1E] focus:ring-1 focus:ring-[#2D4F1E] transition-all font-medium text-[#4B3621]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#4B3621]/60 ml-1">Message</label>
                <textarea 
                  name="message" rows="5" required value={formState.message} onChange={handleChange}
                  className="w-full p-4 bg-[#FAF9F6] border border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#2D4F1E] focus:ring-1 focus:ring-[#2D4F1E] transition-all resize-none font-medium text-[#4B3621]"
                  placeholder="Tell us about your favorite roast..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting" || status === "success"}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  status === "success" 
                    ? "bg-[#A3B899] text-[#2D4F1E] cursor-default" 
                    : "bg-[#2D4F1E] text-white hover:bg-[#1a3310] hover:shadow-lg shadow-[#2D4F1E]/20"
                }`}
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;