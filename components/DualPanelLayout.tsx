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

  // Parse unified Tamil output if it contains '---'
  let parsedTanglish = tamilLyrics
  let parsedTamilScript = ''
  if (tamilLyrics && tamilLyrics.includes('---')) {
    const parts = tamilLyrics.split('---')
    parsedTanglish = parts[0].trim()
    parsedTamilScript = parts[1].trim()
  }

  const currentTamilDisplay =
    tamilDisplayMode === 'tamil' && parsedTamilScript ? parsedTamilScript : parsedTanglish

  if (!showEnglish && !showTamil && !isLoading) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <p className="text-[15px] font-[family:var(--font-ui)] text-[#1A1A1A] mb-2">No lyrics found</p>        
          <p className="text-[14px] text-[#6B6B6B] font-[family:var(--font-ui)]">
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
              type="english"
              isLoading={isLoading}
            />
          )}
          {showTamil && (
            <div className="flex flex-col">
              {tamilScript === 'tamil' && parsedTamilScript && (
                <div className="mb-4 max-w-sm mx-auto">
                  <Tabs
                    value={tamilDisplayMode}
                    onValueChange={(v) =>
                      setTamilDisplayMode(v as 'tanglish' | 'tamil')
                    }
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-[#F5F3F0] rounded-[100px] p-1 h-auto">
                      <TabsTrigger
                        value="tanglish"
                        className="rounded-[100px] font-[family:var(--font-ui)] text-[13px] font-[500] data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm text-[#6B6B6B]"
                      >
                        Tanglish
                      </TabsTrigger>
                      <TabsTrigger
                        value="tamil"
                        className="rounded-[100px] font-[family:var(--font-ui)] text-[13px] font-[500] data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm text-[#6B6B6B]"
                      >
                        Tamil Script
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
              <LyricsPanel
                title={tamilDisplayMode === 'tamil' ? 'TAMIL' : 'TAMIL (TANGLISH)'}
                lyrics={currentTamilDisplay || ''}
                type="tamil"
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      ) : (
        /* For dual panel */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* English Panel */}
          <LyricsPanel
            title="English"
            lyrics={englishLyrics || ''}
            type="english"
            isLoading={isLoading}
          />

          {/* Tamil Panel with Script Toggle */}
          <div className="flex flex-col">
            {tamilScript === 'tamil' && parsedTamilScript && (
              <div className="mb-4">
                <Tabs
                  value={tamilDisplayMode}
                  onValueChange={(v) =>
                    setTamilDisplayMode(v as 'tanglish' | 'tamil')
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-[240px] grid-cols-2 bg-[#F5F3F0] rounded-[100px] p-1 h-auto mx-auto lg:mx-0">
                    <TabsTrigger
                      value="tanglish"
                      className="rounded-[100px] font-[family:var(--font-ui)] text-[13px] font-[500] data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm text-[#6B6B6B]"
                    >
                      Tanglish
                    </TabsTrigger>
                    <TabsTrigger
                      value="tamil"
                      className="rounded-[100px] font-[family:var(--font-ui)] text-[13px] font-[500] data-[state=active]:bg-white data-[state=active]:text-[#1A1A1A] data-[state=active]:shadow-sm text-[#6B6B6B]"
                    >
                      Tamil Script
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <LyricsPanel
              title={
                tamilDisplayMode === 'tamil' ? 'Tamil' : 'Tamil (Tanglish)'
              }
              lyrics={currentTamilDisplay || ''}
              type="tamil"
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}
