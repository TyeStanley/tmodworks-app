'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { invoke } from '@tauri-apps/api/core';

interface SteamGame {
  app_id: string;
  name: string;
}

interface GameWithImage extends SteamGame {
  imageUrl: string;
  hasImageError: boolean;
}

export default function Sidebar() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [steamGames, setSteamGames] = useState<GameWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSteamGames();
  }, []);

  const loadSteamGames = async () => {
    try {
      setLoading(true);
      const games: SteamGame[] = await invoke('scan_steam_games');

      // Add Steam CDN image URLs to each game
      const gamesWithImages: GameWithImage[] = games.map((game) => ({
        ...game,
        imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.app_id}/header.jpg`,
        hasImageError: false,
      }));

      setSteamGames(gamesWithImages);
      setError(null);
    } catch (err) {
      console.error('Failed to load Steam games:', err);
      setError('Failed to load Steam games');
      // Fallback to empty array if Steam detection fails
      setSteamGames([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 border-base-300 custom-scrollbar flex h-full w-64 flex-col overflow-y-auto border-r">
      {/* My Games Section */}
      <div className="border-base-300 border-t p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base-content/70 text-xs font-bold tracking-wide uppercase">
            My Games ({steamGames.length})
          </h3>
          {loading && <div className="loading loading-spinner loading-xs" />}
        </div>

        {error && (
          <div className="alert alert-warning mb-3">
            <span className="text-xs">{error}</span>
          </div>
        )}

        {steamGames.length === 0 && !loading && !error && (
          <div className="py-4 text-center">
            <span className="text-base-content/50 text-xs">No Steam games found</span>
          </div>
        )}

        <div className="space-y-1">
          {steamGames.map((game) => (
            <button
              key={game.app_id}
              onClick={() => setSelectedGame(game.app_id)}
              className={`relative w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ${
                selectedGame === game.app_id
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
                    onError={() => {
                      // Mark this game as having an image error
                      setSteamGames((prev) =>
                        prev.map((g) =>
                          g.app_id === game.app_id ? { ...g, hasImageError: true } : g,
                        ),
                      );
                    }}
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
          ))}
        </div>
      </div>
    </div>
  );
}
