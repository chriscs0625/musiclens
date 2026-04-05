import { NextRequest, NextResponse } from 'next/server'
import { lyricsCache } from '@/lib/cache'
import { detectScriptType, normalizeLyrics } from '@/lib/detectScript'
import { searchTrack, getTrackLyrics, getTrackLyricsTranslation } from '@/lib/musixmatch'
import { searchSong, extractMetadata } from '@/lib/genius'
import type { LyricsResponse, SearchInput } from '@/types/lyrics'

export async function POST(request: NextRequest): Promise<NextResponse<LyricsResponse>> {
  try {
    // Check if API keys are configured
    const musixmatchKey = process.env.MUSIXMATCH_API_KEY
    const geniusKey = process.env.GENIUS_ACCESS_TOKEN

    if (!musixmatchKey || !geniusKey) {
      console.error('[LyricsLens] Missing API keys:', {
        hasMusixmatch: !!musixmatchKey,
        hasGenius: !!geniusKey,
      })
      return NextResponse.json(
        {
          found: false,
          error: 'API keys not configured. Please set MUSIXMATCH_API_KEY and GENIUS_ACCESS_TOKEN environment variables.',
        },
        { status: 503 }
      )
    }

    const body = (await request.json()) as SearchInput

    // Validate input
    if (!body.query || body.query.trim().length === 0) {
      return NextResponse.json(
        { found: false, error: 'Query cannot be empty' },
        { status: 400 }
      )
    }

    if (body.query.length > 200) {
      return NextResponse.json(
        { found: false, error: 'Query too long (max 200 characters)' },
        { status: 400 }
      )
    }

    const query = body.query.trim()
    const cacheKey = `lyrics:${query.toLowerCase()}`

    // Check cache
    const cached = lyricsCache.get<LyricsResponse>(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Search on Musixmatch
    const mmTracks = await searchTrack(query, 3)

    if (mmTracks.length === 0) {
      // Fallback to Genius for metadata
      const geniusSongs = await searchSong(query, 1)
      if (geniusSongs.length > 0) {
        const song = geniusSongs[0]
        const metadata = extractMetadata(song)

        const response: LyricsResponse = {
          found: false,
          error: 'Lyrics not found',
          song: metadata,
        }

        lyricsCache.set(cacheKey, response)
        return NextResponse.json(response)
      }

      const response: LyricsResponse = {
        found: false,
        error: 'Song not found',
      }

      lyricsCache.set(cacheKey, response)
      return NextResponse.json(response)
    }

    const track = mmTracks[0]
    const [englishLyrics, tamilLyrics, geniusMeta] = await Promise.allSettled([
      getTrackLyrics(track.track_id),
      getTrackLyricsTranslation(track.track_id, 'ta'),
      searchSong(query, 1),
    ])

    // Extract English lyrics
    const englishLyricsText =
      englishLyrics.status === 'fulfilled' && englishLyrics.value
        ? normalizeLyrics(englishLyrics.value)
        : null

    // Extract Tamil lyrics
    let tamilLyricsText: string | null = null
    let tamilScript = 'none'
    if (tamilLyrics.status === 'fulfilled' && tamilLyrics.value) {
      tamilLyricsText = normalizeLyrics(tamilLyrics.value)
      tamilScript = detectScriptType(tamilLyricsText)
    }

    // Extract metadata from Genius if available
    let metadata = {
      title: track.track_name,
      artist: track.artist_name,
      album: track.album_name,
      coverArt: track.album_coverart_100x100,
    }

    if (
      geniusMeta.status === 'fulfilled' &&
      geniusMeta.value &&
      geniusMeta.value.length > 0
    ) {
      const geniusSong = geniusMeta.value[0]
      metadata = {
        ...metadata,
        ...extractMetadata(geniusSong),
      }
    }

    if (!englishLyricsText && !tamilLyricsText) {
      const response: LyricsResponse = {
        found: false,
        error: 'Lyrics not available',
        song: metadata,
      }

      lyricsCache.set(cacheKey, response)
      return NextResponse.json(response)
    }

    const response: LyricsResponse = {
      found: true,
      song: metadata,
      lyrics: {
        english: englishLyricsText || undefined,
        tamil: tamilLyricsText
          ? {
              content: tamilLyricsText,
              script: tamilScript as 'tanglish' | 'tamil' | 'none',
            }
          : undefined,
      },
    }

    lyricsCache.set(cacheKey, response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('[LyricsLens] API error:', error)
    return NextResponse.json(
      {
        found: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
