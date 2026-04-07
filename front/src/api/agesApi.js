import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from './url.config';

export const agesApi = createApi({
    reducerPath: 'agesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getAges: builder.query({
            query: () => API_URLS.AGES,
        }),
    }),
});

export const { useGetAgesQuery } = agesApi;