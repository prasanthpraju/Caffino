import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openLogin, logout } = useContext(AuthContext);

  // Persist View Mode (Shop vs Admin)
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "shop"
  );

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("viewMode");
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const switchMode = () => {
    const next = viewMode === "shop" ? "admin" : "shop";
    setViewMode(next);
    setIsMobileMenuOpen(false);
    navigate(next === "admin" ? "/admin/products" : "/");
  };

  // --- IMPROVED STYLES ---
  // Using font-extrabold and tracking-wider for better legibility 
  // than font-bold and tracking-widest at small sizes.
  const navLinkStyles = ({ isActive }) =>
    `text-[13px] font-extrabold uppercase tracking-wider transition-all duration-300 antialiased ${
      isActive
        ? "text-[#2D4F1E] border-b-2 border-[#2D4F1E] pb-1"
        : "text-[#4B3621] hover:text-[#2D4F1E] hover:-translate-y-0.5"
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `text-xl font-serif font-black transition-colors antialiased ${
      isActive ? "text-[#2D4F1E]" : "text-[#4B3621]"
    }`;

  return (
    <nav className="fixed w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#2D4F1E]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="group flex flex-col leading-none">
          <span className="text-2xl md:text-3xl font-serif font-black text-[#2D4F1E] tracking-tight group-hover:opacity-80 transition-opacity antialiased">
            BREW<span className="italic text-[#4B3621] font-light">&</span>BASK
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkStyles}>Home</NavLink>
          <NavLink to="/shop" className={navLinkStyles}>Shop</NavLink>

          {user?.role === "admin" && viewMode === "admin" && (
            <NavLink to="/admin/products" className={navLinkStyles}>Inventory</NavLink>
          )}

          {/* Divider */}
          <div className="h-6 w-px bg-[#2D4F1E]/20 mx-2" />

          {/* Admin Switcher - Improved Visual Weight */}
          {user?.role === "admin" && (
            <button
              onClick={switchMode}
              className="flex items-center gap-2 px-5 py-2 text-[11px] font-black uppercase tracking-widest border-2 border-[#2D4F1E] text-[#2D4F1E] rounded-full hover:bg-[#2D4F1E] hover:text-white transition-all active:scale-95 antialiased"
            >
              <ArrowPathIcon className="h-3.5 w-3.5 stroke-[3px]" />
              {viewMode === "shop" ? "Switch to Admin" : "Back to Shop"}
            </button>
          )}

          {/* Auth & Cart */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-extrabold text-[#4B3621] hidden lg:block antialiased">
                  HI, {user.name.split(" ")[0].toUpperCase()}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="text-[#4B3621] hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 stroke-2" />
                </button>
              </div>
            ) : (
              <button 
                onClick={openLogin} 
                className="flex items-center gap-2 text-[13px] font-black text-[#2D4F1E] hover:underline underline-offset-4 antialiased"
              >
                <UserCircleIcon className="h-6 w-6 stroke-2" />
                LOGIN
              </button>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <ShoppingBagIcon className="h-7 w-7 text-[#2D4F1E] group-hover:scale-110 transition-transform stroke-2" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D9534F] text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-md ring-2 ring-[#FAF9F6] antialiased">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-[#2D4F1E] p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <XMarkIcon className="h-8 w-8 stroke-2" /> : <Bars3Icon className="h-8 w-8 stroke-2" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#FAF9F6] border-b border-[#2D4F1E]/10 shadow-2xl flex flex-col items-center py-12 gap-8 animate-fade-in-down z-40">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkStyles}>
            Shop
          </NavLink>
          
          {user?.role === "admin" && viewMode === "admin" && (
            <NavLink to="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkStyles}>
              Inventory
            </NavLink>
          )}

          {user?.role === "admin" && (
            <button
              onClick={switchMode}
              className="px-8 py-4 text-xs font-black uppercase tracking-widest border-2 border-[#2D4F1E] text-[#2D4F1E] rounded-full hover:bg-[#2D4F1E] hover:text-white transition-all antialiased"
            >
              {viewMode === "shop" ? "Switch to Admin" : "Back to Shop"}
            </button>
          )}

          <div className="w-20 h-px bg-[#2D4F1E]/20" />

          {user ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-xs antialiased"
            >
              Logout <ArrowRightOnRectangleIcon className="h-5 w-5 stroke-[3px]" />
            </button>
          ) : (
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openLogin(); }} 
              className="text-2xl font-serif font-black text-[#2D4F1E] antialiased"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;