'use client'

import { useRef, useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { MetadataBar } from '@/components/MetadataBar'
import { DualPanelLayout } from '@/components/DualPanelLayout'
import { RecentSearches, useSearchHistory } from '@/components/RecentSearches'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Music } from 'lucide-react'
import type { LyricsResponse } from '@/types/lyrics'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<LyricsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { addSearch } = useSearchHistory()

  // Animate results
  useEffect(() => {
    if (result && contentRef.current) {
      return () => {}
    }
  }, [result])


  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    addSearch(query)

    try {
      const response = await fetch('/api/lyrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        const data = (await response.json()) as LyricsResponse
        setError(data.error || 'Failed to fetch lyrics')
        setResult(null)
        return
      }

      const data = (await response.json()) as LyricsResponse
      setResult(data)
      setError(data.error || null)

      // Scroll to results
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (error) {
      console.error('[LyricsLens] Search error:', error)
      setError('Failed to fetch lyrics. Please try again.')
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecentSearch = (query: string) => {
    handleSearch(query)
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAFAF9] border-b border-[var(--color-border)] h-[56px]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-[6px] bg-[var(--color-accent-tamil)]"></div>
            <h1 className="text-[18px] style={{fontFamily: 'var(--font-display)'}} text-[#1A1A1A]">
              LyricsLens
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-[80px] pb-12 md:pb-20 px-4 md:px-8 animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-[36px] md:text-[52px] style={{fontFamily: 'var(--font-display)'}} font-normal text-[#1A1A1A] leading-tight">
              Find the lyrics.<br />
              <span className="text-[var(--color-accent-tamil)]">
                In your language.
              </span>
            </h2>
            <p className="text-[15px] text-[#6B6B6B] style={{fontFamily: 'var(--font-ui)'}} max-w-2xl mx-auto">
              Search any song, movie, or album and get lyrics in English and Tamil, side by side.
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <div
          ref={contentRef}
          className="w-full space-y-8 pb-12"
        >
          {/* Metadata */}
          {result.song && (
            <div data-lyrics-metadata>
              <MetadataBar
                song={result.song}
                hasEnglish={Boolean(result.lyrics?.english)}
                hasTamil={Boolean(result.lyrics?.tamil)}
                tamilScript={
                  result.lyrics?.tamil?.script === 'tamil' ? 'tamil' : 'tanglish'
                }
              />
            </div>
          )}

          {/* Dual Panel or Error */}
          <section className="px-4 md:px-8" data-lyrics-panel>
            {result.found ? (
              <DualPanelLayout
                englishLyrics={result.lyrics?.english}
                tamilLyrics={result.lyrics?.tamil?.content}
                tamilScript={result.lyrics?.tamil?.script}
                isLoading={isLoading}
              />
            ) : (
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="glass-strong rounded-2xl p-8">
                  <Music className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-syne font-bold text-slate-200 mb-2">
                    {result.error || 'Lyrics not found'}
                  </h3>
                  <p className="text-slate-400">
                    Try searching for another song or movie. Make sure to include
                    the song name or artist.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Error Message */}
      {error && !result?.found && (
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 border border-red-500/30 bg-red-500/10">
              <div className="text-center">
                <h3 className="text-lg font-syne font-bold text-red-300 mb-2">Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
                {error.includes('API keys') && (
                  <p className="text-red-300/70 text-xs mt-3">
                    Please configure the API keys in your project settings (top-right settings icon → Vars).
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Searches */}
      <RecentSearches onSelectSearch={handleRecentSearch} />

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/10 glass py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-400">
          <p>
            Powered by Musixmatch API & Genius. Built with Next.js, Tailwind CSS,
            and GSAP.
          </p>
        </div>
      </footer>
    </main>
  )
}
