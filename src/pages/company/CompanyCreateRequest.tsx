import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { toast } from "react-toastify";

import ModalBase, { ModalType } from "../../components/modal/ModalBase";
import ReactTable from "../../components/react-table/ReactTable";
import {
  useDeleteCompanyMutation,
  useGetAllUserCompanyPaginatedQuery,
} from "../../modules/company/api/company.api";
import { Company } from "../../modules/company/entities/company.entity";
import { OrderStatus } from "../../modules/orders/enums/order-status.enum";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import * as Yup from "yup";

function CompanyCreateRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [approve, setApprove] = useState(false);

  /* Feature Details */
  const [companyDetails, setCompanyDetails] = useState<Company>();

  const [deleteCompany] = useDeleteCompanyMutation();

  const [companyList, setCompanyList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  /* Initial State for Formik form */
  const initialState = {
    trackingNumber: "",
    rejectReason: "",
    notes: "",
  };

  /* Validation Schema for Formik */
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      rejectReason: Yup.string().required("Field is required"),
      notes: Yup.string().required("Field is required"),
    });
  }, []);

  const { data, refetch } = useGetAllUserCompanyPaginatedQuery(
    {
      findOnlyCreateRequest: "true",
    },
    { skip: false, refetchOnMountOrArgChange: true }
  );

  const handleSubmit = async (formValue: any) => {};

  const fetchData = React.useCallback(async () => {
    try {
      setCompanyList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const companyColumns = React.useMemo<Column<Company>[]>(
    () => [
      {
        Header: "Company Name",
        Cell: ({ row }) => (
          <div className="flex flex-row space-x-2">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              className="w-48 h-16"
              alt="Avatar"
            />
            <span className="pt-5">{row.original.companyName}</span>
          </div>
        ),
      },
      {
        Header: "PIC Name",
        accessor: (company) => company.picName || "",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="space-x-1">
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500"
              aria-label="confirm"
              to={`/company/edit/${row.original._id}`}
            >
              <AiOutlineCheckSquare size="20" />
            </Link>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                setConfirmModalOpen(true);
                setCompanyDetails(row.original);
              }}
            >
              <AiOutlineCloseSquare size="20" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // const handleSelectedItems = (selectedItems) => {
  //   setSelectedItems([...selectedItems]);
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
                  Company Create Request Lists
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Total Request
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
                <Link
                  to="/company/add"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaPlus />
                </Link>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: companyList,
                  columns: companyColumns,
                }}
              />
            </div>
          </div>

          {/* {companyDetails && (
            <>
              <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, values, setFieldValue }) => (
                  <Form>
                    <ModalBase
                      isOpen={confirmModalOpen}
                      setIsOpen={setConfirmModalOpen}
                      modalType={approve ? ModalType.INFO : ModalType.DELETE}
                      modalHeader={
                        <h2 className="text-xl font-bold text-gray-800">
                          {approve ? (
                            <>
                              {companyDetails &&
                              companyDetails.orderStatus === OrderStatus.PAID
                                ? "Confirm Order"
                                : "Send Order"}
                            </>
                          ) : (
                            "Reject Order"
                          )}
                        </h2>
                      }
                      modalContent={
                        <p className="text-gray-600">
                          {approve ? (
                            <>
                              {companyDetails &&
                              companyDetails.orderStatus ===
                                OrderStatus.PAID ? (
                                "Are you sure you want to confirm this order?"
                              ) : (
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      className="block text-sm font-medium mb-1"
                                      htmlFor="trackingNumber"
                                    >
                                      Nomer Resi{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                      id="trackingNumber"
                                      name="trackingNumber"
                                      placeholder="021020074257518"
                                      className="form-input w-full"
                                      type="trackingNumber"
                                    />
                                    <div className="h-2">
                                      <ErrorMessage
                                        name="trackingNumber"
                                        component="span"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {companyDetails && (
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      className="block text-sm font-medium mb-1"
                                      htmlFor="rejectReason"
                                    >
                                      Reject Reason
                                      <span className="text-red-500"> *</span>
                                    </label>
                                    <Field
                                      as="select"
                                      id="rejectReason"
                                      name="rejectReason"
                                      className="form-input w-full"
                                      type="text"
                                      onChange={(event) => {
                                        if (event.target.value !== "") {
                                          setFieldValue(
                                            "rejectReason",
                                            event.target.value
                                          );
                                          if (
                                            event.target.value ===
                                            "out_of_stock"
                                          ) {
                                            setFieldValue(
                                              "notes",
                                              "Out of Stock"
                                            );
                                          } else if (
                                            event.target.value ===
                                            "not_available"
                                          ) {
                                            setFieldValue(
                                              "notes",
                                              "Not Available"
                                            );
                                          } else {
                                            setFieldValue("notes", "");
                                          }
                                        } else {
                                          setFieldValue("rejectReason", "");
                                          setFieldValue("notes", "");
                                        }
                                      }}
                                    >
                                      <option value="">Select Reason</option>
                                      <option value="out_of_stock">
                                        Out Of Stock
                                      </option>
                                      <option value="not_available">
                                        Not Available
                                      </option>
                                      <option value="other">Other</option>
                                    </Field>
                                    <div className="h-2">
                                      <ErrorMessage
                                        name="rejectReason"
                                        component="span"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      className="block text-sm font-medium mb-1"
                                      htmlFor="notes"
                                    >
                                      Notes
                                      <span className="text-red-500"> *</span>
                                    </label>
                                    <Field
                                      id="notes"
                                      as="textarea"
                                      rows="3"
                                      name="notes"
                                      placeholder="Notes"
                                      className="form-input w-full"
                                      disabled={values.rejectReason !== "other"}
                                    />
                                    <div className="h-2">
                                      <ErrorMessage
                                        name="notes"
                                        component="span"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </p>
                      }
                      modalFooter={
                        <div className="flex lg:justify-end pt-3">
                          <div>
                            <button
                              className={`w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm ${
                                approve
                                  ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                                  : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                              }`}
                              type="submit"
                              disabled={!isValid}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(values);
                              }}
                            >
                              {approve ? (
                                <>
                                  {companyDetails &&
                                  companyDetails.orderStatus ===
                                    OrderStatus.PAID
                                    ? "Confirm"
                                    : isValid
                                    ? "Send"
                                    : "Please fill all required field"}
                                </>
                              ) : (
                                <>
                                  {isValid
                                    ? "Reject"
                                    : "Please fill all required field"}
                                </>
                              )}
                            </button>
                            <button
                              className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => {
                                setConfirmModalOpen(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      }
                    />
                  </Form>
                )}
              </Formik>
            </>
          )} */}
        </main>
      </div>
    </div>
  );
}

export default CompanyCreateRequest;
