import { useLayoutEffect, useRef, useState } from 'react'

const links = [
  ['research', 'RESEARCH'],
  ['lab', 'LAB'],
  ['about', 'ABOUT'],
  ['terminal', 'TERMINAL'],
  ['contact', 'CONTACT'],
]

export function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const brandRef = useRef(null)
  const toggleRef = useRef(null)
  const linkRefs = useRef({})
  const [indicator, setIndicator] = useState(null)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const mobileClosed = window.matchMedia('(max-width: 860px)').matches && !menuOpen
      const target = mobileClosed
        ? (activeSection === 'home' ? brandRef.current : toggleRef.current)
        : activeSection === 'home' || activeSection === 'work'
          ? brandRef.current
          : linkRefs.current[activeSection] || brandRef.current
      const nav = navRef.current
      if (!target || !nav) return
      const rect = target.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      setIndicator({ x: rect.left - navRect.left, y: rect.top - navRect.top, width: rect.width, height: rect.height })
    }

    updateIndicator()
    const observer = new ResizeObserver(updateIndicator)
    if (navRef.current) observer.observe(navRef.current)
    window.addEventListener('resize', updateIndicator)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeSection, menuOpen])

  return (
    <nav
      ref={navRef}
      className={`main-nav ${menuOpen ? 'menu-open' : ''}`}
      aria-label="Primary navigation"
      onKeyDown={(event) => event.key === 'Escape' && setMenuOpen(false)}
    >
      {indicator && <span className="nav-indicator" aria-hidden="true" style={{ '--indicator-x': `${indicator.x}px`, '--indicator-y': `${indicator.y}px`, '--indicator-width': `${indicator.width}px`, '--indicator-height': `${indicator.height}px` }} />}
      <a ref={brandRef} className={`nav-brand ${activeSection === 'home' ? 'active' : ''}`} href="#home">ZENTRIX</a>
      <button
        ref={toggleRef}
        className="nav-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div className="nav-links" id="primary-links">
        {links.map(([id, label]) => (
          <a
            key={id}
            ref={(element) => { linkRefs.current[id] = element }}
            className={activeSection === id ? 'active' : ''}
            href={`#${id}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <span className="system-pill">SYSTEM ONLINE</span>
      </div>
    </nav>
  )
}
