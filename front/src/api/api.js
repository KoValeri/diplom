import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from "./url.config";

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ['Books'],

  endpoints: (builder) => ({

    getBooks: builder.query({
      query: () => API_URLS.BOOKS,

      providesTags: (result) =>
        result
          ? [
              ...result.map(book => ({ type: 'Books', id: book.id })),
              { type: 'Books', id: 'LIST' }
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),


    getBookById: builder.query({
      query: (id) => `${API_URLS.BOOKS}/${id}`,

      providesTags: (result, error, id) => [
        { type: 'Books', id }
      ],
    }),

    getBooksBySeries: builder.query({
      query: (id) => `${API_URLS.BOOKS}/${id}/series`,
    }),

    getBooksFiltered: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.subcategoryId !== undefined)
          params.append("subcategoryId", filters.subcategoryId);

        if (filters.age?.length)
          filters.age.forEach(a => params.append("age", a));

        if (filters.cover?.length)
          filters.cover.forEach(c => params.append("cover", c));

        if (filters.publishingHouse?.length)
          filters.publishingHouse.forEach(p => params.append("publishingHouse", p));

        if (filters.genre?.length)
          filters.genre.forEach(g => params.append("genres", g));

        if (filters.price) {
          params.append("minPrice", filters.price[0]);
          params.append("maxPrice", filters.price[1]);
        }

        if (filters.sort)
          params.append("sort", filters.sort);

        if (filters.minRating)
          params.append("minRating", filters.minRating);

        if (filters.search)
          params.append("search", filters.search);

        if (filters.hasDiscount)
          params.append("hasDiscount", true);

        if (filters.yearOfPublication)
          params.append("yearOfPublication", filters.yearOfPublication);

        if (filters.page)
          params.append("page", filters.page);

        if (filters.limit)
          params.append("limit", filters.limit);

        return `${API_URLS.BOOKS}/filters?${params.toString()}`;
      },
    }),


    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin${API_URLS.BOOKS}/${id}`,
        method: 'PUT',
        body
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: 'Books', id },
        { type: 'Books', id: 'LIST' }
      ],
    }),

    createBook: builder.mutation({
      query: (body) => ({
        url: `/admin${API_URLS.BOOKS}`,
        method: 'POST',
        body
      }),

      invalidatesTags: [
        { type: 'Books', id: 'LIST' }
      ]
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/admin${API_URLS.BOOKS}/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: [
        { type: 'Books', id: 'LIST' }
      ]
    }),

    getBookReviews: builder.query({
      query: (bookId) => `/reviews/${bookId}`,
      providesTags: (result, error, bookId) => [
        { type: 'Reviews', id: bookId }
      ],
    }),

    createReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Reviews', id: body.bookId }
      ],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Reviews'],
    }),

  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetBooksBySeriesQuery,
  useGetBooksFilteredQuery,
  useUpdateBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation
} = booksApi;