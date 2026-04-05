export type ScriptType = 'tanglish' | 'tamil' | 'none'

export interface Song {
  title: string
  artist: string
  album?: string
  coverArt?: string
  year?: number
}

export interface LyricsContent {
  content: string
  script: ScriptType
}

export interface SearchInput {
  query: string
  type?: 'song' | 'movie' | 'album'
}

export interface LyricsResponse {
  found: boolean
  error?: string
  song?: Song
  lyrics?: {
    english?: string
    tamil?: LyricsContent
  }
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
}

export interface SearchHistoryItem {
  query: string
  timestamp: number
}
