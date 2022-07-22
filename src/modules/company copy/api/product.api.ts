import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { CompanyFilterRequest } from "../dtos/requests/company-filter.request";
import { ProductCreateRequest } from "../dtos/requests/product-create.request";
import { Product } from "../entities/product.entity";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: apiBaseQuery,
  // Promise<BaseResponse<Product>>
  endpoints: (builder) => ({
    createProduct: builder.mutation<BaseResponse<Product>, ProductCreateRequest>({
      query: (data) => {
        return {
          method: "POST",
          url: `/api/products`,
          data,
        };
      },
    }),
    getAllUserCompanyPaginated: builder.query<
      PaginationResponse<Product[]>,
      CompanyFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/company/get-user-company",
          params: data,
        };
      },
    }),
    getCompanyDetail: builder.query<BaseResponse<Product>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/company/${data.id}`,
        };
      },
    }),
    updateCompany: builder.mutation<BaseResponse<Product>, Product>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/company/${data._id}`,
          data,
        };
      },
    }),
    deleteCompany: builder.mutation<BaseResponse<Product>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/company/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllUserCompanyPaginatedQuery,
  useGetCompanyDetailQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = productApi;
