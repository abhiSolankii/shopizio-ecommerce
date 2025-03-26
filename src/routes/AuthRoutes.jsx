import React from "react";
import { Route } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

const AuthRoutes = (
  <>
    <Route path="/auth/signup" element={<Signup />} />
    <Route path="/auth/login" element={<Login />} />
  </>
);

export default AuthRoutes;
