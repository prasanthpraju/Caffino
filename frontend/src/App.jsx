import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Shop from "./pages/Shop";



import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import EditProduct from "./pages/admin/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Footer from "../src/components/Footer"
import About from "./components/about";
import Contact from "./components/Contact";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AuthModal />
         

        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />




          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
        </Routes>
         <Footer />
          
      </BrowserRouter>
      
    </AuthProvider>
    
  );
}

export default App;
