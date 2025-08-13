// Enums matching Prisma schema
export enum CheatControl {
  TOGGLE = 'TOGGLE',
  STEPPER = 'STEPPER',
  SLIDER = 'SLIDER',
}

// Categories for each type of cheat
export enum Category {
  PLAYER = 'PLAYER',
  INVENTORY = 'INVENTORY',
  STATS = 'STATS',
  ENEMIES = 'ENEMIES',
  WEAPONS = 'WEAPONS',
  GAME = 'GAME',
  PHYSICS = 'PHYSICS',
  TELEPORT = 'TELEPORT',
  OTHER = 'OTHER',
}

// Interfaces matching Prisma schema
export interface Game {
  id: string;
  steamAppId: number;
  name: string;
  processName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnsupportedGame {
  id: 'unsupported';
  steamAppId: number;
  name: string;
  processName: string;
}

export type GameQueryResult = Game | UnsupportedGame | null;

export interface CheatCategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cheat {
  id: string;
  name: string;
  type: CheatControl;
  categoryId: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameCheat {
  id: string;
  gameId: string;
  cheatId: string;
  displayName?: string;
  offsets: {
    offsets: number[];
    valueType: string;
    size?: number;
  };
  parameters?: {
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    defaultValue?: number | boolean | string;
  };
  isEnabled: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock Categories
export const MOCK_CATEGORIES: CheatCategory[] = [
  {
    id: 'player',
    name: 'Player',
    icon: '👤',
    description: 'Player-related cheats',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'combat',
    name: 'Combat',
    icon: '⚔️',
    description: 'Combat and weapon cheats',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'resources',
    name: 'Resources',
    icon: '💰',
    description: 'Money, items, and resources',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'movement',
    name: 'Movement',
    icon: '🏃',
    description: 'Speed, teleport, and movement',
    order: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'misc',
    name: 'Miscellaneous',
    icon: '🔧',
    description: 'Other useful cheats',
    order: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Generic Cheats
export const MOCK_CHEATS: Cheat[] = [
  {
    id: 'unlimited_health',
    name: 'Unlimited Health',
    type: CheatControl.TOGGLE,
    categoryId: 'player',
    description: 'Enable unlimited health',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'god_mode',
    name: 'God Mode',
    type: CheatControl.TOGGLE,
    categoryId: 'player',
    description: 'Become invincible to all damage',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'unlimited_ammo',
    name: 'Unlimited Ammo',
    type: CheatControl.TOGGLE,
    categoryId: 'combat',
    description: 'Never run out of ammunition',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'one_hit_kill',
    name: 'One Hit Kill',
    type: CheatControl.TOGGLE,
    categoryId: 'combat',
    description: 'Kill enemies with a single hit',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'unlimited_money',
    name: 'Unlimited Money',
    type: CheatControl.STEPPER,
    categoryId: 'resources',
    description: 'Set your money to unlimited or a specific amount',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'unlimited_items',
    name: 'Unlimited Items',
    type: CheatControl.TOGGLE,
    categoryId: 'resources',
    description: 'Never run out of items',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'super_speed',
    name: 'Super Speed',
    type: CheatControl.STEPPER,
    categoryId: 'movement',
    description: 'Increase your movement speed',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'teleport',
    name: 'Teleport',
    type: CheatControl.TOGGLE,
    categoryId: 'movement',
    description: 'Teleport to waypoints instantly',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'no_clip',
    name: 'No Clip',
    type: CheatControl.TOGGLE,
    categoryId: 'movement',
    description: 'Walk through walls and objects',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'instant_reload',
    name: 'Instant Reload',
    type: CheatControl.TOGGLE,
    categoryId: 'combat',
    description: 'Reload weapons instantly',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Games
export const MOCK_GAMES: Game[] = [
  {
    id: 'ghostrunner',
    steamAppId: 1139900,
    name: 'Ghostrunner',
    processName: 'Ghostrunner.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dune-awakening',
    steamAppId: 1172710,
    name: 'Dune: Awakening',
    processName: 'DuneAwakening.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'naraka-bladepoint',
    steamAppId: 1203220,
    name: 'NARAKA: BLADEPOINT',
    processName: 'NARAKA BLADEPOINT.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'remnant-2',
    steamAppId: 1282100,
    name: 'Remnant II',
    processName: 'Remnant2.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lost-ark',
    steamAppId: 1599340,
    name: 'Lost Ark',
    processName: 'LostArk.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'star-wars-jedi-survivor',
    steamAppId: 1774580,
    name: 'STAR WARS Jedi: Survivor',
    processName: 'Jedi Survivor.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'like-a-dragon-ishin',
    steamAppId: 1805480,
    name: 'Like a Dragon: Ishin!',
    processName: 'Like a Dragon Ishin!.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lethal-company',
    steamAppId: 1966720,
    name: 'Lethal Company',
    processName: 'Lethal Company.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'warframe',
    steamAppId: 230410,
    name: 'Warframe',
    processName: 'Warframe.x64.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'black-myth-wukong',
    steamAppId: 2358720,
    name: 'Black Myth: Wukong',
    processName: 'Black Myth Wukong.exe',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Game Cheats - Game-specific configurations
export const MOCK_GAME_CHEATS: GameCheat[] = [
  // Ghostrunner cheats
  {
    id: 'ghostrunner-health',
    gameId: 'ghostrunner',
    cheatId: 'unlimited_health',
    displayName: 'Unlimited HP',
    offsets: {
      offsets: [0x1234, 0x5678, 0x9abc],
      valueType: 'bool',
      size: 1,
    },
    parameters: {
      defaultValue: false,
    },
    isEnabled: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ghostrunner-god',
    gameId: 'ghostrunner',
    cheatId: 'god_mode',
    offsets: {
      offsets: [0x2345, 0x6789, 0xbcde],
      valueType: 'bool',
      size: 1,
    },
    isEnabled: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ghostrunner-speed',
    gameId: 'ghostrunner',
    cheatId: 'super_speed',
    displayName: 'Cyber Speed',
    offsets: {
      offsets: [0x3456, 0x789a, 0xcdef],
      valueType: 'float',
      size: 4,
    },
    parameters: {
      min: 1.0,
      max: 10.0,
      step: 0.1,
      defaultValue: 3.0,
    },
    isEnabled: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Elden Ring cheats (if it was in our list)
  {
    id: 'elden-ring-health',
    gameId: 'elden-ring',
    cheatId: 'unlimited_health',
    displayName: 'Unlimited HP',
    offsets: {
      offsets: [0x1111, 0x2222, 0x3333],
      valueType: 'bool',
      size: 1,
    },
    parameters: {
      defaultValue: false,
    },
    isEnabled: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Remnant II cheats
  {
    id: 'remnant-2-health',
    gameId: 'remnant-2',
    cheatId: 'unlimited_health',
    displayName: 'Unlimited Health',
    offsets: {
      offsets: [0x4444, 0x5555, 0x6666],
      valueType: 'bool',
      size: 1,
    },
    parameters: {
      defaultValue: false,
    },
    isEnabled: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'remnant-2-ammo',
    gameId: 'remnant-2',
    cheatId: 'unlimited_ammo',
    offsets: {
      offsets: [0x7777, 0x8888, 0x9999],
      valueType: 'bool',
      size: 1,
    },
    isEnabled: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'remnant-2-money',
    gameId: 'remnant-2',
    cheatId: 'unlimited_money',
    displayName: 'Unlimited Scrap',
    offsets: {
      offsets: [0xaaaa, 0xbbbb, 0xcccc],
      valueType: 'int',
      size: 4,
    },
    parameters: {
      min: 0,
      max: 999999999,
      step: 1000,
      defaultValue: 999999999,
    },
    isEnabled: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper functions
export const getGameBySteamAppId = (steamAppId: number, gameName?: string): GameQueryResult => {
  const game = MOCK_GAMES.find((game) => game.steamAppId === steamAppId);

  if (game) {
    return game;
  }

  // Return unsupported game object with real game name
  return {
    id: 'unsupported',
    steamAppId: steamAppId,
    name: gameName || 'Unknown Game',
    processName: 'unknown.exe',
  };
};

export const getCheatsForGame = (gameId: string) => {
  const gameCheats = MOCK_GAME_CHEATS.filter((gc) => gc.gameId === gameId);

  return gameCheats
    .map((gameCheat) => {
      const cheat = MOCK_CHEATS.find((c) => c.id === gameCheat.cheatId);
      const category = MOCK_CATEGORIES.find((cat) => cat.id === cheat?.categoryId);

      return {
        ...gameCheat,
        cheat,
        category,
      };
    })
    .sort((a, b) => a.order - b.order);
};

export const getCheatsByCategory = (gameId: string) => {
  const gameCheats = getCheatsForGame(gameId);

  // Group by category
  const grouped = gameCheats.reduce(
    (acc, gameCheat) => {
      const categoryName = gameCheat.category?.name || 'Unknown';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(gameCheat);
      return acc;
    },
    {} as Record<string, typeof gameCheats>,
  );

  return grouped;
};
