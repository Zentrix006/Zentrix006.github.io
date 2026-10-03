import { usePerformanceProfile } from '../../hooks/usePerformanceProfile'

export function PerformancePanel() {
  const profile = usePerformanceProfile()

  return (
    <aside className="performance-panel" aria-label="Performance profile">
      <span>FPS {profile.fps}</span>
      <span>WEBGL {profile.webgl}</span>
      <span>QUALITY {profile.quality}</span>
      <span>MEM {profile.memory}</span>
    </aside>
  )
}
