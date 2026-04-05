'use client'

import { useRef, useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut Cmd/Ctrl+K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex gap-2">
        {/* Glow effect background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg blur-lg opacity-0 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />

        <div className="relative w-full flex items-center gap-2 bg-slate-900 border border-violet-500/20 rounded-lg px-4 py-3 focus-within:border-violet-500/50 focus-within:shadow-glow-violet transition-all duration-300">
          <Search className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search song, movie, or album..."
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
            disabled={isLoading}
          />
          <div className="text-xs text-slate-500 flex-shrink-0">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-lg font-medium transition-all duration-300 shadow-glow-violet hover:shadow-lg"
        >
          {isLoading ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  )
}
