import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/core';
import { getSteamImageUrls } from '../../lib/steamUtils';

interface SteamGame {
  app_id: string;
  name: string;
}

interface GameWithImage extends SteamGame {
  imageUrl: string;
  hasImageError: boolean;
}

interface SteamGamesState {
  games: GameWithImage[];
  loading: boolean;
  error: string | null;
}

const initialState: SteamGamesState = {
  games: [],
  loading: false,
  error: null,
};

// Async thunk to fetch Steam games
export const fetchSteamGames = createAsyncThunk(
  'steamGames/fetchSteamGames',
  async (_, { rejectWithValue }) => {
    try {
      const games: SteamGame[] = await invoke('scan_steam_games');

      // Add Steam CDN image URLs to each game using steamUtils
      const gamesWithImages: GameWithImage[] = games.map((game) => {
        const imageUrls = getSteamImageUrls(game.app_id);
        return {
          ...game,
          imageUrl: imageUrls.header, // Use header image for the sidebar
          hasImageError: false,
        };
      });

      return gamesWithImages;
    } catch (error) {
      console.error('Failed to load Steam games:', error);
      return rejectWithValue('Failed to load Steam games');
    }
  },
);

export const steamGamesSlice = createSlice({
  name: 'steamGames',
  initialState,
  reducers: {
    // Set image error for a specific game
    setGameImageError: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const game = state.games.find((g) => g.app_id === gameId);
      if (game) {
        game.hasImageError = true;
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteamGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSteamGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.error = null;
      })
      .addCase(fetchSteamGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.games = []; // Clear games on error
      });
  },
});

export const { setGameImageError, clearError } = steamGamesSlice.actions;

// Selectors
export const selectSteamGames = (state: { steamGames: SteamGamesState }) => state.steamGames.games;
export const selectSteamGamesLoading = (state: { steamGames: SteamGamesState }) =>
  state.steamGames.loading;
export const selectSteamGamesError = (state: { steamGames: SteamGamesState }) =>
  state.steamGames.error;
export const selectSteamGamesCount = (state: { steamGames: SteamGamesState }) =>
  state.steamGames.games.length;

export default steamGamesSlice.reducer;
