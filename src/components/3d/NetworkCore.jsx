import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function NetworkCore({ reducedMotion }) {
  const group = useRef()

  useFrame(({ clock, pointer }) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.12
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.12 + pointer.y * 0.08
  })

  return (
    <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={0.18} floatIntensity={0.2}>
      <group ref={group} position={[0.55, 0.05, -0.8]}>
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
