import { useEffect, useState } from "react";
import API from "../services/api";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/outline";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Logic
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart/add", { productId, qty: 1 });
      alert("Added to cart! 🛒");
    } catch (err) {
      alert("Please login to shop! 🔒");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-28 px-6 md:px-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#E8DCC4]/40 pb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2D4F1E] tracking-tight mb-3">
              Signature Collection
            </h1>
            <p className="text-[#4B3621]/60 text-xs font-bold uppercase tracking-[0.2em]">
              Small Batch • Ethically Sourced • Expertly Roasted
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-[#A3B899] font-serif italic text-lg">
              {products.length} blends available
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-100 aspect-[4/5] rounded-[2rem] mb-4"></div>
                <div className="h-4 bg-stone-100 w-3/4 rounded mb-2"></div>
                <div className="h-4 bg-stone-100 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                
                {/* Card Image Container */}
                <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden border border-[#E8DCC4]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-2">
                  
                  {/* Product Image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      className="w-full bg-white/90 backdrop-blur-md text-[#2D4F1E] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#2D4F1E] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                      Quick Add +
                    </button>
                  </div>

                  {/* Badge (Optional) */}
                  <div className="absolute top-5 left-5 bg-[#FAF9F6]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#2D4F1E]/10">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#2D4F1E]">
                       Fresh Roast
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-6 px-2 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif font-black text-[#2D4F1E] leading-tight tracking-tight mb-1 group-hover:text-[#4B3621] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[#A3B899]">
                        <StarIcon className="h-3 w-3 fill-current" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          4.8 (120)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#4B3621] font-serif">
                        ₹{product.price}
                      </p>
                    </div>
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

export default Shop;