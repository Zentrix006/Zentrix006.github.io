export const particleVertexShader = `
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
attribute float aSize;
varying float vDepth;

void main() {
  vec3 p = position;
  float wave = sin(uTime * 0.32 + p.x * 2.0 + p.z * 1.7) * 0.035;
  float rot = uTime * 0.025 + uScroll * 0.55 + uPointer.x * 0.06;
  mat2 r = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
  p.xz = r * p.xz;
  p.y += wave + uPointer.y * 0.04;
  vDepth = clamp((p.z + 2.0) / 4.0, 0.0, 1.0);
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * (160.0 / -mvPosition.z);
}
`

export const particleFragmentShader = `
uniform vec3 uAccent;
uniform vec3 uSecondary;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = (1.0 - smoothstep(0.1, 0.5, d)) * (0.08 + vDepth * 0.32);
  vec3 color = mix(uSecondary, uAccent, vDepth);
  gl_FragColor = vec4(color, alpha);
}
`
