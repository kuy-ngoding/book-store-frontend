import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { CompanyFilterRequest } from "../dtos/requests/company-filter.request";
import { Company } from "../entities/company.entity";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createCompany: builder.mutation<BaseResponse<Company>, Company>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/company",
          data,
        };
      },
    }),
    getAllUserCompanyPaginated: builder.query<
      PaginationResponse<Company[]>,
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
    getCompanyDetail: builder.query<BaseResponse<Company>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/company/${data.id}`,
        };
      },
    }),
    updateCompany: builder.mutation<BaseResponse<Company>, Company>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/company/${data._id}`,
          data,
        };
      },
    }),
    deleteCompany: builder.mutation<BaseResponse<Company>, { id: string }>({
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
  useGetAllUserCompanyPaginatedQuery,
  useGetCompanyDetailQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
