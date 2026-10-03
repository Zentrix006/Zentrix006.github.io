import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { CustomCursor } from './components/effects/CustomCursor'
import { Hero } from './components/sections/Hero'
import { Lab } from './components/sections/Lab'
import { Navigation } from './components/navigation/Navigation'
import { PerformancePanel } from './components/sections/PerformancePanel'
import { Projects } from './components/sections/Projects'
import { Research } from './components/sections/Research'
import { Terminal } from './components/terminal/Terminal'
import { initScrollReveals, refreshScrollTriggers } from './lib/animations'
import { projects } from './data/projects'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSectionSpy } from './hooks/useSectionSpy'

const CyberWorld = lazy(() => import('./components/3d/CyberWorld').then((module) => ({ default: module.CyberWorld })))

const sectionIds = ['home', 'work', 'research', 'lab', 'about', 'terminal', 'contact']

export function App() {
  const reducedMotion = useReducedMotion()
  const activeSection = useSectionSpy(useMemo(() => sectionIds, []))
  const [activeProject, setActiveProject] = useState(projects[0].id)

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
      <Suspense fallback={<div className="webgl-fallback" aria-hidden="true" />}>
        <CyberWorld activeProject={activeProject} setActiveProject={setActiveProject} reducedMotion={reducedMotion} />
      </Suspense>
      <div className="ambient-grid" aria-hidden="true" />
      <CustomCursor disabled={reducedMotion} />
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />
        <Projects activeProject={activeProject} setActiveProject={setActiveProject} />
        <Research />
        <Lab />
        <About />
        <Terminal />
        <Contact />
      </main>
      <PerformancePanel />
    </>
  )
}
