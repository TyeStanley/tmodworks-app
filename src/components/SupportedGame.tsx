import { Zap } from 'lucide-react';
import { getCheatsByCategory, CheatControl } from '@/lib/mockData';
import { useCheatStates, useSetCheatState, useCurrentGame } from '@/lib/store';
import {
  KeybindControl,
  ToggleControl,
  NumberStepperControl,
  RangeControl,
} from '@/components/CheatControls';

export default function SupportedGame() {
  const currentGame = useCurrentGame();
  const cheatStates = useCheatStates();
  const setCheatState = useSetCheatState();

  if (!currentGame) return null;

  // Gets the cheats by category from the mock data
  const cheatsByCategory = getCheatsByCategory(currentGame.id);

  return (
    <div className="bg-base-100 px-6 pt-0 pb-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Available Cheats</h2>
      </div>

      <div className="space-y-1">
        {/* Mapping each category then each cheat in the category */}
        {Object.entries(cheatsByCategory).map(([categoryName, categoryCheats]) => {
          if (!categoryCheats || categoryCheats.length === 0) return null;

          const categoryIcon = categoryCheats[0]?.category?.icon;

          return (
            <div key={categoryName} className="collapse-arrow bg-base-200 collapse">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title py-4 text-base font-medium">
                {/* Category name and icon */}
                <div className="flex items-center">
                  {categoryIcon && <span className="mr-2 text-lg">{categoryIcon}</span>}
                  <div className="font-semibold">{categoryName}</div>
                </div>
              </div>

              {/* Mapping each cheat in the category */}
              <div className="collapse-content">
                <div className="space-y-1 pt-2">
                  {categoryCheats.map((gameCheat) => {
                    if (!gameCheat.cheat) return null;

                    const { cheat, parameters, displayName } = gameCheat;
                    const currentValue =
                      cheatStates[gameCheat.id] ?? parameters?.defaultValue ?? false;
                    const cheatName = displayName || cheat.name;
                    const isActive = cheat.type === CheatControl.TOGGLE && Boolean(currentValue);

                    const handleValueChange = (value: number | boolean | string) => {
                      setCheatState(gameCheat.id, value);
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
                              {cheatName}
                            </div>
                          </div>
                        </div>

                        {/* Right side: Controls and Keybind */}
                        <div className="flex flex-shrink-0 items-center space-x-3">
                          {/* Control logic based on cheat type */}
                          {cheat.type === CheatControl.STEPPER ? (
                            // Direct value editing with number stepper
                            <NumberStepperControl
                              currentValue={Number(currentValue)}
                              min={parameters?.min}
                              max={parameters?.max}
                              step={parameters?.step}
                              onValueChange={(value: number) => handleValueChange(value)}
                            />
                          ) : cheat.type === CheatControl.SLIDER ? (
                            // Slider with range control
                            <RangeControl
                              currentValue={Number(currentValue)}
                              min={parameters?.min}
                              max={parameters?.max}
                              step={parameters?.step}
                              onValueChange={(value: number) => handleValueChange(value)}
                            />
                          ) : (
                            // Default to toggle control
                            <ToggleControl
                              currentValue={Boolean(currentValue)}
                              onValueChange={(value: boolean) => handleValueChange(value)}
                            />
                          )}

                          {/* Keybind control */}
                          <KeybindControl cheatType={cheat.type} order={gameCheat.order} />
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
