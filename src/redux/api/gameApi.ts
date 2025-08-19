import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prisma } from '../../lib/db';

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
  offsets: {
    moduleName: string;
    baseAddress: string;
    offsets: number[];
    valueType: string;
  };
  parameters: {
    min: number;
    max: number;
    step: number;
  };
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
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGameWithCheats: builder.query<GameWithCheats, number>({
      queryFn: async (steamAppId: number) => {
        try {
          // Query the game with all related data (only active games and cheats)
          const game = await prisma.game.findUnique({
            where: {
              steamAppId,
              isActive: true, // Only get active games
            },
            include: {
              GameCheat: {
                where: {
                  isActive: true, // Only get active game cheats
                  cheat: {
                    isActive: true, // Only get cheats that are active
                  },
                },
                include: {
                  cheat: {
                    include: {
                      category: true,
                    },
                  },
                },
                orderBy: {
                  cheat: {
                    category: {
                      priority: 'asc',
                    },
                  },
                },
              },
            },
          });

          if (!game) {
            return { error: { status: 404, data: 'Game not found or inactive' } };
          }

          // Convert Prisma Date objects to strings and handle null values
          const convertedGame: Game = {
            ...game,
            createdAt: game.createdAt.toISOString(),
            updatedAt: game.updatedAt.toISOString(),
          };

          const convertedGameCheats: GameCheat[] = game.GameCheat.map((gc) => ({
            ...gc,
            displayName: gc.displayName || undefined, // Convert null to undefined
            createdAt: gc.createdAt.toISOString(),
            updatedAt: gc.updatedAt.toISOString(),
            offsets: gc.offsets as {
              moduleName: string;
              baseAddress: string;
              offsets: number[];
              valueType: string;
            },
            parameters: gc.parameters as {
              min: number;
              max: number;
              step: number;
            },
            cheat: {
              ...gc.cheat,
              createdAt: gc.cheat.createdAt.toISOString(),
              updatedAt: gc.cheat.updatedAt.toISOString(),
            },
          }));

          // Group cheats by category
          const cheatsByCategory: Record<string, GameCheat[]> = {};

          convertedGameCheats.forEach((gameCheat) => {
            const categoryName = gameCheat.cheat.category.name;
            if (!cheatsByCategory[categoryName]) {
              cheatsByCategory[categoryName] = [];
            }
            cheatsByCategory[categoryName].push(gameCheat);
          });

          // Sort categories by priority
          const sortedCheatsByCategory: Record<string, GameCheat[]> = {};
          Object.keys(cheatsByCategory)
            .sort((a, b) => {
              const categoryA = convertedGameCheats.find((gc) => gc.cheat.category.name === a)
                ?.cheat.category;
              const categoryB = convertedGameCheats.find((gc) => gc.cheat.category.name === b)
                ?.cheat.category;
              return (categoryA?.priority || 0) - (categoryB?.priority || 0);
            })
            .forEach((categoryName) => {
              sortedCheatsByCategory[categoryName] = cheatsByCategory[categoryName];
            });

          return {
            data: {
              game: convertedGame,
              cheatsByCategory: sortedCheatsByCategory,
            },
          };
        } catch (error) {
          console.error('Error fetching game with cheats:', error);
          return { error: { status: 500, data: 'Internal server error' } };
        }
      },
      providesTags: (result, error, steamAppId) =>
        result ? [{ type: 'Game', id: steamAppId }] : [],
    }),

    getAllGames: builder.query<Game[], void>({
      queryFn: async () => {
        try {
          const games = await prisma.game.findMany({
            where: { isActive: true }, // Only get active games
            orderBy: { name: 'asc' },
          });

          // Convert Prisma Date objects to strings
          const convertedGames: Game[] = games.map((game) => ({
            ...game,
            createdAt: game.createdAt.toISOString(),
            updatedAt: game.updatedAt.toISOString(),
          }));

          return { data: convertedGames };
        } catch (error) {
          console.error('Error fetching games:', error);
          return { error: { status: 500, data: 'Internal server error' } };
        }
      },
      providesTags: ['Game'],
    }),
  }),
});

export const { useGetGameWithCheatsQuery, useGetAllGamesQuery } = gameApi;
