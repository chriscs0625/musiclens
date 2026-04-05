'use client'

import { useRef, useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

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
      <div className="flex items-center w-full h-[52px] rounded-[100px] border-[1.5px] border-[var(--color-border)] bg-white px-2 focus-within:border-[var(--color-accent-tamil)] focus-within:ring-1 focus-within:ring-[var(--color-accent-tamil)] transition-colors">
        <div className="pl-3 pr-2 flex items-center justify-center">
          <Search className="size-5 text-[#6B6B6B]" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search song, artist, or album..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="flex-1 h-full bg-transparent border-0 text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none text-[15px]"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="h-[40px] px-[20px] rounded-[100px] bg-[var(--color-accent-tamil)] text-white font-medium text-[15px] transition-opacity hover:opacity-90 disabled:opacity-50 ml-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  )
}
