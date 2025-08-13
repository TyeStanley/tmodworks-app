import Image from 'next/image';
import { useCurrentGame } from '@/lib/store';

export default function GameHeader() {
  const currentGame = useCurrentGame();

  // If no game is selected, don't render anything
  if (!currentGame) return null;

  const heroImageUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steamAppId}/library_hero.jpg`;

  return (
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
  );
}
