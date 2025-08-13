import { create } from 'zustand';
import { type GameQueryResult } from '@/lib/mockData';

interface AppState {
  // Current selected game (can be supported, unsupported, or null)
  currentGame: GameQueryResult;

  // Cheat states for the current game
  cheatStates: Record<string, number | boolean | string>;

  // Actions
  setCurrentGame: (game: GameQueryResult) => void;
  clearCurrentGame: () => void;
  setCheatState: (cheatId: string, value: number | boolean | string) => void;
  clearCheatStates: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentGame: null,
  cheatStates: {},

  // Actions
  setCurrentGame: (game) => {
    set({ currentGame: game, cheatStates: {} }); // Clear cheat states when changing games
  },

  clearCurrentGame: () => {
    set({ currentGame: null, cheatStates: {} });
  },

  setCheatState: (cheatId, value) => {
    set((state) => ({
      cheatStates: {
        ...state.cheatStates,
        [cheatId]: value,
      },
    }));
  },

  clearCheatStates: () => {
    set({ cheatStates: {} });
  },
}));

// Selector hooks for common state access patterns
export const useCurrentGame = () => useAppStore((state) => state.currentGame);
export const useSetCurrentGame = () => useAppStore((state) => state.setCurrentGame);
export const useClearCurrentGame = () => useAppStore((state) => state.clearCurrentGame);

// Cheat state hooks
export const useCheatStates = () => useAppStore((state) => state.cheatStates);
export const useSetCheatState = () => useAppStore((state) => state.setCheatState);
export const useClearCheatStates = () => useAppStore((state) => state.clearCheatStates);
