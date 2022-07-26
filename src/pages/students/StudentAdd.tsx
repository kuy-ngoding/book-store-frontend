import React, { useState } from "react";

import { FaArrowLeft, FaLock, FaUnlock } from "react-icons/fa";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { StudentCreateRequest } from "../../modules/student/dtos/student-create.request";
import { useCreateStudentMutation } from "../../modules/student/api/student.api";

function StudentAdd() {
  /* SideBar State */ 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Create feature mutation for creating new feature */
  const [createStudent, createStudentProcess] = useCreateStudentMutation();

  const [showPassword, setShowPassword] = useState(false);

  // const currentUserRole = useTypedSelector(
  //   (state) => state.authSlice.user.role
  // );

  /* Navigate */
  const navigate = useNavigate();

  /* Initial State for Formik form */
  const initialState: StudentCreateRequest = {
    studentName: "",
    address: "",
    phoneNumber:  null,
    email: "",
  };

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    studentName: Yup.string().required("Field is required!"),
    address: Yup.string().required("Field is required!"),
    phoneNumber: Yup.number()
    .typeError('you must specify a number')
    .min(1, 'Min value 1.'),
    email: Yup.string().required("Field is required!"),
  });

  /* Handle Create New Feature */
  const handleSubmit = async (formValue: StudentCreateRequest) => {
    // console.log(formValue);
    try {
      await createStudent({
        studentName: formValue.studentName,
        address: formValue.address,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
      });
      // const response = await createStudent({
      //   ...formValue,
      // }).unwrap();
      // console.log(response);
      // await createStudent({
      //   studentName: formValue.studentName,
      //   address: formValue.address,
      //   phoneNumber: formValue.phoneNumber
      // }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.studentName} Created!`, {
          theme: "dark",
        });
      }, 0.1);
      navigate("/student/list");
    } catch (error: any) {
      if(error.data.statusCode < 500) {
        setTimeout(() => {
          toast.error(`${error.data.message}`, {
            theme: "dark",
          });
        }, 0.1);   
      } else {
      setTimeout(() => {
        toast.error("Something went wrong!", {
          theme: "dark",
        });
      }, 0.1);
    }
      console.log(error);
    }
  };

  // const handleSubmit = () => {
  //   console.log("submit clicked");
  // };

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
                  Product Add
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
                  New Users
                </h2>
              </header>

              <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, values, setFieldValue }) => (
                <Form className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="studentName"
                      >
                        Student Name
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="studentName"
                        name="studentName"
                        placeholder="ex: Baju"
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
                        placeholder="Pondok Pinang"
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
                        Phone Number
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="ex: Put your description here."
                        className="form-input w-full"
                        as="textarea"
                        rows="5"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="phoneNumber"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>                   
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="ex: Put your description here."
                        className="form-input w-full"
                        as="textarea"
                        rows="5"
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
                    {createStudentProcess.isLoading ? (
                      <button
                        className="btn loading hover:bg-indigo-600  disabled:bg-indigo-600 disabled:text-white"
                        disabled={true}
                      >
                        loading
                      </button>
                    ) : (
                      <button
                        className="btn bg-indigo-500 disabled:opacity-50 hover:bg-indigo-600 text-white ml-3"
                        type="submit"
                        disabled={!isValid}
                      >
                        {isValid ? "Submit" : "Please fill the required form"}
                      </button>
                    )}
                  </div>
                </Form>
                )}
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentAdd;
