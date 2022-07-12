// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { BaptismFilterRequest } from "../dtos/requests/baptism-filter.request";
import { Baptism } from "../entities/baptism.entity";

// import { Auth } from "./types";

export const baptismApi = createApi({
  reducerPath: "baptismApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllBaptism: builder.query<
      PaginationResponse<Baptism[]>,
      BaptismFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/baptism",
          params: data,
        };
      },
    }),
    getBaptismDetail: builder.query<BaseResponse<Baptism>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/baptism/${data.id}`,
        };
      },
    }),
    createBaptism: builder.mutation<BaseResponse<Baptism>, Baptism>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/baptism/admin",
          data,
        };
      },
    }),
    updateBaptism: builder.mutation<BaseResponse<Baptism>, Baptism>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/baptism/${data._id}`,
          data,
        };
      },
    }),
    deleteBaptism: builder.mutation<BaseResponse<Baptism>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/baptism/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllBaptismQuery,
  useGetBaptismDetailQuery,
  useCreateBaptismMutation,
  useUpdateBaptismMutation,
  useDeleteBaptismMutation,
} = baptismApi;
