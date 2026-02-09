import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const placeCOD = async () => {
    await API.post("/orders", {
      address,
      paymentMethod: "COD",
    });
    alert("Order placed (COD)");
    navigate("/");
  };

  return (
    <div>
      <h2>Checkout</h2>

      <textarea
        placeholder="Delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={placeCOD}>Cash on Delivery</button>
    </div>
  );
};

export default Checkout;
