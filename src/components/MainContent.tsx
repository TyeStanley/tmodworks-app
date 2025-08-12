'use client';

import { useCurrentGame } from '@/lib/store';
import { getCheatsByCategory, CheatType } from '@/lib/mockData';
import { useState } from 'react';
import Image from 'next/image';

export default function MainContent() {
  const currentGame = useCurrentGame();
  const [cheatStates, setCheatStates] = useState<Record<string, number | boolean | string>>({});

  // If no game is selected, show the welcome screen
  if (!currentGame) {
    return (
      <div className="bg-base-100 custom-scrollbar flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex min-h-full items-center justify-center">
            <div className="text-center">
              <div className="bg-base-300 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="text-base-content/50 h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-base-content/70 mb-2 text-2xl font-bold">Welcome to TModWorks</h2>
              <p className="text-base-content/50 max-w-md">
                Select a game from the sidebar to start modifying game stats.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create hero image URL for both supported and unsupported games
  const heroImageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steamAppId}/library_hero.jpg`;

  // Get cheats organized by category for the selected game
  const cheatsByCategory = getCheatsByCategory(currentGame.id);

  // Check if the game has any cheats - if not, treat as unsupported
  const hasCheats = Object.keys(cheatsByCategory).length > 0;
  const isUnsupported = currentGame.id === 'unsupported' || !hasCheats;

  // Check if the game is not supported
  if (isUnsupported) {
    return (
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {/* Hero Background Section */}
        <div className="relative h-64 w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
          />

          {/* Gradient Overlay - fades from bottom to top */}
          <div className="from-base-100 via-base-100/80 absolute inset-0 bg-gradient-to-t to-transparent" />

          {/* Content Overlay */}
          <div className="relative z-10 flex h-full items-start p-6">
            <div className="flex items-center space-x-4 text-white">
              {/* Steam Library Image */}
              <Image
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steamAppId}/library_600x900.jpg`}
                alt={`${currentGame.name} library image`}
                width={128}
                height={192}
                className="h-32 w-auto rounded-lg shadow-lg"
              />
              {/* Game Title */}
              <h1 className="text-4xl font-bold drop-shadow-lg">{currentGame.name}</h1>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-base-100 p-6">
          <div className="flex min-h-full items-center justify-center">
            <div className="text-center">
              <div className="bg-warning/20 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="text-warning h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-warning mb-2 text-2xl font-bold">Game Not Supported</h2>
              <p className="text-base-content/50 mb-4 max-w-md">
                {currentGame.name} is not currently supported in TModWorks.
              </p>
              <div className="bg-base-200 mx-auto max-w-md rounded-lg p-4">
                <p className="text-base-content/70 text-sm">
                  This game may be added in a future update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle cheat state changes
  const handleCheatChange = (cheatId: string, value: number | boolean | string) => {
    setCheatStates((prev) => ({
      ...prev,
      [cheatId]: value,
    }));
  };

  // Render cheat card
  const renderCheatCard = (gameCheat: ReturnType<typeof getCheatsByCategory>[string][0]) => {
    const { cheat, parameters, displayName } = gameCheat;
    if (!cheat) return <div className="text-error">Cheat not found</div>;

    const cheatName = displayName || cheat.name;
    const currentValue = cheatStates[gameCheat.id] ?? parameters?.defaultValue ?? false;

    // Generate keybind based on cheat order (F1-F11, then Ctrl+F1-F11)
    const getKeybind = (order: number) => {
      if (order <= 11) {
        return `F${order}`;
      } else {
        return `Ctrl+F${order - 11}`;
      }
    };

    return (
      <div
        className={`border-base-300 hover:border-primary/50 flex items-center justify-between rounded border p-2 transition-colors ${
          (cheat.type === CheatType.TOGGLE || cheat.type === CheatType.BOOLEAN) &&
          Boolean(currentValue)
            ? 'bg-primary/10 border-primary/30'
            : 'bg-base-100'
        }`}
      >
        {/* Left side: Icon and Name */}
        <div className="flex flex-1 items-center space-x-2">
          {/* Zap Icon */}
          <div className="flex-shrink-0">
            <svg
              className="text-warning h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Cheat Name */}
          <div className="min-w-0 flex-1">
            <div className="text-base-content truncate text-sm font-medium">{cheatName}</div>
          </div>
        </div>

        {/* Right side: Controls and Keybind */}
        <div className="flex flex-shrink-0 items-center space-x-3">
          {/* Toggle/Control */}
          <div className="flex-shrink-0">
            {cheat.type === CheatType.TOGGLE || cheat.type === CheatType.BOOLEAN ? (
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={Boolean(currentValue)}
                onChange={(e) => handleCheatChange(gameCheat.id, e.target.checked)}
              />
            ) : cheat.type === CheatType.NUMBER ? (
              <div className="flex items-center space-x-4">
                <div className="text-center font-mono text-xs">{Number(currentValue)}</div>
                <input
                  type="range"
                  className="range range-primary range-xs w-20"
                  min={parameters?.min}
                  max={parameters?.max}
                  step={parameters?.step}
                  value={Number(currentValue)}
                  onChange={(e) => handleCheatChange(gameCheat.id, parseFloat(e.target.value) || 0)}
                />
              </div>
            ) : cheat.type === CheatType.SELECT ? (
              <select
                className="select select-bordered select-xs w-24"
                value={String(currentValue)}
                onChange={(e) => handleCheatChange(gameCheat.id, e.target.value)}
              >
                {parameters?.options?.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>

          {/* Keybind */}
          <div className="flex-shrink-0">
            {cheat.type === CheatType.NUMBER ? (
              <div className="flex space-x-1">
                <div className="bg-base-200 text-base-content/70 flex items-center rounded px-2 py-1 font-mono text-xs font-semibold">
                  <span>↑</span>
                  <span className="ml-1">{getKeybind(gameCheat.order)}</span>
                </div>
                <div className="bg-base-200 text-base-content/70 flex items-center rounded px-2 py-1 font-mono text-xs font-semibold">
                  <span>↓</span>
                  <span className="ml-1">Shift {getKeybind(gameCheat.order)}</span>
                </div>
              </div>
            ) : (
              <div className="bg-base-200 text-base-content/70 rounded px-2 py-1 font-mono text-xs font-semibold">
                {getKeybind(gameCheat.order)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If the game is supported, show the game cheats with hero background
  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto">
      {/* Hero Background Section */}
      <div className="relative h-64 w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        />

        {/* Gradient Overlay - fades from bottom to top */}
        <div className="from-base-100 via-base-100/80 absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full items-start p-6">
          <div className="flex items-center space-x-4 text-white">
            {/* Steam Library Image */}
            <Image
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steamAppId}/library_600x900.jpg`}
              alt={`${currentGame.name} library image`}
              width={128}
              height={192}
              className="h-32 w-auto rounded-lg shadow-lg"
            />
            {/* Game Title */}
            <h1 className="text-4xl font-bold drop-shadow-lg">{currentGame.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-base-100 p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Available Cheats</h2>
        </div>

        {/* Cheats organized by category */}
        <div className="space-y-1">
          {Object.entries(cheatsByCategory).map(([categoryName, gameCheats]) => (
            <div key={categoryName} className="collapse-arrow bg-base-200 collapse">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title py-4 text-base font-medium">
                <div className="flex items-center">
                  {gameCheats[0]?.category?.icon && (
                    <span className="mr-2 text-lg">{gameCheats[0].category.icon}</span>
                  )}
                  <div className="font-semibold">{categoryName}</div>
                </div>
              </div>
              <div className="collapse-content">
                <div className="space-y-1 pt-2">
                  {gameCheats.map((gameCheat) => (
                    <div key={gameCheat.id}>{renderCheatCard(gameCheat)}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
