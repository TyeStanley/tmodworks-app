export interface Game {
  id: number;
  name: string;
  isFavorite: boolean;
  isInstalled: boolean;
  category?: string;
  lastPlayed?: string;
  playTime?: number; // in hours
}

export const mockGames: Game[] = [
  {
    id: 1,
    name: 'Valheim',
    isFavorite: true,
    isInstalled: true,
    category: 'Survival',
    lastPlayed: '2 hours ago',
    playTime: 156,
  },
  {
    id: 2,
    name: 'ELDEN RING',
    isFavorite: true,
    isInstalled: true,
    category: 'RPG',
    lastPlayed: '1 day ago',
    playTime: 89,
  },
  {
    id: 3,
    name: 'Like a Dragon: Ishin!',
    isFavorite: true,
    isInstalled: true,
    category: 'Action RPG',
    lastPlayed: '3 days ago',
    playTime: 45,
  },
  {
    id: 4,
    name: 'R.E.P.O.',
    isFavorite: false,
    isInstalled: true,
    category: 'Action',
    lastPlayed: '1 week ago',
    playTime: 12,
  },
  {
    id: 5,
    name: 'Black Myth: Wukong',
    isFavorite: false,
    isInstalled: true,
    category: 'Action RPG',
    lastPlayed: '2 weeks ago',
    playTime: 23,
  },
  {
    id: 6,
    name: 'Lost Castle 2',
    isFavorite: false,
    isInstalled: true,
    category: 'Roguelike',
    lastPlayed: '3 weeks ago',
    playTime: 8,
  },
  {
    id: 7,
    name: 'PEAK',
    isFavorite: false,
    isInstalled: true,
    category: 'Adventure',
    lastPlayed: '1 month ago',
    playTime: 5,
  },
  {
    id: 8,
    name: 'Mount & Blade II: Bannerlord',
    isFavorite: false,
    isInstalled: true,
    category: 'Strategy',
    lastPlayed: '1 month ago',
    playTime: 67,
  },
  {
    id: 9,
    name: '7 Days to Die',
    isFavorite: false,
    isInstalled: true,
    category: 'Survival Horror',
    lastPlayed: '2 months ago',
    playTime: 34,
  },
  {
    id: 10,
    name: 'Kingdom Come: Deliverance',
    isFavorite: false,
    isInstalled: true,
    category: 'RPG',
    lastPlayed: '2 months ago',
    playTime: 78,
  },
  {
    id: 11,
    name: 'Age of Empires II: Definitive Edition',
    isFavorite: false,
    isInstalled: true,
    category: 'Strategy',
    lastPlayed: '3 months ago',
    playTime: 123,
  },
  {
    id: 12,
    name: 'Borderlands 2',
    isFavorite: false,
    isInstalled: true,
    category: 'FPS',
    lastPlayed: '3 months ago',
    playTime: 56,
  },
  {
    id: 13,
    name: 'Lethal Company',
    isFavorite: false,
    isInstalled: true,
    category: 'Horror',
    lastPlayed: '4 months ago',
    playTime: 15,
  },
  {
    id: 14,
    name: 'STAR WARS Jedi: Survivor',
    isFavorite: false,
    isInstalled: true,
    category: 'Action Adventure',
    lastPlayed: '4 months ago',
    playTime: 42,
  },
];

export const navigationItems = [
  { id: 'maps', name: 'Maps', icon: '🗺️' },
  { id: 'videos', name: 'Videos', icon: '🎥' },
  { id: 'upcoming', name: 'Upcoming', icon: '📅' },
  { id: 'pro', name: 'TModWorks Pro', icon: '⭐' },
  { id: 'inside', name: 'Inside TModWorks', icon: '🏠' },
  { id: 'library', name: 'Library', icon: '📚' },
];
