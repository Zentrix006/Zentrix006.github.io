import { useMemo, useState } from 'react'
import { projects, featuredRepoNames } from '../../data/projects'
import { useGithubRepos } from '../../hooks/useGithubRepos'

export function Projects({ activeProject, setActiveProject }) {
  const selected = projects.find((project) => project.id === activeProject) || projects[0]
  const { repos, stats, status } = useGithubRepos()
  const [filter, setFilter] = useState('all')

  const filteredRepos = useMemo(() => {
    if (filter === 'all') return repos
    return repos.filter((repo) => repo.language === filter)
  }, [filter, repos])

  const languages = useMemo(() => ['all', ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean))).slice(0, 6)], [repos])

  return (
    <section className="section-panel" id="work">
      <div className="section-kicker" data-reveal>
        PROJECTS
      </div>
      <div className="project-layout">
        <div className="project-objects" data-reveal>
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-object ${project.id === selected.id ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveProject(project.id)}
            >
              <span>{project.category}</span>
              <strong>{project.title}</strong>
              <small>{project.description}</small>
            </button>
          ))}
        </div>
        <article className="project-detail" data-reveal>
          <span>{selected.status}</span>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <p>
            <strong>Problem:</strong> {selected.problem}
          </p>
          <p>
            <strong>Approach:</strong> {selected.solution}
          </p>
          <div className="tag-row">
            {selected.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="flow-row">
            {selected.flow.map((step, index) => (
              <span key={step}>
                {String(index + 1).padStart(2, '0')} // {step}
              </span>
            ))}
          </div>
          <a className="primary-action" href={selected.github} target="_blank" rel="noreferrer">
            Open Project Source
          </a>
        </article>
      </div>

      <div className="repo-panel" data-reveal>
        <div className="repo-header">
          <div>
            <h3>GitHub Repository Scan</h3>
            <p>{status}</p>
          </div>
          <div className="stats-row">
            <span>{stats.repos} repos</span>
            <span>{stats.stars} stars</span>
            <span>{stats.languages} languages</span>
            <span>{stats.forks} forks</span>
          </div>
        </div>
        <div className="filter-row">
          {languages.map((language) => (
            <button key={language} className={filter === language ? 'active' : ''} type="button" onClick={() => setFilter(language)}>
              {language}
            </button>
          ))}
        </div>
        <div className="repo-grid">
          {filteredRepos.slice(0, 12).map((repo) => (
            <a key={repo.html_url} className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer">
              <strong>{repo.name}</strong>
              <p>{repo.description}</p>
              <div>
                <span>{repo.language}</span>
                {featuredRepoNames.includes(repo.name) && <span>featured</span>}
                {repo.fallback && <span>fallback</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
