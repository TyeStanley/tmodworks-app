import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetGameWithCheatsQuery } from '../redux/api/gameApi';
import {
  setCurrentGame,
  clearCurrentGame,
  setLoading,
  setError,
  selectSelectedSteamAppId,
  selectIsLoading,
  selectError,
  selectCurrentGame,
  selectCheatsByCategory,
  selectCheatStates,
  setSelectedSteamAppId,
  setCheatState as setCheatStateAction,
  clearCheatStates as clearCheatStatesAction,
} from '../redux/state/gameSlice';

export const useGameSelection = () => {
  const dispatch = useAppDispatch();
  const selectedSteamAppId = useAppSelector(selectSelectedSteamAppId);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const currentGame = useAppSelector(selectCurrentGame);
  const cheatsByCategory = useAppSelector(selectCheatsByCategory);
  const cheatStates = useAppSelector(selectCheatStates);

  // Use RTK Query to fetch game data
  const {
    data: gameData,
    isLoading: isQueryLoading,
    error: queryError,
  } = useGetGameWithCheatsQuery(selectedSteamAppId!, {
    skip: !selectedSteamAppId,
  });

  // Sync RTK Query state with Redux state
  useEffect(() => {
    dispatch(setLoading(isQueryLoading));

    if (queryError) {
      dispatch(setError('Failed to load game data'));
    } else if (gameData) {
      dispatch(setCurrentGame(gameData));
    }
  }, [dispatch, isQueryLoading, queryError, gameData]);

  // Function to select a game
  const selectGame = (steamAppId: number) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    // The RTK Query will automatically fetch the data
    // We just need to trigger it by updating the selectedSteamAppId
    dispatch(setSelectedSteamAppId(steamAppId));
  };

  // Function to clear the current game
  const clearGame = () => {
    dispatch(clearCurrentGame());
  };

  // Function to set cheat state
  const setCheatState = (cheatId: string, value: number | boolean | string) => {
    dispatch(setCheatStateAction({ cheatId, value }));
  };

  // Function to clear all cheat states
  const clearCheatStates = () => {
    dispatch(clearCheatStatesAction());
  };

  return {
    // State
    currentGame,
    cheatsByCategory,
    cheatStates,
    isLoading,
    error,
    selectedSteamAppId,

    // Actions
    selectGame,
    clearGame,
    setCheatState,
    clearCheatStates,

    // Computed
    isGameSelected: currentGame !== null,
  };
};
