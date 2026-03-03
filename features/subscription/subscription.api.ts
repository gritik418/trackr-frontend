import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ClaimEarlyAccessDto,
  GetActiveSubscriptionDto,
  GetSubscriptionHistoryResponse,
} from "./subscription.interface";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/organizations`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    claimEarlyAccess: builder.mutation<
      void,
      { orgId: string; data: ClaimEarlyAccessDto }
    >({
      query: ({
        orgId,
        data,
      }: {
        orgId: string;
        data: ClaimEarlyAccessDto;
      }) => ({
        url: `/${orgId}/subscription/early-access`,
        method: "POST",
        body: data,
      }),
    }),
    getActiveSubscription: builder.query<GetActiveSubscriptionDto, string>({
      query: (orgId: string) => ({
        url: `/${orgId}/subscription`,
        method: "GET",
      }),
    }),
    getSubscriptionHistory: builder.query<
      GetSubscriptionHistoryResponse,
      string
    >({
      query: (orgId: string) => ({
        url: `/${orgId}/subscription/history`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useClaimEarlyAccessMutation,
  useGetActiveSubscriptionQuery,
  useGetSubscriptionHistoryQuery,
} = subscriptionApi;

export default subscriptionApi;
