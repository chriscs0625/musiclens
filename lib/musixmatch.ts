/**
 * Musixmatch API Client
 * Provides methods to search tracks and fetch lyrics
 */

interface Track {
  track_id: number
  track_name: string
  artist_name: string
  album_name: string
  album_coverart_100x100: string
}

interface TrackSearchResponse {
  message: {
    body: {
      track_list: Array<{ track: Track }>
    }
    header: {
      status_code: number
    }
  }
}

interface LyricsResponse {
  message: {
    body: {
      lyrics: {
        lyrics_body: string
      }
    }
    header: {
      status_code: number
    }
  }
}

const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY || ''
const MUSIXMATCH_BASE_URL = 'https://api.musixmatch.com/ws/1.1'

/**
 * Search for a track using Musixmatch API
 */
export async function searchTrack(
  query: string,
  limit: number = 5
): Promise<Track[]> {
  if (!MUSIXMATCH_API_KEY) {
    console.error('[LyricsLens] Musixmatch API key not configured')
    return []
  }

  try {
    const response = await fetch(
      `${MUSIXMATCH_BASE_URL}/track.search?q_track=${encodeURIComponent(query)}&page_size=${limit}&apikey=${MUSIXMATCH_API_KEY}`,
      {
        headers: {
          'User-Agent': 'LyricsLens/1.0',
        },
      }
    )

    if (!response.ok) {
      console.error('[LyricsLens] Musixmatch API error:', response.status)
      return []
    }

    const data = (await response.json()) as TrackSearchResponse

    if (data.message.header.status_code !== 200) {
      return []
    }

    return data.message.body.track_list.map(item => item.track)
  } catch (error) {
    console.error('[LyricsLens] Error searching Musixmatch:', error)
    return []
  }
}

/**
 * Get lyrics for a specific track
 */
export async function getTrackLyrics(trackId: number): Promise<string | null> {
  if (!MUSIXMATCH_API_KEY) {
    return null
  }

  try {
    const response = await fetch(
      `${MUSIXMATCH_BASE_URL}/track.lyrics.get?track_id=${trackId}&apikey=${MUSIXMATCH_API_KEY}`,
      {
        headers: {
          'User-Agent': 'LyricsLens/1.0',
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as LyricsResponse

    if (data.message.header.status_code !== 200) {
      return null
    }

    return data.message.body.lyrics.lyrics_body
  } catch (error) {
    console.error('[LyricsLens] Error fetching lyrics:', error)
    return null
  }
}

/**
 * Get Tamil translation of lyrics (if available)
 */
export async function getTrackLyricsTranslation(
  trackId: number,
  language: string = 'ta'
): Promise<string | null> {
  if (!MUSIXMATCH_API_KEY) {
    return null
  }

  try {
    const response = await fetch(
      `${MUSIXMATCH_BASE_URL}/track.lyrics.translation.get?track_id=${trackId}&selected_language=${language}&apikey=${MUSIXMATCH_API_KEY}`,
      {
        headers: {
          'User-Agent': 'LyricsLens/1.0',
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as LyricsResponse

    if (data.message.header.status_code !== 200) {
      return null
    }

    return data.message.body.lyrics.lyrics_body
  } catch (error) {
    console.error('[LyricsLens] Error fetching translation:', error)
    return null
  }
}
