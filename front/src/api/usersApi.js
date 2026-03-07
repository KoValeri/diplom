import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, API_URLS } from "./url.config";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: API_URLS.REGISTER,
        method: "POST",
        body: user
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: API_URLS.LOGIN,
        method: "POST",
        body: user
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;