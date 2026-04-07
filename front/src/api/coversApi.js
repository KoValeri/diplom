import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_URLS } from './url.config';

export const coversApi = createApi({
    reducerPath: 'coversApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        getCovers: builder.query({
            query: () => API_URLS.COVERS,
        }),
    }),
});

export const { useGetCoversQuery } = coversApi;