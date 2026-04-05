import gsap from 'gsap'

/**
 * Hero section stagger animation
 */
export function animateHeroSection() {
  const timeline = gsap.timeline()

  // Animate headline
  timeline.from('.hero-headline', {
    opacity: 0,
    y: 30,
    duration: 0.8,
  })

  // Animate description
  timeline.from(
    '.hero-description',
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
    },
    '-=0.4'
  )

  // Animate search bar
  timeline.from(
    '.hero-search',
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
    },
    '-=0.4'
  )

  return timeline
}

/**
 * Search bar focus glow animation
 */
export function animateSearchFocus(element: HTMLElement) {
  gsap.to(element, {
    boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)',
    duration: 0.3,
  })
}

/**
 * Search bar blur animation
 */
export function animateSearchBlur(element: HTMLElement) {
  gsap.to(element, {
    boxShadow: '0 0 0px rgba(124, 58, 237, 0)',
    duration: 0.3,
  })
}

/**
 * Panel slide-in animation from below
 */
export function animatePanelSlideIn() {
  const timeline = gsap.timeline()
  
  // Emptying out manual GSAP panel animations to prevent React hydration
  // and disappearing DOM node bugs. Tailwind handles panel fading now.

  return timeline
}

/**
 * Copy button success animation
 */
export function animateCopySuccess(element: HTMLElement) {
  const timeline = gsap.timeline()

  // Scale up
  timeline.to(element, {
    scale: 1.2,
    duration: 0.2,
  })

  // Scale back
  timeline.to(element, {
    scale: 1,
    duration: 0.2,
  })
}

/**
 * Line-by-line fade-in animation for lyrics
 */
export function animateLyricsLines(container: HTMLElement) {
  const lines = container.querySelectorAll('p')
  
  gsap.from(lines, {
    opacity: 0,
    y: 10,
    stagger: 0.05,
    duration: 0.4,
  })
}

/**
 * Loading skeleton pulse animation (CSS-based, no JS needed)
 */
export const skeletonPulseAnimation = `
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.4;
    }
  }
`

/**
 * Stagger animation for entering elements
 */
export function staggerEnter(
  elements: Element[],
  staggerDelay: number = 0.1,
  duration: number = 0.6
) {
  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    stagger: staggerDelay,
    duration,
  })
}

/**
 * Glow pulse animation for accent elements
 */
export function createGlowPulse(
  element: HTMLElement,
  color: string = 'rgba(124, 58, 237, 0.5)'
) {
  const timeline = gsap.timeline({ repeat: -1 })

  timeline.to(element, {
    boxShadow: `0 0 20px ${color}`,
    duration: 2,
  })

  timeline.to(element, {
    boxShadow: `0 0 0px ${color}`,
    duration: 2,
  })

  return timeline
}

/**
 * Hover lift animation
 */
export function animateHoverLift(element: HTMLElement) {
  const originalTransform = element.style.transform || 'translateY(0)'

  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}
