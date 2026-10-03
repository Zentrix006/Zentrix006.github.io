const links = [
  ['home', 'ZENTRIX'],
  ['work', 'WORK'],
  ['research', 'RESEARCH'],
  ['lab', 'LAB'],
  ['about', 'ABOUT'],
  ['contact', 'CONTACT'],
]

export function Navigation({ activeSection }) {
  return (
    <nav className="main-nav" aria-label="Primary navigation">
      {links.map(([id, label]) => (
        <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`}>
          {label}
        </a>
      ))}
      <span className="system-pill">SYSTEM ONLINE</span>
    </nav>
  )
}
