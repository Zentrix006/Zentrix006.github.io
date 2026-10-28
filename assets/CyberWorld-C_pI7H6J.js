import{r as i,u as A,a as C,j as e,F as E,M as F,C as _,P as R}from"./r3f-DLOtrVii.js";import{c as S,j as M,k as B,F as D,d as k}from"./three-DJnUZRW9.js";const P={home:{x:.55,y:.05,z:-.8,scale:1,color:"#62d9ff"},research:{x:-1.05,y:.12,z:-.45,scale:1.28,color:"#a99bff"},lab:{x:.72,y:-.12,z:-.2,scale:1.12,color:"#f0bd70"},about:{x:-.65,y:.05,z:-.65,scale:.96,color:"#7ce6d0"},terminal:{x:.78,y:.18,z:-.2,scale:1.08,color:"#a99bff"},contact:{x:0,y:.05,z:-.55,scale:.92,color:"#62d9ff"}},I={research:-.36,lab:.34,about:-.3,terminal:.3},b=[[0,.68,.08],[.47,.43,.22],[.66,.04,.16],[.47,-.43,.22],[0,-.68,.08],[-.47,-.43,.22],[-.66,.04,.16],[-.47,.43,.22],[0,.02,.68]],N=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8],[1,7],[3,5]];function O({reducedMotion:c,activeSection:r}){const t=i.useRef(),f=i.useRef(),m=i.useRef(),{viewport:x}=A(),s=P[r]||P.home,u=i.useMemo(()=>new S(x.width<5?I[r]??0:s.x,s.y,s.z),[r,s,x.width]),a=i.useMemo(()=>new M(s.color),[s.color]),j=i.useMemo(()=>{const o=[];N.forEach(([p,h])=>{const l=new S(...b[p]).normalize(),y=new S(...b[h]).normalize(),d=l.angleTo(y),v=Math.sin(d),w=Array.from({length:9},(g,T)=>{const z=T/8;return l.clone().multiplyScalar(Math.sin((1-z)*d)/v).add(y.clone().multiplyScalar(Math.sin(z*d)/v)).multiplyScalar(.655)});for(let g=0;g<w.length-1;g+=1)o.push(...w[g].toArray(),...w[g+1].toArray())});const n=new B;return n.setAttribute("position",new D(o,3)),n},[]);return C(({clock:o,pointer:n})=>{var p,h,l,y,d,v;if(t.current){if(c){t.current.position.copy(u),t.current.scale.setScalar(s.scale),(p=f.current)==null||p.color.copy(a),(h=f.current)==null||h.emissive.copy(a),(l=m.current)==null||l.color.copy(a);return}t.current.rotation.y=o.elapsedTime*.09+n.x*.07,t.current.rotation.x=Math.sin(o.elapsedTime*.14)*.055+n.y*.045,t.current.position.lerp(u,.035),t.current.scale.setScalar(t.current.scale.x+(s.scale-t.current.scale.x)*.035),(y=f.current)==null||y.color.lerp(a,.035),(d=f.current)==null||d.emissive.lerp(a,.035),(v=m.current)==null||v.color.lerp(a,.035)}}),e.jsx(E,{speed:c?0:.7,rotationIntensity:.08,floatIntensity:.12,children:e.jsxs("group",{ref:t,position:[.55,.05,-.8],children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[.62,36,28]}),e.jsx(F,{ref:f,color:"#091720",emissive:"#163744",emissiveIntensity:.18,roughness:.42,metalness:.12,distort:c?0:.035,speed:.22})]}),e.jsx("lineSegments",{geometry:j,children:e.jsx("lineBasicMaterial",{ref:m,color:"#62d9ff",transparent:!0,opacity:.34,depthWrite:!1})}),b.map((o,n)=>e.jsxs("mesh",{position:o,scale:n===8?1.3:1,children:[e.jsx("sphereGeometry",{args:[.024,12,10]}),e.jsx("meshBasicMaterial",{color:n===8?"#c5f4ff":"#62d9ff",toneMapped:!1})]},n))]})})}const G=`
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
`,L=`
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
`;function V({reducedMotion:c}){const r=i.useRef(),t=i.useRef(),{viewport:f}=A(),m=f.width<6?28:72,x=i.useMemo(()=>{const s=[],u=[];for(let o=0;o<m;o+=1){const n=1-2*((o+.5)/m),p=Math.sqrt(1-n*n),h=o*2.399963,l=1.25+o%3*.38;s.push(Math.cos(h)*p*l,n*l*.62,Math.sin(h)*p*l),u.push(.014+o%3*.002)}const a=new Float32Array(s),j=new Float32Array(u);return{buffer:a,sizeBuffer:j}},[m]);return C(({clock:s,pointer:u})=>{if(!r.current||c)return;const a=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);r.current.uniforms.uTime.value=s.elapsedTime,r.current.uniforms.uScroll.value=window.scrollY/a,r.current.uniforms.uPointer.value.set(u.x,u.y),t.current&&(t.current.rotation.y+=8e-4)}),e.jsxs("points",{ref:t,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[x.buffer,3]}),e.jsx("bufferAttribute",{attach:"attributes-aSize",args:[x.sizeBuffer,1]})]}),e.jsx("shaderMaterial",{ref:r,transparent:!0,depthWrite:!1,vertexShader:G,fragmentShader:L,uniforms:{uTime:{value:0},uScroll:{value:0},uPointer:{value:new k(0,0)},uAccent:{value:new M("#62d9ff")},uSecondary:{value:new M("#49677a")}}})]})}function W({activeSection:c,reducedMotion:r}){return e.jsxs(e.Fragment,{children:[e.jsx("color",{attach:"background",args:["#05070d"]}),e.jsx("ambientLight",{intensity:.24}),e.jsx("pointLight",{position:[2.4,2.2,2.8],intensity:.8,color:"#62d9ff"}),e.jsx(V,{reducedMotion:r}),e.jsx(O,{reducedMotion:r,activeSection:c}),e.jsx(R,{all:!0})]})}function K({activeSection:c,reducedMotion:r}){return e.jsx("div",{className:"cyberworld","aria-hidden":"true",children:e.jsx(_,{dpr:[1,window.innerWidth<760?1.2:1.7],camera:{position:[0,0,4.5],fov:44},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},children:e.jsx(i.Suspense,{fallback:null,children:e.jsx(W,{activeSection:c,reducedMotion:r})})})})}export{K as CyberWorld};
