import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // State for filters
  const [category, setCategory] = useState("coffee");
  const [subCategory, setSubCategory] = useState("decaf");

  // Data for Filters
  const categories = [
    { id: "coffee", label: "Coffee" },
    { id: "equipment", label: "Equipment" },
    { id: "accessories", label: "Accessories" },
  ];

  // Map sub-categories to main categories
  const subCategoryMap = {
    coffee: ["Espresso", "Filter", "Cold Brew", "Blends", "Decaf"],
    equipment: ["Grinders", "Machines", "Kettles", "Scales"],
    accessories: ["Cups", "Filters", "Storage", "Maintenance"],
  };

  // Fetch Logic
  useEffect(() => {
    setLoading(true);

    // Using 'params' object is cleaner than string concatenation
    API.get("/products", {
      params: {
        category,
        // Only include subCategory if it's not empty
        ...(subCategory && { subCategory: subCategory.toLowerCase() }),
      },
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, subCategory]);

  // Handlers
  const handleCategoryChange = (newCategory) => {
    if (category === newCategory) return;
    setCategory(newCategory);
    setSubCategory(""); // Reset sub-category when switching main category
  };

  const handleSubCategoryToggle = (sub) => {
    // Toggle off if already selected, otherwise set new
    setSubCategory((prev) => (prev === sub ? "" : sub));
  };

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart/add", { productId, qty: 1 });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Login required ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-24 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header & Main Filters */}
        <header className="flex flex-col items-start gap-8 border-b border-[#E8DCC4]/30 pb-8 mb-12">
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2D4F1E] tracking-tight mb-2">
                Our Collection
              </h1>
              <p className="text-[#4B3621]/60 uppercase tracking-[0.2em] text-xs font-bold">
                Directly from the farm to your cup
              </p>
            </div>

            {/* Main Category Tabs */}
            <div className="flex bg-white p-1.5 rounded-full border border-[#E8DCC4] shadow-sm overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    category === cat.id
                      ? "bg-[#2D4F1E] text-white shadow-md transform scale-105"
                      : "text-[#4B3621] hover:bg-[#FAF9F6] hover:text-[#2D4F1E]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Category Chips */}
          {subCategoryMap[category] && (
            <div className="w-full flex flex-wrap gap-3 animate-fade-in">
              {subCategoryMap[category].map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryToggle(sub)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all duration-200 active:scale-95 ${
                    subCategory === sub
                      ? "bg-[#A3B899] text-[#2D4F1E] border-[#A3B899]"
                      : "bg-transparent text-[#4B3621]/60 border-[#E8DCC4] hover:border-[#2D4F1E]/30 hover:text-[#2D4F1E]"
                  }`}
                >
                  {sub}
                  {subCategory === sub && <span className="ml-2">✕</span>}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-stone-100 rounded-[2rem] mb-4"></div>
                <div className="h-4 bg-stone-100 w-3/4 rounded mb-2"></div>
                <div className="h-3 bg-stone-100 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-[#E8DCC4] rounded-[2rem]">
            <p className="text-[#4B3621]/40 font-serif text-2xl italic mb-2">
              No products found.
            </p>
            <p className="text-[#A3B899] text-xs font-bold uppercase tracking-widest">
              Try selecting a different category
            </p>
            <button
              onClick={() => {
                setSubCategory("");
              }}
              className="mt-6 text-[#2D4F1E] font-bold text-xs uppercase border-b-2 border-[#2D4F1E] pb-0.5 hover:opacity-70"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="group cursor-pointer"
              >
                {/* Image Card */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white border border-[#E8DCC4]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/5 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      className="w-full bg-white/95 backdrop-blur-md text-[#2D4F1E] py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#2D4F1E] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                      Quick Add +
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[#FAF9F6]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#2D4F1E]/10 text-[9px] font-black uppercase tracking-widest text-[#2D4F1E] w-fit">
                      {product.subCategory || category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 flex justify-between items-start px-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-serif font-black text-[#2D4F1E] leading-none tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-[#A3B899] text-[10px] uppercase font-bold tracking-wider">
                      250g
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#4B3621]/40 font-bold line-through decoration-red-400/50">
                      ₹{(product.price * 1.2).toFixed(0)}
                    </span>
                    <span className="text-lg font-black text-[#4B3621]">
                      ₹{product.price}
                    </span>
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

export default Products;
