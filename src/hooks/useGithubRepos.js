import { useEffect, useMemo, useState } from 'react'
import { featuredRepoNames, projects } from '../data/projects'

function fallbackRepos() {
  return projects.map((project) => ({
    name: project.title.replace(/\s+/g, '-'),
    description: project.description,
    language: project.technologies.includes('Python') ? 'Python' : 'Unknown',
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    html_url: project.github,
    topics: project.technologies.slice(0, 3).map((item) => item.toLowerCase().replace(/\s+/g, '-')),
    fallback: true,
  }))
}

function normalizeRepo(repo) {
  return {
    name: repo.name || 'untitled-repo',
    description: repo.description || 'No description provided.',
    language: repo.language || 'Unknown',
    updated_at: repo.updated_at || new Date().toISOString(),
    stargazers_count: Number(repo.stargazers_count || 0),
    forks_count: Number(repo.forks_count || 0),
    html_url: repo.html_url || `https://github.com/Zentrix006/${repo.name || ''}`,
    topics: Array.isArray(repo.topics) ? repo.topics.slice(0, 3) : [],
    fallback: Boolean(repo.fallback),
  }
}

function sortRepos(repos) {
  return [...repos].sort((a, b) => {
    const aPinned = featuredRepoNames.includes(a.name) ? 1 : 0
    const bPinned = featuredRepoNames.includes(b.name) ? 1 : 0
    if (aPinned !== bPinned) return bPinned - aPinned
    return new Date(b.updated_at) - new Date(a.updated_at)
  })
}

export function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('Fetching public repositories from GitHub.')

  useEffect(() => {
    let active = true

    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/Zentrix006/repos?per_page=100&sort=updated', {
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
        const json = await response.json()
        if (!Array.isArray(json)) throw new Error('GitHub API response was not a list')
        if (!active) return
        setRepos(sortRepos(json.map(normalizeRepo)))
        setStatus(`Loaded ${json.length} repositories directly from GitHub.`)
      } catch {
        if (!active) return
        setRepos(sortRepos(fallbackRepos().map(normalizeRepo)))
        setStatus('GitHub API unavailable or rate-limited. Showing highlighted repositories.')
      }
    }

    fetchRepos()
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => {
    const languages = new Set(repos.map((repo) => repo.language).filter(Boolean))
    return {
      repos: repos.length,
      stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: languages.size,
    }
  }, [repos])

  return { repos, stats, status }
}
