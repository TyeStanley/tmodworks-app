import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchSteamGames,
  setGameImageError,
  selectSteamGames,
  selectSteamGamesLoading,
  selectSteamGamesError,
  selectSteamGamesCount,
} from '../redux/state/steamGamesSlice';

export const useSteamGames = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectSteamGames);
  const loading = useAppSelector(selectSteamGamesLoading);
  const error = useAppSelector(selectSteamGamesError);
  const count = useAppSelector(selectSteamGamesCount);

  // Fetch Steam games on component mount
  useEffect(() => {
    if (games.length === 0 && !loading && !error) {
      dispatch(fetchSteamGames());
    }
  }, [dispatch, games.length, loading, error]);

  // Function to handle image errors
  const handleImageError = (gameId: string) => {
    dispatch(setGameImageError(gameId));
  };

  // Function to refetch games
  const refetchGames = () => {
    dispatch(fetchSteamGames());
  };

  return {
    games,
    loading,
    error,
    count,
    handleImageError,
    refetchGames,
  };
};
