import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";

import { Plan, PlanFilterQuery } from "./plan.types";

export const planApi = createApi({
  reducerPath: "planApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllPlan: builder.query<PaginationResponse<Plan[]>, PlanFilterQuery>({
      query: (data) => {
        return {
          method: "GET",
          url: "/plans",
          params: data,
        };
      },
    }),
    createPlan: builder.mutation<BaseResponse<Plan>, Plan>({
      query: (data) => {
        return {
          method: "POST",
          url: "/plans",
          data: data,
        };
      },
    }),
    getPlanDetail: builder.query<BaseResponse<Plan>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/plans/${data.id}`,
          params: data,
        };
      },
    }),
    updatePlan: builder.mutation<BaseResponse<Plan>, Plan>({
      query: (data) => {
        return {
          method: "PUT",
          url: `/plans/${data._id}`,
          data: data,
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
  useGetAllPlanQuery,
  useCreatePlanMutation,
  useGetPlanDetailQuery,
  useUpdatePlanMutation,
} = planApi;
