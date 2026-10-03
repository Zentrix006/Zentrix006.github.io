import { useMemo, useRef } from 'react'
import { Color, Vector2 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { particleFragmentShader, particleVertexShader } from '../../shaders/networkMaterial'

export function NetworkParticles({ reducedMotion }) {
  const material = useRef()
  const points = useRef()
  const { viewport } = useThree()

  const count = viewport.width < 6 ? 120 : 260
  const geometry = useMemo(() => {
    const positions = []
    const sizes = []
    for (let i = 0; i < count; i += 1) {
      const layer = i / count
      const angle = i * 2.399963 + Math.random() * 0.42
      const radius = 0.28 + Math.sqrt(layer) * 2.4
      positions.push(Math.cos(angle) * radius, (Math.random() - 0.5) * 2.15, Math.sin(angle) * radius)
      sizes.push(0.018 + Math.random() * 0.035)
    }

    const buffer = new Float32Array(positions)
    const sizeBuffer = new Float32Array(sizes)
    return { buffer, sizeBuffer }
  }, [count])

  useFrame(({ clock, pointer }) => {
    if (!material.current || reducedMotion) return
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    material.current.uniforms.uTime.value = clock.elapsedTime
    material.current.uniforms.uScroll.value = window.scrollY / scrollMax
    material.current.uniforms.uPointer.value.set(pointer.x, pointer.y)
    if (points.current) points.current.rotation.y += 0.0008
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.buffer, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[geometry.sizeBuffer, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uPointer: { value: new Vector2(0, 0) },
          uAccent: { value: new Color('#62d9ff') },
          uSecondary: { value: new Color('#9b8cff') },
        }}
      />
    </points>
  )
}
