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
