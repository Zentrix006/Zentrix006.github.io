import{r as a,u as x,a as v,j as e,F as y,M as S,C as P,P as b}from"./r3f-W5-QOc4S.js";import{c as g,j as p,d as M}from"./three-C7ofFGJK.js";const d=new g(.55,.05,-.8);function z({reducedMotion:o,focus:t}){const r=a.useRef(),{viewport:l}=x(),i=a.useMemo(()=>new g(l.width<5?0:1.15,.05,-.35),[l.width]);return v(({clock:c,pointer:n})=>{if(!r.current)return;const s=t?i:d;if(o){r.current.position.copy(s),r.current.scale.setScalar(t?1.5:1);return}r.current.rotation.y=c.elapsedTime*.18+n.x*.12,r.current.rotation.x=Math.sin(c.elapsedTime*.22)*.12+n.y*.08,r.current.position.lerp(s,.045);const u=t?1.5:1;r.current.scale.setScalar(r.current.scale.x+(u-r.current.scale.x)*.045)}),e.jsx(y,{speed:o?0:1.25,rotationIntensity:.18,floatIntensity:.2,children:e.jsxs("group",{ref:r,position:d,children:[e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[.72,2]}),e.jsx(S,{color:"#0b1926",emissive:"#62d9ff",emissiveIntensity:.38,roughness:.32,metalness:.1,distort:o?0:.14,speed:.5,wireframe:!0})]}),e.jsxs("mesh",{scale:1.36,children:[e.jsx("icosahedronGeometry",{args:[.72,1]}),e.jsx("meshBasicMaterial",{color:"#62d9ff",wireframe:!0,transparent:!0,opacity:.12})]})]})})}const T=`
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
`,F=`
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
`;function A({reducedMotion:o}){const t=a.useRef(),r=a.useRef(),{viewport:l}=x(),i=l.width<6?120:260,c=a.useMemo(()=>{const n=[],s=[];for(let f=0;f<i;f+=1){const w=f/i,m=f*2.399963+Math.random()*.42,h=.28+Math.sqrt(w)*2.4;n.push(Math.cos(m)*h,(Math.random()-.5)*2.15,Math.sin(m)*h),s.push(.018+Math.random()*.035)}const u=new Float32Array(n),j=new Float32Array(s);return{buffer:u,sizeBuffer:j}},[i]);return v(({clock:n,pointer:s})=>{if(!t.current||o)return;const u=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);t.current.uniforms.uTime.value=n.elapsedTime,t.current.uniforms.uScroll.value=window.scrollY/u,t.current.uniforms.uPointer.value.set(s.x,s.y),r.current&&(r.current.rotation.y+=8e-4)}),e.jsxs("points",{ref:r,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[c.buffer,3]}),e.jsx("bufferAttribute",{attach:"attributes-aSize",args:[c.sizeBuffer,1]})]}),e.jsx("shaderMaterial",{ref:t,transparent:!0,depthWrite:!1,vertexShader:T,fragmentShader:F,uniforms:{uTime:{value:0},uScroll:{value:0},uPointer:{value:new M(0,0)},uAccent:{value:new p("#62d9ff")},uSecondary:{value:new p("#9b8cff")}}})]})}function C({activeSection:o,reducedMotion:t}){return e.jsxs(e.Fragment,{children:[e.jsx("color",{attach:"background",args:["#05070d"]}),e.jsx("ambientLight",{intensity:.24}),e.jsx("pointLight",{position:[2.4,2.2,2.8],intensity:.8,color:"#62d9ff"}),e.jsx(A,{reducedMotion:t}),e.jsx(z,{reducedMotion:t,focus:o==="work"}),e.jsx(b,{all:!0})]})}function R({activeSection:o,reducedMotion:t}){return e.jsx("div",{className:"cyberworld","aria-hidden":"true",children:e.jsx(P,{dpr:[1,window.innerWidth<760?1.2:1.7],camera:{position:[0,0,4.5],fov:44},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},children:e.jsx(a.Suspense,{fallback:null,children:e.jsx(C,{activeSection:o,reducedMotion:t})})})})}export{R as CyberWorld};
