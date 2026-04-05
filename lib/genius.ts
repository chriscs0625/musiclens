/**
 * Genius API Client
 * Provides methods to fetch song metadata and information
 */

interface GeniusSong {
  id: number
  title: string
  primary_artist: {
    name: string
    image_url: string
  }
  album?: {
    name: string
  }
  release_date_components?: {
    year: number
  }
  song_art_image_thumbnail_url?: string
  song_art_image_url?: string
}

interface GeniusSearchResponse {
  response: {
    hits: Array<{
      result: GeniusSong
    }>
  }
}

const GENIUS_API_KEY = process.env.GENIUS_ACCESS_TOKEN || ''
const GENIUS_BASE_URL = 'https://api.genius.com'

/**
 * Search for a song using Genius API
 */
export async function searchSong(
  query: string,
  limit: number = 5
): Promise<GeniusSong[]> {
  if (!GENIUS_API_KEY) {
    console.error('[LyricsLens] Genius API key not configured')
    return []
  }

  try {
    const response = await fetch(
      `${GENIUS_BASE_URL}/search?q=${encodeURIComponent(query)}&per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${GENIUS_API_KEY}`,
          'User-Agent': 'LyricsLens/1.0',
        },
      }
    )

    if (!response.ok) {
      console.error('[LyricsLens] Genius API error:', response.status)
      return []
    }

    const data = (await response.json()) as GeniusSearchResponse

    return data.response.hits.map(hit => hit.result)
  } catch (error) {
    console.error('[LyricsLens] Error searching Genius:', error)
    return []
  }
}

/**
 * Get detailed information about a song
 */
export async function getSongMetadata(songId: number): Promise<GeniusSong | null> {
  if (!GENIUS_API_KEY) {
    return null
  }

  try {
    const response = await fetch(`${GENIUS_BASE_URL}/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${GENIUS_API_KEY}`,
        'User-Agent': 'LyricsLens/1.0',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { response: { song: GeniusSong } }

    return data.response.song
  } catch (error) {
    console.error('[LyricsLens] Error fetching song metadata:', error)
    return null
  }
}

/**
 * Extract metadata from Genius song object
 */
export function extractMetadata(song: GeniusSong) {
  return {
    title: song.title,
    artist: song.primary_artist.name,
    album: song.album?.name,
    coverArt: song.song_art_image_url || song.song_art_image_thumbnail_url,
    year: song.release_date_components?.year,
  }
}
