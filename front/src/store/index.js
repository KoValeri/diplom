import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../api/api";
import { usersApi } from "../api/usersApi";
import { newBooksApi } from "../api/newBooksApi";
import { bestsellersApi } from "../api/bestsellersApi";
import { discountsApi } from "../api/discountsApi"
import { categoriesApi } from "../api/categoriesApi";
import authReducer from './authSlice';
import  authModalReducer  from "./authModalSlice";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [newBooksApi.reducerPath]: newBooksApi.reducer,
    [bestsellersApi.reducerPath]: bestsellersApi.reducer,
    [discountsApi.reducerPath]: discountsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    auth: authReducer,
    authModal: authModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(booksApi.middleware)
    .concat(usersApi.middleware)
    .concat(newBooksApi.middleware)
    .concat(bestsellersApi.middleware)
    .concat(discountsApi.middleware)
    .concat(categoriesApi.middleware),
});