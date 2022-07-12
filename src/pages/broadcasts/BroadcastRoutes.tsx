import React from "react";
import { Route, Routes } from "react-router-dom";
import BlastList from "./blast/BlastList";

const BroadcastRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Blasts */}
        <Route path="/blast" element={<BlastList />}></Route>
        {/* <Route path="/blast/add" element={<BlastAdd />}></Route> */}
        {/* <Route path="/blast/edit/:id" element={<BlastEdit />}></Route> */}

        {/* Contact */}
      </Routes>
    </div>
  );
};

export default BroadcastRoutes;
