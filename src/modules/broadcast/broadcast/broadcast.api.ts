import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { PaginationResponse, BaseResponse } from "../../api/api.types";
import { Broadcast } from "./dto/models/broadcast";
import { BroadcastFilterRequest } from "./dto/request/broadcast-filter.request";

export const broadcastApi = createApi({
  reducerPath: "broadcastApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllBroadcast: builder.query<
      PaginationResponse<Broadcast[]>,
      BroadcastFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/broadcasts",
          params: data,
        };
      },
    }),
    createBroadcast: builder.mutation<BaseResponse<Broadcast>, Broadcast>({
      query: (data) => {
        return {
          method: "POST",
          url: "/broadcasts",
          data: data,
        };
      },
    }),
    getBroadcastDetail: builder.query<BaseResponse<Broadcast>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/broadcasts/${data.id}`,
          params: data,
        };
      },
    }),
    updateBroadcast: builder.mutation<BaseResponse<Broadcast>, Broadcast>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/broadcasts/${data._id}`,
          data: data,
        };
      },
    }),
    deleteBroadcast: builder.mutation<BaseResponse<Broadcast>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/broadcasts/${data.id}`,
        };
      },
    }),

    // createAuth: builder.mutation<ResponseWithLink<Auth>, null>({
    //   mutation: (args) => {
    //     return {
    //       method: "POST",
    //       url: "/auths",
    //       data: args,
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetAllBroadcastQuery,
  useCreateBroadcastMutation,
  useGetBroadcastDetailQuery,
  useUpdateBroadcastMutation,
  useDeleteBroadcastMutation,
} = broadcastApi;
