import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { PaginationResponse } from "../../api/api.types";
import { Customer } from "./dtos/models/customer";
import { CustomerFilterRequest } from "./dtos/requests/customer-filter.request";

export const CUSTOMER_API_REDUCER_KEY = "customerApi";

export const customerApi = createApi({
  reducerPath: CUSTOMER_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getCustomerList: builder.query<
      PaginationResponse<Customer[]>,
      CustomerFilterRequest
    >({
      query: (params) => {
        return {
          method: "GET",
          url: "/customers",
          params,
        };
      },
    }),
    getCustomerDetail: builder.query<Customer, { id: string }>({
      query: ({ id }) => {
        return {
          method: "GET",
          url: `/customers/${id}`,
        };
      },
    }),
    createCustomer: builder.mutation<Customer, Customer>({
      query: (customer) => {
        return {
          method: "POST",
          url: "/customers",
          data: customer,
        };
      },
    }),
    createManyCustomer: builder.mutation<Customer[], Customer[]>({
      query: (customers) => {
        return {
          method: "POST",
          url: "/customers/many",
          data: customers,
        };
      },
    }),
    deleteCustomer: builder.mutation<Customer, { id: string }>({
      query: ({ id }) => {
        return {
          method: "DELETE",
          url: `/customers/${id}`,
        };
      },
    }),
  }),
});

export const {
  // Get Customer List
  useGetCustomerListQuery,
  // Get Customer Detail By Id
  useGetCustomerDetailQuery,
  // Create One Customer
  useCreateCustomerMutation,
  // Create Many Customer
  useCreateManyCustomerMutation,
  // Delete Customer
  useDeleteCustomerMutation,
} = customerApi;
