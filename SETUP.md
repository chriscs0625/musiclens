# LyricsLens Setup Guide

Welcome to LyricsLens! This guide will help you get the app up and running.

## Prerequisites

- Node.js 18+ and npm/pnpm
- Musixmatch API key
- Genius API access token

## Step 1: Get API Keys

### Musixmatch API Key
1. Visit [Musixmatch API Console](https://www.musixmatch.com/apis)
2. Sign up for a free developer account
3. Create a new application
4. Copy your API key

### Genius API Token
1. Visit [Genius API Clients](https://genius.com/api-clients)
2. Sign in (create an account if needed)
3. Create a new API Client
4. Generate an access token
5. Copy the token

## Step 2: Setup Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```
   MUSIXMATCH_API_KEY=your_key_here
   GENIUS_ACCESS_TOKEN=your_token_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 3: Install Dependencies

```bash
pnpm install
```

Or if using npm:
```bash
npm install
```

## Step 4: Run Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Features

- **Bilingual Search**: Search for lyrics in English and Tamil (Tanglish or Tamil Script)
- **Dual Panel View**: Side-by-side display of English and Tamil lyrics
- **Smooth Animations**: GSAP-powered animations with Lenis smooth scroll
- **Recent Searches**: Keeps a history of your recent searches (localStorage)
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Rate Limiting**: Built-in rate limiting (20 requests/minute per IP)
- **Caching**: 1-hour TTL in-memory cache to reduce API calls

## Project Structure

```
/app
  /api/lyrics         - Backend API route for lyrics search
  /page.tsx          - Home page with search and results
  /layout.tsx        - Root layout with fonts and providers
  /globals.css       - Global styles and design tokens
  /providers.tsx     - GSAP and Lenis initialization

/components
  /SearchBar.tsx     - Search input with keyboard shortcuts
  /MetadataBar.tsx   - Song info and metadata display
  /LyricsPanel.tsx   - Lyrics display with copy button
  /DualPanelLayout.tsx - Side-by-side panel layout
  /RecentSearches.tsx - Recent search history

/lib
  /musixmatch.ts     - Musixmatch API client
  /genius.ts         - Genius API client
  /cache.ts          - In-memory cache utility
  /detectScript.ts   - Tamil script detection
  /animations.ts     - GSAP animation utilities

/hooks
  /useGSAPSetup.ts   - GSAP and ScrollTrigger setup
  /useLenisScroll.ts - Lenis smooth scroll setup

/types
  /lyrics.ts         - TypeScript interfaces
```

## API Response Format

```json
{
  "found": true,
  "song": {
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "coverArt": "https://...",
    "year": 2024
  },
  "lyrics": {
    "english": "English lyrics text...",
    "tamil": {
      "content": "Tamil lyrics text...",
      "script": "tanglish" | "tamil" | "none"
    }
  }
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel project settings:
   - `MUSIXMATCH_API_KEY`
   - `GENIUS_ACCESS_TOKEN`
4. Deploy!

## Troubleshooting

### "Lyrics not found"
- Try searching with just the song name or artist name
- Some songs may not be available in both languages
- Musixmatch API has limitations on free tier (30% of lyrics)

### "Rate limit exceeded"
- Wait a minute and try again
- The app limits to 20 requests per minute per IP

### Tamil script not rendering
- Make sure you're using a modern browser
- Noto Sans Tamil font should load automatically

## Performance Tips

- The app caches results for 1 hour in memory
- Lenis smooth scroll is integrated with GSAP for optimal performance
- Use SearchTrigger for scroll-based animations

## License

Built with v0.dev - created by Vercel

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation:
   - [Musixmatch API Docs](https://developer.musixmatch.com/)
   - [Genius API Docs](https://docs.genius.com/)
