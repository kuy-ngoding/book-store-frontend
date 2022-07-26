import React, { useEffect, useMemo, useState } from "react";

import { FaArrowLeft, FaLock, FaUnlock } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { User } from "../../modules/users/dtos/models/user.entity";
import { RoleEnum } from "../../modules/users/enums/role.enum";
import { useTypedSelector } from "../../store";
import { useGetStudentDetailQuery, useUpdateStudentMutation } from "../../modules/student/api/student.api";
import { Student } from "../../modules/student/entities/student.entity";

function StudentEdit() {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = useState(false);  
  /* Create feature mutation for creating new feature */
  const [updateStudent] = useUpdateStudentMutation<Student>();

  /* Navigate */
  const navigate = useNavigate();

  /* get feature id from params */
  const { id } = useParams();

  const currentUserRole = useTypedSelector(
    (state) => state.authSlice.user.role
  );

  const [showPassword, setShowPassword] = useState(false);

  /* Get User Detail */
  // const { data: userData, refetch } = useGetUserDetailQuery({id,});
  const {data : studentData, refetch } = useGetStudentDetailQuery({id,});

  /* Formik Initial State */
  const initialState = useMemo(() => {
    return {
      // username: userData?.data?.username || "",
      studentName: studentData?.data?.studentName || "",
      address: studentData?.data?.address || "",
      email: studentData?.data?.email || "",
      phoneNumber: studentData?.data?.phoneNumber || "",
      // role: userData?.data?.role.toString() || "",
    };
  }, [studentData?.data]);

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    // username: Yup.string().required("Field is required!"),
    studentName: Yup.string().required("Field is required!"),
    email: Yup.string()
      .trim()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Invalid Email Format"
      )
      .required("Field is required!"),
    phoneNumber: Yup.string()
      .trim()
      .matches(
        /^(\+62|62)?0?8[0-9]\d{7,10}$/,
        "Invalid number, start with (+62/62/08/8), and must be 10-13 digits"
      )
      .required("Field is required!"),
    // role: Yup.string().required("Field is required!"),
  });

  /* Handle Create New User */
  const handleSubmit = async (formValue: Student) => {
    try {
      await updateStudent({
        _id: id,
        ...formValue,
      }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.studentName} Updated!`, {
          theme: "dark",
        });
      }, 0.1);
      refetch();
      navigate("/student/list");
    } catch (error) {
      setTimeout(() => {
        toast.error("Something went wrong!", {
          theme: "dark",
        });
      }, 0.1);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  Edit Student
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/student/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                  Edit Student
                </h2>
              </header>

              <Formik
                initialValues={initialState}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="p-4">
                  <div className="space-y-4">
                    {/* <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="username"
                      >
                        Username
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="username"
                        name="username"
                        placeholder="ex: Jhon"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="username"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div> */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="studentName"
                      >
                        Full Name
                      </label>
                      <Field
                        id="studentName"
                        name="studentName"
                        placeholder="ex: Jhon Doe"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="studentName"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <Field
                        id="address"
                        name="address"
                        placeholder="ex: Jhon Doe"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="address"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="phoneNumber"
                      >
                        Phone
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="+62xxxx / 62xxxx / 08xxxx / 8xxxx"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="phoneNumber"
                          className="text-red-600 text-sm"
                          component="div"
                        />
                      </div>
                    </div>
                    {/* <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="role"
                      >
                        User Roles
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="form-input w-full"
                        type="select"
                      >
                        <option value="">Select Roles</option>
                        {currentUserRole !== RoleEnum.CUSTOMER &&
                          currentUserRole !== RoleEnum.EMPLOYEE && (
                            <>
                              {currentUserRole === RoleEnum.SUPER_USER && (
                                <>
                                  <option value="admin">Admin</option>
                                  <option value="marketing">Marketing</option>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              {currentUserRole === RoleEnum.ADMIN && (
                                <>
                                  <option value="marketing">Marketing</option>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              {currentUserRole === RoleEnum.MARKETING && (
                                <>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              <option value="employee">Employee</option>
                            </>
                          )}
                      </Field>
                      <div className="h-2">
                        <ErrorMessage
                          name="role"
                          className="text-red-600 text-sm"
                          component="div"
                        />
                      </div>
                    </div> */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        E-mail
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="ex: jhon.doe@gmail.com"
                        className="form-input w-full"
                        type="email"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

               
                  </div>
                  <div className="flex items-center justify-end mt-6">
                    {/* {createUserProcess.isLoading ? (
                      <button
                        className="btn loading hover:bg-indigo-600  disabled:bg-indigo-600 disabled:text-white"
                        disabled={true}
                      >
                        loading
                      </button>
                    ) : ( */}
                    <button
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    {/* )} */}
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentEdit;
