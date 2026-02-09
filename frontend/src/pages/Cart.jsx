import { useEffect, useState } from "react";
import API from "../services/api";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => { loadCart(); }, []);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    await API.put("/cart/update", { productId, qty });
    loadCart();
  };

  const removeItem = async (productId) => {
    await API.delete(`/cart/remove/${productId}`);
    loadCart();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fdfaf7] text-[#4b3621]">Loading beans...</div>;

  if (!cart || cart.items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf7] px-4">
      <h3 className="text-2xl font-serif text-[#4b3621] mb-4">Your bag is empty</h3>
      <button className="bg-[#4b3621] text-white px-8 py-3 rounded-xl font-bold">Start Shopping</button>
    </div>
  );

  const total = cart.items.reduce((sum, i) => {
  if (!i.product) return sum;   
  return sum + i.product.price * i.qty;
}, 0);


  return (
    <div className="min-h-screen bg-[#fdfaf7] py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-bold text-[#4b3621] mb-8">Your Order</h2>
          <div className="space-y-6">
            {cart.items.filter(i=> i.product).map((i) => (
              <div key={i.product._id} className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-[#e8dcc4]/50">
                <img src={i.product.image} className="w-20 h-20 object-cover rounded-xl bg-stone-100" />
                <div className="flex-grow">
                  <h4 className="font-bold text-[#4b3621]">{i.product.name}</h4>
                  <p className="text-sm text-[#2d4f1e] font-medium">₹{i.product.price}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#fdfaf7] rounded-lg border border-[#e8dcc4]">
                  <button onClick={() => updateQty(i.product._id, i.qty - 1)} className="px-3 py-1 text-xl">-</button>
                  <span className="w-8 text-center font-bold text-sm">{i.qty}</span>
                  <button onClick={() => updateQty(i.product._id, i.qty + 1)} className="px-3 py-1 text-xl">+</button>
                </div>

                <button onClick={() => removeItem(i.product._id)} className="text-stone-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="bg-white p-8 rounded-3xl border border-[#e8dcc4] h-fit sticky top-10 shadow-xl">
          <h3 className="text-xl font-bold text-[#4b3621] mb-6">Summary</h3>
          <div className="space-y-4 text-sm border-b border-stone-100 pb-6 mb-6">
            <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="flex justify-between text-stone-500"><span>Delivery</span><span className="text-green-600">Free</span></div>
          </div>
          <div className="flex justify-between text-xl font-bold text-[#4b3621] mb-8">
            <span>Total</span><span>₹{total}</span>
          </div>
          <button className="w-full bg-[#4b3621] hover:bg-[#2d4f1e] text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;