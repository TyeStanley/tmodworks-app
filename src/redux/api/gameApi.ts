import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Game {
  id: string;
  steamAppId: number;
  name: string;
  processName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CheatCategory {
  id: string;
  name: string;
  priority: number;
}

export interface Cheat {
  id: string;
  name: string;
  categoryId: string;
  category: CheatCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GameCheat {
  id: string;
  gameId: string;
  cheatId: string;
  displayName?: string;
  moduleName: string;
  baseAddress: string;
  offsets: number[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cheat: Cheat;
}

export interface GameWithCheats {
  game: Game;
  cheatsByCategory: Record<string, GameCheat[]>;
}

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGameWithCheats: builder.query<GameWithCheats, number>({
      query: (steamAppId) => `/games/${steamAppId}`,
      providesTags: (result, error, steamAppId) =>
        result ? [{ type: 'Game', id: steamAppId }] : [],
    }),

    getAllGames: builder.query<Game[], void>({
      query: () => '/games',
      providesTags: ['Game'],
    }),
  }),
});

export const { useGetGameWithCheatsQuery, useGetAllGamesQuery } = gameApi;
