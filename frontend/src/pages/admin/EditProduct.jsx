 import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`, { signal: controller.signal });
        setForm(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching product:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await API.put(`/products/${id}`, form);
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to update product. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#A3B899] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#A3B899] font-medium">Loading roast details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-[#A3B899] hover:text-[#4B3621] mb-8 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to Inventory
          </span>
        </button>

        <header className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#4B3621]">Edit Roast</h2>
          <p className="text-stone-500 mt-2">
            Adjust details, pricing, and stock levels for this item.
          </p>
        </header>

        <form onSubmit={submitUpdate} className="bg-white border border-[#E8DCC4] rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input - Fixed Missing Field */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
                Product Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Ethiopian Yirgacheffe"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all"
              />
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
                Product Image
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className={`w-full p-8 border-2 border-dashed rounded-xl cursor-pointer text-center transition-colors ${
                  form.image ? "border-[#A3B899] bg-[#F9FAF8]" : "border-[#E8DCC4] hover:bg-stone-50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {isUploading ? (
                  <p className="text-[#A3B899] animate-pulse">Processing image...</p>
                ) : form.image ? (
                  <div className="relative inline-block">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="mx-auto h-48 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-xs font-bold uppercase">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-stone-400">
                    <PhotoIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>Click to upload a new product photo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
                Units in Stock
              </label>
              <input
                name="stock"
                type="number"
                required
                value={form.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] focus:ring-2 focus:ring-[#2D4F1E] outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#F5F2EF] flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="flex-1 bg-[#2D4F1E] text-white font-bold py-4 rounded-2xl hover:bg-[#1f3815] transition-all shadow-lg shadow-[#2d4f1e20] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-8 py-4 border border-[#E8DCC4] text-[#4B3621] font-bold rounded-2xl hover:bg-[#F5F2EF] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;