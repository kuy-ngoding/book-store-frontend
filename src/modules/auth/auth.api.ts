import { createApi } from "@reduxjs/toolkit/query/react";

import { apiBaseQuery } from "../api/api.query";
import { BaseResponse } from "../api/api.types";
import { User } from "../users/dtos/models/user.entity";

import { LoginRequest, LoginResponse } from "./auth.types";

// import { LoginRequest, LoginResponse } from "./types";

// import { Auth } from "./types";

export const AUTH_API_REDUCER_KEY = "authApi";

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    authLogin: builder.mutation<BaseResponse<LoginResponse>, LoginRequest>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/auth/login",
          data,
        };
      },
    }),
    // profile: builder.query<BaseResponse<User>, null>({
    //   query: () => {
    //     return {
    //       method: "GET",
    //       url: "/api/auth/profile",
    //     };
    //   },
    // }),
  }),
});

export const { useAuthLoginMutation } = authApi;
