import Image from 'next/image';
import { useGameSelection } from '@/hooks/useGameSelection';
import { getSteamImageUrls } from '@/lib/steamUtils';

export default function GameHeader() {
  const { currentGame } = useGameSelection();

  // If no game is selected, don't render anything
  if (!currentGame) {
    return null;
  }

  const imageUrls = getSteamImageUrls(currentGame.game.steamAppId.toString());

  return (
    <div className="relative h-64 w-full">
      {/* Background Image with fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrls.hero})`,
          backgroundColor: '#1a1a1a', // Fallback background color
        }}
      />

      {/* Gradient Overlay - fades from bottom to top */}
      <div className="from-base-100 via-base-100/80 absolute inset-0 bg-gradient-to-t to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-start p-6">
        <div className="flex items-center space-x-4 text-white">
          {/* Steam Library Image with fallback */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-lg bg-gray-800 shadow-lg">
            <Image
              src={imageUrls.library}
              alt={`${currentGame.game.name} library image`}
              width={128}
              height={192}
              className="h-32 w-auto rounded-lg shadow-lg"
              onError={(e) => {
                // Hide the image on error, the background div will show
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback text if image fails */}
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {currentGame.game.name.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
          {/* Game Title */}
          <h1 className="text-4xl font-bold drop-shadow-lg">{currentGame.game.name}</h1>
        </div>
      </div>
    </div>
  );
}
