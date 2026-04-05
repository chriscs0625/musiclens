'use client'

import { useEffect } from 'react'
import { useGSAPSetup } from '@/hooks/useGSAPSetup'
import { useLenisScroll } from '@/hooks/useLenisScroll'

export function Providers({ children }: { children: React.ReactNode }) {
  useGSAPSetup()
  useLenisScroll()

  return <>{children}</>
}
