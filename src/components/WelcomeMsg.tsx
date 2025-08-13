import { Monitor } from 'lucide-react';

export default function WelcomeMsg() {
  return (
    <div className="bg-base-100 custom-scrollbar flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="flex min-h-full items-center justify-center">
          <div className="text-center">
            <div className="bg-base-300 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
              <Monitor className="text-base-content/50 h-12 w-12" />
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
