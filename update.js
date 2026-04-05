const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(/import gsap from 'gsap'\r?\n/, '');
code = code.replace(/import { useGSAP } from '@gsap\/react'\r?\n/, '');
code = code.replace(/import { animatePanelSlideIn } from '@\/lib\/animations'\r?\n/, '');

code = code.replace(/const heroRef = useRef<HTMLDivElement>\(null\)\r?\n.*?const { addSearch } = useSearchHistory\(\)\r?\n.*?\}, \[result\]\)/s, 
`const { addSearch } = useSearchHistory()

  // Animate results
  useEffect(() => {
    if (result && contentRef.current) {
      return () => {}
    }
  }, [result])
`);

code = code.replace(/<header[\s\S]*?<\/header>/, `<header className="sticky top-0 z-40 w-full bg-[#FAFAF9] border-b border-[var(--color-border)] h-[56px]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-[6px] bg-[var(--color-accent-tamil)]"></div>
            <h1 className="text-[18px] style={{fontFamily: 'var(--font-display)'}} text-[#1A1A1A]">
              LyricsLens
            </h1>
          </div>
        </div>
      </header>`);

code = code.replace(/<section ref=\{heroRef\}[\s\S]*?<\/section>/, `<section className="w-full pt-[80px] pb-12 md:pb-20 px-4 md:px-8 animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-[36px] md:text-[52px] style={{fontFamily: 'var(--font-display)'}} font-normal text-[#1A1A1A] leading-tight">
              Find the lyrics.<br />
              <span className="text-[var(--color-accent-tamil)]">
                In your language.
              </span>
            </h2>
            <p className="text-[15px] text-[#6B6B6B] style={{fontFamily: 'var(--font-ui)'}} max-w-2xl mx-auto">
              Search any song, movie, or album and get lyrics in English and Tamil, side by side.
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>`);

code = code.replace(/ data-gsap/g, '');

fs.writeFileSync('app/page.tsx', code);
console.log('Fixed');
