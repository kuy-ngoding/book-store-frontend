import React from "react";
import { Route, Routes } from "react-router-dom";
import ChildDedicationList from "./child-dedication/ChildDedicationList";
import PrayerList from "./prayers/PrayerList";
import WaterBaptismForm from "./water-baptism/WaterBaptismForm";
import WaterBaptismList from "./water-baptism/WaterBaptismList";

// import SermonDetail from "./SermonDetail";

const MinistryRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Water Baptism */}
        <Route path="/water-baptism" element={<WaterBaptismList />}></Route>
        <Route path="/water-baptism/add" element={<WaterBaptismForm />}></Route>

        {/* Pastoral */}

        {/* Child Dedication */}
        <Route
          path="/child-dedication"
          element={<ChildDedicationList />}
        ></Route>

        {/* Prayers */}
        <Route path="/prayer" element={<PrayerList />}></Route>

        {/* Counseling */}

        {/* <Route path="/water-baptism/add" element={<SermonForm />}></Route>
        <Route path="/water-baptism/edit/:id" element={<SermonForm />}></Route> */}
        {/* <Route path="/sermon/detail/:id" element={<SermonDetail />}></Route> */}
      </Routes>
    </div>
  );
};

export default MinistryRoutes;
