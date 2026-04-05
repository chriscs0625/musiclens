# LyricsLens - Debug & Configuration Guide

## Issues Fixed

### 1. CSS/Tailwind Errors
**Issue**: `Cannot apply unknown utility class 'border-border'`
**Root Cause**: Incomplete Tailwind v4 configuration with missing color token definitions
**Solution**: Simplified `globals.css` to use direct CSS properties and custom CSS classes (`.glass`, `.glass-strong`) instead of relying on Tailwind @apply with undefined color tokens

### 2. GSAP Animation Errors
**Issue**: `GSAP target [data-lyrics-metadata] not found` warnings in console
**Root Cause**: GSAP was trying to animate elements before they were rendered in the DOM
**Solution**: 
- Added DOM element existence checks before animating
- Added `setTimeout` delays to ensure DOM rendering completes
- Wrapped animations in try-catch blocks for graceful error handling
- Elements now only animate if they exist in the DOM

### 3. Missing API Keys Configuration
**Issue**: API calls fail silently with warnings: "Musixmatch API key not configured" and "Genius API key not configured"
**Root Cause**: Environment variables not set in project settings
**Solution**:
- Added explicit API key validation check in API route (`/api/lyrics/route.ts`)
- Returns user-friendly error message with instructions to set environment variables
- Error message guides users to project settings → Vars section

## Current Status

### ✅ Fixed Issues
- CSS compilation errors resolved
- GSAP animation errors handled gracefully
- API key validation with helpful error messages
- All components properly styled with glassmorphism effects
- Search functionality integrated with error handling

### 🔧 Configuration Required

To use LyricsLens, you must configure API keys:

**Step 1**: Get API Keys
- **Musixmatch**: Visit https://developer.musixmatch.com and create an account to get your API key
- **Genius**: Visit https://genius.com/api-clients and create an application to get your access token

**Step 2**: Add to Project
1. Click Settings (⚙️) in the top-right corner
2. Go to "Vars" tab
3. Add these environment variables:
   - `MUSIXMATCH_API_KEY`: Your Musixmatch API key
   - `GENIUS_ACCESS_TOKEN`: Your Genius access token

**Step 3**: Test
- Search for any song (e.g., "Blinding Lights")
- You should see lyrics in English and Tamil

## Architecture Overview

### Components
- **SearchBar.tsx**: Modern glassmorphic search with gradient button
- **MetadataBar.tsx**: Album art and song metadata display
- **DualPanelLayout.tsx**: Side-by-side English/Tamil lyrics with tab switching
- **LyricsPanel.tsx**: Individual lyrics display with copy functionality
- **RecentSearches.tsx**: Search history with localStorage persistence

### Backend
- **API Route** (`/api/lyrics`): 
  - Handles search requests
  - Rate limiting (20 requests/minute per IP)
  - Caching for repeated searches
  - Fallback between Musixmatch and Genius APIs

### Libraries
- **GSAP**: Smooth entrance animations
- **Lenis**: Smooth scroll behavior
- **Tailwind CSS v4**: Modern utility-first styling
- **Radix UI**: Accessible component primitives

## Debugging Tips

### Check if API Keys are Set
Look at browser console when searching. If you see API key errors, confirm environment variables are set in project settings.

### GSAP Warnings
These are non-critical. If you see "GSAP target not found" warnings in console, they're harmless—the animation system falls back gracefully.

### Animation Issues
If animations aren't working:
1. Ensure GSAP and @gsap/react are installed (check package.json)
2. Check browser console for errors
3. All animations have error handling and won't break the app

### Performance
- Search results are cached in-memory (5-minute TTL)
- Ratings limit prevents API overuse
- Lazy loading of components

## Testing Checklist

- [ ] Page loads without CSS errors
- [ ] Hero section animates smoothly
- [ ] Search bar is visible and functional
- [ ] Can search for a song
- [ ] API key error message appears (before configuring keys)
- [ ] After adding API keys, search returns lyrics
- [ ] English and Tamil lyrics display side-by-side
- [ ] Can switch between Tanglish and Tamil script
- [ ] Copy button works on lyrics
- [ ] Recent searches appear and are clickable
- [ ] Clicking recent search repeats that search

## Common Errors & Solutions

### "API keys not configured"
- **Solution**: Add MUSIXMATCH_API_KEY and GENIUS_ACCESS_TOKEN to project Vars

### Animations not playing
- **Solution**: Non-critical. App works fine without animations. Check browser console for any JS errors.

### Search returns "Song not found"
- **Solution**: Try searching with different terms (song name or artist name)

### Tamil lyrics show as tanglish
- **Solution**: This means the source API returned romanized Tamil instead of Tamil script. Click the "Tamil Script" tab if available.
