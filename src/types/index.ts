// CheatCategoryType enum
export enum CheatCategoryType {
  PLAYER = 0,
  INVENTORY = 1,
  STATS = 2,
  ENEMIES = 3,
  WEAPONS = 4,
  GAME = 5,
  PHYSICS = 6,
  TELEPORT = 7,
  OTHER = 8,
}

// Base interfaces
export interface Game {
  id: string;
  steamAppId: number;
  name: string;
  processName: string;
  moduleName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  gameCheats?: GameCheat[];
}

export interface CheatCategory {
  id: string;
  name: CheatCategoryType;
  priority: number;
  cheats?: Cheat[];
}

export interface Cheat {
  id: string;
  name: string;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: CheatCategory;
  gameCheats?: GameCheat[];
}

export interface GameCheat {
  id: string;
  gameId: string;
  cheatId: string;
  displayName?: string;
  baseAddress: string;
  offsets: number[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  game?: Game;
  cheat?: Cheat;
}
