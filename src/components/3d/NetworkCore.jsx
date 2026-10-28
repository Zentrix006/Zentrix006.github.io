import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute, Vector3 } from 'three'

const SECTION_POSES = {
  home: { x: 0.55, y: 0.05, z: -0.8, scale: 1, color: '#62d9ff' },
  research: { x: -1.05, y: 0.12, z: -0.45, scale: 1.28, color: '#a99bff' },
  lab: { x: 0.72, y: -0.12, z: -0.2, scale: 1.12, color: '#f0bd70' },
  about: { x: -0.65, y: 0.05, z: -0.65, scale: 0.96, color: '#7ce6d0' },
  terminal: { x: 0.78, y: 0.18, z: -0.2, scale: 1.08, color: '#a99bff' },
  contact: { x: 0, y: 0.05, z: -0.55, scale: 0.92, color: '#62d9ff' },
}
const MOBILE_X = { research: -0.36, lab: 0.34, about: -0.3, terminal: 0.3 }
const CORE_NODES = [
  [0, 0.68, 0.08], [0.47, 0.43, 0.22], [0.66, 0.04, 0.16],
  [0.47, -0.43, 0.22], [0, -0.68, 0.08], [-0.47, -0.43, 0.22],
  [-0.66, 0.04, 0.16], [-0.47, 0.43, 0.22], [0, 0.02, 0.68],
]
const CORE_LINKS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 8], [2, 8], [4, 8], [6, 8], [1, 7], [3, 5],
]

export function NetworkCore({ reducedMotion, activeSection }) {
  const group = useRef()
  const coreMaterial = useRef()
  const linkMaterial = useRef()
  const { viewport } = useThree()
  const target = SECTION_POSES[activeSection] || SECTION_POSES.home
  const targetPosition = useMemo(() => new Vector3(
    viewport.width < 5 ? (MOBILE_X[activeSection] ?? 0) : target.x,
    target.y,
    target.z,
  ), [activeSection, target, viewport.width])
  const targetColor = useMemo(() => new Color(target.color), [target.color])
  const linkGeometry = useMemo(() => {
    const positions = []
    CORE_LINKS.forEach(([from, to]) => {
      const start = new Vector3(...CORE_NODES[from]).normalize()
      const end = new Vector3(...CORE_NODES[to]).normalize()
      const angle = start.angleTo(end)
      const denominator = Math.sin(angle)
      const samples = Array.from({ length: 9 }, (_, index) => {
        const t = index / 8
        return start.clone()
          .multiplyScalar(Math.sin((1 - t) * angle) / denominator)
          .add(end.clone().multiplyScalar(Math.sin(t * angle) / denominator))
          .multiplyScalar(0.655)
      })
      for (let index = 0; index < samples.length - 1; index += 1) {
        positions.push(...samples[index].toArray(), ...samples[index + 1].toArray())
      }
    })
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    if (reducedMotion) {
      group.current.position.copy(targetPosition)
      group.current.scale.setScalar(target.scale)
      coreMaterial.current?.color.copy(targetColor)
      coreMaterial.current?.emissive.copy(targetColor)
      linkMaterial.current?.color.copy(targetColor)
      return
    }
    group.current.rotation.y = clock.elapsedTime * 0.09 + pointer.x * 0.07
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.14) * 0.055 + pointer.y * 0.045
    group.current.position.lerp(targetPosition, 0.035)
    group.current.scale.setScalar(group.current.scale.x + (target.scale - group.current.scale.x) * 0.035)
    coreMaterial.current?.color.lerp(targetColor, 0.035)
    coreMaterial.current?.emissive.lerp(targetColor, 0.035)
    linkMaterial.current?.color.lerp(targetColor, 0.035)
  })

  return (
    <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={group} position={[0.55, 0.05, -0.8]}>
        <mesh>
          <sphereGeometry args={[0.62, 36, 28]} />
          <MeshDistortMaterial
            ref={coreMaterial}
            color="#091720"
            emissive="#163744"
            emissiveIntensity={0.18}
            roughness={0.42}
            metalness={0.12}
            distort={reducedMotion ? 0 : 0.035}
            speed={0.22}
          />
        </mesh>
        <lineSegments geometry={linkGeometry}>
          <lineBasicMaterial ref={linkMaterial} color="#62d9ff" transparent opacity={0.34} depthWrite={false} />
        </lineSegments>
        {CORE_NODES.map((position, index) => (
          <mesh key={index} position={position} scale={index === 8 ? 1.3 : 1}>
            <sphereGeometry args={[0.024, 12, 10]} />
            <meshBasicMaterial color={index === 8 ? '#c5f4ff' : '#62d9ff'} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}
