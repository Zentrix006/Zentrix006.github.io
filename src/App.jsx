import { lazy, Suspense, useEffect, useMemo } from 'react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { CustomCursor } from './components/effects/CustomCursor'
import { Hero } from './components/sections/Hero'
import { Lab } from './components/sections/Lab'
import { Navigation } from './components/navigation/Navigation'
import { Research } from './components/sections/Research'
import { Terminal } from './components/terminal/Terminal'
import { WebGLErrorBoundary } from './components/3d/WebGLErrorBoundary'
import { initScrollReveals, refreshScrollTriggers } from './lib/animations'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSectionSpy } from './hooks/useSectionSpy'
import { useWebGLSupport } from './hooks/useWebGLSupport'

const CyberWorld = lazy(() => import('./components/3d/CyberWorld').then((module) => ({ default: module.CyberWorld })))

const sectionIds = ['home', 'research', 'lab', 'about', 'terminal', 'contact']

export function App() {
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()
  const activeSection = useSectionSpy(useMemo(() => sectionIds, []))

  useLenisScroll(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return undefined
    const cleanup = initScrollReveals(document)
    const refresh = window.setTimeout(refreshScrollTriggers, 250)
    return () => {
      window.clearTimeout(refresh)
      cleanup()
    }
  }, [reducedMotion])

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to portfolio
      </a>
      <WebGLErrorBoundary>
        {webglSupported ? (
          <Suspense fallback={<div className="webgl-fallback" aria-hidden="true" />}>
            <CyberWorld activeSection={activeSection} reducedMotion={reducedMotion} />
          </Suspense>
        ) : (
          <div className="webgl-fallback" aria-hidden="true" />
        )}
      </WebGLErrorBoundary>
      <div className="ambient-grid" aria-hidden="true" />
      <CustomCursor disabled={reducedMotion} />
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />
        <Research />
        <Lab />
        <About />
        <Terminal />
        <Contact />
      </main>
    </>
  )
}
