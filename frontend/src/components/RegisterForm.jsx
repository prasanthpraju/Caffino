import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const { register, openLogin } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      openLogin();
    } catch {
      alert("Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Added 'pt-12' (top padding) to ensure Title never hits the Close 'X' button
    <div className="px-6 pb-8 pt-12 md:px-10 md:pb-10 md:pt-14 max-h-[85vh] overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#2D4F1E] mb-2 tracking-tight">
          Join the Brew
        </h2>
        <p className="text-[#A3B899] text-xs uppercase tracking-[0.2em] font-medium">
          Unlock exclusive perks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#4B3621] uppercase tracking-wider ml-1">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] bg-[#FAF9F6] text-[#2D4F1E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]/20 focus:border-[#2D4F1E] transition-all shadow-sm"
            placeholder="Jane Doe"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#4B3621] uppercase tracking-wider ml-1">
            Email Address
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] bg-[#FAF9F6] text-[#2D4F1E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]/20 focus:border-[#2D4F1E] transition-all shadow-sm"
            type="email"
            placeholder="hello@coffee.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#4B3621] uppercase tracking-wider ml-1">
            Create Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] bg-[#FAF9F6] text-[#2D4F1E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]/20 focus:border-[#2D4F1E] transition-all shadow-sm"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-[10px] text-[#A3B899] ml-1">
            Must be at least 8 characters.
          </p>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#2D4F1E] hover:bg-[#1f3814] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {loading ? "Creating Account..." : "Start Journey"}
        </button>
      </form>

      {/* Switcher */}
      <div className="mt-8 text-center pt-6 border-t border-[#E8DCC4]">
        <p className="text-sm text-[#4B3621]">
          Already a member?{" "}
          <button
            type="button"
            onClick={openLogin}
            className="font-bold text-[#2D4F1E] hover:underline underline-offset-4 ml-1 cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;