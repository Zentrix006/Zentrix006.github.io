import{r as n,u as w,a as b,j as e,F as S,M as z,C as M,P}from"./r3f-W5-QOc4S.js";import{c as T,j as x,d as C}from"./three-C7ofFGJK.js";const j={home:{x:.55,y:.05,z:-.8,scale:1,color:"#62d9ff"},research:{x:-1.05,y:.12,z:-.45,scale:1.28,color:"#a99bff"},lab:{x:.72,y:-.12,z:-.2,scale:1.12,color:"#f0bd70"},about:{x:-.65,y:.05,z:-.65,scale:.96,color:"#7ce6d0"},terminal:{x:.78,y:.18,z:-.2,scale:1.08,color:"#a99bff"},contact:{x:0,y:.05,z:-.55,scale:.92,color:"#62d9ff"}},F={research:-.36,lab:.34,about:-.3,terminal:.3};function A({reducedMotion:a,activeSection:r}){const t=n.useRef(),c=n.useRef(),l=n.useRef(),{viewport:f}=w(),o=j[r]||j.home,i=n.useMemo(()=>new T(f.width<5?F[r]??0:o.x,o.y,o.z),[r,o,f.width]),s=n.useMemo(()=>new x(o.color),[o.color]);return b(({clock:p,pointer:u})=>{var d,m,h,v,y,g;if(t.current){if(a){t.current.position.copy(i),t.current.scale.setScalar(o.scale),(d=c.current)==null||d.color.copy(s),(m=c.current)==null||m.emissive.copy(s),(h=l.current)==null||h.color.copy(s);return}t.current.rotation.y=p.elapsedTime*.18+u.x*.12,t.current.rotation.x=Math.sin(p.elapsedTime*.22)*.12+u.y*.08,t.current.position.lerp(i,.035),t.current.scale.setScalar(t.current.scale.x+(o.scale-t.current.scale.x)*.035),(v=c.current)==null||v.color.lerp(s,.035),(y=c.current)==null||y.emissive.lerp(s,.035),(g=l.current)==null||g.color.lerp(s,.035)}}),e.jsx(S,{speed:a?0:1.25,rotationIntensity:.18,floatIntensity:.2,children:e.jsxs("group",{ref:t,position:[.55,.05,-.8],children:[e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[.72,2]}),e.jsx(z,{ref:c,color:"#0b1926",emissive:"#62d9ff",emissiveIntensity:.38,roughness:.32,metalness:.1,distort:a?0:.14,speed:.5,wireframe:!0})]}),e.jsxs("mesh",{scale:1.36,children:[e.jsx("icosahedronGeometry",{args:[.72,1]}),e.jsx("meshBasicMaterial",{ref:l,color:"#62d9ff",wireframe:!0,transparent:!0,opacity:.12})]})]})})}const D=`
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
`,E=`
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
`;function R({reducedMotion:a}){const r=n.useRef(),t=n.useRef(),{viewport:c}=w(),l=c.width<6?120:260,f=n.useMemo(()=>{const o=[],i=[];for(let u=0;u<l;u+=1){const d=u/l,m=u*2.399963+Math.random()*.42,h=.28+Math.sqrt(d)*2.4;o.push(Math.cos(m)*h,(Math.random()-.5)*2.15,Math.sin(m)*h),i.push(.018+Math.random()*.035)}const s=new Float32Array(o),p=new Float32Array(i);return{buffer:s,sizeBuffer:p}},[l]);return b(({clock:o,pointer:i})=>{if(!r.current||a)return;const s=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);r.current.uniforms.uTime.value=o.elapsedTime,r.current.uniforms.uScroll.value=window.scrollY/s,r.current.uniforms.uPointer.value.set(i.x,i.y),t.current&&(t.current.rotation.y+=8e-4)}),e.jsxs("points",{ref:t,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[f.buffer,3]}),e.jsx("bufferAttribute",{attach:"attributes-aSize",args:[f.sizeBuffer,1]})]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,depthWrite:!1,vertexShader:D,fragmentShader:E,uniforms:{uTime:{value:0},uScroll:{value:0},uPointer:{value:new C(0,0)},uAccent:{value:new x("#62d9ff")},uSecondary:{value:new x("#9b8cff")}}})]})}function _({activeSection:a,reducedMotion:r}){return e.jsxs(e.Fragment,{children:[e.jsx("color",{attach:"background",args:["#05070d"]}),e.jsx("ambientLight",{intensity:.24}),e.jsx("pointLight",{position:[2.4,2.2,2.8],intensity:.8,color:"#62d9ff"}),e.jsx(R,{reducedMotion:r}),e.jsx(A,{reducedMotion:r,activeSection:a}),e.jsx(P,{all:!0})]})}function N({activeSection:a,reducedMotion:r}){return e.jsx("div",{className:"cyberworld","aria-hidden":"true",children:e.jsx(M,{dpr:[1,window.innerWidth<760?1.2:1.7],camera:{position:[0,0,4.5],fov:44},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},children:e.jsx(n.Suspense,{fallback:null,children:e.jsx(_,{activeSection:a,reducedMotion:r})})})})}export{N as CyberWorld};
