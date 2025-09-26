import { Zap } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { StepperControl, ToggleControl, SliderControl } from '@/components/CheatControls';
import { GameCheat, CheatCategoryType } from '@/types';
import { setCheatValue } from '@/redux/state/gameSlice';

// Map category types to display names and icons
const categoryConfig = {
  [CheatCategoryType.PLAYER]: { name: 'PLAYER', icon: '👤' },
  [CheatCategoryType.INVENTORY]: { name: 'INVENTORY', icon: '🎒' },
  [CheatCategoryType.STATS]: { name: 'STATS', icon: '📊' },
  [CheatCategoryType.ENEMIES]: { name: 'ENEMIES', icon: '👹' },
  [CheatCategoryType.WEAPONS]: { name: 'WEAPONS', icon: '⚔️' },
  [CheatCategoryType.GAME]: { name: 'GAME', icon: '🎮' },
  [CheatCategoryType.PHYSICS]: { name: 'PHYSICS', icon: '⚡' },
  [CheatCategoryType.TELEPORT]: { name: 'TELEPORT', icon: '📍' },
  [CheatCategoryType.OTHER]: { name: 'OTHER', icon: '🔧' },
};

export default function SupportedGame() {
  const dispatch = useAppDispatch();

  // Get game data and cheat states from Redux store
  const { data: game, isLoading, error, cheatStates } = useAppSelector((state) => state.game);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="bg-base-100 px-6 pt-0 pb-6">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Loading Cheats...</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="bg-base-100 px-6 pt-0 pb-6">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Error Loading Cheats</h2>
        </div>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // If no game data, return null
  if (!game || !game.gameCheats || game.gameCheats.length === 0) {
    return null;
  }

  // Group cheats by category
  const cheatsByCategory: Record<string, GameCheat[]> = game.gameCheats.reduce(
    (acc, gameCheat) => {
      if (!gameCheat.cheat?.category) return acc;

      const categoryType = gameCheat.cheat.category.name;
      const categoryName = categoryConfig[categoryType]?.name || 'OTHER';

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(gameCheat);
      return acc;
    },
    {} as Record<string, GameCheat[]>,
  );

  // If no cheats by category, the game is not supported
  if (Object.keys(cheatsByCategory).length === 0) return null;

  const handleValueChange = (cheatId: string, value: number | boolean | string) => {
    dispatch(setCheatValue({ cheatId, value }));
  };

  return (
    <div className="bg-base-100 px-6 pt-0 pb-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Available Cheats</h2>
      </div>

      <div className="space-y-1">
        {Object.entries(cheatsByCategory).map(([categoryName, categoryCheats]) => {
          if (!categoryCheats || categoryCheats.length === 0) return null;

          // Get category icon from config
          const categoryEntry = Object.entries(categoryConfig).find(
            ([, config]) => config.name === categoryName,
          );
          const categoryIcon = categoryEntry ? categoryEntry[1].icon : undefined;

          return (
            <div key={categoryName} className="collapse-arrow bg-base-200 collapse">
              <input type="checkbox" />
              <div className="collapse-title py-4 text-base font-medium">
                <div className="flex items-center">
                  {categoryIcon && <span className="mr-2 text-lg">{categoryIcon}</span>}
                  <div className="font-semibold">{categoryName}</div>
                </div>
              </div>

              <div className="collapse-content">
                <div className="space-y-1 pt-2">
                  {categoryCheats.map((gameCheat) => {
                    if (!gameCheat.cheat) return null;

                    const { cheat } = gameCheat;
                    const displayName = gameCheat.displayName || cheat.name;

                    // Getting the current value from the local state
                    const currentValue =
                      cheatStates[gameCheat.id] ?? (gameCheat.controlType === 'TOGGLE' ? false : 0);
                    const isActive =
                      gameCheat.controlType === 'TOGGLE'
                        ? Boolean(currentValue)
                        : currentValue !== 0;

                    // Render the appropriate control based on the controlType from database
                    const renderControl = () => {
                      switch (gameCheat.controlType) {
                        case 'TOGGLE':
                          return (
                            <ToggleControl
                              currentValue={Boolean(currentValue)}
                              onValueChange={(value: boolean) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          );
                        case 'SLIDER':
                          return (
                            <SliderControl
                              currentValue={Number(currentValue) || 0}
                              min={gameCheat.min || 0}
                              max={gameCheat.max || 10}
                              step={gameCheat.step || 0.1}
                              onValueChange={(value: number) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          );
                        case 'STEPPER':
                          return (
                            <StepperControl
                              currentValue={Number(currentValue) || 0}
                              min={gameCheat.min || 0}
                              max={gameCheat.max || 1000}
                              step={gameCheat.step || 100}
                              onValueChange={(value: number) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          );
                        default:
                          return null;
                      }
                    };

                    return (
                      <div
                        key={gameCheat.id}
                        className={`border-base-300 hover:border-primary/50 flex items-center justify-between rounded border p-2 transition-colors ${
                          isActive ? 'bg-primary/10 border-primary/30' : 'bg-base-100'
                        }`}
                      >
                        {/* Left side: Icon and Name */}
                        <div className="flex flex-1 items-center space-x-2">
                          <div className="flex-shrink-0">
                            <Zap className="text-warning h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base-content truncate text-sm font-medium">
                              {displayName}
                            </div>
                          </div>
                        </div>

                        {/* Right side: Controls and Keybind */}
                        <div className="flex flex-shrink-0 items-center space-x-3">
                          {renderControl()}

                          {/* !TODO: Keybind control - TODO: Implement in future update */}
                          {/* <KeybindControl cheatType={gameCheat.controlType} order={index + 1} /> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
