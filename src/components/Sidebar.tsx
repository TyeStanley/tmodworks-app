'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCurrentGameByAppId, fetchSteamGames } from '@/redux/state/gameSlice';
import { getSteamImageUrls } from '@/lib/steamUtils';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const {
    data: currentGame,
    isLoading: isGameLoading,
    unsupportedGame,
    steamGames: games,
    steamGamesLoading: loading,
    steamGamesError: error,
  } = useAppSelector((state) => state.game);
  const count = games.length;

  // Fetch Steam games on component mount
  useEffect(() => {
    if (games.length === 0 && !loading && !error) {
      dispatch(fetchSteamGames());
    }
  }, [dispatch, games.length, loading, error]);

  const handleGameClick = (appId: string) => {
    const steamAppId = parseInt(appId, 10);
    if (!isNaN(steamAppId)) {
      dispatch(fetchCurrentGameByAppId(steamAppId));
    }
  };

  return (
    <div className="bg-base-200 border-base-300 custom-scrollbar flex h-full w-64 flex-col overflow-y-auto border-r">
      {/* My Games Section */}
      <div className="border-base-300 border-t p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base-content/70 text-xs font-bold tracking-wide uppercase">
            My Games ({count})
          </h3>
          {(loading || isGameLoading) && <div className="loading loading-spinner loading-xs" />}
        </div>

        {error && (
          <div className="alert alert-warning mb-3">
            <span className="text-xs">{error}</span>
          </div>
        )}

        {games.length === 0 && !loading && !error && (
          <div className="py-4 text-center">
            <span className="text-base-content/50 text-xs">No Steam games found</span>
          </div>
        )}

        <div className="space-y-1">
          {games.map((game) => {
            const isSelected =
              currentGame?.steamAppId === parseInt(game.appId, 10) ||
              unsupportedGame?.appId === game.appId;

            return (
              <button
                key={game.appId}
                onClick={() => handleGameClick(game.appId)}
                className={`relative w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'ring-primary ring-opacity-50 ring-2'
                    : 'hover:scale-[1.02] hover:shadow-lg'
                }`}
              >
                <div className="relative h-16 w-full">
                  {/* Background Image */}
                  <div
                    className="h-full w-full bg-gray-800 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${getSteamImageUrls(game.appId).header})`,
                    }}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50" />

                  {/* Game Name */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-md bg-black/20 px-3 py-1 text-center text-xs leading-tight font-bold text-white shadow-lg drop-shadow-lg backdrop-blur-sm">
                      {game.name}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
