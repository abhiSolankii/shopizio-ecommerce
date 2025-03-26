import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Favourites from "../pages/Favourites";
import Cart from "../pages/Cart";
import ProductPage from "../pages/ProductPage";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/common/ProtectedRoute";

const OtherRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route
      path="/favourites"
      element={
        <ProtectedRoute>
          <Favourites />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }
    />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </>
);

export default OtherRoutes;
