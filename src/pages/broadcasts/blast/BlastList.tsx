import React, { useEffect, useState } from "react";

import { Column } from "react-table";

import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import DateSelect from "../../../components/DateSelect";
import ReactTable from "../../../components/react-table/ReactTable";

import DeleteButton from "../../../partials/actions/DeleteButton";
import FilterButton from "../../../partials/actions/FilterButton";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { Broadcast } from "../../../modules/broadcast/broadcast/dto/models/broadcast";
import { useGetAllBroadcastQuery } from "../../../modules/broadcast/broadcast/broadcast.api";

function BroadcastList() {
  /* Sidebar Open State */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  /* Broadcast Data */
  const [broadcastList, setBroadcastList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  /* Page Info State */
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data } = useGetAllBroadcastQuery(
    {
      page: currentPage,
      limit: 20,
    },
    { skip: false, refetchOnMountOrArgChange: true }
  );

  const fetchData = React.useCallback(async () => {
    try {
      setBroadcastList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      setLastPage(data?.lastPage ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.lastPage, data?.total]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const broadcastColumns = React.useMemo<Column<Broadcast>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "CreatedAt",
        accessor: "createdAt",
      },
      // {
      //   Header: "Icon",
      //   accessor: "broadcast_icon_url",
      // },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn bg-white border-gray-200 hover:border-gray-300 text-indigo-500 mr-2"
              aria-label="detail"
              onClick={() => {}}
            >
              <FaEye />
            </button>
            <Link
              className="btn bg-white border-gray-200 hover:border-gray-300 text-yellow-500 mr-2"
              aria-label="edit"
              to={`/subscription/broadcast/edit/${row.original._id}`}
            >
              <FaEdit />
            </Link>
            <button
              className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500"
              aria-label="delete"
              onClick={() => {}}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],

    []
  );

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
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
                  Broadcasts ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton />
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800">
                  All Broadcasts{" "}
                  <span className="text-gray-400 font-medium">{totalData}</span>
                </h2>
                <Link
                  to="/broadcast/blast/add"
                  className="btn bg-white border-gray-200 hover:border-gray-300 text-blue-500"
                >
                  <FaPlus />
                </Link>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: broadcastList,
                  columns: broadcastColumns,
                  manualPagination: true,
                  pageCount: lastPage,
                  pageSize: pageSize,
                }}
                onHandlePageChange={handleChangePage}
                onHandlePageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BroadcastList;
