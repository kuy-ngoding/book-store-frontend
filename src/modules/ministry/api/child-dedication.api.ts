// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { ChildDedicationFilterRequest } from "../dtos/requests/child-dedication-filter.request";
import { ChildDedication } from "../entities/child-dedication.entity";

// import { Auth } from "./types";

export const childDedicationApi = createApi({
  reducerPath: "childDedicationApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllChildDedication: builder.query<
      PaginationResponse<ChildDedication[]>,
      ChildDedicationFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/childdedications",
          params: data,
        };
      },
    }),
    getChildDedicationDetail: builder.query<
      BaseResponse<ChildDedication>,
      { id: string }
    >({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/childdedications/${data.id}`,
        };
      },
    }),
    createChildDedication: builder.mutation<
      BaseResponse<ChildDedication>,
      ChildDedication
    >({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/childdedications",
          data,
        };
      },
    }),
    updateChildDedication: builder.mutation<
      BaseResponse<ChildDedication>,
      ChildDedication
    >({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/childdedications/${data._id}`,
          data,
        };
      },
    }),
    deleteChildDedication: builder.mutation<
      BaseResponse<ChildDedication>,
      { id: string }
    >({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/childdedications/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllChildDedicationQuery,
  useGetChildDedicationDetailQuery,
  useCreateChildDedicationMutation,
  useUpdateChildDedicationMutation,
  useDeleteChildDedicationMutation,
} = childDedicationApi;
