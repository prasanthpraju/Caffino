 import { Link } from "react-router-dom";
import { PlusIcon, ArchiveBoxIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const adminActions = [
    {
      title: "Add New Roast",
      desc: "List a new coffee blend or accessory to the storefront.",
      path: "/admin/add-product",
      icon: <PlusIcon className="h-8 w-8" />,
    },
    {
      title: "Manage Inventory",
      desc: "Update prices, check stock levels, or remove products.",
      path: "/admin/products",
      icon: <ArchiveBoxIcon className="h-8 w-8" />,
    },
    {
      title: "View Orders",
      desc: "Track customer purchases and fulfillment status.",
      path: "/admin/orders",
      icon: <ShoppingBagIcon className="h-8 w-8" />,
    },
  ];

  return (
    // FIXED: Added pt-32 to prevent Navbar overlap
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-12 px-6 md:px-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 border-b border-[#E8DCC4]/40 pb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2D4F1E] tracking-tight mb-3">
            Admin Command Center
          </h2>
          <p className="text-[#4B3621]/60 text-xs font-bold uppercase tracking-[0.2em]">
            Overview & Management Tools
          </p>
        </header>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminActions.map((action, index) => (
            <Link
              key={action.path}
              to={action.path}
              className="group relative flex flex-col items-start p-10 bg-white rounded-[2.5rem] border border-[#E8DCC4]/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:border-[#2D4F1E]/30 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#FAF9F6] rounded-full group-hover:bg-[#2D4F1E]/5 transition-colors duration-500" />

              {/* Icon Container */}
              <div className="relative z-10 h-16 w-16 rounded-2xl bg-[#F5F2EF] text-[#4B3621] flex items-center justify-center mb-8 group-hover:bg-[#2D4F1E] group-hover:text-[#FDFCFB] transition-all duration-300 shadow-sm">
                {action.icon}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-[#2D4F1E] mb-3 group-hover:tracking-wide transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-[#4B3621]/60 text-sm font-medium leading-relaxed pr-4">
                  {action.desc}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="relative z-10 mt-auto pt-8 w-full flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#A3B899] group-hover:text-[#2D4F1E] transition-colors">
                  Select Action
                </span>
                <div className="h-8 w-8 rounded-full border border-[#E8DCC4] flex items-center justify-center group-hover:bg-[#2D4F1E] group-hover:border-[#2D4F1E] transition-all duration-300">
                   <span className="text-[#4B3621] group-hover:text-white transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;