import { useState } from 'react'
import { projects } from '../../data/projects'

const researchProjects = ['zen-control', 'predictive-cyberdefence', 'apk-threat-detection']
  .map((id) => projects.find((project) => project.id === id))
  .filter(Boolean)

export function Research() {
  const [selectedId, setSelectedId] = useState(researchProjects[0].id)
  const selected = researchProjects.find((project) => project.id === selectedId) || researchProjects[0]

  return (
    <section className="section-panel" id="research">
      <div className="section-kicker" data-reveal>
        PROJECTS & RESEARCH
      </div>
      <div className="research-browser">
        <div className="research-list" role="group" aria-label="Select a project">
          {researchProjects.map((project, index) => (
            <button
              className={`research-choice ${selected.id === project.id ? 'active' : ''}`}
              key={project.id}
              type="button"
              aria-pressed={selected.id === project.id}
              onClick={() => setSelectedId(project.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{project.title}</strong>
              <small>{project.category}</small>
            </button>
          ))}
        </div>
        <article className="research-detail" aria-live="polite" key={selected.id}>
          <p className="eyebrow">{selected.category} // {selected.status}</p>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <div className="research-detail-block">
            <h3>FOCUS</h3>
            <p>{selected.problem}</p>
          </div>
          <div className="research-detail-block">
            <h3>APPROACH</h3>
            <p>{selected.solution}</p>
          </div>
          <div className="tag-row" aria-label="Technologies">
            {selected.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <div className="research-flow" aria-label={`${selected.title} workflow`}>
            {selected.flow.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <a className="research-repo-link" href={selected.github} target="_blank" rel="noreferrer">
            VIEW REPOSITORY <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>
  )
}
