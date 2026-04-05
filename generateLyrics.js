const fs = require('fs');

const content = `'use client'

interface LyricsPanelProps {
  title: string
  lyrics: string
  type: 'english' | 'tamil'
  isLoading?: boolean
}

export function LyricsPanel({
  title,
  lyrics,
  type,
  isLoading = false,
}: LyricsPanelProps) {
  const isTamil = type === 'tamil'

  return (
    <div
      className={\`flex-1 flex flex-col h-full bg-white rounded-[16px] p-[24px] \${
        isTamil
          ? 'border border-[var(--color-border)] border-l-[3px] border-l-[var(--color-accent-tamil)]'
          : 'border border-[var(--color-border)]'
      }\`}
    >
      <div className="mb-[24px]">
        <h3
          className={\`text-[10px] uppercase tracking-[0.08em] font-[600] font-[family:var(--font-ui)] \${
            isTamil ? 'text-[var(--color-accent-tamil)]' : 'text-[var(--color-accent-english)]'
          }\`}
        >
          {title}
        </h3>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="space-y-4 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={\`h-[14px] \${i % 3 === 0 ? 'w-3/4' : 'w-full'} bg-[#E2DED9]/50 rounded animate-pulse\`}
              />
            ))}
          </div>
        ) : lyrics ? (
          <div className="space-y-[0px]">
            {lyrics.split('\\n').map((line, idx) => (
              <p
                key={idx}
                className="text-[14px] leading-[2] text-[#2A2A2A] font-[family:var(--font-ui)]"
              >
                {line || '\\u00A0'}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#6B6B6B] font-[family:var(--font-ui)] text-[14px]">No lyrics available</p>
          </div>
        )}
      </div>
    </div>
  )
}
`;

fs.writeFileSync('components/LyricsPanel.tsx', content);
