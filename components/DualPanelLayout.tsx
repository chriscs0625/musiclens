'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LyricsPanel } from './LyricsPanel'
import type { ScriptType } from '@/types/lyrics'

interface DualPanelLayoutProps {
  englishLyrics?: string
  tamilLyrics?: string
  tamilScript?: ScriptType
  isLoading?: boolean
}

export function DualPanelLayout({
  englishLyrics,
  tamilLyrics,
  tamilScript = 'none',
  isLoading = false,
}: DualPanelLayoutProps) {
  const [tamilDisplayMode, setTamilDisplayMode] = useState<'tanglish' | 'tamil'>(
    tamilScript === 'tamil' ? 'tamil' : 'tanglish'
  )

  const showEnglish = Boolean(englishLyrics)
  const showTamil = Boolean(tamilLyrics)

  if (!showEnglish && !showTamil && !isLoading) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <p className="text-lg text-slate-400 mb-2">No lyrics found</p>
          <p className="text-sm text-slate-500">
            Try searching for a different song or movie
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* For single panel (only English or Tamil) */}
      {(showEnglish && !showTamil) || (!showEnglish && showTamil) ? (
        <div className="max-w-4xl mx-auto">
          {showEnglish && (
            <LyricsPanel
              title="English Lyrics"
              lyrics={englishLyrics || ''}
              accentColor="violet"
              isLoading={isLoading}
            />
          )}
          {showTamil && (
            <LyricsPanel
              title={tamilScript === 'tamil' ? 'Tamil Lyrics' : 'Tanglish Lyrics'}
              lyrics={tamilLyrics || ''}
              accentColor="amber"
              isLoading={isLoading}
            />
          )}
        </div>
      ) : (
        /* For dual panel */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* English Panel */}
          <LyricsPanel
            title="English Lyrics"
            lyrics={englishLyrics || ''}
            accentColor="violet"
            isLoading={isLoading}
          />

          {/* Tamil Panel with Script Toggle */}
          <div className="flex flex-col">
            {tamilScript === 'tanglish' && (
              <div className="mb-4">
                <Tabs
                  value={tamilDisplayMode}
                  onValueChange={(v) =>
                    setTamilDisplayMode(v as 'tanglish' | 'tamil')
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                    <TabsTrigger
                      value="tanglish"
                      className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300"
                    >
                      Tanglish
                    </TabsTrigger>
                    <TabsTrigger
                      value="tamil"
                      className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-300"
                    >
                      Tamil Script
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <LyricsPanel
              title={
                tamilScript === 'tamil' ? 'Tamil Lyrics' : 'Tanglish Lyrics'
              }
              lyrics={tamilLyrics || ''}
              accentColor="amber"
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}
