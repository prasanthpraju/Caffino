import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { ChevronLeftIcon, TruckIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return alert("Please enter a delivery address.");

    setIsSubmitting(true);
    try {
      await API.post("/api/orders", {
        address,
        paymentMethod: "COD",
      });
      alert("Order placed successfully!");
      navigate("/profile/orders"); // Redirect to order history
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-6 md:p-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Checkout Form */}
        <div className="md:col-span-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#A3B899] hover:text-[#4B3621] mb-6 transition-colors"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Cart</span>
          </button>

          <h2 className="text-3xl font-serif font-bold text-[#4B3621] mb-8">Checkout</h2>

          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Delivery Address */}
            <section className="bg-white p-6 rounded-2xl border border-[#E8DCC4] shadow-sm">
              <div className="flex items-center mb-4">
                <TruckIcon className="h-5 w-5 text-[#4B3621] mr-2" />
                <h3 className="font-bold text-[#4B3621] uppercase tracking-wider text-sm">Delivery Address</h3>
              </div>
              <textarea
                placeholder="Enter your full street address, city, and zip code..."
                className="w-full p-4 rounded-xl border border-[#E8DCC4] focus:ring-2 focus:ring-[#4B3621] outline-none transition-all h-32 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </section>

            {/* Payment Methods */}
            <section className="bg-white p-6 rounded-2xl border border-[#E8DCC4] shadow-sm">
              <div className="flex items-center mb-6">
                <CreditCardIcon className="h-5 w-5 text-[#4B3621] mr-2" />
                <h3 className="font-bold text-[#4B3621] uppercase tracking-wider text-sm">Payment Method</h3>
              </div>

              <div className="space-y-4">
                {/* COD Option */}
                <div className="relative">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    checked
                    readOnly
                    className="absolute right-4 top-1/2 -translate-y-1/2 accent-[#4B3621]"
                  />
                  <label
                    htmlFor="cod"
                    className="block p-4 border-2 border-[#4B3621] rounded-xl cursor-pointer bg-stone-50"
                  >
                    <span className="block font-bold text-[#4B3621]">Cash on Delivery</span>
                    <span className="text-xs text-stone-500">Pay when your roast arrives.</span>
                  </label>
                </div>

                {/* Disabled Online Payment */}
                <div className="p-4 border border-dashed border-stone-300 rounded-xl bg-stone-50/50 opacity-60">
                  <span className="block font-bold text-stone-400">Online Payment</span>
                  <span className="text-xs text-stone-400">Available after payment gateway integration.</span>
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4B3621] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#3d2c1b] transition-all shadow-lg shadow-[#4b362130] disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-[#E8DCC4] sticky top-8">
            <h3 className="font-bold text-[#4B3621] uppercase tracking-wider text-sm mb-4">Order Summary</h3>
            
            {/* These values should ideally come from your Cart Context/State */}
            <div className="space-y-3 pb-4 border-b border-stone-100">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <span className="font-bold text-[#4B3621]">Total</span>
              <span className="font-bold text-[#4B3621] text-xl">$0.00</span>
            </div>

            <p className="mt-6 text-[10px] text-stone-400 leading-relaxed uppercase tracking-widest text-center">
              Secure checkout verified by <br /> Roast & Co. Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;