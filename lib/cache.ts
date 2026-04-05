import type { CacheEntry } from '@/types/lyrics'

/**
 * Simple in-memory cache with TTL support
 */
export class LyricsCache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private ttlMs: number

  constructor(ttlMinutes: number = 60) {
    this.ttlMs = ttlMinutes * 60 * 1000
  }

  /**
   * Get a cached item if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    const now = Date.now()
    const isExpired = now - entry.timestamp > this.ttlMs

    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Set a cache item
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  /**
   * Clear a specific cache entry
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }
}

// Global singleton instance
export const lyricsCache = new LyricsCache(60)
