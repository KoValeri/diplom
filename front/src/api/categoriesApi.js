import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => API_URLS.CATEGORIES,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;