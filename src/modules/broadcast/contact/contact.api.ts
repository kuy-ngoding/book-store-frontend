import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";

import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { Contact } from "./dto/models/contact";
import { ContactFilterRequest } from "./dto/requests/contact-filter.request";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllContact: builder.query<
      PaginationResponse<Contact[]>,
      ContactFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/contacts",
          params: data,
        };
      },
    }),
    createContact: builder.mutation<BaseResponse<Contact>, Contact>({
      query: (data) => {
        return {
          method: "POST",
          url: "/contacts",
          data: data,
        };
      },
    }),
    getContactDetail: builder.query<BaseResponse<Contact>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/contacts/${data.id}`,
          params: data,
        };
      },
    }),
    updateContact: builder.mutation<BaseResponse<Contact>, Contact>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/contacts/${data._id}`,
          data: data,
        };
      },
    }),
    deleteContact: builder.mutation<BaseResponse<Contact>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/contacts/${data.id}`,
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
  useGetAllContactQuery,
  useCreateContactMutation,
  useGetContactDetailQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
