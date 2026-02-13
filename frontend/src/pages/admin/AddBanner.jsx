import { useState, useRef } from "react";
import { Link } from "react-router-dom"; 
import API from "../../services/api";
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  MegaphoneIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

const AddBanner = () => {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    bannerCategory: "",
    bannerSubCategory: "",
    sectionType: "feature",
    mediaType: "image",
    resource: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMediaType = (type) => {
    setForm({ ...form, mediaType: type, resource: "" });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) { // 15MB Limit check
        alert("File is too large! Max 15MB.");
        return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, resource: reader.result });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.resource) {
        setMessage({ type: "error", text: "Please upload media content." });
        return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await API.post("/banners", {
        ...form,
        bannerSubCategory: form.bannerSubCategory.toLowerCase().trim(),
      }); 
      
      setMessage({ type: "success", text: "Banner published successfully! 🚀" });
      setForm({
        title: "",
        bannerCategory: "",
        bannerSubCategory: "",
        sectionType: "feature",
        mediaType: "image",
        resource: "",
      });
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to publish banner.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-12 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* --- LEFT COLUMN: FORM --- */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] border border-[#E8DCC4]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="flex items-center gap-8 border-b border-[#E8DCC4]/30 pb-6 mb-8">
            <Link to="/admin/add-product" className="group flex items-center gap-2 text-[#4B3621]/40 hover:text-[#2D4F1E] transition-colors">
               <ShoppingBagIcon className="w-5 h-5"/>
               <span className="text-sm font-bold uppercase tracking-widest">Product</span>
            </Link>
            <div className="flex items-center gap-2 text-[#2D4F1E] border-b-2 border-[#2D4F1E] pb-6 -mb-6">
               <MegaphoneIcon className="w-5 h-5"/>
               <span className="text-sm font-bold uppercase tracking-widest">Banner</span>
            </div>
          </div>

          <header className="mb-8">
            <h2 className="text-4xl font-serif font-black text-[#2D4F1E] tracking-tight">New Campaign</h2>
            <p className="text-[#4B3621]/60 text-xs font-bold uppercase tracking-[0.2em] mt-2">Design your homepage layout</p>
          </header>

          {message.text && (
            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold tracking-wide ${message.type === "success" ? "bg-[#2D4F1E]/5 text-[#2D4F1E] border border-[#2D4F1E]/10" : "bg-red-50 text-[#D9534F] border border-red-100"}`}>
              <span className={`h-2 w-2 rounded-full ${message.type === "success" ? "bg-[#2D4F1E]" : "bg-[#D9534F]"}`}></span>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Title</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Summer Sale" required 
                        className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-serif font-bold text-lg focus:bg-white focus:border-[#2D4F1E] outline-none transition-all"
                    />
                </div>
                <div className="space-y-2 group">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Section Type</label>
                    <select name="sectionType" value={form.sectionType} onChange={handleChange} className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold outline-none focus:border-[#2D4F1E]">
                        <option value="feature">Featured Collection</option>
                        <option value="hero">Main Hero (Top)</option>
                        <option value="gallery">Gallery Grid</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E8DCC4] flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={form.mediaType === "image"} onChange={() => toggleMediaType("image")} className="accent-[#2D4F1E] w-4 h-4" />
                    <span className="text-sm font-bold text-[#4B3621] flex items-center gap-1"><PhotoIcon className="w-4 h-4"/> Image</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={form.mediaType === "video"} onChange={() => toggleMediaType("video")} className="accent-[#2D4F1E] w-4 h-4" />
                    <span className="text-sm font-bold text-[#4B3621] flex items-center gap-1"><VideoCameraIcon className="w-4 h-4"/> Video</span>
                </label>
            </div>

            <div className="space-y-2 group">
                <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">
                    Upload {form.mediaType === "video" ? "Video (MP4)" : "Image"}
                </label>
                
                <div 
                    onClick={() => form.mediaType === "video" ? videoInputRef.current.click() : fileInputRef.current.click()} 
                    className={`relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${form.resource ? "border-[#2D4F1E]/20 bg-white" : "border-[#E8DCC4] bg-[#FAF9F6] hover:bg-[#F5F2EF]"}`}
                >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                    <input type="file" ref={videoInputRef} className="hidden" accept="video/mp4,video/webm" onChange={handleFileUpload} />

                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2D4F1E]"></div>
                            <span className="text-xs font-bold text-[#2D4F1E]">Uploading...</span>
                        </div>
                    ) : form.resource ? (
                        <div className="w-full h-full relative group/preview">
                            {form.mediaType === "video" ? (
                                <video src={form.resource} className="w-full h-full object-cover opacity-80" muted />
                            ) : (
                                <img src={form.resource} className="w-full h-full object-cover opacity-80" alt="Preview" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/preview:bg-black/40 transition-colors">
                                <span className="bg-white/90 text-[#2D4F1E] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">Change File</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-[#4B3621]/40">
                            {form.mediaType === "video" ? <VideoCameraIcon className="w-10 h-10 mx-auto mb-2"/> : <PhotoIcon className="w-10 h-10 mx-auto mb-2"/>}
                            <span className="text-xs font-bold uppercase block">Click to Upload</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Redirect Category</label>
                    <input name="bannerCategory" value={form.bannerCategory} onChange={handleChange} placeholder="coffee" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold outline-none focus:border-[#2D4F1E]" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Redirect Sub-Cat</label>
                    <input name="bannerSubCategory" value={form.bannerSubCategory} onChange={handleChange} placeholder="espresso" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold outline-none focus:border-[#2D4F1E]" />
                </div>
            </div>

            <button disabled={loading || isUploading} className="w-full bg-[#2D4F1E] text-[#FAF9F6] py-4 rounded-xl font-black text-[13px] uppercase tracking-[0.2em] hover:bg-[#1a3310] transition-all shadow-lg shadow-[#2D4F1E]/20 disabled:opacity-50">
              {loading ? "Publishing..." : "Launch Campaign"}
            </button>
          </form>
        </div>

        {/* --- RIGHT COLUMN: PREVIEW --- */}
        <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-center">
          <div className="w-full p-6 border-2 border-dashed border-[#E8DCC4] rounded-[2rem] bg-[#FAF9F6]/50">
            <p className="text-[#4B3621]/40 text-[10px] uppercase font-black mb-6 tracking-[0.3em] flex items-center gap-2 justify-center">
              <span className="w-2 h-2 rounded-full bg-[#2D4F1E] animate-pulse"></span> {form.sectionType} Preview
            </p>

            <div className={`w-full bg-[#1A1A1A] rounded-2xl shadow-xl overflow-hidden relative flex items-center justify-center group ${form.sectionType === "hero" ? "aspect-video" : "aspect-[4/5] md:aspect-square"}`}>
               <div className="absolute inset-0 opacity-60">
                   {form.resource ? (
                        form.mediaType === "video" ? (
                            <video src={form.resource} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        ) : (
                            <img src={form.resource} className="w-full h-full object-cover" alt="Banner" />
                        )
                   ) : (
                        <div className="w-full h-full bg-[#2D4F1E] flex items-center justify-center">
                             <MegaphoneIcon className="w-12 h-12 text-white/20"/>
                        </div>
                   )}
               </div>
               
               <div className="relative z-10 text-center px-4 w-full">
                    <span className="text-[#E8DCC4] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block animate-fade-in-up">
                       {form.bannerCategory || "Collection"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-none mb-4 drop-shadow-md break-words">
                       {form.title || "Your Title Here"}
                    </h3>
                    <button className="bg-[#E8DCC4] text-[#2D4F1E] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors scale-90">
                       Shop Now
                    </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;