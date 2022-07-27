import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { toast } from "react-toastify";
import ModalBase, { ModalType } from "../../components/modal/ModalBase";
import ModalBlank from "../../components/modal/ModalBlank";
import ReactTable from "../../components/react-table/ReactTable";
import { useDeleteStudentMutation, useGetAllStudentPaginatedQuery, useGetAllStudentQuery } from "../../modules/student/api/student.api";
import { Student } from "../../modules/student/entities/student.entity";
import {
  useDeleteUserMutation,
  useGetAllUserPaginatedQuery,
} from "../../modules/users/api/user.api";
import { User } from "../../modules/users/dtos/models/user.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { timeParser } from "../../utils/timeParser";

function StudentList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  /* Feature Details */
  const [studentDetails, setStudentDetails] = useState<Student>();

  const [deleteStudent] = useDeleteStudentMutation();
  // const [deleteUser] = useDeleteUserMutation();

  // const [userList, setUserList] = useState([]);
  const [studentList, setStudentList] = useState([]); 
  const [totalData, setTotalData] = useState(0);
  const { data, refetch } = useGetAllStudentPaginatedQuery(
    {},
    { skip: false, refetchOnMountOrArgChange: true }
  );

  const handleDelete = async (student: Student) => {
    try {
      await deleteStudent({
        id: student._id,
      }).unwrap();
      toast.success(`${student.studentName} Deleted Successfully!`, {
        theme: "dark",
      });
      refetch();
    } catch (error) {
      toast.error("Something went wrong!", {
        theme: "dark",
      });
      console.log(error);
    }
  };

  const fetchData = React.useCallback(async () => {
    try {
      setStudentList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }``
  }, [data?.data, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const featureColumns = React.useMemo<Column<Student>[]>(
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
            <span>{row.original.username}</span>
          </div>
        ),
      },
      {
        Header: "Student Name",
        accessor: "studentName",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "E-Mail",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-yellow-500 mx-2"
              aria-label="edit"
              to={`/student/edit/${row.original._id}`}
            >
              <FaEdit />
            </Link>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                setConfirmModalOpen(true);
                setStudentDetails(row.original);
              }}
            >
              <FaTrash />
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
                  Student Lists
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Student
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
                <Link
                  to="/student/add"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaPlus />
                </Link>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  // data: userList,
                  data : studentList,
                  columns: featureColumns,
                }}
              />
            </div>
          </div>

          <ModalBase
            isOpen={confirmModalOpen}
            setIsOpen={setConfirmModalOpen}
            modalType={ModalType.DELETE}
            modalHeader={
              <h2 className="text-xl font-bold text-gray-800">Delete User</h2>
            }
            modalContent={
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="text-gray-800 font-bold">
                  {studentDetails?.studentName}
                </span>
                ?
              </p>
            }
            modalFooter={
              <div className="flex lg:justify-end pt-3">
                <div>
                  <button
                    className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setConfirmModalOpen(false);
                      handleDelete(studentDetails);
                    }}
                  >
                    Delete
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
        </main>
      </div>
    </div>
  );
}

export default StudentList;
