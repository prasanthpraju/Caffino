import { useEffect, useState } from "react";
import API from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}
        >
          <p><b>User:</b> {order.user.email}</p>
          <p><b>Payment:</b> {order.paymentMethod}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <ul>
            {order.items.map((i, idx) => (
              <li key={idx}>
                {i.product.name} × {i.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
