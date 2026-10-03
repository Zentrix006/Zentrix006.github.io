import { useEffect, useState } from 'react'

export function useWebGLSupport() {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    let context
    try {
      const canvas = document.createElement('canvas')
      context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    } catch {
      context = null
    }

    if (context) context.getExtension('WEBGL_lose_context')?.loseContext()
    setSupported(Boolean(context))
  }, [])

  return supported
}
