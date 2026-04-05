const fs = require('fs');

const content = `'use client'

import Image from 'next/image'
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
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 mt-8 mb-6">
      <div className="bg-white border border-[var(--color-border)] rounded-[16px] p-[16px] md:px-[20px] flex items-center gap-4 flex-wrap md:flex-nowrap">
        {/* Album Art */}
        <div className="flex-shrink-0 flex items-center gap-4 w-full md:w-auto">
          {song.coverArt ? (
            <div className="relative w-[56px] h-[56px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[var(--color-card)]">
              <Image
                src={song.coverArt}
                alt={song.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          ) : (
            <div className="w-[56px] h-[56px] flex-shrink-0 rounded-[10px] bg-[var(--color-card)]" />
          )}
          
          <div className="flex-1 min-w-0 flex flex-col justify-center md:hidden">
            <h2 className="text-[17px] font-[600] text-[#1A1A1A] font-[family:var(--font-ui)] truncate leading-tight">
              {song.title}
            </h2>
            <p className="text-[13px] text-[#6B6B6B] font-[family:var(--font-ui)] truncate mt-0.5">
              {song.artist}
              {song.album && \` • \${song.album}\`}
              {song.year && \` • \${song.year}\`}
            </p>
          </div>
        </div>

        {/* Song Info (Desktop) */}
        <div className="hidden md:flex flex-1 min-w-0 flex-col justify-center">
          <h2 className="text-[17px] font-[600] text-[#1A1A1A] font-[family:var(--font-ui)] truncate leading-tight">
            {song.title}
          </h2>
          <p className="text-[13px] text-[#6B6B6B] font-[family:var(--font-ui)] truncate mt-0.5">
            {song.artist}
            {song.album && \` • \${song.album}\`}
            {song.year && \` • \${song.year}\`}
          </p>
        </div>

        {/* Language Badges */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0 justify-start md:justify-end">
          {hasEnglish && (
            <span className="inline-flex items-center px-3 h-6 rounded-[100px] bg-[#EAF3DE] text-[#3B6D11] text-[11px] font-[600] font-[family:var(--font-ui)] tracking-wide">
              English
            </span>
          )}
          {hasTamil && tamilScript === 'tamil' && (
            <span className="inline-flex items-center px-3 h-6 rounded-[100px] bg-[#FAEEDA] text-[#854F0B] text-[11px] font-[600] font-[family:var(--font-ui)] tracking-wide">
              Tamil Script
            </span>
          )}
          {hasTamil && tamilScript === 'tanglish' && (
            <span className="inline-flex items-center px-3 h-6 rounded-[100px] bg-[#E6F1FB] text-[#185FA5] text-[11px] font-[600] font-[family:var(--font-ui)] tracking-wide">
              Tanglish
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
`;

fs.writeFileSync('components/MetadataBar.tsx', content);
