/**
 * Steam CDN Image URL Generator
 *
 * Steam uses a predictable CDN structure for game images.
 * You can generate image URLs if you know the Steam App ID.
 */

export interface SteamImageUrls {
  header: string;
  library: string;
  capsule: string;
  hero: string;
}

/**
 * Generate Steam CDN image URLs for a given app ID
 */
export function getSteamImageUrls(appId: string): SteamImageUrls {
  const baseUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

  return {
    header: `${baseUrl}/${appId}/header.jpg`,
    library: `${baseUrl}/${appId}/library_600x900.jpg`,
    capsule: `${baseUrl}/${appId}/capsule_184x69.jpg`,
    hero: `${baseUrl}/${appId}/library_hero.jpg`,
  };
}

/**
 * Search for a game on Steam to get its app ID
 * This uses Steam's public search API
 */
export async function searchSteamGame(gameName: string): Promise<SteamSearchResult | null> {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(gameName)}&l=english&cc=US`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SteamSearchResult = await response.json();

    if (data.success === 1 && data.results.length > 0) {
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error searching Steam:', error);
    return null;
  }
}

export interface SteamSearchResult {
  success: number;
  start: number;
  pagesize: number;
  total_count: number;
  results: SteamSearchItem[];
}

export interface SteamSearchItem {
  id: number;
  name: string;
  released: number;
  background: string;
  short_description: string;
  header_image: string;
}

/**
 * Common Steam App IDs for popular games
 * You can find more at: https://steamdb.info/
 */
export const COMMON_STEAM_APP_IDS: Record<string, string> = {
  Valheim: '892970',
  'ELDEN RING': '1245620',
  'Cyberpunk 2077': '1091500',
  'The Witcher 3: Wild Hunt': '292030',
  'Red Dead Redemption 2': '1174180',
  'Grand Theft Auto V': '271590',
  'Fallout 4': '377160',
  Skyrim: '72850',
  Minecraft: '440',
  Terraria: '105600',
  'Stardew Valley': '413150',
  Factorio: '427520',
  RimWorld: '294100',
  'Dwarf Fortress': '975370',
  'Crusader Kings III': '1158310',
  'Europa Universalis IV': '236850',
  'Hearts of Iron IV': '394360',
  Stellaris: '281990',
  'Borderlands 2': '49520',
  'Lethal Company': '1966720',
  'STAR WARS Jedi: Survivor': '1774580',
  'Like a Dragon: Ishin!': '1805480',
  'Mount & Blade II: Bannerlord': '261550',
  '7 Days to Die': '251570',
  'Kingdom Come: Deliverance': '379430',
  'Age of Empires II: Definitive Edition': '813780',
  'Black Myth: Wukong': '2358720',
  'Lost Castle 2': '2358720',
  PEAK: '2358720',
  'R.E.P.O.': '2358720',
};

/**
 * Get Steam app ID for a game by name
 * First checks the common games list, then searches Steam if not found
 */
export async function getSteamAppId(gameName: string): Promise<string | null> {
  // First check our common games list
  const commonId = COMMON_STEAM_APP_IDS[gameName];
  if (commonId) {
    return commonId;
  }

  // If not found, search Steam
  const searchResult = await searchSteamGame(gameName);
  if (searchResult && searchResult.results.length > 0) {
    return searchResult.results[0].id.toString();
  }

  return null;
}

/**
 * Example usage:
 *
 * // Get images for a known game
 * const images = getSteamImageUrls("892970"); // Valheim
 * console.log(images.header); // https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg
 *
 * // Search for a game and get its images
 * const appId = await getSteamAppId("Some Game Name");
 * if (appId) {
 *   const images = getSteamImageUrls(appId);
 *   console.log(images.library); // Library grid image
 * }
 */
