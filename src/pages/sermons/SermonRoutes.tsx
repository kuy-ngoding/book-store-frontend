import React from "react";
import { Route, Routes } from "react-router-dom";
import SermonDetail from "./SermonDetail";
import SermonForm from "./SermonForm";
import SermonList from "./SermonList";

const SermonRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Sermon */}
        <Route path="/" element={<SermonList />}></Route>
        <Route path="/detail/:id" element={<SermonDetail />}></Route>
        <Route path="/add" element={<SermonForm />}></Route>
        <Route path="/edit/:id" element={<SermonForm />}></Route>
        {/* <Route path="/sermon/detail/:id" element={<SermonDetail />}></Route> */}
      </Routes>
    </div>
  );
};

export default SermonRoutes;
