import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyAdd from "./CompanyAdd";
import CompanyCreateRequest from "./CompanyCreateRequest";
import CompanyEdit from "./CompanyEdit";
import CompanyList from "./CompanyList";

const CompanyRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Blasts */}
        <Route path="/list" element={<CompanyList />}></Route>
        <Route
          path="/create-request"
          element={<CompanyCreateRequest />}
        ></Route>
        <Route path="/add" element={<CompanyAdd />}></Route>
        <Route path="/edit/:id" element={<CompanyEdit />}></Route>
      </Routes>
    </div>
  );
};

export default CompanyRoutes;
