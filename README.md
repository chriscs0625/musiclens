<div align="center">
  <!-- You can replace the src with your actual logo URL -->
  <img src="https://via.placeholder.com/150?text=LyricsLens+Logo" alt="LyricsLens" width="150" height="150" />
  <h1>LyricsLens</h1>
  <p>Bilingual song lyrics finder — English & Tamil, side by side.</p>
  
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4"></a>
    <a href="https://musiclens.vercel.app"><img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" alt="Vercel Deployment Status"></a>
  </p>
</div>

## ✨ Features

- **Bilingual Lyrics**: English + Tamil script + Tanglish, displayed side by side.
- **Genius API**: High-quality song metadata and album art retrieval.
- **lyrics.ovh**: Reliable fetching for English lyrics.
- **Curated Tamil Lyrics**: Comprehensive Tamil lyrics dataset.
- **Dark and Light Mode**: Seamless theme toggle for user preference.
- **Rate Limiting**: Protected via Edge middleware.
- **In-Memory Cache**: Fast responses with a 1-hour Time-To-Live (TTL).
- **Responsive Design**: Beautiful UI across mobile, tablet, and desktop.

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16.2** | React framework for server-side rendering and routing |
| **Tailwind CSS v4** | Utility-first CSS framework for rapid UI styling |
| **GSAP 3** | Professional-grade animation library |
| **shadcn/ui** | Reusable, accessible CSS component system |
| **Genius API** | Song metadata, artist info, and album art |
| **lyrics.ovh** | Open API for fetching English lyrics |
| **next-themes** | Effortless dark/light hydration-safe mode switching |

## 🚀 Getting Started

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/lyriclens.git
cd lyriclens

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

Open `.env.local` and add your API tokens:
```env
GENIUS_ACCESS_TOKEN=your_genius_access_token_here
```

Start the development server:
```bash
npm run dev
```

## 🌐 Live Demo

Experience the app live: **[https://musiclens.vercel.app](https://musiclens.vercel.app)**

## 📁 Project Structure

```text
lyriclens/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── DualPanelLayout.tsx
│   ├── LyricsPanel.tsx
│   ├── MetadataBar.tsx
│   ├── SearchBar.tsx
│   └── theme-provider.tsx
├── hooks/
├── lib/
├── public/
├── styles/
└── types/
```

## 📄 License

This project is licensed under the MIT License.
