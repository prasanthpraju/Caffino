 import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#4B3621]">Admin Command Center</h2>
          <p className="text-[#A3B899] text-sm uppercase tracking-widest mt-1">Inventory & Shop Management</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/add-product" className="group p-8 bg-white border border-[#E8DCC4] rounded-3xl hover:border-[#2D4F1E] transition-all hover:shadow-xl hover:bg-[#FDFCFB]">
            <div className="w-12 h-12 bg-[#F5F2EF] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2D4F1E] group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#4B3621]">Add New Roast</h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">List a new coffee blend or accessory to the storefront.</p>
          </Link>

          <Link to="/admin/products" className="group p-8 bg-white border border-[#E8DCC4] rounded-3xl hover:border-[#2D4F1E] transition-all hover:shadow-xl hover:bg-[#FDFCFB]">
            <div className="w-12 h-12 bg-[#F5F2EF] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2D4F1E] group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#4B3621]">Manage Inventory</h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">Update prices, check stock levels, or remove products.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;