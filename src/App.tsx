import "./charts/ChartjsConfig";
import "./css/style.scss";

import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/auth/RequireAuth";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Campaigns from "./pages/Campaigns";
import SitePages from "./pages/cms/SitePages";
import ModalPage from "./pages/component/ModalPage";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/ecommerce/Cart";
import Cart2 from "./pages/ecommerce/Cart2";
import Customers from "./pages/ecommerce/Customers";
import Invoices from "./pages/ecommerce/Invoices";
import Orders from "./pages/ecommerce/Orders";
import Pay from "./pages/ecommerce/Pay";
import Product from "./pages/ecommerce/Product";
import Shop from "./pages/ecommerce/Shop";
import Shop2 from "./pages/ecommerce/Shop2";
import Inbox from "./pages/Inbox";
import Messages from "./pages/Messages";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/settings/Account";
import Apps from "./pages/settings/Apps";
import Billing from "./pages/settings/Billing";
import Feedback from "./pages/settings/Feedback";
import Notifications from "./pages/settings/Notifications";
import Plans from "./pages/settings/Plans";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Tasks from "./pages/Tasks";
import Profile from "./pages/team/Profile";
import TeamTabs from "./pages/team/TeamTabs";
import TeamTiles from "./pages/team/TeamTiles";
import Changelog from "./pages/utility/Changelog";
import EmptyState from "./pages/utility/EmptyState";
import Faqs from "./pages/utility/Faqs";
import PageNotFound from "./pages/utility/PageNotFound";
import Roadmap from "./pages/utility/Roadmap";
import CompanyRoutes from "./pages/company/CompanyRoutes";
import { ToastContainer } from "react-toastify";
import DashboardLoader from "./pages/utility/DashboardLoader";
import UserManagementRoutes from "./pages/user-management/UserManagementRoutes";
import OrderRoutes from "./pages/orders/OrderRoutes";
import ProductRoutes from "./pages/products/ProductRoutes";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html")!.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html")!.style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sitepages" element={<SitePages />}></Route>
        <Route
          path="/dashboard-loader"
          element={
            <RequireAuth>
              <DashboardLoader />
            </RequireAuth>
          }
        ></Route>
        {/* Company Group  */}
        <Route
          path="/user/*"
          element={
            <RequireAuth>
              <UserManagementRoutes />
            </RequireAuth>
          }
        ></Route>
        {/* Company Group  */}
        <Route
          path="/company/*"
          element={
            <RequireAuth>
              <CompanyRoutes />
            </RequireAuth>
          }
        ></Route>
        {/* Order Group  */}
        <Route
          path="/order/*"
          element={
            <RequireAuth>
              <OrderRoutes />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/product/*"
          element={
            <RequireAuth>
              <ProductRoutes />
            </RequireAuth>
          }
        ></Route>
        {/* Components */}
        <Route path="/component/modal" element={<ModalPage />}></Route>
          <Route path="/product/list" element={<ModalPage />}></Route>
        <Route path="/ecommerce/customers" element={<Customers />}></Route>
        <Route path="/ecommerce/orders" element={<Orders />}></Route>
        <Route path="/ecommerce/invoices" element={<Invoices />}></Route>
        <Route path="/ecommerce/shop" element={<Shop />}></Route>
        <Route path="/ecommerce/shop-2" element={<Shop2 />}></Route>
        <Route path="/ecommerce/product" element={<Product />}></Route>
        <Route path="/ecommerce/cart" element={<Cart />}></Route>
        <Route path="/ecommerce/cart-2" element={<Cart2 />}></Route>
        <Route path="/ecommerce/pay" element={<Pay />}></Route>
        <Route path="/campaigns" element={<Campaigns />}></Route>
        <Route path="/team/team-tabs" element={<TeamTabs />}></Route>
        <Route path="/team/team-tiles" element={<TeamTiles />}></Route>
        <Route path="/team/profile" element={<Profile />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/settings/account" element={<Account />}></Route>
        <Route
          path="/settings/notifications"
          element={<Notifications />}
        ></Route>
        <Route path="/settings/apps" element={<Apps />}></Route>
        <Route path="/settings/plans" element={<Plans />}></Route>
        <Route path="/settings/billing" element={<Billing />}></Route>
        <Route path="/settings/feedback" element={<Feedback />}></Route>
        <Route path="/utility/changelog" element={<Changelog />}></Route>
        <Route path="/utility/roadmap" element={<Roadmap />}></Route>
        <Route path="/utility/faqs" element={<Faqs />}></Route>
        <Route path="/utility/empty-state" element={<EmptyState />}></Route>
        <Route path="/utility/404" element={<PageNotFound />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route> 
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </>
  );
};

export default App;
