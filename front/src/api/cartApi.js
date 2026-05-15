import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "./url.config";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  tagTypes: ["Cart", "Orders"],

  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    toggleCart: builder.mutation({
      query: ({ bookId }) => ({
        url: "/cart/toggle",
        method: "POST",
        body: { bookId },
      }),
      invalidatesTags: ["Cart"],
    }),

    increaseQuantity: builder.mutation({
      query: ({ bookId }) => ({
        url: "/cart/increase",
        method: "POST",
        body: { bookId },
      }),
      invalidatesTags: ["Cart"],
    }),

    decreaseQuantity: builder.mutation({
      query: ({ bookId }) => ({
        url: "/cart/decrease",
        method: "POST",
        body: { bookId },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    checkout: builder.mutation({
      query: (body) => ({
        url: "/cart/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Orders"],
    }),

    getOrders: builder.query({
      query: () => "/cart/my-orders",
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useToggleCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useClearCartMutation,
  useCheckoutMutation,
  useGetOrdersQuery
} = cartApi;