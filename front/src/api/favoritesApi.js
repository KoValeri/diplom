import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "./url.config";

export const favoritesApi = createApi({
    reducerPath: "favoritesApi",

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

    tagTypes: ["Favorites"],

    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: () => "/favorites",
            providesTags: ["Favorites"],
        }),

        toggleFavorite: builder.mutation({
            query: ({ bookId }) => ({
                url: "/favorites/toggle",
                method: "POST",
                body: { bookId },
            }),
            invalidatesTags: ["Favorites"],
        }),
    }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } = favoritesApi;