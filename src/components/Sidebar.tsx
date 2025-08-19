'use client';

import React from 'react';
import Image from 'next/image';
import { useGameSelection } from '@/hooks/useGameSelection';
import { useSteamGames } from '@/hooks/useSteamGames';

export default function Sidebar() {
  // Redux hooks
  const { selectGame, selectedSteamAppId, isLoading: isGameLoading } = useGameSelection();
  const { games, loading, error, count, handleImageError } = useSteamGames();

  const handleGameClick = (appId: string) => {
    // Use Redux to select the game
    const steamAppId = parseInt(appId, 10);
    if (!isNaN(steamAppId)) {
      selectGame(steamAppId);
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
            const isSelected = selectedSteamAppId === parseInt(game.app_id, 10);

            return (
              <button
                key={game.app_id}
                onClick={() => handleGameClick(game.app_id)}
                className={`relative w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'ring-primary ring-opacity-50 ring-2'
                    : 'hover:scale-[1.02] hover:shadow-lg'
                }`}
              >
                <div className="relative h-16 w-full">
                  {/* Background Image or Fallback */}
                  {!game.hasImageError ? (
                    <Image
                      src={game.imageUrl}
                      alt={game.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(game.app_id)}
                      unoptimized={true}
                    />
                  ) : (
                    /* Fallback Background */
                    <div className="from-primary via-secondary to-primary/80 flex h-full w-full items-center justify-center bg-gradient-to-br" />
                  )}

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
