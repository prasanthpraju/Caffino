// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // login | register | null

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    setActiveModal(null);
    return res.data.user;
  };

  // REGISTER
  const register = async (name, email, password) => {
    await API.post("/auth/register", { name, email, password });
    setActiveModal("login");
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // MODAL CONTROLS
  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        activeModal,
        openLogin,
        openRegister,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
