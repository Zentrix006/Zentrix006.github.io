import Lenis from 'lenis'
import { useEffect } from 'react'

export function useLenisScroll(disabled) {
  useEffect(() => {
    if (disabled) return undefined

    const lenis = new Lenis({
      duration: 1.12,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [disabled])
}
