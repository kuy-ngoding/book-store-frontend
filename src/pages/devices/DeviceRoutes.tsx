import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
/** Component */
const DeviceList = lazy(() => import("./DeviceList"));

const DeviceRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Devices */}
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Page is Loading...</div>}>
              <DeviceList />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default DeviceRoutes;
