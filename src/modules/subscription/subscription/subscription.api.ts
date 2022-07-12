import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { PaginationResponse } from "../../api/api.types";

import { Subscription, SubscriptionFilterQuery } from "./subscription.types";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllSubscription: builder.query<
      PaginationResponse<Subscription[]>,
      SubscriptionFilterQuery
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/subscriptions",
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

export const { useGetAllSubscriptionQuery } = subscriptionApi;
