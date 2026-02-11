import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openLogin, logout } = useContext(AuthContext);

  // Persist View Mode (Shop vs Admin)
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") || "shop",
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
    const nextMode = viewMode === "shop" ? "admin" : "shop";

    setViewMode(nextMode);
    localStorage.setItem("viewMode", nextMode);
    setIsMobileMenuOpen(false);

    if (nextMode === "admin") {
      navigate("/admin"); // 🔥 ALWAYS go here
    } else {
      navigate("/");
    }
  };

  // --- STYLES ---
  const navLinkStyles = ({ isActive }) =>
    `relative text-[12px] font-extrabold uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 antialiased py-2 group ${
      isActive ? "text-[#2D4F1E]" : "text-[#4B3621] hover:text-[#2D4F1E]"
    }`;

  const linkUnderline = (isActive) => (
    <span
      className={`absolute bottom-0 left-0 h-[2px] bg-[#2D4F1E] transition-all duration-300 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  );

  const mobileLinkStyles = ({ isActive }) =>
    `text-2xl font-serif font-bold tracking-tight cursor-pointer transition-colors antialiased ${
      isActive ? "text-[#2D4F1E] italic" : "text-[#4B3621]"
    }`;

  return (
    <nav className="fixed w-full z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#2D4F1E]/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO SECTION - Updated to include Image */}
        <Link to="/" className="group flex items-center gap-3 cursor-pointer">
          {/* LOGO IMAGE */}
          {/* Replace src with your actual logo file path (e.g., /assets/logo.png) */}
          <img
            src="https://placehold.co/100x100/2D4F1E/FAF9F6?text=B"
            alt="Brew & Bask Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm"
          />

          {/* LOGO TEXT */}
          <div className="flex flex-col items-start leading-none">
            <span className="text-2xl md:text-3xl font-serif font-black text-[#2D4F1E] tracking-tighter group-hover:opacity-80 transition-opacity antialiased">
              BREW
              <span className="italic text-[#4B3621] font-light mx-0.5">&</span>
              BASK
            </span>
            <span className="text-[8px] md:text-[9px] font-sans font-bold tracking-[0.3em] text-[#4B3621]/60 uppercase mt-0.5 ml-1">
              Est. 2024
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {/* Main Navigation */}
          <div className="flex items-center gap-8">
            <NavLink to="/" end className={navLinkStyles}>
              {({ isActive }) => <>Home {linkUnderline(isActive)}</>}
            </NavLink>
            <NavLink to="/shop" className={navLinkStyles}>
              {({ isActive }) => <>Shop {linkUnderline(isActive)}</>}
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              {({ isActive }) => <>About {linkUnderline(isActive)}</>}
            </NavLink>
            <NavLink to="/contact" className={navLinkStyles}>
              {({ isActive }) => <>Contact {linkUnderline(isActive)}</>}
            </NavLink>

            {user?.role === "admin" && viewMode === "admin" && (
              <NavLink to="/admin" className={navLinkStyles}>
                {({ isActive }) => <>Inventory {linkUnderline(isActive)}</>}
              </NavLink>
            )}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-[#2D4F1E]/10" />

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            {/* Admin Switcher */}
            {user?.role === "admin" && (
              <button
                onClick={switchMode}
                className="cursor-pointer flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border border-[#2D4F1E]/30 text-[#2D4F1E] hover:bg-[#2D4F1E] hover:text-white transition-all active:scale-95 antialiased"
              >
                <ArrowPathIcon className="h-3 w-3" />
                {viewMode === "shop" ? "Admin" : "Shop"}
              </button>
            )}

            {/* Auth State */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex flex-col items-end leading-tight">
                  <span className="text-[10px] text-[#4B3621]/60 font-bold uppercase tracking-widest">
                    Welcome
                  </span>
                  <span className="text-[12px] font-extrabold text-[#2D4F1E] uppercase tracking-wide">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-[#4B3621] hover:text-[#D9534F] hover:bg-red-50 p-2 rounded-full transition-all"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 stroke-2" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="cursor-pointer flex items-center gap-2 text-[12px] font-extrabold tracking-widest text-[#2D4F1E] hover:opacity-70 transition-opacity antialiased"
              >
                <UserCircleIcon className="h-6 w-6 stroke-[1.5]" />
                LOGIN
              </button>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative group cursor-pointer">
              <div className="p-2 group-hover:bg-[#2D4F1E]/5 rounded-full transition-colors">
                <ShoppingBagIcon className="h-6 w-6 text-[#2D4F1E] stroke-[1.5]" />
              </div>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D9534F] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm ring-2 ring-[#FAF9F6]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden cursor-pointer text-[#2D4F1E] p-2 hover:bg-[#2D4F1E]/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7 stroke-2" />
          ) : (
            <Bars3Icon className="h-7 w-7 stroke-2" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full h-screen bg-[#FAF9F6] flex flex-col items-center pt-12 pb-24 gap-6 z-40 animate-fade-in-down overflow-y-auto">
          <div className="flex flex-col items-center gap-6 w-full">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkStyles}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkStyles}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkStyles}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkStyles}
            >
              Contact
            </NavLink>

            {user?.role === "admin" && viewMode === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkStyles}
              >
                Inventory
              </NavLink>
            )}
          </div>

          <div className="w-16 h-px bg-[#2D4F1E]/10 my-4" />

          {/* Mobile Actions */}
          <div className="flex flex-col items-center gap-6">
            {user?.role === "admin" && (
              <button
                onClick={switchMode}
                className="cursor-pointer px-6 py-3 text-xs font-black uppercase tracking-[0.2em] border border-[#2D4F1E] text-[#2D4F1E] hover:bg-[#2D4F1E] hover:text-white transition-all"
              >
                {viewMode === "shop" ? "Switch to Admin" : "Back to Shop"}
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-sm"
              >
                Logout <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLogin();
                }}
                className="cursor-pointer text-xl font-serif font-black text-[#2D4F1E] border-b-2 border-[#2D4F1E]/20 pb-1"
              >
                Login Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
