import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";;

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

    getBooksFiltered: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.subcategoryId !== undefined) params.append("subcategoryId", filters.subcategoryId);
        
        if (filters.age?.length) {
          filters.age.forEach(a=> 
            params.append("age", a)
          );
        }

        if (filters.cover?.length) {
          filters.cover.forEach(c => 
            params.append("cover", c)
          );
        }

        if (filters.publishingHouse?.length) {
          filters.publishingHouse.forEach(p => 
            params.append("publishingHouse", p)
          );
        }

        if (filters.genre?.length) filters.genre.forEach(g => params.append("genres", g));
        
        if (filters.price) {
          params.append("minPrice", filters.price[0]);
          params.append("maxPrice", filters.price[1]);
        }

        if (filters.sort) {
          params.append("sort", filters.sort);
        }

        if (filters.minRating) {
          params.append("minRating", filters.minRating);
        }

        if (filters.search) {
          params.append("search", filters.search);
        }

        if (filters.hasDiscount) {
          params.append("hasDiscount", true);
        }

        if (filters.yearOfPublication) {
          params.append("yearOfPublication", filters.yearOfPublication);
        }

        return `${API_URLS.BOOKS}/filters?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useGetBooksBySeriesQuery, useGetBooksFilteredQuery  } = booksApi;
