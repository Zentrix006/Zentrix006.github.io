import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { NetworkCore } from './NetworkCore'
import { NetworkParticles } from './NetworkParticles'
import { ProjectArtifact } from './ProjectArtifact'
import { projects } from '../../data/projects'

function Scene({ activeProject, setActiveProject, reducedMotion }) {
  return (
    <>
      <color attach="background" args={['#05070d']} />
      <ambientLight intensity={0.24} />
      <pointLight position={[2.4, 2.2, 2.8]} intensity={0.8} color="#62d9ff" />
      <NetworkParticles reducedMotion={reducedMotion} />
      <NetworkCore reducedMotion={reducedMotion} />
      {projects.map((project, index) => (
        <ProjectArtifact
          key={project.id}
          index={index}
          label={project.title}
          active={project.id === activeProject}
          onSelect={() => setActiveProject(project.id)}
        />
      ))}
      <Preload all />
    </>
  )
}

export function CyberWorld({ activeProject, setActiveProject, reducedMotion }) {
  return (
    <div className="cyberworld" aria-hidden="true">
      <Canvas
        dpr={[1, window.innerWidth < 760 ? 1.2 : 1.7]}
        camera={{ position: [0, 0, 4.5], fov: 44 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene activeProject={activeProject} setActiveProject={setActiveProject} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
