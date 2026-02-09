import { useEffect, useState } from "react";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart/add", { productId });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Login required ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#4b3621]">Our Roasts</h1>
          <p className="text-[#a3b899] uppercase tracking-widest text-xs mt-2 font-bold">Directly from the farm to your cup</p>
        </header>

        {loading ? (
          <div className="animate-pulse flex gap-6">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white border border-[#e8dcc4]/30 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/5 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id); }}
                      className="w-full bg-white/90 backdrop-blur-md text-[#4b3621] py-3 rounded-2xl font-bold text-xs uppercase shadow-lg hover:bg-[#4b3621] hover:text-white transition-colors"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-[#4b3621]">{product.name}</h3>
                    <p className="text-[#a3b899] text-[10px] uppercase font-bold tracking-tighter">Whole Bean | 250g</p>
                  </div>
                  <p className="text-[#2d4f1e] font-serif font-bold">₹{product.price}</p>
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