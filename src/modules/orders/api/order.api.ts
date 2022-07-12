import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { Order } from "../dtos/models/order.entity";
import { ConfirmOrderRequest } from "../dtos/requests/confirm-order.request";
import { OrderFilterRequest } from "../dtos/requests/order-filter.request";
import { RejectOrderRequest } from "../dtos/requests/reject-order.request";
import { SendOrderRequest } from "../dtos/requests/send-order.request";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation<BaseResponse<Order>, Order>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/users",
          data,
        };
      },
    }),
    confrimOrder: builder.mutation<BaseResponse<Order>, ConfirmOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/confirm-order",
          data,
        };
      },
    }),
    sendOrder: builder.mutation<BaseResponse<Order>, SendOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/send-order",
          data,
        };
      },
    }),
    rejectOrder: builder.mutation<BaseResponse<Order>, RejectOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/reject-order",
          data,
        };
      },
    }),
    getAllPendingOrders: builder.query<
      PaginationResponse<Order[]>,
      OrderFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/order/order-list",
          params: data,
        };
      },
    }),
    getAllUser: builder.query<PaginationResponse<Order[]>, OrderFilterRequest>({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/users",
          params: data,
        };
      },
    }),
    getPicList: builder.query<BaseResponse<Order[]>, OrderFilterRequest>({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/users/get-pic-list",
          params: data,
        };
      },
    }),
    getUserDetail: builder.query<BaseResponse<Order>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/users/${data.id}`,
        };
      },
    }),
    getUserById: builder.query<BaseResponse<Order>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/users/${data.id}`,
        };
      },
    }),
    verifyUser: builder.mutation<BaseResponse<Order>, { id: string }>({
      query: ({ id }) => {
        return {
          method: "POST",
          url: `/users/${id}/verify`,
        };
      },
    }),
    getCurrentUser: builder.query<BaseResponse<Order>, null>({
      query: () => {
        return {
          method: "GET",
          url: "/users/current-user",
        };
      },
    }),
    updateUser: builder.mutation<BaseResponse<Order>, Order>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/users/${data._id}`,
          data,
        };
      },
    }),
    deleteUser: builder.mutation<BaseResponse<Order>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/users/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useConfrimOrderMutation,
  useSendOrderMutation,
  useRejectOrderMutation,
  useGetAllUserQuery,
  useGetAllPendingOrdersQuery,
  useGetCurrentUserQuery,
  useGetUserDetailQuery,
  useGetPicListQuery,
  useVerifyUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = orderApi;
