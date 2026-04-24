import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../api/api";
import { usersApi } from "../api/usersApi";
import { newBooksApi } from "../api/newBooksApi";
import { bestsellersApi } from "../api/bestsellersApi";
import { discountsApi } from "../api/discountsApi"
import { categoriesApi } from "../api/categoriesApi";
import { favoritesApi } from "../api/favoritesApi";
import authReducer from './authSlice';
import authModalReducer  from "./authModalSlice";
import bookFilterReducer from './bookFilterSlice';
import adminModalReducer from './adminModalSlice'
import { agesApi } from "../api/agesApi";
import { genresApi } from "../api/genresApi";
import { coversApi } from "../api/coversApi";
import { publishingHouseApi } from "../api/publishingHouseApi";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [newBooksApi.reducerPath]: newBooksApi.reducer,
    [bestsellersApi.reducerPath]: bestsellersApi.reducer,
    [discountsApi.reducerPath]: discountsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [agesApi.reducerPath]: agesApi.reducer,
    [coversApi.reducerPath]: coversApi.reducer,
    [publishingHouseApi.reducerPath]: publishingHouseApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    auth: authReducer,
    authModal: authModalReducer,
    bookFilters: bookFilterReducer,
    adminModal: adminModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(booksApi.middleware)
    .concat(usersApi.middleware)
    .concat(newBooksApi.middleware)
    .concat(bestsellersApi.middleware)
    .concat(discountsApi.middleware)
    .concat(categoriesApi.middleware)
    .concat(agesApi.middleware)
    .concat(coversApi.middleware)
    .concat(publishingHouseApi.middleware)
    .concat(genresApi.middleware)
    .concat(favoritesApi.middleware),
});