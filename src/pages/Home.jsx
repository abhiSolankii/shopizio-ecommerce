import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  useEffect(() => {
    toast.success("Welcome to our website!");
  }, []);
  return <div>Home</div>;
};

export default Home;
