import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ClaimEarlyAccessDto } from "./subscription.interface";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/subscriptions`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    claimEarlyAccess: builder.mutation<void, ClaimEarlyAccessDto>({
      query: (data) => ({
        url: "/early-access",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useClaimEarlyAccessMutation } = subscriptionApi;

export default subscriptionApi;
