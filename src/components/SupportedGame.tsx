import { useState } from 'react';
import { Zap } from 'lucide-react';
import {
  KeybindControl,
  ToggleControl,
  StepperControl,
  SliderControl,
} from '@/components/CheatControls';

// Define cheat control types
enum CheatControl {
  TOGGLE = 'TOGGLE',
  STEPPER = 'STEPPER',
  SLIDER = 'SLIDER',
}

// Mock data structure for demonstration
interface Cheat {
  id: string;
  name: string;
  type: CheatControl;
  category: {
    name: string;
    icon?: string;
  };
}

interface GameCheat {
  id: string;
  cheat: Cheat;
  displayName?: string;
  parameters?: {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number | boolean;
  };
  order?: number;
}

interface CheatsByCategory {
  [categoryName: string]: GameCheat[];
}

export default function SupportedGame() {
  // Local state to replace Zustand store
  const [cheatStates, setCheatStates] = useState<Record<string, number | boolean | string>>({});

  // Mock data - you'll replace this with your actual data
  const cheatsByCategory: CheatsByCategory = {
    PLAYER: [
      {
        id: 'health-1',
        cheat: {
          id: 'health',
          name: 'health',
          type: CheatControl.TOGGLE,
          category: { name: 'PLAYER' },
        },
        displayName: 'Unlimited Health',
        parameters: { min: 0, max: 1, step: 1, defaultValue: false },
      },
      {
        id: 'stamina-1',
        cheat: {
          id: 'stamina',
          name: 'stamina',
          type: CheatControl.TOGGLE,
          category: { name: 'PLAYER' },
        },
        displayName: 'Unlimited Stamina',
        parameters: { min: 0, max: 1, step: 1, defaultValue: false },
      },
    ],
    WEAPONS: [
      {
        id: 'ammo-1',
        cheat: {
          id: 'ammo',
          name: 'ammo',
          type: CheatControl.TOGGLE,
          category: { name: 'WEAPONS' },
        },
        displayName: 'Unlimited Ammo',
        parameters: { min: 0, max: 1, step: 1, defaultValue: false },
      },
    ],
    GAME: [
      {
        id: 'team1-reinforcements-1',
        cheat: {
          id: 'team1_reinforcements',
          name: 'team1_reinforcements',
          type: CheatControl.SLIDER,
          category: { name: 'GAME' },
        },
        displayName: 'Team 1 Reinforcements',
        parameters: { min: 1, max: 5000, step: 100, defaultValue: 100 },
      },
    ],
  };

  // If no cheats by category, the game is not supported
  if (Object.keys(cheatsByCategory).length === 0) return null;

  const handleValueChange = (cheatId: string, value: number | boolean | string) => {
    setCheatStates((prev) => ({
      ...prev,
      [cheatId]: value,
    }));
  };

  return (
    <div className="bg-base-100 px-6 pt-0 pb-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Available Cheats</h2>
      </div>

      <div className="space-y-1">
        {Object.entries(cheatsByCategory).map(([categoryName, categoryCheats]) => {
          if (!categoryCheats || categoryCheats.length === 0) return null;

          const categoryIcon = categoryCheats[0]?.cheat?.category?.icon;

          return (
            <div key={categoryName} className="collapse-arrow bg-base-200 collapse">
              <input type="checkbox" defaultChecked />
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

                    const { cheat, parameters, displayName } = gameCheat;

                    // Getting the current value from the local state
                    const currentValue =
                      cheatStates[gameCheat.id] ?? parameters?.defaultValue ?? false;
                    const cheatName = displayName || cheat.name;
                    const isActive = cheat.type === CheatControl.TOGGLE && Boolean(currentValue);

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
                            <StepperControl
                              currentValue={Number(currentValue)}
                              min={parameters?.min}
                              max={parameters?.max}
                              step={parameters?.step}
                              onValueChange={(value: number) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          ) : cheat.type === CheatControl.SLIDER ? (
                            <SliderControl
                              currentValue={Number(currentValue)}
                              min={parameters?.min}
                              max={parameters?.max}
                              step={parameters?.step}
                              onValueChange={(value: number) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          ) : (
                            <ToggleControl
                              currentValue={Boolean(currentValue)}
                              onValueChange={(value: boolean) =>
                                handleValueChange(gameCheat.id, value)
                              }
                            />
                          )}

                          {/* Keybind control */}
                          <KeybindControl cheatType={cheat.type} order={gameCheat.order ?? 0} />
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
