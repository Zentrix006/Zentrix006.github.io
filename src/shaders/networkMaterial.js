export const particleVertexShader = `
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
attribute float aSize;
varying float vDepth;

void main() {
  vec3 p = position;
  float wave = sin(uTime * 0.55 + p.x * 3.0 + p.z * 2.0) * 0.09;
  float rot = uTime * 0.045 + uScroll * 1.65 + uPointer.x * 0.12;
  mat2 r = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
  p.xz = r * p.xz;
  p.y += wave + uPointer.y * 0.12;
  vDepth = clamp((p.z + 2.0) / 4.0, 0.0, 1.0);
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * (220.0 / -mvPosition.z);
}
`

export const particleFragmentShader = `
uniform vec3 uAccent;
uniform vec3 uSecondary;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.08, d) * (0.2 + vDepth * 0.62);
  vec3 color = mix(uSecondary, uAccent, vDepth);
  gl_FragColor = vec4(color, alpha);
}
`
