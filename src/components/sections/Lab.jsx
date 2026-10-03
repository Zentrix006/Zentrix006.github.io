import { useMemo, useState } from 'react'
import { labCategories, labDemoCount } from '../../data/lab'

export function Lab() {
  const [activeCategory, setActiveCategory] = useState(labCategories[0].id)
  const [query, setQuery] = useState('')

  const active = labCategories.find((category) => category.id === activeCategory) || labCategories[0]
  const nodePositions = [
    { x: 18, y: 18 },
    { x: 82, y: 18 },
    { x: 82, y: 82 },
    { x: 18, y: 82 },
  ]
  const visibleCategories = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return labCategories
    return labCategories
      .map((category) => ({
        ...category,
        demos: category.demos.filter(([label]) => `${category.label} ${label}`.toLowerCase().includes(search)),
      }))
      .filter((category) => category.demos.length)
  }, [query])

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
        <label className="lab-category-select-label" htmlFor="lab-category">Attack surface</label>
        <select
          className="lab-category-select"
          id="lab-category"
          value={activeCategory}
          onChange={(event) => setActiveCategory(event.target.value)}
        >
          {labCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.label} ({category.demos.length})</option>
          ))}
        </select>
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
              onClick={() => setActiveCategory(category.id)}
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
          <h3>{active.label}</h3>
          <p>{active.description}</p>
          <div className="demo-link-grid">
            {(query ? visibleCategories : [active]).flatMap((category) =>
              category.demos.map(([label, href]) => (
                <a key={`${category.id}-${label}`} href={href}>
                  <span>{category.label}</span>
                  <strong>{label}</strong>
                </a>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
