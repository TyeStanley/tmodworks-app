'use client';

import { useCurrentGame } from '@/lib/store';

export default function MainContent() {
  const currentGame = useCurrentGame();

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

  // Check if the game is not supported
  if (currentGame.id === 'unsupported') {
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
          <div className="relative z-10 flex h-full items-end p-6">
            <div className="text-white">
              <h1 className="mb-2 text-4xl font-bold drop-shadow-lg">{currentGame.name}</h1>
              <p className="text-white/80 drop-shadow-md">Steam App ID: {currentGame.steamAppId}</p>
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
                  Steam App ID: {currentGame.steamAppId}
                </p>
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
        <div className="relative z-10 flex h-full items-end p-6">
          <div className="text-white">
            <h1 className="mb-2 text-4xl font-bold drop-shadow-lg">{currentGame.name}</h1>
            <p className="text-white/80 drop-shadow-md">Steam App ID: {currentGame.steamAppId}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-base-100 p-6">
        {/* Content for selected game will go here */}
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🎮</div>
          <h3 className="mb-2 text-xl font-semibold">Game Selected</h3>
          <p className="text-base-content/50">{currentGame.name} is ready for modification.</p>
        </div>
      </div>
    </div>
  );
}
