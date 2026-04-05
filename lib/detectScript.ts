import type { ScriptType } from '@/types/lyrics'

/**
 * Detects if a string contains Tamil script (Unicode range U+0B80-U+0BFF)
 */
export function isTamilScript(text: string): boolean {
  const tamilUnicodeRegex = /[\u0B80-\u0BFF]/g
  return tamilUnicodeRegex.test(text)
}

/**
 * Detects the script type of the given text
 * Returns 'tamil' for Tamil Unicode, 'tanglish' for Tamil transliteration, 'none' for English
 */
export function detectScriptType(text: string): ScriptType {
  if (!text || text.trim().length === 0) {
    return 'none'
  }

  if (isTamilScript(text)) {
    return 'tamil'
  }

  // Check for common Tanglish patterns (Tamil words romanized)
  const tanglishPatterns = [
    /aiya|aiyaa|dei|da|va|am|um|um/gi, // Common Tamil suffixes
    /^(intha|ithu|naan|neeya|yearu|sollra|poi)/gim, // Common Tamil words
  ]

  const textLower = text.toLowerCase()
  const hasTamil = /[a-z]/i.test(text)
  const hasTanglishMarkers = tanglishPatterns.some(pattern => pattern.test(text))

  if (hasTamil && hasTanglishMarkers) {
    return 'tanglish'
  }

  return 'none'
}

/**
 * Cleans and normalizes lyrics text
 */
export function normalizeLyrics(text: string): string {
  return text
    .trim()
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join('\n')
}
