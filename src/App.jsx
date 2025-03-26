import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import ScrollToTopIcon from "./components/common/ScrollToTopIcon";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollProgressBar from "./components/common/ScrollProgressBar";
import { Toaster } from "react-hot-toast";
import OtherRoutes from "./routes/OtherRoutes";

const AppContent = () => {
  return (
    <div className="App">
      <ScrollProgressBar />
      <ScrollToTop />
      <ScrollToTopIcon />

      <Routes>
        {AuthRoutes}
        {OtherRoutes}
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
