import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/dropdown/DropdownFilter";

import ReactTable from "../../components/react-table/ReactTable";

import { Column } from "react-table";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Link } from "react-router-dom";

import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import {
  useDeleteSermonMutation,
  useGetAllSermonQuery,
} from "../../modules/sermons/api/sermon.api";
import { Sermon } from "../../modules/sermons/entities/sermon.entity";

function SermonList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sermonList, setSermonList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [params, setParams] = React.useState([]);

  const [filterParams, setFilterParams] = React.useState({});

  const { data, refetch } = useGetAllSermonQuery(
    {
      page: currentPage,
      limit: pageSize,
      ...filterParams,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteSermon] = useDeleteSermonMutation();

  useEffect(() => {
    if (data) {
      setSermonList(data.data);
      setTotalData(data.total);
      setLastPage(data.lastPage);
      // setTotalData(data.total);
    }
  }, [data]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this sermon?")) {
        await deleteSermon({ id }).unwrap();
        refetch();
      }
    },
    [deleteSermon, refetch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const asyncParamsDebounce = useCallback(
    AwesomeDebouncePromise(
      (paramsFilter) => {
        setFilterParams(paramsFilter);
      },
      500,
      {
        onlyResolvesLast: true,
      }
    ),
    []
  );

  useEffect(() => {
    const paramsFilter = {};

    for (const key in params) {
      paramsFilter[params[key].id] = params[key].value;
    }

    asyncParamsDebounce(paramsFilter);
  }, [asyncParamsDebounce, params]);

  const sermonColumns = React.useMemo<Column<Sermon>[]>(
    () =>
      [
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Publish Status",
          accessor: "publishStatus",
        },
        {
          Header: "Sermon Date",
          accessor: "sermonDate",
          Cell: (row: any) => {
            return <div>{new Date(row.value).toLocaleString("ID-id")}</div>;
          },
        },
        {
          Header: "Sermon End Date",
          accessor: "sermonEndDate",
          Cell: (row: any) => {
            return (
              <div>
                {row.value ? new Date(row.value).toLocaleString("ID-id") : ""}
              </div>
            );
          },
        },

        {
          Header: "Created At",
          accessor: "createdAt",
          Cell: (row: any) => {
            return <div>{new Date(row.value).toLocaleString("ID-id")}</div>;
          },
        },
        {
          Header: "Action",
          accessor: "_id",
          Cell: ({ row }) => (
            <div>
              <Link
                className="btn bg-white border-gray-200 hover:border-gray-300 text-indigo-500 mr-2"
                aria-label="detail"
                to={`/sermons/detail/${row.original._id}`}
              >
                <FaEye />
              </Link>
              <Link
                className="btn bg-white border-gray-200 hover:border-gray-300 text-yellow-500 mr-2"
                aria-label="edit"
                to={`/sermons/edit/${row.original._id}`}
              >
                <FaEdit />
              </Link>
              <button
                className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500"
                aria-label="delete"
                onClick={() => handleDelete(row.original._id)}
              >
                <FaTrash />
              </button>
            </div>
          ),
        },
      ] as Column<Sermon>[],
    [handleDelete]
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
                  Sermons ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
              </div>
            </div>
            {/* Table */}
            {/* <DataSermonTable
              totalData={totalData}
              data={sermonList}
              selectedItems={handleSelectedItems}
            /> */}
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex flex-row justify-between">
                <h2 className="font-semibold text-gray-800">
                  All sermons{" "}
                  <span className="text-gray-400 font-medium">{totalData}</span>
                </h2>
                <div>
                  <Link
                    to={"/sermons/add"}
                    className="px-3 py-2 bg-erc-1 rounded-lg flex flex-row align-middle"
                  >
                    <div className="mr-1 text-white font-medium">Add</div>
                    <FaPlus className="text-white flex flex-1 flex-grow self-center" />
                  </Link>
                </div>
              </header>
              <ReactTable
                tableOptions={{
                  columns: sermonColumns,
                  data: sermonList,
                  manualFilters: true,
                  disableGlobalFilter: true,
                  disableFilters: false,
                  manualPagination: true,
                  initialState: {
                    pageIndex: 0,
                    pageSize: pageSize,
                  },
                  pageCount: lastPage,
                }}
                onHandlePageChange={handleChangePage}
                onHandlePageSizeChange={handlePageSizeChange}
                onHandleFilterChange={setParams}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SermonList;
