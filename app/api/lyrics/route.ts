import { NextRequest, NextResponse } from 'next/server'
import { lyricsCache } from '@/lib/cache'
import { detectScriptType, normalizeLyrics } from '@/lib/detectScript'
import { getTrackLyrics } from '@/lib/lyricsovh'
import { searchTamilSong } from '@/lib/tamil'
import { searchSong, extractMetadata } from '@/lib/genius'
import type { LyricsResponse, SearchInput, Song } from '@/types/lyrics'

export async function POST(request: NextRequest): Promise<NextResponse<LyricsResponse>> {
  try {
    // Check if API keys are configured (Genius is needed)
    const geniusKey = process.env.GENIUS_ACCESS_TOKEN

    if (!geniusKey) {
      console.error('[LyricsLens] Missing API keys:', { hasGenius: !!geniusKey })
      return NextResponse.json(
        { found: false, error: 'API keys not configured. Please set GENIUS_ACCESS_TOKEN.' },
        { status: 503 }
      )
    }

    const body = (await request.json()) as SearchInput

    // Validate input
    if (!body.query || body.query.trim().length === 0) {
      return NextResponse.json({ found: false, error: 'Query cannot be empty' }, { status: 400 })
    }

    if (body.query.length > 200) {
      return NextResponse.json({ found: false, error: 'Query too long (max 200 characters)' }, { status: 400 })
    }

    const query = body.query.trim()
    const cacheKey = `lyrics:${query.toLowerCase()}`

    // Check cache
    const cached = lyricsCache.get<LyricsResponse>(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Step 1: Search Genius first for metadata
    const geniusSongs = await searchSong(query, 1)
    let metadata: Song | undefined
    if (geniusSongs.length > 0) {
      metadata = extractMetadata(geniusSongs[0])
    }

    // Step 2: Check Tamil local dataset
    const tamilHit = await searchTamilSong(query)
    
    if (tamilHit) {
      const response: LyricsResponse = {
        found: true,
        song: metadata || {
          title: tamilHit.title,
          artist: tamilHit.artist,
          album: tamilHit.album,
          year: tamilHit.year,
        },
        lyrics: {
          tamil: {
            content: `${tamilHit.transliteration}\n\n---\n\n${tamilHit.script}`,
            script: 'tamil'
          }
        }
      }
      lyricsCache.set(cacheKey, response)
      return NextResponse.json(response)
    }

    // Step 3: Fallback checks
    if (!metadata || !metadata.title || !metadata.artist) {
      const response: LyricsResponse = { found: false, error: 'Song not found' }
      lyricsCache.set(cacheKey, response)
      return NextResponse.json(response)
    }

    // Step 4: Fetch from lyrics.ovh
    const title = metadata.title.replace(/\(.*\)/g, '').trim()
    const lyricsData = await getTrackLyrics(metadata.artist, title)

    if (!lyricsData) {
      const response: LyricsResponse = { found: false, error: 'Lyrics not found', song: metadata }
      lyricsCache.set(cacheKey, response)
      return NextResponse.json(response)
    }

    // Step 5: Format response
    const normalized = normalizeLyrics(lyricsData)
    const scriptType = detectScriptType(normalized)

    const response: LyricsResponse = {
      found: true,
      song: metadata,
      lyrics: {}
    }

    if (scriptType === 'tamil' || scriptType === 'tanglish') {
      response.lyrics!.tamil = { content: normalized, script: scriptType }
    } else {
      response.lyrics!.english = normalized
    }

    lyricsCache.set(cacheKey, response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('[LyricsLens] API error:', error)
    return NextResponse.json({ found: false, error: 'Internal server error' }, { status: 500 })
  }
}
