import { useState } from 'react'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import { labDemoCount } from '../../data/lab'
import { profile } from '../../data/profile'

export function Terminal() {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(['ZENTRIX TERMINAL READY. Type help.'])

  function execute(command) {
    const cmd = command.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') {
      setLines([])
      return
    }

    const response = responses[cmd]?.() || `bash: ${cmd}: command not found`
    setLines((current) => [...current, `root@zentrix:~# ${cmd}`, response])
  }

  const responses = {
    help: () => 'Commands: help, about, projects, research, skills, lab, github, contact, clear',
    about: () => `${profile.name}\n${profile.role}\n${profile.location}\n${profile.status}`,
    projects: () => projects.map((project, index) => `${String(index + 1).padStart(2, '0')} ${project.title}`).join('\n'),
    research: () => 'Telemetry -> Network State -> World Model -> Attack Forecast -> Risk -> Defence',
    skills: () => skills.map((skill) => `+ ${skill.label}`).join('\n'),
    lab: () => `${labDemoCount} isolated browser security demos: /demos/index.html`,
    github: () => profile.links.github,
    contact: () => `GitHub: ${profile.links.github}\nTryHackMe: ${profile.links.tryhackme}\nEmail: available on request`,
  }

  return (
    <section className="section-panel terminal-section" id="terminal">
      <div className="section-kicker" data-reveal>
        TERMINAL
      </div>
      <div className="terminal" data-reveal>
        <div className="terminal-output" aria-live="polite">
          {lines.map((line, index) => (
            <pre key={`${line}-${index}`}>{line}</pre>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            execute(input)
            setInput('')
          }}
        >
          <span>root@zentrix:~#</span>
          <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Terminal command" />
        </form>
      </div>
    </section>
  )
}
