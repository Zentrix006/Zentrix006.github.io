import { useEffect, useRef } from 'react'

export function CustomCursor({ disabled }) {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (disabled || window.matchMedia('(pointer: coarse)').matches) return undefined
    document.body.classList.add('has-cursor')
    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let frame = 0

    const move = (event) => {
      x = event.clientX
      y = event.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    const over = (event) => {
      if (event.target.closest('a, button, input, .project-object, .lab-node')) document.body.classList.add('cursor-ready')
    }
    const out = (event) => {
      if (event.target.closest('a, button, input, .project-object, .lab-node')) document.body.classList.remove('cursor-ready')
    }

    const animate = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    frame = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('has-cursor', 'cursor-ready')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(frame)
    }
  }, [disabled])

  if (disabled) return null
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
