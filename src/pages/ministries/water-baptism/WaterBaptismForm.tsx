import React, { useEffect, useState } from "react";

import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import { skipToken } from "@reduxjs/toolkit/dist/query";

import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import Datepicker from "../../../partials/actions/Datepicker";
import { Baptism } from "../../../modules/ministry/entities/baptism.entity";
import {
  useCreateBaptismMutation,
  useUpdateBaptismMutation,
  useGetBaptismDetailQuery,
} from "../../../modules/ministry/api/baptism.api";
import { Gender } from "../../../modules/users/enums/gender.enum";
import { BaptismStatus } from "../../../modules/ministry/enums/baptism-status.enum";

interface FormikBaptism extends Baptism {}

function WaterBaptismForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [baptism, setBaptism] = useState<Baptism>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [skipState, setSkipState] = useState(skipToken); // initialize with skipToken to skip at first

  const router = useNavigate();

  const { id } = useParams();

  const [createBaptism] = useCreateBaptismMutation();

  const [updateBaptism] = useUpdateBaptismMutation();

  console.log("id", id);

  const { data: baptismData } = useGetBaptismDetailQuery(
    id !== undefined ? { id } : skipToken,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const fetchBaptism = React.useCallback(async () => {
    setBaptism(baptismData?.data);

    console.log(baptismData?.data);

    // setBaptismFeatureList(baptismData?.data?.baptism_features ?? []);
  }, [baptismData]);

  // const fetchData = React.useCallback(async () => {
  //   try {
  //     setFeatureList(featureData?.data ?? []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [featureData?.data]);

  useEffect(() => {
    fetchBaptism();
  }, [fetchBaptism]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const initialState: FormikBaptism = React.useMemo(
    (): FormikBaptism => ({
      fullname: baptism?.fullname ?? "",
      address: baptism?.address ?? "",
      birthDate: baptism?.birthDate ?? new Date(),
      birthPlace: baptism?.birthPlace ?? "",
      fatherName: baptism?.fatherName ?? "",
      motherName: baptism?.motherName ?? "",
      gender: baptism?.gender ?? null,
      phone: baptism?.phone ?? "",
      status: baptism?.status ?? BaptismStatus.Pending,
      baptismDate: baptism?.baptismDate ?? null,
    }),
    [baptism]
  );

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate);
    }
  }, [selectedDate]);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    gender: Yup.string().nullable().required("Gender is required"),
    birthPlace: Yup.string().required("Birthplace is required"),
    birthDate: Yup.date().required("Birthdate is required"),
  });

  const handleSubmit = async (formValue: FormikBaptism) => {
    try {
      const {
        fullname,
        address,
        baptismDate,
        birthDate,
        birthPlace,
        fatherName,
        gender,
        motherName,
        phone,
        status,
      } = formValue;

      if (!id) {
        await createBaptism({
          fullname,
          address,
          baptismDate,
          birthDate,
          birthPlace,
          fatherName,
          gender,
          motherName,
          phone,
          status,
        }).unwrap();
      } else {
        await updateBaptism({
          _id: id,
          fullname,
          address,
          baptismDate,
          birthDate,
          birthPlace,
          fatherName,
          gender,
          motherName,
          phone,
          status,
        }).unwrap();
      }

      // e.preventDefault();

      // const baptism_features_data = baptism_features.map((feature) => {
      //   return {
      //     feature_id: (feature.feature as Feature)._id,
      //     quota: Number(feature.quota),
      //     is_available: feature.is_available,
      //   };
      // });

      // redirect to baptism list page
      router("/baptism-management/baptisms");
    } catch (error) {
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
                  Add New Baptism
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex flex-row">
                <Link
                  to="/ministries/water-baptism"
                  className="btn bg-white border-gray-200 hover:border-gray-300 text-blue-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3">
                  New Baptism
                </h2>
              </header>

              <Formik
                initialValues={initialState}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form className="p-4" noValidate>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="fullname"
                        >
                          Fullname
                        </label>
                        <Field
                          id="fullname"
                          name="fullname"
                          placeholder="ex: Antonius Joshua Sukmadjaya"
                          className="form-input w-full"
                          type="text"
                        />
                        <ErrorMessage name="fullname" component="div" />
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
                          className="form-input w-full"
                          placeholder="address"
                          type="text"
                          autoComplete="on"
                        />
                        <ErrorMessage name="address" component="div" />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <Field
                          id="phone"
                          name="phone"
                          className="form-input w-full"
                          placeholder="ex : 081234567890"
                          type="text"
                          autoComplete="on"
                        />
                        <ErrorMessage name="phone" component="div" />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="gender"
                        >
                          Gender
                        </label>
                        <div>
                          <Field
                            id="gender_male"
                            name="gender"
                            value="Male"
                            className="form-radio mr-2"
                            placeholder="ex : 081234567890"
                            type="radio"
                            autoComplete="on"
                          />
                          <label htmlFor="gender_male">Male</label>
                        </div>

                        <div>
                          <Field
                            id="gender_female"
                            name="gender"
                            value="Female"
                            className="form-radio mr-2"
                            placeholder="ex : 081234567890"
                            type="radio"
                            autoComplete="on"
                          />
                          <label htmlFor="gender_female">Female</label>
                        </div>

                        <ErrorMessage name="gender" component="div" />
                      </div>

                      <div className="flex flex-row w-full justify-between">
                        <div className="w-full mr-2">
                          <label className="block text-sm font-medium mb-1">
                            Birth Place
                          </label>
                          <Field
                            id="birthPlace"
                            name="birthPlace"
                            className="form-input mr-2 w-full"
                            placeholder="ex : 081234567890"
                            type="text"
                            autoComplete="on"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-medium mb-1">
                            Birthdate
                          </label>
                          <Datepicker
                            name="birthDate"
                            selectedDate={values["birthDate"]}
                            setSelectedDate={(e) =>
                              setFieldValue("birthDate", e)
                            }
                          />
                          <ErrorMessage name="birthDate" component="div" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="fatherName"
                          className="block text-sm font-medium mb-1"
                        >
                          Father Name
                        </label>
                        <Field
                          type="text"
                          className="form-input w-full"
                          placeholder="ex : Antonius Joshua Sukmadjaya"
                          name="fatherName"
                        ></Field>

                        <ErrorMessage name="fatherName" component="div" />
                      </div>
                      <div>
                        <label
                          htmlFor="motherName"
                          className="block text-sm font-medium mb-1"
                        >
                          Mother Name
                        </label>
                        <Field
                          type="text"
                          className="form-input w-full"
                          placeholder="ex : Antonius Joshua Sukmadjaya"
                          name="motherName"
                        ></Field>

                        <ErrorMessage name="motherName" component="div" />
                      </div>
                    </div>

                    {/* <FieldArray
                      name="baptism_features"
                      render={(arrayHelpers) => (
                        <div>
                          {baptismFeatureList.length > 0 &&
                            baptismFeatureList.map((feature, index) => (
                              <div className="border-y my-2 py-2" key={index}>
                                <div className="flex flex-row mb-2">
                                  <h2 className="font-bold">
                                    {(feature.feature as Feature).feature_name}
                                  </h2>
                                </div>
                                <div className="mb-2">
                                  <label className="mr-2">Quota</label>
                                  <Field
                                    type="number"
                                    className="form-input"
                                    value={values.baptism_features[index]?.quota}
                                    onChange={handleChange}
                                    name={`baptism_features.${index}.quota`}
                                  />
                                </div>
                                <div>
                                  <label className="mr-2">Is Available</label>
                                  <Field
                                    type="checkbox"
                                    checked={
                                      values.baptism_features[index]
                                        ?.is_available
                                    }
                                    className="form-checkbox"
                                    onChange={handleChange}
                                    name={`baptism_features.${index}.is_available`}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    /> */}

                    <div className="flex items-center justify-between mt-6">
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        type="submit"
                      >
                        Submit
                      </button>
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

export default WaterBaptismForm;
