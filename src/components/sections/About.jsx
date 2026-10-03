import { skills } from '../../data/skills'

export function About() {
  return (
    <section className="section-panel" id="about">
      <div className="section-kicker" data-reveal>
        ABOUT
      </div>
      <div className="split-section">
        <div data-reveal>
          <h2>I break systems to understand them.</h2>
          <p>
            Arnoldo Felix R builds and studies offensive security tooling, malware analysis workflows, browser
            vulnerability demonstrations, Linux systems, and security R&amp;D.
          </p>
        </div>
        <div className="skill-constellation" data-reveal>
          {skills.map((skill, index) => (
            <article key={skill.id} style={{ '--i': index }} className="skill-node">
              <h3>{skill.label}</h3>
              <p>{skill.detail}</p>
              <div>
                {skill.nodes.map((node) => (
                  <span key={node}>{node}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
