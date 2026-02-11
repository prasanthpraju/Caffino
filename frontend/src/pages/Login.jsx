import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const user = await login(email, password);

    // 🔥 ROLE BASED REDIRECT
    if (user.role === "admin") {
      localStorage.setItem("viewMode", "admin");
      navigate("/admin");   // ✅ go directly to admin dashboard
    } else {
      localStorage.setItem("viewMode", "shop");
      navigate(redirectTo); // normal user
    }

  } catch (err) {
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
};

export default Login;
