import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, API_URLS } from "./url.config";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: API_URLS.REGISTER,
        method: "POST",
        body: user
      })
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: API_URLS.LOGIN,
        method: "POST",
        body: data
      })
    })
  })
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;