 import { useState, useRef } from "react";
import API from "../../services/api";

const AddProduct = () => {
  const initialFormState = {
    name: "",
    description: "",
    price: "",
    image: "", // This will now store the uploaded URL/String
    stock: "",
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

  // Function to handle Image Upload (Base64 or Cloudinary logic)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // For this example, we use FileReader to create a local preview string
    // In production, you would replace this with a call to Cloudinary/S3
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!form.image) return setFeedback({ type: "error", message: "Please upload an image." });
    
    setIsSubmitting(true);
    try {
      await API.post("/products", form);
      setFeedback({ type: "success", message: "Roast successfully listed! ☕" });
      setForm(initialFormState);
    } catch (err) {
      setFeedback({ type: "error", message: "Failed to add product." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Form Section */}
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#E8DCC4] shadow-sm">
          <header className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#4B3621]">New Collection</h2>
            <p className="text-[#A3B899] text-xs uppercase tracking-widest mt-1 font-semibold">
              Update your artisan inventory
            </p>
          </header>

          {feedback.message && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-medium ${
              feedback.type === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
            } border`}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={submitProduct} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-tighter font-bold text-[#4B3621] ml-1">Product Name</label>
              <input name="name" placeholder="e.g. Midnight Espresso" className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all" value={form.name} onChange={handleChange} required />
            </div>

            {/* Custom Image Uploader UI */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-tighter font-bold text-[#4B3621] ml-1">Product Image</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full p-8 border-2 border-dashed border-[#E8DCC4] rounded-2xl bg-stone-50/30 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-all"
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#4B3621]"></div>
                ) : form.image ? (
                  <div className="text-center">
                    <p className="text-xs text-green-600 font-bold uppercase tracking-tighter">Image Selected ✓</p>
                    <p className="text-[10px] text-stone-400">Click to change</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-6 h-6 text-[#A3B899] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-xs text-stone-500 font-medium">Upload Bean Photography</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-tighter font-bold text-[#4B3621] ml-1">Price (₹)</label>
                <input name="price" type="number" placeholder="0.00" className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all" value={form.price} onChange={handleChange} required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-tighter font-bold text-[#4B3621] ml-1">Stock Level</label>
                <input name="stock" type="number" placeholder="Qty" className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all" value={form.stock} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-tighter font-bold text-[#4B3621] ml-1">Description</label>
              <textarea name="description" placeholder="Notes on roast, origin, and flavor..." rows="3" className="w-full p-4 rounded-2xl border border-stone-100 bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all resize-none" value={form.description} onChange={handleChange} required />
            </div>

            <button 
              disabled={isSubmitting || isUploading}
              className="w-full bg-[#4B3621] text-white py-5 rounded-2xl font-bold hover:bg-[#2D4F1E] transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-xs"
            >
              {isSubmitting ? "Publishing..." : "Add to Menu"}
            </button>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E8DCC4] rounded-[2.5rem] bg-stone-50/30">
          <p className="text-[#A3B899] text-[10px] uppercase font-bold mb-10 tracking-[0.3em]">Card Preview</p>
          <div className="w-72 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-stone-100">
             <div className="h-72 bg-[#F5F2EF] flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <img src={form.image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <p className="text-stone-300 text-xs italic">Awaiting Image...</p>
                )}
             </div>
             <div className="p-6">
                <span className="text-[9px] font-bold text-[#2D4F1E] uppercase tracking-widest">Artisan Roast</span>
                <h4 className="font-serif text-xl font-bold text-[#4B3621] mt-1 truncate">{form.name || "Unnamed Blend"}</h4>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[#2D4F1E] font-bold">₹{form.price || "0"}</p>
                  <div className="h-8 w-8 rounded-full bg-[#4B3621] flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;