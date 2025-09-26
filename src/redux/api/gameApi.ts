import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApiConfig } from './baseApi';
import { Game } from '@/types';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  ...baseApiConfig,
  endpoints: (builder) => ({
    // Get all games
    getAllGames: builder.query<Game[], { search?: string } | void>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params?.search) {
          searchParams.append('search', params.search);
        }
        const queryString = searchParams.toString();
        return `/game${queryString ? `?${queryString}` : ''}`;
      },
    }),
    // Get game by app id
    getGameByAppId: builder.query<Game, number>({
      query: (appId) => `/game/${appId}`,
    }),
  }),
});

export const { useGetAllGamesQuery, useGetGameByAppIdQuery } = gameApi;
