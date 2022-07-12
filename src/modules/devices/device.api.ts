import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../api/api.query";
import { BaseResponse, PaginationResponse } from "../api/api.types";

import {
  Device,
  LoadChats,
  LoadMessages,
  SendMessageRequest,
} from "./device.types";
import { DeviceFilterRequest } from "./dtos/requests/device-filter.request";

export const DEVICE_API_REDUCER_KEY = "deviceApi";

export const deviceApi = createApi({
  reducerPath: DEVICE_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createDevice: builder.mutation<
      BaseResponse<Device>,
      { deviceName: string; devicePhoneNumber: string; businessId: string }
    >({
      query: ({ deviceName, devicePhoneNumber, businessId }) => {
        return {
          method: "POST",
          url: "/devices",
          data: {
            deviceName,
            devicePhoneNumber,
            businessId,
          },
        };
      },
    }),
    getAllDevices: builder.query<
      PaginationResponse<Device[]>,
      DeviceFilterRequest
    >({
      query: () => {
        return {
          method: "GET",
          url: "/devices",
        };
      },
    }),
    getDeviceDetail: builder.query<BaseResponse<Device>, { id: string }>({
      query: ({ id }) => {
        return {
          method: "GET",
          url: `/devices/${id}`,
        };
      },
    }),
    updateDevice: builder.mutation<
      BaseResponse<Device>,
      {
        id: string;
        deviceName: string;
        devicePhoneNumber: string;
        businessId: string;
      }
    >({
      query: ({ id, deviceName, devicePhoneNumber, businessId }) => {
        return {
          method: "PUT",
          url: `/devices/${id}`,
          data: {
            deviceName,
            devicePhoneNumber,
            businessId,
          },
        };
      },
    }),
    deleteDevice: builder.mutation<Device, { id: string }>({
      query: ({ id }) => {
        return {
          method: "DELETE",
          url: `/devices/${id}`,
        };
      },
    }),
    loadChats: builder.query<LoadChats, { id: string }>({
      query: ({ id }) => {
        return {
          method: "POST",
          url: `/devices/${id}/load-chats`,
        };
      },
    }),
    loadMessages: builder.query<
      BaseResponse<LoadMessages>,
      { id: string; receiverJID?: string }
    >({
      query: ({ id, receiverJID }) => {
        return {
          method: "POST",
          url: `/devices/${id}/load-messages`,
          data: {
            receiverJID: receiverJID,
          },
        };
      },
    }),
    sendMessage: builder.mutation<BaseResponse<null>, SendMessageRequest>({
      query: ({ deviceId, message, receiverJID, type }) => {
        return {
          method: "POST",
          url: `/devices/${deviceId}/send-message`,
          data: {
            message,
            receiverJID,
            type,
          },
        };
      },
    }),
    connectToWa: builder.mutation<Device, { id: string }>({
      query: ({ id }) => {
        return {
          method: "GET",
          url: `/devices/get-qr/${id}`,
        };
      },
    }),
  }),
});

export const {
  useCreateDeviceMutation,
  useGetAllDevicesQuery,
  useGetDeviceDetailQuery,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useLoadChatsQuery,
  useLoadMessagesQuery,
  useSendMessageMutation,
  useConnectToWaMutation,
} = deviceApi;
