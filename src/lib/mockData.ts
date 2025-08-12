export interface Game {
  id: string;
  steamAppId: number;
  name: string;
  processName: string;
}

export type GameQueryResult = Game | null;

export const MOCK_GAMES: Game[] = [
  {
    id: 'ghostrunner',
    steamAppId: 1139900,
    name: 'Ghostrunner',
    processName: 'Ghostrunner.exe',
  },
  {
    id: 'dune-awakening',
    steamAppId: 1172710,
    name: 'Dune: Awakening',
    processName: 'DuneAwakening.exe',
  },
  {
    id: 'naraka-bladepoint',
    steamAppId: 1203220,
    name: 'NARAKA: BLADEPOINT',
    processName: 'NARAKA BLADEPOINT.exe',
  },
  {
    id: 'remnant-2',
    steamAppId: 1282100,
    name: 'Remnant II',
    processName: 'Remnant2.exe',
  },
  {
    id: 'lost-ark',
    steamAppId: 1599340,
    name: 'Lost Ark',
    processName: 'LostArk.exe',
  },
  {
    id: 'star-wars-jedi-survivor',
    steamAppId: 1774580,
    name: 'STAR WARS Jedi: Survivor',
    processName: 'Jedi Survivor.exe',
  },
  {
    id: 'like-a-dragon-ishin',
    steamAppId: 1805480,
    name: 'Like a Dragon: Ishin!',
    processName: 'Like a Dragon Ishin!.exe',
  },
  {
    id: 'lethal-company',
    steamAppId: 1966720,
    name: 'Lethal Company',
    processName: 'Lethal Company.exe',
  },
  {
    id: 'warframe',
    steamAppId: 230410,
    name: 'Warframe',
    processName: 'Warframe.x64.exe',
  },
  {
    id: 'black-myth-wukong',
    steamAppId: 2358720,
    name: 'Black Myth: Wukong',
    processName: 'Black Myth Wukong.exe',
  },
];

// Single function to query game by Steam App ID
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
