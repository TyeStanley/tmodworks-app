import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Game } from '@/types';
import { gameApi } from '@/redux/api/gameApi';
import { invoke } from '@tauri-apps/api/core';

interface SteamGame {
  appId: string;
  name: string;
}

interface GameState {
  // Current game state
  data: Game | null;
  isLoading: boolean;
  error: string | null;

  // Unsupported game data
  unsupportedGame: SteamGame | null;

  // Steam games state
  steamGames: SteamGame[];
  steamGamesLoading: boolean;
  steamGamesError: string | null;

  // Cheat states
  cheatStates: Record<string, number | boolean | string>;
}

const initialState: GameState = {
  // Current game state
  data: null,
  isLoading: false,
  error: null,
  unsupportedGame: null,

  // Steam games state
  steamGames: [],
  steamGamesLoading: false,
  steamGamesError: null,

  // Cheat states
  cheatStates: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Set game data
    setGame: (state, action: PayloadAction<Game>) => {
      state.data = action.payload;
      state.error = null;
      state.unsupportedGame = null;
    },
    // Clear game
    clearGame: (state) => {
      state.data = null;
      state.error = null;
      state.unsupportedGame = null;
    },
    // Set unsupported game state
    setUnsupportedGame: (state, action: PayloadAction<SteamGame>) => {
      state.data = null;
      state.error = null;
      state.unsupportedGame = action.payload;
    },
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Steam games actions
    setSteamGamesLoading: (state, action: PayloadAction<boolean>) => {
      state.steamGamesLoading = action.payload;
    },
    setSteamGamesError: (state, action: PayloadAction<string | null>) => {
      state.steamGamesError = action.payload;
    },
    setSteamGames: (state, action: PayloadAction<SteamGame[]>) => {
      state.steamGames = action.payload;
    },
    clearSteamGamesError: (state) => {
      state.steamGamesError = null;
    },

    // Cheat state actions
    setCheatValue: (
      state,
      action: PayloadAction<{ cheatId: string; value: number | boolean | string }>,
    ) => {
      state.cheatStates[action.payload.cheatId] = action.payload.value;
    },
    clearCheatStates: (state) => {
      state.cheatStates = {};
    },
    clearCheatState: (state, action: PayloadAction<string>) => {
      delete state.cheatStates[action.payload];
    },
  },
});

// Fetching game by appId
export const fetchCurrentGameByAppId = createAsyncThunk(
  'game/fetchCurrentGameByAppId',
  async (appId: number, { dispatch, rejectWithValue, getState }) => {
    try {
      const result = await dispatch(gameApi.endpoints.getGameByAppId.initiate(appId));

      if (result.error) {
        // Check if it's a 404 error (game not found/unsupported)
        // Handle both direct 404 and parsing error from 404
        const is404Error =
          ('status' in result.error && result.error.status === 404) ||
          ('status' in result.error &&
            result.error.status === 'PARSING_ERROR' &&
            'originalStatus' in result.error &&
            result.error.originalStatus === 404);

        if (is404Error) {
          // Get the game name from Steam games list
          const state = getState() as { game: GameState };
          const steamGame = state.game.steamGames.find((game) => parseInt(game.appId) === appId);

          if (steamGame) {
            // Dispatch the unsupported game action with game data
            const action = setUnsupportedGame({
              appId: appId.toString(),
              name: steamGame.name,
            });
            dispatch(action);
          } else {
            // Fallback if game not found in Steam games list
            dispatch(
              setUnsupportedGame({
                appId: appId.toString(),
                name: `Game ${appId}`,
              }),
            );
          }
          return; // Don't reject, just return to complete the thunk
        }
        throw new Error('Failed to fetch game');
      }

      // Set the game data in the slice
      dispatch(setGame(result.data as Game));
      return result.data as Game;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch game');
    }
  },
);

// Fetching local Steam games
export const fetchSteamGames = createAsyncThunk(
  'game/fetchSteamGames',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setSteamGamesLoading(true));
      dispatch(setSteamGamesError(null));

      // Get Steam games through the Rust backend
      const gamesFromBackend: { app_id: string; name: string }[] = await invoke('scan_steam_games');

      // Map backend fields to frontend interface
      const games: SteamGame[] = gamesFromBackend.map((game) => ({
        appId: game.app_id,
        name: game.name,
      }));

      dispatch(setSteamGames(games));
      dispatch(setSteamGamesLoading(false));
      return games;
    } catch (error) {
      console.error('Failed to load Steam games:', error);
      dispatch(setSteamGamesLoading(false));
      dispatch(setSteamGamesError('Failed to load Steam games'));
      dispatch(setSteamGames([]));
      return rejectWithValue('Failed to load Steam games');
    }
  },
);

export const {
  setGame,
  clearGame,
  setUnsupportedGame,
  setError,
  setLoading,
  setSteamGamesLoading,
  setSteamGamesError,
  setSteamGames,
  clearSteamGamesError,
  setCheatValue,
  clearCheatStates,
  clearCheatState,
} = gameSlice.actions;

export default gameSlice.reducer;
