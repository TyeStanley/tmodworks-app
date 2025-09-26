import Image from 'next/image';
import { getSteamImageUrls } from '@/lib/steamUtils';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { togglePlay } from '@/redux/state/gameSlice';
import Button from '@/components/ui/Button';

export default function GameHeader() {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector((state) => state.game.data);
  const unsupportedGame = useAppSelector((state) => state.game.unsupportedGame);
  const isActive = useAppSelector((state) => state.game.isActive);
  const isActivating = useAppSelector((state) => state.game.isActivating);

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

  const handlePlayToggle = () => {
    dispatch(togglePlay());
  };

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

        {/* Play/Stop Button - Bottom Right (only show for supported games) */}
        {currentGame && (
          <div className="absolute right-6 bottom-6">
            <Button
              variant={isActive ? 'secondary' : 'primary'}
              size="lg"
              onClick={handlePlayToggle}
              disabled={isActivating}
              className="relative flex h-12 w-24 items-center justify-center overflow-hidden rounded-lg shadow-lg"
            >
              {isActivating ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="text-sm font-semibold text-white drop-shadow-md">
                    {isActive ? 'Starting...' : 'Stopping...'}
                  </span>
                </div>
              ) : (
                <span className="font-medium">{isActive ? 'Stop' : 'Play'}</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
