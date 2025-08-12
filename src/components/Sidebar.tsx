'use client';

import React, { useState } from 'react';

// Mock data for games
const mockGames = [
  { id: 1, name: 'Valheim', isFavorite: true, isInstalled: true },
  { id: 2, name: 'ELDEN RING', isFavorite: true, isInstalled: true },
  { id: 3, name: 'Like a Dragon: Ishin!', isFavorite: true, isInstalled: true },
  { id: 4, name: 'R.E.P.O.', isFavorite: false, isInstalled: true },
  { id: 5, name: 'Black Myth: Wukong', isFavorite: false, isInstalled: true },
  { id: 6, name: 'Lost Castle 2', isFavorite: false, isInstalled: true },
  { id: 7, name: 'PEAK', isFavorite: false, isInstalled: true },
  { id: 8, name: 'Mount & Blade II: Bannerlord', isFavorite: false, isInstalled: true },
  { id: 9, name: '7 Days to Die', isFavorite: false, isInstalled: true },
  { id: 10, name: 'Kingdom Come: Deliverance', isFavorite: false, isInstalled: true },
  { id: 11, name: 'Age of Empires II: Definitive Edition', isFavorite: false, isInstalled: true },
  { id: 12, name: 'Borderlands 2', isFavorite: false, isInstalled: true },
  { id: 13, name: 'Lethal Company', isFavorite: false, isInstalled: true },
  { id: 14, name: 'STAR WARS Jedi: Survivor', isFavorite: false, isInstalled: true },
  { id: 15, name: 'Cyberpunk 2077', isFavorite: false, isInstalled: true },
  { id: 16, name: 'The Witcher 3: Wild Hunt', isFavorite: false, isInstalled: true },
  { id: 17, name: 'Red Dead Redemption 2', isFavorite: false, isInstalled: true },
  { id: 18, name: 'Grand Theft Auto V', isFavorite: false, isInstalled: true },
  { id: 19, name: 'Fallout 4', isFavorite: false, isInstalled: true },
  { id: 20, name: 'Skyrim', isFavorite: false, isInstalled: true },
  { id: 21, name: 'Minecraft', isFavorite: false, isInstalled: true },
  { id: 22, name: 'Terraria', isFavorite: false, isInstalled: true },
  { id: 23, name: 'Stardew Valley', isFavorite: false, isInstalled: true },
  { id: 24, name: 'Factorio', isFavorite: false, isInstalled: true },
  { id: 25, name: 'RimWorld', isFavorite: false, isInstalled: true },
  { id: 26, name: 'Dwarf Fortress', isFavorite: false, isInstalled: true },
  { id: 27, name: 'Crusader Kings III', isFavorite: false, isInstalled: true },
  { id: 28, name: 'Europa Universalis IV', isFavorite: false, isInstalled: true },
  { id: 29, name: 'Hearts of Iron IV', isFavorite: false, isInstalled: true },
  { id: 30, name: 'Stellaris', isFavorite: false, isInstalled: true },
];

export default function Sidebar() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const myGames = mockGames.filter((game) => game.isInstalled);

  return (
    <div className="bg-base-200 border-base-300 custom-scrollbar flex h-full w-64 flex-col overflow-y-auto border-r">
      {/* My Games Section */}
      <div className="border-base-300 border-t p-4">
        <h3 className="text-base-content/70 mb-3 text-xs font-bold tracking-wide uppercase">
          My Games ({myGames.length})
        </h3>
        <div className="space-y-1">
          {myGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left transition-colors ${
                selectedGame === game.id ? 'bg-primary text-primary-content' : 'hover:bg-base-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded">
                  <span className="text-xs">🎮</span>
                </div>
                <span className="truncate text-xs font-bold">{game.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
