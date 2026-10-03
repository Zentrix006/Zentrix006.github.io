import { useMemo, useState } from 'react'
import { labCategories, labDemoCount } from '../../data/lab'

export function Lab() {
  const [activeCategory, setActiveCategory] = useState(labCategories[0].id)
  const [query, setQuery] = useState('')
  const searchTerm = query.trim().toLowerCase()

  const active = labCategories.find((category) => category.id === activeCategory) || labCategories[0]
  const matchingDemos = useMemo(() => {
    if (!searchTerm) return active.demos.map(([label, href]) => ({ category: active.label, label, href }))
    return labCategories.flatMap((category) =>
      category.demos
        .filter(([label]) => `${category.label} ${label}`.toLowerCase().includes(searchTerm))
        .map(([label, href]) => ({ category: category.label, label, href })),
    )
  }, [active, searchTerm])
  const nodePositions = [
    { x: 18, y: 18 },
    { x: 82, y: 18 },
    { x: 82, y: 82 },
    { x: 18, y: 82 },
  ]
  return (
    <section className="section-panel" id="lab">
      <div className="section-kicker" data-reveal>
        VULNERABILITY LAB
      </div>
      <div className="lab-command-surface" data-reveal>
        <div>
          <h2>Spatial Lab Topology</h2>
          <p>
            {labDemoCount} isolated browser security demonstrations grouped by attack surface. Interact with the
            topology or open the full lab catalog.
          </p>
        </div>
        <a className="primary-action" href="/demos/index.html">
          Enter Full Lab
        </a>
      </div>
      <div className="lab-interaction-grid">
        <div className="lab-mobile-topology" role="group" aria-label="Select attack surface">
          {labCategories.map((category) => (
            <button
              key={category.id}
              className={category.id === active.id ? 'active' : ''}
              type="button"
              aria-pressed={category.id === active.id}
              onClick={() => { setActiveCategory(category.id); setQuery('') }}
            >
              <span>{category.label}</span>
              <small>{String(category.demos.length).padStart(2, '0')} DEMOS</small>
            </button>
          ))}
        </div>
        <div className="lab-radar" data-reveal role="group" aria-label="Interactive attack surface topology">
          <div className="lab-map-meta"><span>ATTACK SURFACE MAP</span><span>4 DOMAINS // {labDemoCount} DEMOS</span></div>
          <svg className="lab-map-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {labCategories.map((category, index) => {
              const point = nodePositions[index % nodePositions.length]
              return (
                <line
                  key={category.id}
                  className={category.id === active.id ? 'active' : ''}
                  x1="50" y1="50" x2={point.x} y2={point.y}
                />
              )
            })}
          </svg>
          {labCategories.map((category, index) => (
            <button
              key={category.id}
              className={`lab-node ${category.id === active.id ? 'active' : ''}`}
              style={{ '--node-x': `${nodePositions[index % nodePositions.length].x}%`, '--node-y': `${nodePositions[index % nodePositions.length].y}%`, '--node-accent': ['#62d9ff', '#a99bff', '#f0bd70', '#7ce6d0'][index % 4] }}
              type="button"
              aria-pressed={category.id === active.id}
              onClick={() => { setActiveCategory(category.id); setQuery('') }}
            >
              <span className="lab-node-index">NODE 0{index + 1}</span>
              <strong>{category.label}</strong>
              <small>{category.demos.length} DEMONSTRATIONS</small>
            </button>
          ))}
          <div className="lab-core"><span>SECURITY</span><strong>LAB</strong><i>{String(active.demos.length).padStart(2, '0')} VECTORS</i></div>
        </div>
        <div className="lab-detail" data-reveal>
          <input aria-label="Search lab demonstrations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lab demos..." />
          <div className="lab-results-heading" aria-live="polite">
            <h3>{searchTerm ? 'Search Results' : active.label}</h3>
            <p>{searchTerm ? `${matchingDemos.length} matching demo${matchingDemos.length === 1 ? '' : 's'} across ${new Set(matchingDemos.map((demo) => demo.category)).size} attack surface${new Set(matchingDemos.map((demo) => demo.category)).size === 1 ? '' : 's'}.` : active.description}</p>
          </div>
          {matchingDemos.length ? (
            <div className="demo-link-grid">
              {matchingDemos.map(({ category, label, href }) => (
                <a key={`${category}-${label}`} href={href}>
                  <span>{category}</span>
                  <strong>{label}</strong>
                </a>
              ))}
            </div>
          ) : (
            <p className="lab-empty-state" role="status">No demos match “{query}”. Try XSS, CORS, autofill, or clickjacking.</p>
          )}
        </div>
      </div>
    </section>
  )
}
