const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(/import { useGSAP } from '@gsap\/react'[\\s\\S]*?const heroRef = useRef<HTMLDivElement>\(null\)/, 
\import { Music } from 'lucide-react'
import type { LyricsResponse } from '@/types/lyrics'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<LyricsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)\);

content = content.replace(/import gsap from 'gsap'\\r?\\n/, '');

content = content.replace(/\\/\\/ Initialize hero animation on mount[\\s\\S]*?\}, \\\[result\\]\\)/, 
\// Removed GSAP animations\);

content = content.replace(/<header[\\s\\S]*?<\/header>/, \<header className="sticky top-0 z-40 w-full bg-[#FAFAF9] border-b border-[var(--color-border)] h-[56px] flex items-center">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-[6px] bg-[var(--color-accent-tamil)]"></div>
            <h1 className="text-[18px] font-['DM_Serif_Display'] font-[family:var(--font-display)] text-[#1A1A1A]">
              LyricsLens
            </h1>
          </div>
        </div>
      </header>\);

content = content.replace(/<section ref=\{heroRef\}[\\s\\S]*?<\/section>/, \<section className="w-full pt-[80px] pb-12 px-4 md:px-8 animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-[36px] md:text-[52px] font-[family:var(--font-display)] font-normal text-[#1A1A1A] leading-[1.1]">
              Find the lyrics.<br />
              <span className="text-[var(--color-accent-tamil)]">In your language.</span>
            </h2>
            <p className="text-[15px] text-[#6B6B6B] font-[family:var(--font-ui)]">
              English • Tamil Script • Tanglish — side by side
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>\);

content = content.replace(/data-gsap /g, '');

fs.writeFileSync('app/page.tsx', content);
