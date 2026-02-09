 import { useEffect, useState } from "react";
import API from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to remove this roast from the inventory?")) {
      try {
        await API.delete(`/products/${id}`);
        loadProducts();
      } catch (err) {
        alert("Could not delete product.");
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#4B3621]">Active Inventory</h2>
            <p className="text-[#A3B899] text-xs uppercase tracking-widest mt-1 font-semibold">
              Manage your stock levels and pricing
            </p>
          </div>
          <div className="text-[#4B3621]/40 text-[10px] font-bold uppercase tracking-tighter">
            {products.length} Items Listed
          </div>
        </header>

        <div className="bg-white rounded-[2rem] border border-[#E8DCC4] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F5F2EF] text-[#4B3621] text-[10px] uppercase tracking-[0.2em] font-bold">
                <tr>
                  <th className="p-6">Product Details</th>
                  <th className="p-6">Price</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-stone-400 italic font-serif">
                      Reviewing the pantry...
                    </td>
                  </tr>
                ) : products.map((p) => (
                  <tr key={p._id} className="hover:bg-stone-50/50 transition-colors group">
                    <td className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/50">
                        <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <span className="font-bold text-[#4B3621]">{p.name}</span>
                    </td>
                    <td className="p-6 text-[#2D4F1E] font-medium font-serif">₹{p.price}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                        p.stock > 10 
                          ? 'bg-green-50 text-green-700 border border-green-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${p.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => deleteProduct(p._id)} 
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest transition-all p-2 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;