import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/lib';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const baseApiConfig = {
  baseQuery,
  keepUnusedDataFor: 60,
};
