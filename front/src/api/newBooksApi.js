import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const newBooksApi = createApi({
  reducerPath: 'newBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getNewBooks: builder.query({
      query: () => API_URLS.NEWBOOKS,
    }),

    getAllNewBooks: builder.query({
      query: () => API_URLS.ALLNEWBOOKS,
    }),
  }),
});

export const { useGetNewBooksQuery, useGetAllNewBooksQuery } = newBooksApi;
