import React, { useEffect, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/dropdown/DropdownFilter";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useGetAllFeatureQuery } from "../../modules/subscription/feature/feature.api";
import { Feature } from "../../modules/subscription/feature/feature.types";
import { Sermon } from "../../modules/sermons/entities/sermon.entity";
import {
  useCreateSermonMutation,
  useGetSermonDetailQuery,
  useUpdateSermonMutation,
} from "../../modules/sermons/api/sermon.api";
import Datepicker from "../../partials/actions/Datepicker";
import { skipToken } from "@reduxjs/toolkit/dist/query";

interface FormikSermon extends Sermon {}

function SermonForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [sermon, setSermon] = useState<Sermon>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [skipState, setSkipState] = useState(skipToken); // initialize with skipToken to skip at first

  const router = useNavigate();

  const { id } = useParams();

  const [createSermon] = useCreateSermonMutation();

  const [updateSermon] = useUpdateSermonMutation();

  console.log("id", id);

  const { data: sermonData } = useGetSermonDetailQuery(
    id !== undefined ? { id } : skipToken,
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const fetchSermon = React.useCallback(async () => {
    setSermon(sermonData?.data);

    console.log(sermonData?.data);

    // setSermonFeatureList(sermonData?.data?.sermon_features ?? []);
  }, [sermonData]);

  // const fetchData = React.useCallback(async () => {
  //   try {
  //     setFeatureList(featureData?.data ?? []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [featureData?.data]);

  useEffect(() => {
    fetchSermon();
  }, [fetchSermon]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const initialState: FormikSermon = React.useMemo(
    (): FormikSermon => ({
      title: sermon?.title ?? "",
      description: sermon?.description ?? "",
      youtubeURL: sermon?.youtubeURL ?? "",
      sermonDate: sermon?.sermonDate ?? new Date(),
      sermonEndDate: sermon?.sermonEndDate ?? new Date(),
      publishStatus: sermon?.publishStatus,
      haveOffline: sermon?.haveOffline,
      maxQuota: sermon?.maxQuota ?? 0,
      availableQuota: sermon?.availableQuota ?? 0,
    }),
    [sermon]
  );

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate);
    }
  }, [selectedDate]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title field is required!"),
  });

  const handleSubmit = async (formValue: FormikSermon) => {
    try {
      const {
        title,
        description,
        youtubeURL,
        sermonDate,
        sermonEndDate,
        publishStatus,
        haveOffline,
        maxQuota,
        availableQuota,
      } = formValue;

      if (!id) {
        await createSermon({
          title,
          description,
          youtubeURL,
          sermonDate,
          publishStatus,
          haveOffline,
          sermonEndDate,
          maxQuota,
          availableQuota,
        }).unwrap();
      } else {
        await updateSermon({
          _id: id,
          title,
          description,
          youtubeURL,
          sermonDate,
          publishStatus,
          haveOffline,
          sermonEndDate,
          maxQuota,
          availableQuota,
        }).unwrap();
      }

      // e.preventDefault();

      // const sermon_features_data = sermon_features.map((feature) => {
      //   return {
      //     feature_id: (feature.feature as Feature)._id,
      //     quota: Number(feature.quota),
      //     is_available: feature.is_available,
      //   };
      // });

      // redirect to sermon list page
      router("/sermons");
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
                  Sermon ✨
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex flex-row">
                <Link
                  to="/sermons"
                  className="btn bg-white border-gray-200 hover:border-gray-300 text-blue-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3">New Sermon</h2>
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
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <Field
                          id="title"
                          name="title"
                          placeholder="Sermon Name"
                          className="form-input w-full"
                          type="text"
                        />
                        <ErrorMessage name="title" component="div" />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <Field
                          id="description"
                          name="description"
                          className="form-input w-full"
                          placeholder="Sermon Description"
                          type="text"
                          autoComplete="on"
                        />
                        <ErrorMessage name="description" component="div" />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="youtubeURL"
                        >
                          Youtube URL
                        </label>
                        <Field
                          id="youtubeURL"
                          name="youtubeURL"
                          className="form-input w-full"
                          placeholder="ex: https://www.youtube.com/watch?v=mtzDt8GoAnw"
                          type="text"
                          autoComplete="on"
                        />
                        <ErrorMessage name="youtubeURL" component="div" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Sermon Date
                        </label>
                        <Datepicker
                          name="sermonDate"
                          selectedDate={values["sermonDate"]}
                          setSelectedDate={(e) =>
                            setFieldValue("sermonDate", e)
                          }
                        />
                        <ErrorMessage name="sermonDate" component="div" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Sermon End Date
                        </label>
                        <Datepicker
                          name="sermonEndDate"
                          selectedDate={values["sermonEndDate"]}
                          setSelectedDate={(e) =>
                            setFieldValue("sermonEndDate", e)
                          }
                        />
                        <ErrorMessage name="sermonEndDate" component="div" />
                      </div>
                      <div>
                        <label
                          htmlFor="publishStatus"
                          className="block text-sm font-medium mb-1"
                        >
                          Publish Status
                        </label>
                        <Field
                          as="select"
                          className="form-select w-full"
                          name="publishStatus"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Published">Published</option>
                        </Field>

                        <ErrorMessage name="publishStatus" component="div" />
                      </div>
                      <div>
                        <label
                          htmlFor="haveOffline"
                          className="block text-sm font-medium mb-1"
                        >
                          Have Offline?
                        </label>
                        <Field
                          type="checkbox"
                          className="form-checkbox"
                          name="haveOffline"
                        ></Field>

                        <ErrorMessage name="haveOffline" component="div" />
                      </div>
                      <div>
                        <label
                          htmlFor="availableQuota"
                          className="block text-sm font-medium mb-1"
                        >
                          Available Quota ?
                        </label>
                        <Field
                          className="form-input disabled:bg-gray-200 disabled:cursor-not-allowed"
                          type="number"
                          min="0"
                          name="availableQuota"
                          disabled={!values["haveOffline"]}
                        ></Field>

                        <ErrorMessage name="availableQuota" component="div" />
                      </div>
                      <div>
                        <label
                          htmlFor="maxQuota"
                          className="block text-sm font-medium mb-1"
                        >
                          Max Quota ?
                        </label>
                        <Field
                          className="form-input disabled:bg-gray-200 disabled:cursor-not-allowed"
                          type="number"
                          min="0"
                          name="maxQuota"
                          disabled={!values["haveOffline"]}
                        ></Field>

                        <ErrorMessage name="maxQuota" component="div" />
                      </div>
                    </div>

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

export default SermonForm;
