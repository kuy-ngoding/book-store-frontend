import React, { useCallback, useEffect, useState } from "react";
import ReactTable from "../../components/react-table/ReactTable";

import { Column } from "react-table";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Link } from "react-router-dom";

import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import {
  useDeleteSermonParticipantMutation,
  useGetAllSermonParticipantQuery,
} from "../../modules/sermons/api/sermon-participant.api";
import { SermonParticipant } from "../../modules/sermons/entities/sermon-participant.entity";

interface Props {
  sermonId: string;
}

function SermonParticipantParticipantTable({ sermonId }: Props) {
  const [sermonparticipantList, setSermonParticipantList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [params, setParams] = React.useState([]);

  const [filterParams, setFilterParams] = React.useState({});

  const { data, refetch } = useGetAllSermonParticipantQuery(
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

  const [deleteSermonParticipant] = useDeleteSermonParticipantMutation();

  useEffect(() => {
    setFilterParams({
      sermonId: sermonId,
    });
  }, [sermonId]);

  useEffect(() => {
    if (data) {
      setSermonParticipantList(data.data);
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
      if (
        window.confirm(
          "Are you sure you want to delete this sermonparticipant?"
        )
      ) {
        await deleteSermonParticipant({ id }).unwrap();
        refetch();
      }
    },
    [deleteSermonParticipant, refetch]
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

  const sermonparticipantColumns = React.useMemo<Column<SermonParticipant>[]>(
    () =>
      [
        {
          Header: "User",
          accessor: "user",
          Cell: (row: any) => (
            <Link to={`/users/${row.value?._id}`}>
              {row.value?.name} ({row.value?.email})
            </Link>
          ),
        },
        {
          Header: "Status",
          accessor: "status",
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
                to={`/sermonparticipants/detail/${row.original._id}`}
              >
                <FaEye />
              </Link>
              <Link
                className="btn bg-white border-gray-200 hover:border-gray-300 text-yellow-500 mr-2"
                aria-label="edit"
                to={`/sermonparticipants/edit/${row.original._id}`}
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
      ] as Column<SermonParticipant>[],
    [handleDelete]
  );

  return (
    <ReactTable
      tableOptions={{
        columns: sermonparticipantColumns,
        data: sermonparticipantList,
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
  );
}

export default SermonParticipantParticipantTable;
