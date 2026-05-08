import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import Products from "../../pages/CatalogPage/ProductsPage";
import ProductsSeller from "../../pages/CatalogPage/SellerProductsPage";
import CreateProduct from "../../pages/ProductCreatePage/ProductCreatePage";

import ProtectedRoute from "../../shared/ui/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Любой авторизованный */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>

        {/* Только seller */}
        <Route element={<ProtectedRoute role="seller" />}>
          <Route path="/products_seller" element={<ProductsSeller />} />
        </Route>
        <Route element={<ProtectedRoute role="seller" />}>
          <Route path="/product_create" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}