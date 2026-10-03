import { projects } from '../../data/projects'

export function Research() {
  const predictive = projects.find((project) => project.id === 'predictive-cyberdefence')

  return (
    <section className="section-panel" id="research">
      <div className="section-kicker" data-reveal>
        RESEARCH
      </div>
      <div className="split-section">
        <div data-reveal>
          <h2>Predictive Cyberdefence</h2>
          <p>
            A research framing for moving from observed telemetry to possible attack paths and defensive prioritization.
            It is presented as an explainable model, not a claim of production capability.
          </p>
        </div>
        <div className="research-flow" data-reveal>
          {predictive.flow.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              <p>{researchCopy[index]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const researchCopy = [
  'Observed signals and security events.',
  'Current environment and network context.',
  'Reasoning layer for possible futures.',
  'Candidate attack path, not certainty.',
  'Prioritized defensive attention.',
  'Containment and response planning.',
]
