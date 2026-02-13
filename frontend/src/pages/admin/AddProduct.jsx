import { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link
import API from "../../services/api";
import { 
  ShoppingBagIcon, 
  MegaphoneIcon 
} from "@heroicons/react/24/outline";

const AddProduct = () => {
  const initialFormState = {
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
    subCategory: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (feedback.message) setFeedback({ type: "", message: "" });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!form.image)
      return setFeedback({ type: "error", message: "Please upload an image." });

    setIsSubmitting(true);
    try {
      await API.post("/products", {
        ...form,
        subCategory: form.subCategory.toLowerCase().trim(),
      });

      setFeedback({ type: "success", message: "Roast successfully listed! ☕" });
      setForm(initialFormState);
    } catch (err) {
      setFeedback({ type: "error", message: "Failed to add product." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-12 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Form Section */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] border border-[#E8DCC4]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* --- ADDED NAVIGATION HERE --- */}
          <div className="flex items-center gap-8 border-b border-[#E8DCC4]/30 pb-6 mb-8">
            <div className="flex items-center gap-2 text-[#2D4F1E] border-b-2 border-[#2D4F1E] pb-6 -mb-6">
               <ShoppingBagIcon className="w-5 h-5"/>
               <span className="text-sm font-bold uppercase tracking-widest">Product</span>
            </div>
            <Link to="/admin/add-banner" className="group flex items-center gap-2 text-[#4B3621]/40 hover:text-[#2D4F1E] transition-colors">
               <MegaphoneIcon className="w-5 h-5"/>
               <span className="text-sm font-bold uppercase tracking-widest">Banner</span>
            </Link>
          </div>

          <header className="mb-8">
            <h2 className="text-4xl font-serif font-black text-[#2D4F1E] tracking-tight">
              New Collection
            </h2>
            <p className="text-[#4B3621]/60 text-xs font-bold uppercase tracking-[0.2em] mt-2">
              Update your artisan inventory
            </p>
          </header>

          {/* ... Rest of your existing form code stays exactly the same ... */}
          {feedback.message && (
            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold tracking-wide ${feedback.type === "success" ? "bg-[#2D4F1E]/5 text-[#2D4F1E] border border-[#2D4F1E]/10" : "bg-red-50 text-[#D9534F] border border-red-100"}`}>
              <span className={`h-2 w-2 rounded-full ${feedback.type === "success" ? "bg-[#2D4F1E]" : "bg-[#D9534F]"}`}></span>
              {feedback.message}
            </div>
          )}

          <form onSubmit={submitProduct} className="space-y-8">
            <div className="space-y-2 group">
              <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 group-focus-within:text-[#2D4F1E] transition-colors ml-1">Product Name</label>
              <input name="name" placeholder="e.g. Midnight Espresso" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] placeholder:text-[#4B3621]/20 font-serif font-bold text-lg focus:bg-white focus:border-[#2D4F1E] focus:ring-0 outline-none transition-all duration-300" value={form.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2 group">
              <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 group-focus-within:text-[#2D4F1E] transition-colors ml-1">Product Image</label>
              <div onClick={() => fileInputRef.current.click()} className={`group/upload relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${form.image ? "border-[#2D4F1E]/20 bg-white" : "border-[#E8DCC4] bg-[#FAF9F6] hover:bg-[#F5F2EF] hover:border-[#2D4F1E]/40"}`}>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2D4F1E]"></div>
                    <span className="text-xs font-bold text-[#2D4F1E] animate-pulse">Processing Bean Data...</span>
                  </div>
                ) : form.image ? (
                  <div className="relative w-full h-full group-hover/upload:opacity-90 transition-opacity">
                    <img src={form.image} alt="Upload preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <span className="bg-white/90 text-[#2D4F1E] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">Change Photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center transform group-hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-12 h-12 rounded-full bg-[#2D4F1E]/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#2D4F1E]/10 transition-colors">
                        <ShoppingBagIcon className="w-6 h-6 text-[#2D4F1E]" />
                     </div>
                     <p className="text-sm text-[#4B3621] font-bold">Click to upload</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B3621]/40 font-serif font-bold text-lg">₹</span>
                  <input name="price" type="number" placeholder="0.00" className="w-full pl-10 p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold text-lg focus:bg-white focus:border-[#2D4F1E] outline-none transition-all" value={form.price} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Stock Level</label>
                <input name="stock" type="number" placeholder="Qty" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold text-lg focus:bg-white focus:border-[#2D4F1E] outline-none transition-all" value={form.stock} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Category</label>
                    <select name="category" value={form.category} onChange={handleChange} required className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold outline-none focus:border-[#2D4F1E]">
                        <option value="">Select Category</option>
                        <option value="coffee">Coffee</option>
                        <option value="equipment">Equipment</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Sub Category</label>
                    <input name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="e.g. Espresso" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-bold outline-none focus:border-[#2D4F1E]" required />
                </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[11px] uppercase tracking-widest font-black text-[#4B3621]/70 ml-1">Flavor Notes</label>
              <textarea name="description" placeholder="Describe the roast profile..." rows="4" className="w-full p-4 rounded-xl border-2 border-[#E8DCC4]/40 bg-[#FAF9F6] text-[#4B3621] font-medium focus:bg-white focus:border-[#2D4F1E] outline-none transition-all resize-none" value={form.description} onChange={handleChange} required />
            </div>

            <button disabled={isSubmitting || isUploading} className="w-full bg-[#2D4F1E] text-[#FAF9F6] py-4 rounded-xl font-black text-[13px] uppercase tracking-[0.2em] hover:bg-[#1a3310] transition-all disabled:opacity-50">
              {isSubmitting ? "Publishing..." : "Add to Menu"}
            </button>
          </form>
        </div>

        {/* Live Preview Section (Kept same) */}
        <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-center">
          <div className="w-full p-8 md:p-12 border-2 border-dashed border-[#E8DCC4] rounded-[2rem] bg-[#FAF9F6]/50 flex flex-col items-center">
            <p className="text-[#4B3621]/40 text-[10px] uppercase font-black mb-8 tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D4F1E] animate-pulse"></span>
              Live Preview
            </p>

            <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden ring-1 ring-[#E8DCC4]/30 transform transition-all duration-500 hover:scale-[1.02]">
              <div className="aspect-[4/5] bg-[#F5F2EF] relative overflow-hidden group">
                {form.image ? (
                  <img src={form.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#4B3621]/20">
                    <ShoppingBagIcon className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-xs font-black text-[#2D4F1E] tracking-tight">₹{form.price || "0"}</span>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] font-black text-[#A3B899] uppercase tracking-widest block mb-1">New Arrival</span>
                <h4 className="font-serif text-2xl font-bold text-[#2D4F1E] leading-none tracking-tight break-words">{form.name || "Unnamed Blend"}</h4>
                <div className="h-px w-full bg-[#E8DCC4]/30 my-4" />
                <p className="text-[11px] text-[#4B3621]/60 font-medium line-clamp-2 max-w-[70%]">{form.description || "Tasting notes pending..."}</p>
              </div>
            </div>
            <p className="mt-8 text-center text-[#4B3621]/30 text-[10px] uppercase tracking-wider font-medium">Card View</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;