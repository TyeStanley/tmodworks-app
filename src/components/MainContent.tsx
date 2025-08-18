'use client';

import WelcomeMsg from '@/components/WelcomeMsg';
import UnsupportedGame from '@/components/UnsupportedGame';
import SupportedGame from '@/components/SupportedGame';
import GameHeader from '@/components/GameHeader';

export default function MainContent() {
  // ! Temporary: hardcode to test supported game
  const isSupported = true; // Change to false to test unsupported game

  // If no game is selected, show the welcome screen
  if (!isSupported && false) {
    // This will never be true, so always show game
    return <WelcomeMsg />;
  }

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto">
      {/* Hero Background Section */}
      <GameHeader />

      {/* Main Content Area */}
      {isSupported ? <SupportedGame /> : <UnsupportedGame />}
    </div>
  );
}
