function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/FirstScreen-BvE5AoMA.js","assets/index-Dr9ZTIop.js","assets/index-BwDfgAyj.css","assets/Input-CHfh9ry9.js","assets/LittleHeader-XNWv_M-9.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{aM as f,aN as x,Z as d,r as o,aO as j,aP as S,j as e,aQ as h,O as m}from"./index-Dr9ZTIop.js";const _=f.lazy(()=>x(()=>import("./FirstScreen-BvE5AoMA.js"),__vite__mapDeps([0,1,2,3,4]))),E=()=>{var l;const r=d(a=>a.userStatus),[n,u]=o.useState({}),c=d(a=>a.user);return o.useEffect(()=>{let a=setTimeout(()=>{if(r==="school-admin")return j(c.id).then(t=>{var s,i;if(t.status===200)return u(t.data);if(((s=t==null?void 0:t.response)==null?void 0:s.status)===404)return u((i=t==null?void 0:t.response)==null?void 0:i.status)});if(r==="school-teacher")return S(c.id).then(t=>{var s,i;if(t.status===200)return u(t.data);if(((s=t==null?void 0:t.response)==null?void 0:s.status)===404)return u((i=t==null?void 0:t.response)==null?void 0:i.status)});clearTimeout(a)},1e3)},[]),e.jsx("div",{children:((l=Object.keys(n))==null?void 0:l.length)===0?e.jsx(h,{}):e.jsx("div",{children:n!=null&&n.started?e.jsx("div",{children:e.jsx(m,{})}):e.jsx(o.Suspense,{fallback:e.jsx(h,{}),children:e.jsx(_,{})})})})};export{E as default};
