export function Projects({ webglSupported }) {
  return (
    <section className="section-panel polymorphism-section" id="work" aria-labelledby="polymorphism-heading">
      <div className="section-kicker" data-reveal>
        POLYMORPHISM
      </div>
      <div className="polymorphism-content">
        <div className="polymorphism-copy" data-reveal>
          <p className="eyebrow">ONE SYSTEM // MANY STATES</p>
          <h2 id="polymorphism-heading">POLYMORPHISM</h2>
          <p>One evolving sphere anchors the system. Move through the research and security work around it.</p>
          <a className="primary-action" href="#research">Explore Research</a>
        </div>
        <div className="polymorphism-visual" aria-hidden="true">
          {!webglSupported && <div className="polymorphism-sphere" />}
        </div>
      </div>
    </section>
  )
}
