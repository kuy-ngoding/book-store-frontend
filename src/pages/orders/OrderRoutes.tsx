import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderList from "./OrderList";

const OrderRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Order Routes */}
        <Route path="/list" element={<OrderList />}></Route>
      </Routes>
    </div>
  );
};

export default OrderRoutes;
