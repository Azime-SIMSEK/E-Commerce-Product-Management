import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/Error" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
