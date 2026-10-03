import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Vector3 } from 'three'

const REST_POSITION = new Vector3(0.55, 0.05, -0.8)

export function NetworkCore({ reducedMotion, focus }) {
  const group = useRef()
  const { viewport } = useThree()
  const focusPosition = useMemo(
    () => new Vector3(viewport.width < 5 ? 0 : 1.15, 0.05, -0.35),
    [viewport.width],
  )

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const targetPosition = focus ? focusPosition : REST_POSITION
    if (reducedMotion) {
      group.current.position.copy(targetPosition)
      group.current.scale.setScalar(focus ? 1.5 : 1)
      return
    }
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.12
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.12 + pointer.y * 0.08
    group.current.position.lerp(targetPosition, 0.045)
    const scale = focus ? 1.5 : 1
    group.current.scale.setScalar(group.current.scale.x + (scale - group.current.scale.x) * 0.045)
  })

  return (
    <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={0.18} floatIntensity={0.2}>
      <group ref={group} position={REST_POSITION}>
        <mesh>
          <icosahedronGeometry args={[0.72, 2]} />
          <MeshDistortMaterial
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
          <meshBasicMaterial color="#62d9ff" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  )
}
