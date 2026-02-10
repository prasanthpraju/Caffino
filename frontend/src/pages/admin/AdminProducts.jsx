  import { useEffect, useState, useMemo, useCallback } from "react";
  import { useNavigate } from "react-router-dom";
  import { Search, AlertCircle, RefreshCw, Trash2, Edit, Plus } from "lucide-react"; // Assuming you use lucide-react or similar
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB] text-[#4B3621] gap-4">
          <AlertCircle size={48} className="text-red-400" />
          <h3 className="text-xl font-bold font-serif">{error}</h3>
          <button 
            onClick={loadProducts}
            className="flex items-center gap-2 px-6 py-2 bg-[#4B3621] text-white rounded-full hover:bg-[#3d2c1b]"
          >
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#4B3621]">Inventory Management</h2>
              <p className="text-[#A3B899] text-xs uppercase tracking-widest mt-1 font-semibold">
                Adjust stock, pricing, and product details
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative group w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#4B3621] transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search roast..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-[#E8DCC4] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#4B3621] transition-colors shadow-sm"
                />
              </div>

              <button 
                onClick={() => navigate("/admin/add")}
                className="flex items-center gap-2 bg-[#4B3621] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d2c1b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Plus size={14} /> New Roast
              </button>
            </div>
          </header>

          {/* Table Container */}
          <div className="bg-white rounded-[2rem] border border-[#E8DCC4] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F5F2EF] text-[#4B3621] text-[10px] uppercase tracking-[0.2em] font-bold">
                  <tr>
                    <th className="p-6">Product Details</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Stock Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  
                  {/* Loading State */}
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="p-6 flex gap-4"><div className="w-12 h-12 bg-stone-200 rounded-xl"></div><div className="h-4 w-32 bg-stone-200 rounded mt-4"></div></td>
                        <td className="p-6"><div className="h-4 w-12 bg-stone-200 rounded"></div></td>
                        <td className="p-6"><div className="h-6 w-20 bg-stone-200 rounded-full"></div></td>
                        <td className="p-6"></td>
                      </tr>
                    ))
                  ) : filteredProducts.length === 0 ? (
                    /* Empty State */
                    <tr>
                      <td colSpan="4" className="p-20 text-center">
                        <div className="flex flex-col items-center gap-3 text-stone-400">
                          <Search size={32} className="opacity-20" />
                          <p className="font-serif italic">
                            {searchTerm ? `No roasts found matching "${searchTerm}"` : "The pantry is empty."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    /* Product List */
                    filteredProducts.map((p) => (
                      <tr key={p._id} className="hover:bg-stone-50/50 transition-colors group">
                        <td className="p-6 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/50 shrink-0">
                            <img src={p.image} className="w-full h-full object-cover" alt={p.name} loading="lazy" />
                          </div>
                          <div>
                            <span className="font-bold text-[#4B3621] block">{p.name}</span>
                            <span className="text-[10px] text-stone-400 font-mono uppercase">{p._id.slice(-6)}</span>
                          </div>
                        </td>
                        <td className="p-6 text-[#2D4F1E] font-medium font-serif">₹{p.price}</td>
                        <td className="p-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                            p.stock > 10 
                              ? 'bg-green-50 text-green-700 border-green-100' 
                              : p.stock > 0
                              ? 'bg-orange-50 text-orange-700 border-orange-100'
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              p.stock > 10 ? 'bg-green-500' : p.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                            }`}></span>
                            {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                            <button 
                              onClick={() => navigate(`/admin/edit/${p._id}`)}
                              title="Edit Product"
                              className="text-[#4B3621] hover:bg-stone-100 p-2 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(p._id)} 
                              title="Remove Product"
                              className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
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