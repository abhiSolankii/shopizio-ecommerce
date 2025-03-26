import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";

const OtherRoutes = (
  <>
    <Route path="/" element={<Home />} />
  </>
);

export default OtherRoutes;
