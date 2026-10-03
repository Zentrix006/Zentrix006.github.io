import { useState } from 'react'

const links = [
  ['home', 'ZENTRIX'],
  ['work', 'POLYMORPHISM'],
  ['research', 'RESEARCH'],
  ['lab', 'LAB'],
  ['about', 'ABOUT'],
  ['contact', 'CONTACT'],
]

export function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className={`main-nav ${menuOpen ? 'menu-open' : ''}`}
      aria-label="Primary navigation"
      onKeyDown={(event) => event.key === 'Escape' && setMenuOpen(false)}
    >
      <a className={`nav-brand ${activeSection === 'home' ? 'active' : ''}`} href="#home">ZENTRIX</a>
      <button
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
        {links.filter(([id]) => id !== 'home').map(([id, label]) => (
          <a
            key={id}
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
