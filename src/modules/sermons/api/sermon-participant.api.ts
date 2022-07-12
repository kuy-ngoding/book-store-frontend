// import { LoginRequest, LoginResponse } from "./types";

import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { SermonParticipantFilterRequest } from "../dtos/requests/sermon-participant-filter.request";
import { SermonParticipant } from "../entities/sermon-participant.entity";

// import { Auth } from "./types";

export const sermonParticipantApi = createApi({
  reducerPath: "sermonparticipantApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllSermonParticipant: builder.query<
      PaginationResponse<SermonParticipant[]>,
      SermonParticipantFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/sermon-participants",
          params: data,
        };
      },
    }),
    getSermonParticipantDetail: builder.query<
      BaseResponse<SermonParticipant>,
      { id: string }
    >({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/sermon-participants/${data.id}`,
        };
      },
    }),
    createSermonParticipant: builder.mutation<
      BaseResponse<SermonParticipant>,
      SermonParticipant
    >({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/sermon-participants",
          data,
        };
      },
    }),
    updateSermonParticipant: builder.mutation<
      BaseResponse<SermonParticipant>,
      SermonParticipant
    >({
      query: (data) => {
        return {
          method: "PUT",
          url: `/api/sermon-participants/${data._id}`,
          data,
        };
      },
    }),
    deleteSermonParticipant: builder.mutation<
      BaseResponse<SermonParticipant>,
      { id: string }
    >({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/sermon-participants/${data.id}`,
        };
      },
    }),
    // getsermonparticipantById: builder.query<BaseResponse<sermonparticipant>, { id: string }>({
    //   query: (data) => {
    //     return {
    //       method: "GET",
    //       url: `/sermon-participants/${data.id}`,
    //     };
    //   },
    // }),
    // verifysermonparticipant: builder.mutation<BaseResponse<sermonparticipant>, { id: string }>({
    //   query: ({ id }) => {
    //     return {
    //       method: "POST",
    //       url: `/sermon-participants/${id}/verify`,
    //     };
    //   },
    // }),
    // getCurrentsermonparticipant: builder.query<BaseResponse<sermonparticipant>, null>({
    //   query: () => {
    //     return {
    //       method: "GET",
    //       url: "/sermon-participants/current-sermonparticipant",
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetAllSermonParticipantQuery,
  useGetSermonParticipantDetailQuery,
  useCreateSermonParticipantMutation,
  useUpdateSermonParticipantMutation,
  useDeleteSermonParticipantMutation,
} = sermonParticipantApi;
