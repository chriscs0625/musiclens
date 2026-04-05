/**
 * Lyrics.ovh API Client
 * Provides methods to fetch lyrics without an API key
 */

const LYRICS_OVH_BASE_URL = 'https://api.lyrics.ovh/v1'

interface LyricsOvhResponse {
  lyrics: string
  error?: string
}

/**
 * Fetch lyrics for a specific artist and track title
 * @param artist The artist's name
 * @param title The song's title
 * @returns The lyrics string or null if not found
 */
export async function getTrackLyrics(artist: string, title: string): Promise<string | null> {
  if (!artist || !title) {
    return null
  }

  try {
    const url = `${LYRICS_OVH_BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    
    // We add a short timeout to prevent hanging since free APIs can be slow/unresponsive
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status !== 404) {
        console.error(`[LyricsLens] lyrics.ovh returned ${response.status} for ${artist} - ${title}`)
      }
      return null
    }

    const data = (await response.json()) as LyricsOvhResponse
    
    if (data.lyrics && typeof data.lyrics === 'string') {
      return data.lyrics.trim()
    }
    
    return null
  } catch (error) {
    console.error(`[LyricsLens] Error fetching from lyrics.ovh for ${artist} - ${title}:`, error)
    return null
  }
}
