import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

/**
 * Hook to initialize Lenis smooth scroll and integrate with GSAP
 */
export function useLenisScroll() {
  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Integrate with GSAP ticker
    lenis.on('scroll', () => {
      // Update scroll trigger animations
    })

    gsap.ticker.add(time => {
      lenis.raf(time * 1000)
    })

    return () => {
      gsap.ticker.remove(() => {
        lenis.raf(0)
      })
      lenis.destroy()
    }
  }, [])
}
