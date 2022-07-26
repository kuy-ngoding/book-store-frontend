import React, { useEffect, useRef, useState } from "react";
import {
  FaAddressBook,
  FaAddressCard,
  FaBabyCarriage,
  FaChalkboardTeacher,
  FaCross,
  FaHome,
  FaListAlt,
  FaMobile,
  FaNewspaper,
  FaPaperPlane,
  FaPhone,
  FaPrayingHands,
  FaUser,
  FaUsers,
  FaWater,
  FaWhatsapp,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

import DasboardIcon from "../images/sidebar-icons/dashboard-icon.png";
import UserListIcon from "../images/sidebar-icons/user-list-icon.png";
import CompanyIcon from "../images/sidebar-icons/company-icon.png";
import OrderIcon from "../images/sidebar-icons/order-icon.png";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-contag-primary p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-white hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink to="/" className="block">
            <img
              className="object-cover w-full md:mb-8"
              src="https://firebasestorage.googleapis.com/v0/b/contag-c8b18.appspot.com/o/logo_not_white.png?alt=media&token=b5eab83d-5066-4a33-8120-2284a51660bb"
              alt="Logo"
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 hover:bg-gray-900 last:mb-0 ${
                  pathname === "/" && "bg-gray-900 "
                }`}
              >
                <NavLink
                  to="/"
                  className={`block  truncate transition duration-150 ${
                    pathname === "/"
                      ? "text-white hover:text-gray-200"
                      : "text-white hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaHome className={`shrink-0 h-6 w-6`} /> */}
                    <img src={DasboardIcon} alt="dashboard-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Management Group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                User Management
              </span>
            </h3>
            <ul className="mt-3">
              {/* Company List */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/user/list") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/user/list"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/user/list") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={UserListIcon} alt="user-list-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      User List
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company Management Group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Company Management
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/company/list") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/company/list"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/company/list") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={CompanyIcon} alt="company-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Company List
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/company/create-request") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/company/create-request"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/company/create-request") &&
                    "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={CompanyIcon} alt="company-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Create Request
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Profile Management Group */}
          {/* <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Profile Management
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/profile") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/profile"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/profile") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <FaNewspaper className={`shrink-0 h-6 w-6 `} />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Profile
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div> */}

          {/* Order Management Group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Order
              </span>
            </h3>
            <ul className="mt-3">
              {/* Company List */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/order/list") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/order/list"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/order/list") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={OrderIcon} alt="user-list-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Order List
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Company Settings */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/blog/categories") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/blog/categories"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/blog/categories") &&
                    "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <FaListAlt className={`shrink-0 h-6 w-6 `} />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Company Settings
                    </span>
                  </div>
                </NavLink>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Product Management
              </span>
            </h3>
            <ul className="mt-3">
              {/* Company List */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/product/list") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/product/list"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/product/list") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={UserListIcon} alt="user-list-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Product List
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Student Management
              </span>
            </h3>
            <ul className="mt-3">
              {/* Company List */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("/student/list") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/student/list"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("/student/list") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                    <img src={UserListIcon} alt="user-list-icon" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Student List
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* My Account group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                My Account
              </span>
            </h3>
            <ul className="mt-3">
              {/* Components */}
              <SidebarLinkGroup
                activecondition={pathname.includes("component")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("component") &&
                          "hover:text-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("component") &&
                                  "text-indigo-500"
                                }`}
                                cx="16"
                                cy="8"
                                r="8"
                              />
                              <circle
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("component") &&
                                  "text-indigo-300"
                                }`}
                                cx="8"
                                cy="16"
                                r="8"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Components
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/button"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Button
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/form"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Input Form
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/dropdown"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Dropdown
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/alert"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Alert & Banner
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/modal"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Modal
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/pagination"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pagination
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/tabs"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tabs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/breadcrumb"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Breadcrumb
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/badge"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Badge
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/avatar"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Avatar
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/tooltip"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tooltip
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/accordion"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Accordion
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/component/icons"
                              className={({ isActive }) =>
                                "block text-gray-400 hover:text-gray-200 transition duration-150 truncate" +
                                (isActive ? " !text-white" : "")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Icons
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
