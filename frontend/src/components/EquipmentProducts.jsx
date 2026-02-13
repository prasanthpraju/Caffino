import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBagIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Helper Icon for Add Button
const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const EquipmentProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters (Removed "All", starts empty)
  const [activeFilter, setActiveFilter] = useState("scales");
  const [subCategories, setSubCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await API.get("/products");

        const equipment = res.data.filter(
          (p) => p.category?.toLowerCase() === "equipment",
        );

        setAllProducts(equipment);

        // 🔥 DEFAULT FILTER = SCALES
        const initialFiltered = equipment.filter(
          (p) => (p.subCategory || "").toLowerCase() === "scales",
        );

        setFilteredProducts(initialFiltered);
        setActiveFilter("scales");

        // Unique sub categories
        const uniqueSubs = [
          ...new Set(
            equipment.map((item) =>
              item.subCategory ? item.subCategory.trim() : "Essentials",
            ),
          ),
        ];

        setSubCategories(uniqueSubs);
      } catch (err) {
        console.error("Failed to load equipment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // --- Toggle Handler ---
  const handleFilterToggle = (category) => {
    if (activeFilter === category) {
      // If clicking the same filter, turn it OFF (Show All)
      setActiveFilter(null);
      setFilteredProducts(allProducts);
    } else {
      // Switch to new filter
      setActiveFilter(category);
      const filtered = allProducts.filter(
        (p) =>
          (p.subCategory || "Essentials").toLowerCase() ===
          category.toLowerCase(),
      );

      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      await API.post("/cart/add", { productId, qty: 1 });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Please login to shop");
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="w-full bg-[#FDFCFB] py-16 px-4 md:px-8 font-sans antialiased text-[#142d16]">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER & FILTERS --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#E8DCC4]/40 pb-10">
          {/* Title Area */}
          <div className="max-w-xl">
            <span className="text-[#142d16]/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
              Pro Gear
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#142d16] mb-4">
              Brewing Equipment
            </h2>
            <p className="text-[#142d16]/70 text-sm leading-relaxed max-w-md">
              Elevate your ritual with precision tools. From burr grinders to
              goose-neck kettles, curated for the perfect extraction.
            </p>
          </div>

          {/* Filter Bar (No "All" button) */}
          <div className="flex flex-wrap gap-2">
            {subCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterToggle(cat)}
                className={`
                  px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border flex items-center gap-2
                  ${
                    activeFilter === cat
                      ? "bg-[#142d16] text-white border-[#142d16] shadow-lg transform -translate-y-1"
                      : "bg-transparent text-[#4B3621]/50 border-[#E8DCC4] hover:border-[#142d16] hover:text-[#142d16]"
                  }
                `}
              >
                {cat}
                {activeFilter === cat && <XMarkIcon className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="group cursor-pointer flex flex-col gap-5"
              >
                {/* Image & Overlay */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[#E8DCC4]/30 transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(45,79,30,0.15)] group-hover:-translate-y-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-700 ease-out group-hover:scale-105 p-6"
                  />

                  {/* Quick Add Button */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button
                      onClick={(e) => handleAddToCart(e, p._id)}
                      className="w-full bg-white/90 backdrop-blur-md text-[#2D4F1E] py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#2D4F1E] hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Add to Cart</span>
                      <PlusIcon />
                    </button>
                  </div>

                  {/* Sub-Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF9F6]/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#2D4F1E] border border-[#2D4F1E]/5">
                      {p.subCategory || "Gear"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-black leading-none group-hover:text-[#2D4F1E]/70 transition-colors">
                      {p.name}
                    </h3>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-3 h-3 text-[#D4A373] fill-[#D4A373]"
                        />
                      ))}
                      <span className="text-[#A3B899] text-[10px] font-bold uppercase tracking-widest ml-1">
                        (4.9)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#4B3621]">
                      ₹{p.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="py-32 text-center border-2 border-dashed border-[#E8DCC4] rounded-[3rem]">
            <AdjustmentsHorizontalIcon className="w-12 h-12 text-[#142d16]/20 mx-auto mb-4" />
            <p className="font-serif text-2xl text-[#4B3621]/40 italic mb-4">
              No equipment found in{" "}
              <span className="font-bold">"{activeFilter}"</span>.
            </p>
            <button
              onClick={() => {
                setActiveFilter(null);
                setFilteredProducts(allProducts);
              }}
              className="text-xs font-bold uppercase tracking-widest border-b border-[#2D4F1E] text-[#2D4F1E] pb-1 hover:opacity-70"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Custom Skeleton for this Component ---
const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
    <div className="flex flex-col md:flex-row gap-8 mb-16 border-b border-gray-100 pb-10">
      <div className="space-y-4 w-full md:w-1/2">
        <div className="h-4 w-24 bg-stone-100 rounded" />
        <div className="h-12 w-3/4 bg-stone-100 rounded" />
      </div>
      <div className="w-full md:w-1/2 h-10 bg-stone-100 rounded-full" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="aspect-[4/5] bg-stone-100 rounded-[2rem] mb-5" />
          <div className="h-5 w-3/4 bg-stone-100 rounded mb-2" />
          <div className="h-4 w-1/3 bg-stone-100 rounded" />
        </div>
      ))}
    </div>
  </div>
);

export default EquipmentProduct;
