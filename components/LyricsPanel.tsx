'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (isLoading || !lyrics) return;
    
    const lines = gsap.utils.toArray('.lyric-line');
    
    gsap.fromTo(lines, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        clearProps: 'opacity',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%'
        }
      }
    )
  }, { scope: containerRef, dependencies: [lyrics, isLoading] })

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
    violet: 'from-purple-600 to-violet-600',
    amber: 'from-cyan-600 to-blue-600',
  }

  const accentTextMap = {
    violet: 'text-purple-300',
    amber: 'text-cyan-300',
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col h-full min-h-96 rounded-2xl glass-strong overflow-hidden hover:border-slate-100/20 transition-all duration-300"
    >
      {/* Header with gradient */}
      <div className={`flex items-center justify-between px-6 py-4 bg-gradient-to-r ${accentColorMap[accentColor]} bg-opacity-10 border-b border-slate-200/10`}>
        <h3 className={`text-lg font-syne font-bold ${accentTextMap[accentColor]}`}>
          {title}
        </h3>

        <Button
          onClick={handleCopy}
          disabled={isLoading || !lyrics}
          size="sm"
          className={`rounded-lg bg-gradient-to-r ${accentColorMap[accentColor]} hover:from-purple-700 hover:to-violet-700 text-white border-0 transition-all`}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4" />
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
                className={`h-4 ${i % 3 === 0 ? 'w-3/4' : 'w-full'} bg-gradient-to-r from-slate-600/50 to-slate-700/50 rounded animate-pulse`}
              />
            ))}
          </div>
        ) : lyrics ? (
          <div className="space-y-4">
            {lyrics.split('\n').map((line, idx) => (
              <p
                key={idx}
                className="lyric-line text-slate-200 leading-relaxed whitespace-pre-wrap break-words text-base font-medium"
                style={{ opacity: 0 }}
              >
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">No lyrics available</p>
          </div>
        )}
      </div>
    </div>
  )
}
