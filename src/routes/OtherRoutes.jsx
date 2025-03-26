import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Favourites from "../pages/Favourites";
import Cart from "../pages/Cart";
import ProductPage from "../pages/ProductPage";

const OtherRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/favourites" element={<Favourites />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:id" element={<ProductPage />} />
  </>
);

export default OtherRoutes;
