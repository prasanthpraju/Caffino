import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 PROTECT CART PAGE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login?redirect=/cart"); // Or trigger your AuthModal here if preferred
      return;
    }
    loadCart();
  }, [navigate]);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    // Optimistic UI update could go here for smoother feel
    await API.put("/cart/update", { productId, qty });
    loadCart();
  };

  const removeItem = async (productId) => {
    if (!window.confirm("Remove this item from your brew list?")) return;
    await API.delete(`/cart/remove/${productId}`);
    loadCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // --- Loading State ---
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf7] text-[#2d4f1e]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2d4f1e]"></div>
        <p className="mt-4 font-serif text-lg animate-pulse">
          Brewing your cart details...
        </p>
      </div>
    );

  // --- Empty State ---
  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf7] px-4">
        <div className="bg-white p-10 rounded-full shadow-xl mb-6">
          <ShoppingBagIcon className="h-16 w-16 text-[#e8dcc4]" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#2d4f1e] mb-2">
          Your Basket is Empty
        </h3>
        <p className="text-[#a3b899] mb-8 text-center max-w-md">
          Looks like you haven't added any blends yet. Explore our collection to
          find your perfect pour.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#2d4f1e] hover:bg-[#1f3814] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Start Shopping
        </button>
      </div>
    );

  const subtotal = cart.items.reduce((sum, i) => {
    if (!i.product) return sum;
    return sum + i.product.price * i.qty;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 50; // Example logic
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#fdfaf7] pt-28 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#2d4f1e] mb-8 flex items-center gap-3">
          Your Selection{" "}
          <span className="text-lg font-sans font-normal text-[#a3b899] mt-2">
            ({cart.items.length} items)
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Cart Items List */}
          <div className="flex-1 space-y-6">
            {cart.items
              .filter((i) => i.product)
              .map((i) => (
                <div
                  key={i.product._id}
                  className="group flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-[#e8dcc4]/50 hover:shadow-md transition-all"
                >
                  <div className="w-24 h-24 bg-[#f4f1ea] rounded-2xl overflow-hidden shrink-0 border border-[#e8dcc4]">
                    <img
                      src={i.product.image}
                      alt={i.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.png"; // optional fallback
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-xl font-serif font-bold text-[#2d4f1e]">
                      {i.product.name}
                    </h4>
                    <p className="text-[#a3b899] text-sm uppercase tracking-wider font-bold mt-1">
                      Single Origin
                    </p>
                    <p className="text-[#4b3621] font-medium mt-2">
                      ₹{i.product.price}{" "}
                      <span className="text-xs text-stone-400">/ unit</span>
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6">
                    {/* Qty Stepper */}
                    <div className="flex items-center bg-[#fdfaf7] rounded-xl border border-[#e8dcc4]">
                      <button
                        onClick={() => updateQty(i.product._id, i.qty - 1)}
                        className="p-3 text-[#2d4f1e] hover:bg-[#e8dcc4] rounded-l-xl transition-colors disabled:opacity-30"
                        disabled={i.qty <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-[#4b3621]">
                        {i.qty}
                      </span>
                      <button
                        onClick={() => updateQty(i.product._id, i.qty + 1)}
                        className="p-3 text-[#2d4f1e] hover:bg-[#e8dcc4] rounded-r-xl transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="text-right min-w-[80px]">
                      <p className="text-lg font-bold text-[#2d4f1e]">
                        ₹{i.product.price * i.qty}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(i.product._id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-[380px] shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#e8dcc4] sticky top-32">
              <h3 className="text-2xl font-serif font-bold text-[#2d4f1e] mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 text-[#4b3621]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping Estimate</span>
                  <span className="font-bold">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-dashed border-[#e8dcc4] my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-serif font-bold text-[#2d4f1e]">
                    Total
                  </span>
                  <span className="text-3xl font-serif font-bold text-[#2d4f1e]">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full group bg-[#2d4f1e] hover:bg-[#1f3814] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-center text-[#a3b899] mt-4 flex items-center justify-center gap-1">
                <ShoppingBagIcon className="h-3 w-3" /> Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
