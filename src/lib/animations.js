import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollReveals(scope = document) {
  const items = gsap.utils.toArray(scope.querySelectorAll('[data-reveal]'))
  const triggers = items.map((item) =>
    gsap.fromTo(
      item,
      { y: 34, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          once: true,
        },
      },
    ),
  )

  const scrubbers = gsap.utils.toArray(scope.querySelectorAll('[data-scrub]')).map((item) =>
    gsap.to(item, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    }),
  )

  return () => {
    triggers.forEach((animation) => animation.scrollTrigger?.kill())
    triggers.forEach((animation) => animation.kill())
    scrubbers.forEach((animation) => animation.scrollTrigger?.kill())
    scrubbers.forEach((animation) => animation.kill())
  }
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
