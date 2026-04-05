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
      className="w-full px-4 md:px-8 py-8"
    >
      <div className="max-w-6xl mx-auto glass-strong rounded-2xl p-6 md:p-8 flex gap-6 items-start">
        {/* Album Art */}
        {song.coverArt && (
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden border border-slate-200/20 shadow-lg">
            <Image
              src={song.coverArt}
              alt={song.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
          </div>
        )}

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl md:text-4xl font-syne font-bold text-white text-balance leading-tight mb-2">
            {song.title}
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-4 font-medium">
            {song.artist}
            {song.album && ` • ${song.album}`}
            {song.year && ` • ${song.year}`}
          </p>

          {/* Language Badges */}
          <div className="flex flex-wrap gap-2">
            {hasEnglish && (
              <Badge className="bg-purple-600 text-white border-0 hover:bg-purple-700 text-xs md:text-sm px-3 py-1">
                English Available
              </Badge>
            )}
            {hasTamil && (
              <Badge className="bg-cyan-600 text-white border-0 hover:bg-cyan-700 text-xs md:text-sm px-3 py-1">
                {tamilScript === 'tamil' ? 'Tamil Script' : 'Tanglish'} Available
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
