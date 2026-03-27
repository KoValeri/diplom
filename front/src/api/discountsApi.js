import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const discountsApi = createApi({
  reducerPath: 'discountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getDiscounts: builder.query({
      query: () => API_URLS.DISCOUNTS,
    }),

    getAllDiscounts: builder.query({
      query: () => API_URLS.ALLDISCOUNTS,
    }),
  }),
});

export const { useGetDiscountsQuery, useGetAllDiscountsQuery } = discountsApi;
