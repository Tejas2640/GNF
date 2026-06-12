import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Product";
import Contact from "./pages/Contact";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

import ProductManagement from "./pages/admin/ProductManagement";
import EnquiryManagement from "./pages/admin/EnquiryManagement";

import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<Login />} />

        {/* PROTECTED DASHBOARD LAYOUT */}
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<div />} />

  <Route
    path="products"
    element={<ProductManagement />}
  />

  <Route
    path="enquiries"
    element={<EnquiryManagement />}
  />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;