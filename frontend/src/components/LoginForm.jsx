import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const { login, openRegister } = useContext(AuthContext); // ✅ Get openRegister

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      localStorage.setItem("viewMode", "shop");
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#2D4F1E] mb-2">Welcome Back</h2>
        <p className="text-[#A3B899] text-sm uppercase tracking-widest">
          Continue your coffee journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] bg-[#FAF9F6] text-[#2D4F1E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]/20 focus:border-[#2D4F1E] transition-all"
              placeholder="barista@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4B3621] uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-[#E8DCC4] bg-[#FAF9F6] text-[#2D4F1E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]/20 focus:border-[#2D4F1E] transition-all"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#2D4F1E] hover:bg-[#1f3814] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Brewing Access..." : "Sign In"}
        </button>
      </form>

      {/* Switcher */}
      <div className="mt-8 text-center pt-6 border-t border-[#E8DCC4]">
        <p className="text-sm text-[#4B3621]">
          New to the club?{" "}
          <button
            onClick={openRegister}
            className="font-bold text-[#2D4F1E] hover:underline underline-offset-4 ml-1"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;