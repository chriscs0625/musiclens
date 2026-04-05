import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Hook to initialize GSAP
 * Should be called once in the root layout
 */
export function useGSAPSetup() {
  useEffect(() => {
    // Set default ease and other GSAP defaults
    gsap.defaults({ ease: 'power3.inOut' })

    // Prevent errors on SSR
    if (typeof window === 'undefined') return

    const handleResize = () => {
      // Trigger any resize-dependent animations here
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
