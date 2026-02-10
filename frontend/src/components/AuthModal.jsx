import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = () => {
  const { activeModal, closeModal } = useContext(AuthContext);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-md">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3"
        >
          ✕
        </button>

        {activeModal === "login" && <LoginForm />}
        {activeModal === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;
