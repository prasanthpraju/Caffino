import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, StarIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
    setLoading(true);
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart/add", { productId: product._id, qty });
      alert(`Added ${qty} ${product.name} to cart 🛒`);
    } catch (err) {
      alert("Please login to shop 🔒");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D4F1E]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 text-center">
      <h2 className="text-2xl font-serif font-bold text-[#4B3621]">Product Not Found</h2>
      <button onClick={() => navigate("/shop")} className="mt-4 text-[#2D4F1E] underline">Back to Shop</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 md:px-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A3B899] hover:text-[#2D4F1E] mb-12 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Image Section */}
          <div className="relative">
            <div className="aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden border border-[#E8DCC4]/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)] sticky top-32">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-[#FAF9F6]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#2D4F1E]/10 shadow-sm">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#2D4F1E]">
                   {product.category || "Signature Roast"}
                 </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Details Section */}
          <div className="flex flex-col h-full pt-4">
            
            {/* Header */}
            <div className="mb-8 border-b border-[#E8DCC4]/40 pb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#A3B899] text-[10px] font-black uppercase tracking-[0.2em]">
                  {product.subCategory || "Whole Bean"}
                </span>
                <div className="h-px w-8 bg-[#E8DCC4]" />
                <div className="flex text-[#E8DCC4]">
                   {[...Array(5)].map((_, i) => (
                     <StarIconSolid key={i} className={`h-3 w-3 ${i < 4 ? "text-[#D9534F]" : ""}`} />
                   ))}
                   <span className="text-[10px] text-[#4B3621] ml-2 font-bold">(4.8)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2D4F1E] tracking-tight leading-tight mb-6">
                {product.name}
              </h1>

              <div className="flex items-end gap-4">
                <span className="text-3xl font-serif font-bold text-[#4B3621]">
                  ₹{product.price}
                </span>
                <span className="text-sm text-[#A3B899] font-bold line-through mb-1.5 decoration-red-400/50">
                   ₹{(product.price * 1.2).toFixed(0)}
                </span>
              </div>
            </div>

            {/* Description Tab System */}
            <div className="mb-10">
              <div className="flex gap-8 border-b border-[#E8DCC4]/30 mb-6">
                {["description", "details", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? "text-[#2D4F1E] border-b-2 border-[#2D4F1E]" 
                        : "text-[#4B3621]/40 hover:text-[#4B3621]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[100px] text-[#4B3621]/80 leading-relaxed font-medium">
                {activeTab === "description" && (
                  <p>{product.description || "A rich, complex blend featuring notes of dark chocolate and roasted hazelnut. Perfectly balanced for both espresso and filter brewing methods."}</p>
                )}
                {activeTab === "details" && (
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Origin:</strong> Ethically sourced (Single Origin)</li>
                    <li>• <strong>Roast Level:</strong> Medium-Dark</li>
                    <li>• <strong>Process:</strong> Washed & Sun-dried</li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p className="text-sm">Free shipping on orders over ₹999. Usually ships within 24 hours in eco-friendly packaging.</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto bg-white p-6 rounded-[2rem] border border-[#E8DCC4]/50 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Qty Selector */}
                <div className="flex items-center justify-between bg-[#F5F2EF] rounded-xl px-4 py-3 sm:w-32">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="text-[#2D4F1E] font-bold text-lg hover:opacity-60"
                  >
                    −
                  </button>
                  <span className="font-serif font-bold text-[#4B3621]">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="text-[#2D4F1E] font-bold text-lg hover:opacity-60"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2D4F1E] text-white py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-[#2D4F1E]/20 hover:bg-[#1a3310] hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  Add to Cart — ₹{product.price * qty}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#E8DCC4]/30">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#A3B899]">
                    <ShieldCheckIcon className="h-4 w-4" /> Secure Payment
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#A3B899]">
                    <TruckIcon className="h-4 w-4" /> Fast Delivery
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;