import React, { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollPosition / windowHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[6px] bg-[#FFFDD0] z-50">
      <div
        className="h-full bg-[#2F4F4F] transition-all duration-200 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
