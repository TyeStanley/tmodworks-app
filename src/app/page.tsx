import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
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
    </div>
  );
}
