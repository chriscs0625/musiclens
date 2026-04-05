import tamilData from '../data/tamil-lyrics.json'

export interface TamilSong {
  title: string
  artist: string
  album: string
  year: number
  language: string
  transliteration: string
  script: string
}

/**
 * Normalizes a string for search comparison by converting to lowercase
 * and removing non-alphanumeric characters.
 */
function normalizeQuery(query: string): string {
  if (!query) return ''
  return query.toLowerCase().replace(/[^a-z0-9]/g, '')
}

/**
 * Normalizes a query simply by removing extra spaces and forcing lowercase,
 * keeping spaces to better match against split tokens.
 */
function tokenize(query: string): string[] {
  if (!query) return []
  return query.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean)
}

/**
 * Search the static Tamil JSON dataset for a song matching the query.
 * Matches against both title and artist.
 */
export async function searchTamilSong(query: string): Promise<TamilSong | null> {
  const songs = tamilData as TamilSong[]
  
  if (!query || songs.length === 0) return null

  const normalizedQueryTokens = tokenize(query)
  if (normalizedQueryTokens.length === 0) return null

  // Score base search
  let bestMatch: TamilSong | null = null
  let highestScore = 0

  for (const song of songs) {
    const titleTokens = tokenize(song.title)
    const artistTokens = tokenize(song.artist)
    const combinedTokens = new Set([...titleTokens, ...artistTokens])

    let matches = 0
    for (const qToken of normalizedQueryTokens) {
      if (Array.from(combinedTokens).some(t => t.includes(qToken) || qToken.includes(t))) {
        matches++
      }
    }

    if (matches > highestScore && matches >= Math.ceil(normalizedQueryTokens.length * 0.5)) {
      highestScore = matches
      bestMatch = song
    }
  }

  return bestMatch
}
