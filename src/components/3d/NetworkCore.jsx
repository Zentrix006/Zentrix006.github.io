import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Vector3 } from 'three'

const SECTION_POSES = {
  home: { x: 0.55, y: 0.05, z: -0.8, scale: 1, color: '#62d9ff' },
  research: { x: -1.05, y: 0.12, z: -0.45, scale: 1.28, color: '#a99bff' },
  lab: { x: 0.72, y: -0.12, z: -0.2, scale: 1.12, color: '#f0bd70' },
  about: { x: -0.65, y: 0.05, z: -0.65, scale: 0.96, color: '#7ce6d0' },
  terminal: { x: 0.78, y: 0.18, z: -0.2, scale: 1.08, color: '#a99bff' },
  contact: { x: 0, y: 0.05, z: -0.55, scale: 0.92, color: '#62d9ff' },
}
const MOBILE_X = { research: -0.36, lab: 0.34, about: -0.3, terminal: 0.3 }

export function NetworkCore({ reducedMotion, activeSection }) {
  const group = useRef()
  const coreMaterial = useRef()
  const shellMaterial = useRef()
  const { viewport } = useThree()
  const target = SECTION_POSES[activeSection] || SECTION_POSES.home
  const targetPosition = useMemo(() => new Vector3(
    viewport.width < 5 ? (MOBILE_X[activeSection] ?? 0) : target.x,
    target.y,
    target.z,
  ), [activeSection, target, viewport.width])
  const targetColor = useMemo(() => new Color(target.color), [target.color])

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    if (reducedMotion) {
      group.current.position.copy(targetPosition)
      group.current.scale.setScalar(target.scale)
      coreMaterial.current?.color.copy(targetColor)
      coreMaterial.current?.emissive.copy(targetColor)
      shellMaterial.current?.color.copy(targetColor)
      return
    }
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.12
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.12 + pointer.y * 0.08
    group.current.position.lerp(targetPosition, 0.035)
    group.current.scale.setScalar(group.current.scale.x + (target.scale - group.current.scale.x) * 0.035)
    coreMaterial.current?.color.lerp(targetColor, 0.035)
    coreMaterial.current?.emissive.lerp(targetColor, 0.035)
    shellMaterial.current?.color.lerp(targetColor, 0.035)
  })

  return (
    <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={0.18} floatIntensity={0.2}>
      <group ref={group} position={[0.55, 0.05, -0.8]}>
        <mesh>
          <icosahedronGeometry args={[0.72, 2]} />
          <MeshDistortMaterial
            ref={coreMaterial}
            color="#0b1926"
            emissive="#62d9ff"
            emissiveIntensity={0.38}
            roughness={0.32}
            metalness={0.1}
            distort={reducedMotion ? 0 : 0.14}
            speed={0.5}
            wireframe
          />
        </mesh>
        <mesh scale={1.36}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial ref={shellMaterial} color="#62d9ff" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  )
}
