import { profile } from '../../data/profile'

export function Contact() {
  return (
    <section className="section-panel contact-section" id="contact">
      <div className="section-kicker" data-reveal>
        CONTACT
      </div>
      <div className="contact-grid" data-reveal>
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          <span>GITHUB</span>
          @Zentrix006
        </a>
        <a href={profile.links.tryhackme} target="_blank" rel="noreferrer">
          <span>TRYHACKME</span>
          thevulnman
        </a>
        <a href={profile.links.legacy}>
          <span>LEGACY BUILD</span>
          Static fallback
        </a>
      </div>
      <footer>
        ZENTRIX // SYSTEM ONLINE // GITHUB · TRYHACKME · LAB // © 2026 {profile.name}
      </footer>
    </section>
  )
}
