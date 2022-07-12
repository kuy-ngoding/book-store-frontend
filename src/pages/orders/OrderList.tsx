import React, { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaLock,
  FaPlus,
  FaTrash,
  FaUnlock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { toast } from "react-toastify";
import ModalBase, { ModalType } from "../../components/modal/ModalBase";
import ReactTable from "../../components/react-table/ReactTable";
import {
  useConfrimOrderMutation,
  useGetAllPendingOrdersQuery,
  useRejectOrderMutation,
  useSendOrderMutation,
} from "../../modules/orders/api/order.api";
import { Order } from "../../modules/orders/dtos/models/order.entity";
import { useDeleteUserMutation } from "../../modules/users/api/user.api";
import { User } from "../../modules/users/dtos/models/user.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { OrderStatus } from "../../modules/orders/enums/order-status.enum";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function OrderList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [approve, setApprove] = useState(false);

  /* Feature Details */
  const [orderDetails, setOrderDetails] = useState<Order>();

  const [deleteUser] = useDeleteUserMutation();

  const [confirmOrder] = useConfrimOrderMutation();

  const [sendOrder] = useSendOrderMutation();

  const [rejectOrder] = useRejectOrderMutation();

  const [orderList, setOrderList] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const { data, refetch } = useGetAllPendingOrdersQuery(
    {},
    { skip: false, refetchOnMountOrArgChange: true }
  );

  /* Initial State for Formik form */
  const initialState = {
    trackingNumber: "",
    rejectReason: "",
    notes: "",
  };

  /* Validation Schema for Formik */
  const validationSchema = useMemo(() => {
    if (approve && orderDetails.orderStatus === OrderStatus.PROCESSING) {
      return Yup.object().shape({
        trackingNumber: Yup.number()
          .typeError("you must specify a number")
          .required("Tracking number is required!"),
      });
    }
    if (!approve) {
      return Yup.object().shape({
        rejectReason: Yup.string().required("Field is required"),
        notes: Yup.string().required("Field is required"),
      });
    }
  }, [orderDetails, approve]);

  const handleSubmit = async (formValue: any) => {
    if (orderDetails) {
      try {
        if (approve && orderDetails) {
          if (orderDetails.orderStatus === OrderStatus.PAID) {
            await confirmOrder({
              orderId: orderDetails._id,
              orderStatus: OrderStatus.PROCESSING,
            });
            toast.success(
              `${orderDetails.userDetails.username} order confimed!`,
              {
                theme: "dark",
              }
            );
          } else {
            await sendOrder({
              orderId: orderDetails._id,
              orderStatus: OrderStatus.SHIPPING,
              trackingNumber: formValue.trackingNumber,
            });
            toast.success(
              `${orderDetails.userDetails.username} moved to shipping process!`,
              {
                theme: "dark",
              }
            );
          }
          refetch();
          setConfirmModalOpen(false);
        } else if (!approve && orderDetails) {
          await rejectOrder({
            orderId: orderDetails._id,
            notes: formValue.notes,
          });
          toast.success(
            `${orderDetails.userDetails.username} has rejected sucessfully!`,
            {
              theme: "dark",
            }
          );
          refetch();
          setConfirmModalOpen(false);
        }
      } catch (error) {
        console.log(error);
        if (error.data.statusCode < 500) {
          toast.error(error.data.message, {
            theme: "dark",
          });
        }
        if (error.data.statusCode >= 500) {
          toast.error("Something went wrong, please try again later!");
        }
      }
    }
  };

  const fetchData = React.useCallback(async () => {
    try {
      setOrderList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const featureColumns = React.useMemo<Column<Order>[]>(
    () => [
      {
        Header: "Username",
        Cell: ({ row }) => (
          <div className="flex flex-row space-x-2">
            <img
              className="rounded-full"
              src="https://ui-avatars.com/api/?name=John+Doe"
              width="24"
              height="24"
              alt="Avatar"
            />
            <span>{row.original.userDetails.username}</span>
          </div>
        ),
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
      },
      {
        Header: "Order Status",
        accessor: "orderStatus",
      },
      {
        Header: "Action",
        Cell: ({ row }) =>
          row.original.orderStatus === OrderStatus.PAID ||
          row.original.orderStatus === OrderStatus.PROCESSING ? (
            <div className="space-x-2">
              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500"
                aria-label="confirm"
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirmModalOpen(true);
                  setApprove(true);
                  setOrderDetails(row.original);
                }}
              >
                <AiOutlineCheckSquare size="20" />
              </button>
              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirmModalOpen(true);
                  setApprove(false);
                  setOrderDetails(row.original);
                }}
              >
                <AiOutlineCloseSquare size="20" />
              </button>
            </div>
          ) : null,
      },
    ],
    []
  );

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
                  Order List
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Incoming Order
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: orderList,
                  columns: featureColumns,
                }}
              />
            </div>
          </div>

          {orderDetails && (
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
                              {orderDetails &&
                              orderDetails.orderStatus === OrderStatus.PAID
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
                              {orderDetails &&
                              orderDetails.orderStatus === OrderStatus.PAID ? (
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
                              {orderDetails && (
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
                                  {orderDetails &&
                                  orderDetails.orderStatus === OrderStatus.PAID
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
          )}
        </main>
      </div>
    </div>
  );
}

export default OrderList;
