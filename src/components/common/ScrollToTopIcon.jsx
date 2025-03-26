import React from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopIcon = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-10 right-12 z-50 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-transform transform hover:scale-110"
    >
      <FaArrowUp className="w-6 h-6" />
    </div>
  );
};

export default ScrollToTopIcon;
