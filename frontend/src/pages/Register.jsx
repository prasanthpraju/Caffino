 import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#e8dcc4] overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#2d4f1e] p-8 text-center relative">
          <div className="absolute top-4 right-4 opacity-20">
             {/* Simple Coffee Bean Icon Placeholder */}
             <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M18.5,3H6C4.9,3,4,3.9,4,5v14c0,1.1,0.9,2,2,2h12.5c1.9,0,3.5-1.6,3.5-3.5V6.5C22,4.6,20.4,3,18.5,3z M18.5,19H6V5h12.5 c0.8,0,1.5,0.7,1.5,1.5v9c0,0.8-0.7,1.5-1.5,1.5h-1v2H18.5z"/></svg>
          </div>
          <h2 className="text-3xl font-serif text-[#fdfaf7] font-bold">Join the Brew</h2>
          <p className="text-[#a3b899] mt-2 text-sm uppercase tracking-widest">Unlock exclusive rewards</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#4b3621] mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Barista Enthusiast"
              className="w-full px-4 py-3 rounded-xl border border-[#e8dcc4] focus:ring-2 focus:ring-[#2d4f1e] focus:border-transparent outline-none transition-all"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4b3621] mb-1">Email Address</label>
            <input
              type="email"
              placeholder="hello@coffee.com"
              className="w-full px-4 py-3 rounded-xl border border-[#e8dcc4] focus:ring-2 focus:ring-[#2d4f1e] focus:border-transparent outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#4b3621] mb-1">Create Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#e8dcc4] focus:ring-2 focus:ring-[#2d4f1e] focus:border-transparent outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mt-2 text-[10px] text-stone-400">Must be at least 8 characters long.</p>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-[#2d4f1e] hover:bg-[#1f3814] text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Start Your Journey"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#e8dcc4]"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400 font-medium">Or</span></div>
          </div>

          <p className="text-center text-sm text-[#4b3621]">
            Already a member? 
            <button 
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#2d4f1e] font-bold ml-1 hover:underline underline-offset-4"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;