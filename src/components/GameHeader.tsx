import Image from 'next/image';
import { getSteamImageUrls } from '@/lib/steamUtils';
import { useAppSelector } from '@/redux/hooks';

export default function GameHeader() {
  const currentGame = useAppSelector((state) => state.game.data);
  const unsupportedGame = useAppSelector((state) => state.game.unsupportedGame);

  // If no game is selected, don't render anything
  if (!currentGame && !unsupportedGame) {
    return null;
  }

  // Use current game if available, otherwise use unsupported game data
  const gameData = currentGame || unsupportedGame;
  const imageUrls = currentGame
    ? getSteamImageUrls(currentGame.steamAppId.toString())
    : unsupportedGame
      ? getSteamImageUrls(unsupportedGame.appId)
      : { hero: '', library: '', header: '', capsule: '' };

  return (
    <div className="relative h-64 w-full">
      {/* Background Image with fallback */}
      <div
        className="absolute inset-0 bg-gray-800 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrls.hero})`,
        }}
      />

      {/* Gradient Overlay - fades from bottom to top */}
      <div className="from-base-100 via-base-100/80 absolute inset-0 bg-gradient-to-t to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-start p-6">
        <div className="flex items-center space-x-4 text-white">
          {/* Steam Library Image */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-lg shadow-lg">
            <Image
              src={imageUrls.library}
              alt={`${gameData?.name} library image`}
              width={128}
              height={192}
              className="h-32 w-auto rounded-lg shadow-lg"
            />
          </div>
          {/* Game Title */}
          <h1 className="text-4xl font-bold drop-shadow-lg">{gameData?.name}</h1>
        </div>
      </div>
    </div>
  );
}
