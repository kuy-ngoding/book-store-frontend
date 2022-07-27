import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { StudentFilterRequest } from "../dtos/student-filter.request";
import { StudentCreateRequest } from "../dtos/student-create.request";
import { Student } from "../entities/student.entity";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: apiBaseQuery,
  // Promise<BaseResponse<Student>>
  endpoints: (builder) => ({
    createStudent: builder.mutation<BaseResponse<Student>, StudentCreateRequest>({
      query: (data) => {
        return {
          method: "POST",
          url: `/api/students`,
          data,
        };
      },
    }),
    getAllStudent: builder.query<PaginationResponse<Student[]>, StudentFilterRequest>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/students`,
          params: data,
        };
      },
    }),
    getAllStudentPaginated: builder.query<
      PaginationResponse<Student[]>,
      StudentFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/students/students",
          params: data,
        };
      },
    }),
    getStudentDetail: builder.query<BaseResponse<Student>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/students/${data.id}`,
        };
      },
    }),
    updateStudent: builder.mutation<BaseResponse<Student>, Student>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/students/${data._id}`,
          data,
        };
      },
    }),
    deleteStudent: builder.mutation<BaseResponse<Student>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/students/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery,
  useGetAllStudentPaginatedQuery,
  useGetStudentDetailQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
