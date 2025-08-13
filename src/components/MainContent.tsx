'use client';

import { useCurrentGame } from '@/lib/store';
import WelcomeMsg from '@/components/WelcomeMsg';
import UnsupportedGame from '@/components/UnsupportedGame';
import SupportedGame from '@/components/SupportedGame';
import GameHeader from '@/components/GameHeader';

export default function MainContent() {
  const currentGame = useCurrentGame();

  // If no game is selected, show the welcome screen
  if (!currentGame) return <WelcomeMsg />;

  const isUnsupported = currentGame?.id === 'unsupported';

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto">
      {/* Hero Background Section */}
      <GameHeader />

      {/* Main Content Area */}
      {isUnsupported ? <UnsupportedGame /> : <SupportedGame />}
    </div>
  );
}
