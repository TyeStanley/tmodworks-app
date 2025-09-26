'use client';

import WelcomeMsg from '@/components/WelcomeMsg';
import SupportedGame from '@/components/SupportedGame';
import UnsupportedGame from '@/components/UnsupportedGame';
import GameHeader from '@/components/GameHeader';
import { useAppSelector } from '@/redux/hooks';

export default function MainContent() {
  const currentGame = useAppSelector((state) => state.game.data);
  const unsupportedGame = useAppSelector((state) => state.game.unsupportedGame);

  // If no game is selected, show the welcome screen
  if (!currentGame && !unsupportedGame) {
    return <WelcomeMsg />;
  }

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto">
      <GameHeader />

      {/* Main Content Area */}
      {unsupportedGame ? <UnsupportedGame /> : <SupportedGame />}
    </div>
  );
}
