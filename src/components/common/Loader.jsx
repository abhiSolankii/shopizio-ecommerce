import React from "react";

const Loader = ({
  size = "40px",
  my = 4,
  mx = "auto",
  text = "",
  textSize = "sm",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen
          ? "fixed inset-0 bg-white bg-opacity-80"
          : `my-${my} mx-${mx}`
      }`}
    >
      {/* Spinner */}
      <div
        className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        style={{ width: size, height: size }}
      ></div>

      {/* Optional Text */}
      {text && <p className={`mt-2 text-${textSize} text-gray-700`}>{text}</p>}
    </div>
  );
};

export default Loader;
