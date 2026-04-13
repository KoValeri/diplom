import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const bestsellersApi = createApi({
  reducerPath: 'bestsellersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getBestsellers: builder.query({
      query: () => API_URLS.BESTSELLERS,
    }),
  }),
});

export const { useGetBestsellersQuery } = bestsellersApi;
