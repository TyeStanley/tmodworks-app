import { useCurrentGame } from '@/lib/store';
import { AlertTriangle } from 'lucide-react';

export default function UnsupportedGame() {
  const currentGame = useCurrentGame();

  if (!currentGame) return null;

  return (
    <div className="bg-base-100 px-6 pt-0 pb-6">
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center">
          <div className="bg-warning/20 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <AlertTriangle className="text-warning h-12 w-12" />
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
  );
}
