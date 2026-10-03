import{r as a,u as m,j as e,F as g,M as j,a as y,T as w,C as b,P as S}from"./r3f-B7Vx5GyC.js";import{m as p,d as M}from"./three-DmL6ipxB.js";import{p as P}from"./index-D7hPDTDV.js";import"./motion-DzW93yBl.js";function z({reducedMotion:o}){const r=a.useRef();return m(({clock:t,pointer:s})=>{!r.current||o||(r.current.rotation.y=t.elapsedTime*.18+s.x*.12,r.current.rotation.x=Math.sin(t.elapsedTime*.22)*.12+s.y*.08)}),e.jsx(g,{speed:o?0:1.25,rotationIntensity:.18,floatIntensity:.2,children:e.jsxs("group",{ref:r,position:[.55,.05,-.8],children:[e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[.72,2]}),e.jsx(j,{color:"#0b1926",emissive:"#62d9ff",emissiveIntensity:.38,roughness:.32,metalness:.1,distort:o?0:.14,speed:.5,wireframe:!0})]}),e.jsxs("mesh",{scale:1.36,children:[e.jsx("icosahedronGeometry",{args:[.72,1]}),e.jsx("meshBasicMaterial",{color:"#62d9ff",wireframe:!0,transparent:!0,opacity:.12})]})]})})}const T=`
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
`,A=`
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
`;function C({reducedMotion:o}){const r=a.useRef(),t=a.useRef(),{viewport:s}=y(),n=s.width<6?120:260,l=a.useMemo(()=>{const i=[],c=[];for(let u=0;u<n;u+=1){const v=u/n,h=u*2.399963+Math.random()*.42,d=.28+Math.sqrt(v)*2.4;i.push(Math.cos(h)*d,(Math.random()-.5)*2.15,Math.sin(h)*d),c.push(.018+Math.random()*.035)}const f=new Float32Array(i),x=new Float32Array(c);return{buffer:f,sizeBuffer:x}},[n]);return m(({clock:i,pointer:c})=>{if(!r.current||o)return;const f=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);r.current.uniforms.uTime.value=i.elapsedTime,r.current.uniforms.uScroll.value=window.scrollY/f,r.current.uniforms.uPointer.value.set(c.x,c.y),t.current&&(t.current.rotation.y+=8e-4)}),e.jsxs("points",{ref:t,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[l.buffer,3]}),e.jsx("bufferAttribute",{attach:"attributes-aSize",args:[l.sizeBuffer,1]})]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,depthWrite:!1,vertexShader:T,fragmentShader:A,uniforms:{uTime:{value:0},uScroll:{value:0},uPointer:{value:new M(0,0)},uAccent:{value:new p("#62d9ff")},uSecondary:{value:new p("#9b8cff")}}})]})}function F({index:o,label:r,active:t,onSelect:s}){const n=a.useRef(),l=(o-1)*1.35;return m(({clock:i})=>{n.current&&(n.current.rotation.y=i.elapsedTime*.24+o,n.current.position.y=-1.2+Math.sin(i.elapsedTime+o)*.05)}),e.jsxs("group",{ref:n,position:[l,-1.2,-1.2],onClick:s,children:[e.jsxs("mesh",{children:[e.jsx("octahedronGeometry",{args:[.28,0]}),e.jsx("meshBasicMaterial",{color:t?"#f6c76f":"#62d9ff",wireframe:!0,transparent:!0,opacity:t?.85:.46})]}),e.jsx(w,{position:[0,-.48,0],fontSize:.07,maxWidth:.8,textAlign:"center",color:t?"#f6c76f":"#aeb9c8",anchorX:"center",anchorY:"middle",children:r})]})}function D({activeProject:o,setActiveProject:r,reducedMotion:t}){return e.jsxs(e.Fragment,{children:[e.jsx("color",{attach:"background",args:["#05070d"]}),e.jsx("ambientLight",{intensity:.24}),e.jsx("pointLight",{position:[2.4,2.2,2.8],intensity:.8,color:"#62d9ff"}),e.jsx(C,{reducedMotion:t}),e.jsx(z,{reducedMotion:t}),P.map((s,n)=>e.jsx(F,{index:n,label:s.title,active:s.id===o,onSelect:()=>r(s.id)},s.id)),e.jsx(S,{all:!0})]})}function _({activeProject:o,setActiveProject:r,reducedMotion:t}){return e.jsx("div",{className:"cyberworld","aria-hidden":"true",children:e.jsx(b,{dpr:[1,window.innerWidth<760?1.2:1.7],camera:{position:[0,0,4.5],fov:44},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},children:e.jsx(a.Suspense,{fallback:null,children:e.jsx(D,{activeProject:o,setActiveProject:r,reducedMotion:t})})})})}export{_ as CyberWorld};
