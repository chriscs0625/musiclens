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

  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return null

  const qTokens = tokenize(query)

  for (const song of songs) {
    const titleTokens = tokenize(song.title)
    const artistTokens = tokenize(song.artist)

    let titleMatchScore = 0
    for (const t of titleTokens) {
      if (qTokens.some(qt => qt.includes(t) || t.includes(qt))) {
        titleMatchScore++
      }
    }
    const hasFullTitle = titleMatchScore >= titleTokens.length

    let artistMatchScore = 0
    for (const a of artistTokens) {
      if (qTokens.some(qt => qt.includes(a) || a.includes(qt))) {
        artistMatchScore++
      }
    }
    const hasArtist = artistMatchScore > 0 // Matches at least one piece of the artist's name

    // Exact title match (query and title are the same tokens without extra words, or just strict equality)
    const isExactTitle = hasFullTitle && qTokens.length === titleTokens.length

    if (isExactTitle || (hasFullTitle && hasArtist)) {
      return song
    }
  }

  return null
}
