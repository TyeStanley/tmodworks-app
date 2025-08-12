import { create } from 'zustand';
import { type GameQueryResult } from '@/lib/mockData';

interface AppState {
  // Current selected game (can be supported, unsupported, or null)
  currentGame: GameQueryResult;

  // Actions
  setCurrentGame: (game: GameQueryResult) => void;
  clearCurrentGame: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentGame: null,

  // Actions
  setCurrentGame: (game) => {
    set({ currentGame: game });
  },

  clearCurrentGame: () => {
    set({ currentGame: null });
  },
}));

// Selector hooks for common state access patterns
export const useCurrentGame = () => useAppStore((state) => state.currentGame);
export const useSetCurrentGame = () => useAppStore((state) => state.setCurrentGame);
export const useClearCurrentGame = () => useAppStore((state) => state.clearCurrentGame);
