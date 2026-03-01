import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPlansResponse } from "./plans.interface";

const plansApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/plans`,
  }),
  endpoints: (builder) => ({
    getPlans: builder.query<GetPlansResponse, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlansQuery } = plansApi;

export default plansApi;
