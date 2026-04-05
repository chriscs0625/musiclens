'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Song } from '@/types/lyrics'

interface MetadataBarProps {
  song: Song
  hasEnglish?: boolean
  hasTamil?: boolean
  tamilScript?: 'tanglish' | 'tamil'
}

export function MetadataBar({
  song,
  hasEnglish = true,
  hasTamil = false,
  tamilScript = 'tanglish',
}: MetadataBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animation will be applied here in the animation component
    if (containerRef.current) {
      containerRef.current.style.animation = 'fade-up 0.6s ease-out'
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full py-6 px-4 md:px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto flex gap-4 items-start">
        {/* Album Art */}
        {song.coverArt && (
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700/50">
            <Image
              src={song.coverArt}
              alt={song.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
        )}

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl md:text-3xl font-syne font-bold text-slate-100 text-balance leading-tight mb-1">
            {song.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 mb-3">
            {song.artist}
            {song.album && ` • ${song.album}`}
            {song.year && ` • ${song.year}`}
          </p>

          {/* Language Badges */}
          <div className="flex flex-wrap gap-2">
            {hasEnglish && (
              <Badge className="bg-violet-600/20 text-violet-300 border border-violet-500/50">
                English Available
              </Badge>
            )}
            {hasTamil && (
              <Badge className="bg-amber-600/20 text-amber-300 border border-amber-500/50">
                {tamilScript === 'tamil' ? 'Tamil Script' : 'Tanglish'} Available
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
