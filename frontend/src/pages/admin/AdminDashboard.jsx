import { Link } from "react-router-dom";
import { PlusIcon, ArchiveBoxIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const adminActions = [
    {
      title: "Add New Roast",
      desc: "List a new coffee blend or accessory to the storefront.",
      path: "/admin/add-product",
      icon: <PlusIcon className="h-6 w-6" />,
    },
    {
      title: "Manage Inventory",
      desc: "Update prices, check stock levels, or remove products.",
      path: "/admin/products",
      icon: <ArchiveBoxIcon className="h-6 w-6" />,
    },
    {
      title: "View Orders",
      desc: "Track customer purchases and fulfillment status.",
      path: "/admin/orders",
      icon: <ShoppingBagIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-[#E8DCC4] pb-8">
          <h2 className="text-4xl font-serif font-bold text-[#4B3621]">Admin Command Center</h2>
          <p className="text-[#A3B899] text-xs uppercase tracking-[0.2em] font-semibold mt-2">
            Inventory & Shop Management
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="group relative p-8 bg-white border border-[#E8DCC4] rounded-3xl transition-all duration-300 hover:border-[#2D4F1E] hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[#F5F2EF] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2D4F1E] group-hover:text-white transition-colors duration-300">
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-[#4B3621] mb-2">{action.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {action.desc}
              </p>
              <div className="mt-6 flex items-center text-[#2D4F1E] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Manage Section 
                <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;