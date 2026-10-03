import { profile } from '../../data/profile'

export function Contact() {
  return (
    <section className="section-panel contact-section" id="contact">
      <div className="section-kicker" data-reveal>
        CONTACT
      </div>
      <p className="contact-intro" data-reveal>For collaboration or opportunities, start a conversation through GitHub.</p>
      <div className="contact-grid" data-reveal>
        <a className="contact-primary" href={profile.links.github} target="_blank" rel="noreferrer">
          <span>CONTACT THROUGH GITHUB</span>
          @Zentrix006
        </a>
        <a href={profile.links.tryhackme} target="_blank" rel="noreferrer">
          <span>TRYHACKME</span>
          thevulnman
        </a>
        <a href={profile.links.repositories} target="_blank" rel="noreferrer">
          <span>PROJECT REPOSITORIES</span>
          Browse all work
        </a>
      </div>
      <footer>
        ZENTRIX // SYSTEM ONLINE // GITHUB · TRYHACKME · LAB // © 2026 {profile.name}
      </footer>
    </section>
  )
}
