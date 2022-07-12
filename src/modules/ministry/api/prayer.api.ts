// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { PrayerFilterRequest } from "../dtos/requests/prayer-filter.request";
import { Prayer } from "../entities/prayer.entity";

// import { Auth } from "./types";

export const prayerApi = createApi({
  reducerPath: "prayerApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllPrayer: builder.query<
      PaginationResponse<Prayer[]>,
      PrayerFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/prayer",
          params: data,
        };
      },
    }),
    getPrayerDetail: builder.query<BaseResponse<Prayer>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/prayer/${data.id}`,
        };
      },
    }),
    createPrayer: builder.mutation<BaseResponse<Prayer>, Prayer>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/prayer",
          data,
        };
      },
    }),
    updatePrayer: builder.mutation<BaseResponse<Prayer>, Prayer>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/prayer/${data._id}`,
          data,
        };
      },
    }),
    deletePrayer: builder.mutation<BaseResponse<Prayer>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/prayer/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllPrayerQuery,
  useGetPrayerDetailQuery,
  useCreatePrayerMutation,
  useUpdatePrayerMutation,
  useDeletePrayerMutation,
} = prayerApi;
