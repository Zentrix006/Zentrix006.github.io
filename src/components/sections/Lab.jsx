import { useMemo, useState } from 'react'
import { labCategories, labDemoCount } from '../../data/lab'

export function Lab() {
  const [activeCategory, setActiveCategory] = useState(labCategories[0].id)
  const [query, setQuery] = useState('')

  const active = labCategories.find((category) => category.id === activeCategory) || labCategories[0]
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
        <div className="lab-radar" data-reveal>
          {labCategories.map((category, index) => (
            <button
              key={category.id}
              className={`lab-node ${category.id === active.id ? 'active' : ''}`}
              style={{ '--angle': `${index * 90}deg` }}
              type="button"
              onClick={() => setActiveCategory(category.id)}
            >
              <span>{category.demos.length}</span>
              {category.label}
            </button>
          ))}
          <div className="lab-core">LAB</div>
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
