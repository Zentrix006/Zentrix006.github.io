import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Color, Vector3 } from 'three'
import coastlines from '../../data/coastlines.json'

// Natural Earth 1:110m coastlines, public domain. See data/GEOGRAPHY.md.
const RADIUS = 0.82
function point(longitude, latitude, radius) {
  const lon = longitude * Math.PI / 180
  const lat = latitude * Math.PI / 180
  return new Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)).multiplyScalar(radius)
}
function segments(lines, radius) {
  const result = []
  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const start = point(...line[i - 1], radius)
      const end = point(...line[i], radius)
      // Subdivide along the surface so long edges never sink into the sphere.
      const steps = Math.max(1, Math.ceil(start.angleTo(end) / 0.025))
      let previous = start
      for (let step = 1; step <= steps; step++) {
        const next = start.clone().lerp(end, step / steps).normalize().multiplyScalar(radius)
        result.push(...previous.toArray(), ...next.toArray())
        previous = next
      }
    }
  }
  return new Float32Array(result)
}
function SurfaceLines({ positions, color, opacity, materialRef }) {
  return <lineSegments>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <lineBasicMaterial ref={materialRef} color={color} transparent opacity={opacity} depthWrite={false} />
  </lineSegments>
}

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
  const globe = useRef()
  const coastMaterial = useRef()
  const { viewport } = useThree()
  const target = SECTION_POSES[activeSection] || SECTION_POSES.home
  const targetPosition = useMemo(() => new Vector3(
    viewport.width < 5 ? (MOBILE_X[activeSection] ?? 0) : target.x,
    target.y, target.z,
  ), [activeSection, target, viewport.width])
  const targetColor = useMemo(() => new Color(target.color), [target.color])
  const coast = useMemo(() => segments(coastlines, RADIUS + 0.006), [])
  const grid = useMemo(() => {
    const lines = []
    for (let lat = -60; lat <= 60; lat += 30) {
      lines.push(Array.from({ length: 181 }, (_, i) => [i * 2 - 180, lat]))
    }
    for (let lon = -180; lon < 180; lon += 30) {
      lines.push(Array.from({ length: 91 }, (_, i) => [lon, i * 2 - 90]))
    }
    return segments(lines, RADIUS + 0.003)
  }, [])

  useFrame((_, delta) => {
    if (!group.current || !globe.current) return
    const blend = reducedMotion ? 1 : 1 - Math.exp(-3 * Math.min(delta, 0.05))
    group.current.position.lerp(targetPosition, blend)
    group.current.scale.setScalar(group.current.scale.x + (target.scale - group.current.scale.x) * blend)
    coastMaterial.current?.color.lerp(targetColor, blend)
    if (!reducedMotion) globe.current.rotation.y += Math.min(delta, 0.05) * 0.065
  })

  return <group ref={group} position={targetPosition} scale={target.scale}>
    <group ref={globe} rotation={[0.12, -0.45, -0.12]}>
      <mesh>
        <sphereGeometry args={[RADIUS, viewport.width < 5 ? 48 : 80, 48]} />
        <meshStandardMaterial color="#091822" emissive="#07121b" emissiveIntensity={0.65} roughness={0.78} metalness={0.05} />
      </mesh>
      <SurfaceLines positions={grid} color="#497489" opacity={0.19} />
      <SurfaceLines positions={coast} color="#62d9ff" opacity={0.78} materialRef={coastMaterial} />
    </group>
  </group>
}
