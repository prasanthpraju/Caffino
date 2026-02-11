import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, AlertCircle, RefreshCw, Trash2, Edit, Plus } from "lucide-react";
import API from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch Logic
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
      setError("Unable to load pantry. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle Deletion with Optimistic UI & Rollback
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this roast?")) return;

    // 1. Snapshot previous state
    const previousProducts = [...products];

    // 2. Optimistic Update
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await API.delete(`/products/${id}`);
    } catch (err) {
      // 3. Rollback on failure (no need to re-fetch entire list)
      setProducts(previousProducts);
      alert("Could not delete product. Changes reverted.");
      console.error(err);
    }
  };

  // Memoized Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB] text-[#4B3621] gap-6">
        <div className="bg-red-50 p-6 rounded-full">
            <AlertCircle size={48} className="text-[#D9534F]" />
        </div>
        <h3 className="text-2xl font-serif font-black tracking-tight">{error}</h3>
        <button 
          onClick={loadProducts}
          className="cursor-pointer flex items-center gap-2 px-8 py-3 bg-[#4B3621] text-white rounded-full hover:bg-[#2D4F1E] transition-all shadow-lg hover:shadow-xl font-bold uppercase tracking-widest text-xs"
        >
          <RefreshCw size={16} /> Retry Connection
        </button>
      </div>
    );
  }

  return (
    // FIXED: Added pt-32 to prevent Navbar overlap
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-12 px-6 md:px-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-[#E8DCC4]/40 pb-8">
          <div className="w-full md:w-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2D4F1E] tracking-tight mb-2">Inventory</h2>
            <p className="text-[#4B3621]/60 text-xs font-bold uppercase tracking-[0.2em]">
              Manage your artisan collection
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative group w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B3621]/30 group-focus-within:text-[#2D4F1E] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search roasts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-[#E8DCC4]/50 rounded-full py-3 pl-12 pr-6 text-sm font-bold text-[#4B3621] placeholder:text-[#4B3621]/30 focus:outline-none focus:border-[#2D4F1E] focus:ring-0 transition-all shadow-sm hover:border-[#2D4F1E]/30"
              />
            </div>

            <button 
              onClick={() => navigate("/admin/add-product")}
              className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2D4F1E] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.15em] hover:bg-[#1a3310] transition-all shadow-lg shadow-[#2D4F1E]/20 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={3} /> New Roast
            </button>
          </div>
        </header>

        {/* Modern List View (Cards on Mobile, Table on Desktop) */}
        <div className="bg-white rounded-[2.5rem] border border-[#E8DCC4]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#F5F2EF] text-[#4B3621]/60 text-[10px] uppercase tracking-[0.2em] font-black border-b border-[#E8DCC4]">
                <tr>
                  <th className="py-6 px-8 w-[45%]">Product Information</th>
                  <th className="py-6 px-6 w-[15%]">Price</th>
                  <th className="py-6 px-6 w-[20%]">Availability</th>
                  <th className="py-6 px-8 text-right w-[20%]">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC4]/30">
                
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-8 flex gap-6">
                        <div className="w-20 h-20 bg-stone-100 rounded-2xl"></div>
                        <div className="space-y-3 pt-2">
                           <div className="h-5 w-48 bg-stone-100 rounded-md"></div>
                           <div className="h-3 w-24 bg-stone-100 rounded-md"></div>
                        </div>
                      </td>
                      <td className="p-8"><div className="h-5 w-16 bg-stone-100 rounded-md"></div></td>
                      <td className="p-8"><div className="h-8 w-24 bg-stone-100 rounded-full"></div></td>
                      <td className="p-8"></td>
                    </tr>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4 text-[#4B3621]/30">
                        <div className="bg-[#FAF9F6] p-6 rounded-full">
                           <Search size={40} strokeWidth={1.5} />
                        </div>
                        <p className="font-serif text-xl font-bold text-[#4B3621]">
                          {searchTerm ? `No matches for "${searchTerm}"` : "Your inventory is empty."}
                        </p>
                        <p className="text-xs uppercase tracking-widest font-bold">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p._id} className="group hover:bg-[#FAF9F6] transition-colors duration-300">
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-6">
                          {/* Image Thumbnail */}
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-[#E8DCC4] shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                            <img src={p.image} className="w-full h-full object-cover mix-blend-multiply" alt={p.name} loading="lazy" />
                          </div>
                          {/* Text Details */}
                          <div className="flex flex-col">
                            <span className="font-serif font-bold text-xl text-[#2D4F1E] tracking-tight group-hover:text-[#4B3621] transition-colors mb-1">
                                {p.name}
                            </span>
                            <span className="text-[10px] text-[#A3B899] font-black uppercase tracking-wider bg-[#2D4F1E]/5 px-2 py-1 rounded w-fit">
                                ID: {p._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-6 px-6">
                         <span className="font-serif font-black text-lg text-[#4B3621]">
                            ₹{p.price}
                         </span>
                      </td>

                      <td className="py-6 px-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                          p.stock > 10 
                            ? 'bg-[#EBF5EA] text-[#2D4F1E] border-[#2D4F1E]/10' 
                            : p.stock > 0
                            ? 'bg-[#FFF4E5] text-orange-700 border-orange-100'
                            : 'bg-red-50 text-[#D9534F] border-red-100'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            p.stock > 10 ? 'bg-[#2D4F1E] animate-pulse' : p.stock > 0 ? 'bg-orange-500' : 'bg-[#D9534F]'
                          }`}></span>
                          {p.stock > 0 ? `${p.stock} In Stock` : 'Sold Out'}
                        </span>
                      </td>

                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={() => navigate(`/admin/edit/${p._id}`)}
                            title="Edit Product"
                            className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#E8DCC4] text-[#4B3621] hover:bg-[#2D4F1E] hover:text-white hover:border-[#2D4F1E] transition-all shadow-sm hover:shadow-md"
                          >
                            <Edit size={16} strokeWidth={2.5} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(p._id)} 
                            title="Remove Product"
                            className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white border border-red-100 text-[#D9534F] hover:bg-[#D9534F] hover:text-white hover:border-[#D9534F] transition-all shadow-sm hover:shadow-md"
                          >
                            <Trash2 size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;