'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface LyricsPanelProps {
  title: string
  lyrics: string
  accentColor?: 'violet' | 'amber'
  isLoading?: boolean
}

export function LyricsPanel({
  title,
  lyrics,
  accentColor = 'violet',
  isLoading = false,
}: LyricsPanelProps) {
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lyrics)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const accentColorMap = {
    violet: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  }

  const glowMap = {
    violet: 'hover:shadow-glow-violet hover:border-violet-500/50',
    amber: 'hover:shadow-glow-amber hover:border-amber-500/50',
  }

  return (
    <div
      ref={panelRef}
      className="flex-1 flex flex-col h-full min-h-96 rounded-xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm overflow-hidden hover:border-slate-600/50 transition-all duration-300"
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-6 py-4 border-b ${accentColorMap[accentColor]} transition-colors duration-300`}>
        <h3 className={`text-lg font-syne font-bold ${accentColorMap[accentColor]}`}>
          {title}
        </h3>

        <Button
          onClick={handleCopy}
          disabled={isLoading || !lyrics}
          variant="ghost"
          size="sm"
          className={`text-slate-400 hover:text-slate-100 ${glowMap[accentColor]} transition-colors`}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Lyrics Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 ${i % 3 === 0 ? 'w-3/4' : 'w-full'} bg-slate-700/50 rounded animate-pulse`}
              />
            ))}
          </div>
        ) : lyrics ? (
          <div className="space-y-3">
            {lyrics.split('\n').map((line, idx) => (
              <p
                key={idx}
                className="text-slate-300 leading-relaxed whitespace-pre-wrap break-words text-base"
                style={{
                  animation: isLoading
                    ? 'none'
                    : `fade-in 0.4s ease-out ${idx * 0.02}s both`,
                }}
              >
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>No lyrics available</p>
          </div>
        )}
      </div>
    </div>
  )
}
