import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./components/Root/Root";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Product />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
