'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Clock, X } from 'lucide-react'
import type { SearchHistoryItem } from '@/types/lyrics'

interface RecentSearchesProps {
  onSelectSearch: (query: string) => void
  maxItems?: number
}

export function RecentSearches({ onSelectSearch, maxItems = 5 }: RecentSearchesProps) {
  const [searches, setSearches] = useState<SearchHistoryItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('lyricslens:searches')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SearchHistoryItem[]
        setSearches(parsed.slice(0, maxItems))
      } catch (error) {
        console.error('Failed to load searches:', error)
      }
    }
  }, [maxItems])

  const addSearch = (query: string) => {
    const newItem: SearchHistoryItem = {
      query,
      timestamp: Date.now(),
    }

    const updated = [newItem, ...searches.filter(s => s.query !== query)].slice(
      0,
      maxItems
    )
    setSearches(updated)

    try {
      localStorage.setItem('lyricslens:searches', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save searches:', error)
    }
  }

  const removeSearch = (query: string) => {
    const updated = searches.filter(s => s.query !== query)
    setSearches(updated)
    try {
      localStorage.setItem('lyricslens:searches', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to update searches:', error)
    }
  }

  const clearAll = () => {
    setSearches([])
    localStorage.removeItem('lyricslens:searches')
  }

  if (!mounted || searches.length === 0) {
    return null
  }

  return (
    <div className="w-full py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-syne font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            Recent Searches
          </h3>
          {searches.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {searches.map(item => (
            <div
              key={item.timestamp}
              className="group glass rounded-full px-4 py-2 hover:border-purple-500/50 transition-all duration-200 hover:bg-purple-500/10 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectSearch(item.query)}
                  className="text-sm text-slate-200 hover:text-white transition-colors font-medium"
                >
                  {item.query}
                </button>
                <button
                  onClick={() => removeSearch(item.query)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-slate-500/30 rounded-full"
                  title="Remove"
                >
                  <X className="w-3 h-3 text-slate-400 hover:text-slate-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Export function to add searches from outside
export function useSearchHistory() {
  return {
    addSearch: (query: string) => {
      const stored = localStorage.getItem('lyricslens:searches')
      let searches: SearchHistoryItem[] = []
      
      if (stored) {
        try {
          searches = JSON.parse(stored)
        } catch (error) {
          console.error('Failed to parse searches:', error)
        }
      }

      const newItem: SearchHistoryItem = {
        query,
        timestamp: Date.now(),
      }

      const updated = [newItem, ...searches.filter(s => s.query !== query)].slice(0, 10)
      localStorage.setItem('lyricslens:searches', JSON.stringify(updated))
    },
  }
}
