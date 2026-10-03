import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function ProjectArtifact({ index, label, active, onSelect }) {
  const group = useRef()
  const x = (index - 1) * 1.35

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.elapsedTime * 0.24 + index
    group.current.position.y = -1.2 + Math.sin(clock.elapsedTime + index) * 0.05
  })

  return (
    <group ref={group} position={[x, -1.2, -1.2]} onClick={onSelect}>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color={active ? '#f6c76f' : '#62d9ff'} wireframe transparent opacity={active ? 0.85 : 0.46} />
      </mesh>
      <Text
        position={[0, -0.48, 0]}
        fontSize={0.07}
        maxWidth={0.8}
        textAlign="center"
        color={active ? '#f6c76f' : '#aeb9c8'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}
