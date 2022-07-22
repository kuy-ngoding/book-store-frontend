import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductList from "./ProductList";

const ProductRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* User */}
        <Route path="/list" element={<ProductList />}></Route>
        <Route path="/add" element={<ProductAdd />}></Route>
        <Route path="/edit/:id" element={<ProductEdit />}></Route>
      </Routes>
    </div>
  );
};

export default ProductRoutes;
