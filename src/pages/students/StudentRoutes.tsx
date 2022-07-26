import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentAdd from "./StudentAdd";
import StudentEdit from "./StudentEdit";
import StudentList from "./StudentList";

const StudentRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* User */}
        <Route path="/list" element={<StudentList />}></Route>
        <Route path="/add" element={<StudentAdd />}></Route>
        <Route path="/edit/:id" element={<StudentEdit />}></Route>
      </Routes>
    </div>
  );
};

export default StudentRoutes;
