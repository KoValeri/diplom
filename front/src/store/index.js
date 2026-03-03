import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../api/api";
import authReducer from './authSlice';
import  authModalReducer  from "./authModalSlice";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    auth: authReducer,
    authModal: authModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});