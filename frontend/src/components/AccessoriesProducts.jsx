import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

// Icons
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const AccessoriesProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState("cups"); // Filter state
  const navigate = useNavigate();

  // Define filters specific to Accessories
  const filters = ["Cups", "Filters", "Storage", "Maintenance"];

  // Fetch Data
  useEffect(() => {
    setLoading(true);
    API.get("/products", {
      params: { 
        category: "accessories",
        ...(subCategory && { subCategory: subCategory.toLowerCase() }) 
      },
    })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [subCategory]);

  // Handlers
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Stop navigation when clicking button
    try {
      await API.post("/cart/add", { productId, qty: 1 });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Please login to add items");
    }
  };

  const toggleFilter = (filter) => {
    setSubCategory((prev) => (prev === filter ? "" : filter));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D4F1E] font-sans selection:bg-[#2D4F1E] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#E8DCC4]/40 pb-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter">
              Accessories
            </h1>
            <p className="text-[#4B3621]/60 font-bold text-xs uppercase tracking-[0.25em]">
              Elevate your brewing ritual
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  subCategory === filter
                    ? "bg-[#2D4F1E] text-white border-[#2D4F1E] shadow-lg transform -translate-y-1"
                    : "bg-transparent text-[#4B3621]/50 border-[#E8DCC4] hover:border-[#2D4F1E] hover:text-[#2D4F1E]"
                }`}
              >
                {filter}
                {subCategory === filter && <span className="ml-2 opacity-60">✕</span>}
              </button>
            ))}
          </div>
        </header>

        {/* --- Product Grid --- */}
        {loading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-stone-100 rounded-[2rem] mb-4"></div>
                <div className="h-4 bg-stone-100 w-2/3 rounded mb-2"></div>
                <div className="h-3 bg-stone-100 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          // Empty State
          <div className="py-32 text-center border-2 border-dashed border-[#E8DCC4] rounded-[3rem]">
            <p className="font-serif text-2xl text-[#4B3621]/40 italic mb-4">No accessories found.</p>
            <button 
              onClick={() => setSubCategory("")}
              className="text-xs font-bold uppercase tracking-widest border-b border-[#2D4F1E] text-[#2D4F1E]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          // Products List
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="group cursor-pointer flex flex-col gap-5"
              >
                {/* Image Card */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[#E8DCC4]/30 transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(45,79,30,0.15)] group-hover:-translate-y-2">
                  
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Floating Add Button */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button
                      onClick={(e) => handleAddToCart(e, p._id)}
                      className="w-full bg-white/90 backdrop-blur-md text-[#2D4F1E] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#2D4F1E] hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Add to Cart</span>
                      <PlusIcon />
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF9F6]/80 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#2D4F1E] border border-[#2D4F1E]/5">
                      {p.subCategory || "Essentials"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-black leading-none group-hover:text-[#2D4F1E]/70 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[#A3B899] text-[10px] font-bold uppercase tracking-widest">
                      In Stock
                    </p>
                  </div>
                  <div className="text-right">
                     <p className="text-lg font-black text-[#4B3621]">₹{p.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessoriesProducts;