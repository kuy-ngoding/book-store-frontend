import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { PaginationResponse } from "../../api/api.types";

import { Feature, FeatureFilterQuery } from "./feature.types";

export const featureApi = createApi({
  reducerPath: "featureApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllFeature: builder.query<
      PaginationResponse<Feature[]>,
      FeatureFilterQuery
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/features",
          params: data,
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

export const { useGetAllFeatureQuery } = featureApi;
