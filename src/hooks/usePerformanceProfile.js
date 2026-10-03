import { useEffect, useState } from 'react'

export function usePerformanceProfile() {
  const [profile, setProfile] = useState({
    fps: 60,
    memory: 'n/a',
    webgl: 'unknown',
    quality: 'adaptive',
  })

  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf = 0
    const webgl = (() => {
      try {
        const canvas = document.createElement('canvas')
        return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) ? 'available' : 'fallback'
      } catch {
        return 'fallback'
      }
    })()

    const tick = (now) => {
      frames += 1
      if (now - last >= 1000) {
        const memory = performance.memory
          ? `${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)} MB`
          : 'n/a'
        setProfile({
          fps: Math.round((frames * 1000) / (now - last)),
          memory,
          webgl,
          quality: window.innerWidth < 760 ? 'mobile' : 'desktop',
        })
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return profile
}
