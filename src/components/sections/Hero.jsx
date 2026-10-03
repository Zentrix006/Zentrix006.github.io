import { profile } from '../../data/profile'

export function Hero() {
  return (
    <section className="hero-section section-panel" id="home">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Cybersecurity Laboratory // Digital Research System</p>
        <h1>ZENTRIX</h1>
        <h2>Cybersecurity Researcher</h2>
        <p className="hero-summary">{profile.summary}</p>
        <div className="signal-row">
          <span>{profile.status}</span>
          <span>{profile.location}</span>
          <span>Remote OK</span>
        </div>
        <div className="action-row">
          <a href={profile.links.lab}>Vulnerability Lab</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <aside className="operator-panel" data-reveal data-scrub>
        <img src="/assets/profile.png" alt="Arnoldo Felix R profile signal" />
        <div>
          <strong>{profile.name}</strong>
          <span>Offensive Security · Malware Analysis · Research</span>
        </div>
      </aside>
    </section>
  )
}
