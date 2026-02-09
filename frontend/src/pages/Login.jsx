import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7] px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#2d4f1e]/10 rounded-full -translate-x-16 -translate-y-16" />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#e8dcc4] overflow-hidden">
        <div className="bg-[#2d4f1e] p-8 text-center">
          <h2 className="text-3xl font-serif text-[#fdfaf7] font-bold">
            Welcome Back
          </h2>
          <p className="text-[#a3b899] mt-2 text-sm uppercase tracking-widest">
            The beans are brewing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#4b3621] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="coffee@lover.com"
              className="w-full px-4 py-3 rounded-lg border border-[#e8dcc4] focus:ring-2 focus:ring-[#2d4f1e] focus:border-transparent outline-none transition-all placeholder:text-stone-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-[#4b3621]">
                Password
              </label>
              <span className="text-xs text-[#2d4f1e] hover:underline cursor-pointer">
                Forgot?
              </span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-[#e8dcc4] focus:ring-2 focus:ring-[#2d4f1e] focus:border-transparent outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-[#4b3621] hover:bg-[#362719] text-[#fdfaf7] font-semibold py-3 rounded-lg transition-colors shadow-lg active:transform active:scale-[0.98]">
            Sign In
          </button>

          <p className="text-center text-sm text-stone-500">
            Don't have an account?
            <span className="text-[#2d4f1e] font-bold ml-1 cursor-pointer hover:underline">
              Join the Club
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
