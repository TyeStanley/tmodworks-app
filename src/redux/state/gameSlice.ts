import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameWithCheats } from '../api/gameApi';

interface GameState {
  // Current selected game
  currentGame: GameWithCheats | null;

  // Loading state
  isLoading: boolean;

  // Error state
  error: string | null;

  // Cheat states for the current game
  cheatStates: Record<string, number | boolean | string>;

  // Selected game Steam App ID
  selectedSteamAppId: number | null;
}

const initialState: GameState = {
  currentGame: null,
  isLoading: false,
  error: null,
  cheatStates: {},
  selectedSteamAppId: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Set the current game
    setCurrentGame: (state, action: PayloadAction<GameWithCheats>) => {
      state.currentGame = action.payload;
      state.selectedSteamAppId = action.payload.game.steamAppId;
      state.cheatStates = {}; // Clear cheat states when changing games
      state.error = null;
    },

    // Clear the current game
    clearCurrentGame: (state) => {
      state.currentGame = null;
      state.selectedSteamAppId = null;
      state.cheatStates = {};
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Set cheat state for a specific cheat
    setCheatState: (
      state,
      action: PayloadAction<{ cheatId: string; value: number | boolean | string }>,
    ) => {
      const { cheatId, value } = action.payload;
      state.cheatStates[cheatId] = value;
    },

    // Clear all cheat states
    clearCheatStates: (state) => {
      state.cheatStates = {};
    },

    // Set selected Steam App ID (for triggering queries)
    setSelectedSteamAppId: (state, action: PayloadAction<number | null>) => {
      state.selectedSteamAppId = action.payload;
    },
  },
});

export const {
  setCurrentGame,
  clearCurrentGame,
  setLoading,
  setError,
  setCheatState,
  clearCheatStates,
  setSelectedSteamAppId,
} = gameSlice.actions;

// Selectors
export const selectCurrentGame = (state: { game: GameState }) => state.game.currentGame;
export const selectCurrentGameName = (state: { game: GameState }) =>
  state.game.currentGame?.game.name;
export const selectCurrentGameSteamAppId = (state: { game: GameState }) =>
  state.game.currentGame?.game.steamAppId;
export const selectCheatsByCategory = (state: { game: GameState }) =>
  state.game.currentGame?.cheatsByCategory;
export const selectCheatStates = (state: { game: GameState }) => state.game.cheatStates;
export const selectIsLoading = (state: { game: GameState }) => state.game.isLoading;
export const selectError = (state: { game: GameState }) => state.game.error;
export const selectSelectedSteamAppId = (state: { game: GameState }) =>
  state.game.selectedSteamAppId;
export const selectIsGameSelected = (state: { game: GameState }) => state.game.currentGame !== null;

export default gameSlice.reducer;
