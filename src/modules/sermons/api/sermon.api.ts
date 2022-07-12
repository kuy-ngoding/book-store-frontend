// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { SermonFilterRequest } from "../dtos/requests/sermon-filter.request";
import { Sermon } from "../entities/sermon.entity";

// import { Auth } from "./types";

export const sermonApi = createApi({
  reducerPath: "sermonApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllSermon: builder.query<
      PaginationResponse<Sermon[]>,
      SermonFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/sermons",
          params: data,
        };
      },
    }),
    getSermonDetail: builder.query<BaseResponse<Sermon>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/sermons/${data.id}`,
        };
      },
    }),
    createSermon: builder.mutation<BaseResponse<Sermon>, Sermon>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/sermons",
          data,
        };
      },
    }),
    updateSermon: builder.mutation<BaseResponse<Sermon>, Sermon>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/sermons/${data._id}`,
          data,
        };
      },
    }),
    deleteSermon: builder.mutation<BaseResponse<Sermon>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/sermons/${data.id}`,
        };
      },
    }),
    // getsermonById: builder.query<BaseResponse<sermon>, { id: string }>({
    //   query: (data) => {
    //     return {
    //       method: "GET",
    //       url: `/sermons/${data.id}`,
    //     };
    //   },
    // }),
    // verifysermon: builder.mutation<BaseResponse<sermon>, { id: string }>({
    //   query: ({ id }) => {
    //     return {
    //       method: "POST",
    //       url: `/sermons/${id}/verify`,
    //     };
    //   },
    // }),
    // getCurrentsermon: builder.query<BaseResponse<sermon>, null>({
    //   query: () => {
    //     return {
    //       method: "GET",
    //       url: "/sermons/current-sermon",
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetAllSermonQuery,
  useGetSermonDetailQuery,
  useCreateSermonMutation,
  useUpdateSermonMutation,
  useDeleteSermonMutation,
} = sermonApi;
