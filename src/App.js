import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import "./App.css";
import Navbar from "./layout/Navbar";
import Main from "./pages/Main";
import WhiteList from "./pages/WhiteList";
import Footer from "./component/Footer";
import Legal from "./component/Legal";
import Policy from "./component/Policy";
import MintPage from "./pages/MintPage";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Navbar />
        <Routes>
          <Route
            path=""
            element={<Main />}
          />
          <Route
            path="/whitelist"
            element={<WhiteList />}
          />
          <Route
            path="/mint"
            element={<MintPage />}
          />
          <Route
            path="/legal"
            element={<Legal />}
          />
          <Route
            path="/privacy"
            element={<Policy />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
