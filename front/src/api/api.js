import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => API_URLS.BOOKS,
    }),

    getBookById: builder.query({
      query: (id) => `${API_URLS.BOOKS}/${id}`,
    }),

    getBooksBySeries: builder.query({
      query: (id) => `${API_URLS.BOOKS}/${id}/series`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useGetBooksBySeriesQuery } = booksApi;
