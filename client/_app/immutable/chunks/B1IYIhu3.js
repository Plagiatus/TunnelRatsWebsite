var bn=Array.isArray,zt=Array.prototype.indexOf,Fn=Array.from,qn=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,Mn=Object.prototype,Ln=Array.prototype,Xt=Object.getPrototypeOf;const Yn=()=>{};function jn(t){return t()}function Jt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,wt=4,J=8,ot=16,x=32,j=64,$=128,m=256,G=512,p=1024,D=2048,F=4096,P=8192,Q=16384,Qt=32768,mt=65536,Hn=1<<17,tn=1<<19,gt=1<<20,pt=Symbol("$state"),Un=Symbol("legacy props");function Tt(t){return t===this.v}function nn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function At(t){return!nn(t,this.v)}function rn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function en(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function ln(t){throw new Error("https://svelte.dev/e/effect_orphan")}function sn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Bn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Vn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function $n(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Gn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function un(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let tt=!1;function Kn(){tt=!0}const Zn=1,zn=2,Wn=16,Xn=1,Jn=2,Qn=4,tr=8,nr=16,rr=1,er=2,on="[",fn="[!",_n="]",Rt={},lr=Symbol();function xt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let i=null;function ht(t){i=t}function sr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},tt&&!n&&(i.l={s:null,u:null,r1:[],r2:ft(!1)})}function ar(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=f,e=u;n.e=null;try{for(var l=0;l<a.length;l++){var s=a[l];z(s.effect),Z(s.reaction),Pt(s.fn)}}finally{z(r),Z(e)}}i=n.p,n.m=!0}return{}}function nt(){return!tt||i!==null&&i.l===null}function ft(t,n){var r={f:0,v:t,reactions:null,equals:Tt,rv:0,wv:0};return r}function ur(t){return cn(ft(t))}function or(t,n=!1){var e;const r=ft(t);return n||(r.equals=At),tt&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function cn(t){return u!==null&&!T&&u.f&y&&(w===null?xn([t]):w.push(t)),t}function fr(t,n){return u!==null&&!T&&nt()&&u.f&(y|ot)&&(w===null||!w.includes(t))&&un(),vn(t,n)}function vn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Ut(),Dt(t,D),nt()&&f!==null&&f.f&p&&!(f.f&(x|j))&&(g===null?Dn([t]):g.push(t))),n}function Dt(t,n){var r=t.reactions;if(r!==null)for(var e=nt(),l=r.length,s=0;s<l;s++){var a=r[s],_=a.f;_&D||!e&&a===f||(R(a,n),_&(p|m)&&(_&y?Dt(a,F):et(a)))}}let b=!1;function ir(t){b=t}let A;function M(t){if(t===null)throw xt(),Rt;return A=t}function _r(){return M(q(A))}function cr(t){if(b){if(q(A)!==null)throw xt(),Rt;A=t}}function vr(){for(var t=0,n=A;;){if(n.nodeType===8){var r=n.data;if(r===_n){if(t===0)return n;t-=1}else(r===on||r===fn)&&(t+=1)}var e=q(n);n.remove(),n=e}}var dt,pn,kt,St;function pr(){if(dt===void 0){dt=window,pn=document;var t=Element.prototype,n=Node.prototype;kt=vt(n,"firstChild").get,St=vt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function lt(t=""){return document.createTextNode(t)}function st(t){return kt.call(t)}function q(t){return St.call(t)}function hr(t,n){if(!b)return st(t);var r=st(A);if(r===null)r=A.appendChild(lt());else if(n&&r.nodeType!==3){var e=lt();return r==null||r.before(e),M(e),e}return M(r),r}function dr(t,n){if(!b){var r=st(t);return r instanceof Comment&&r.data===""?q(r):r}return A}function Er(t,n=1,r=!1){let e=b?A:t;for(var l;n--;)l=e,e=q(e);if(!b)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var a=lt();return e===null?l==null||l.after(a):e.before(a),M(a),a}return M(e),e}function yr(t){t.textContent=""}function It(t){var n=y|D,r=u!==null&&u.f&y?u:null;return f===null||r!==null&&r.f&m?n|=m:f.f|=gt,{ctx:i,deps:null,effects:null,equals:Tt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??f}}function wr(t){const n=It(t);return n.equals=At,n}function Ot(t){var n=t.effects;if(n!==null){t.effects=null;for(var r=0;r<n.length;r+=1)I(n[r])}}function hn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function dn(t){var n,r=f;z(hn(t));try{Ot(t),n=Vt(t)}finally{z(r)}return n}function Nt(t){var n=dn(t),r=(S||t.f&m)&&t.deps!==null?F:p;R(t,r),t.equals(n)||(t.v=n,t.wv=Ut())}function Ct(t){f===null&&u===null&&ln(),u!==null&&u.f&m&&f===null&&en(),it&&rn()}function En(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function H(t,n,r,e=!0){var l=(t&j)!==0,s=f,a={ctx:i,deps:null,nodes_start:null,nodes_end:null,f:t|D,first:null,fn:n,last:null,next:null,parent:l?null:s,prev:null,teardown:null,transitions:null,wv:0};if(r){var _=N;try{Et(!0),_t(a),a.f|=Qt}catch(O){throw I(a),O}finally{Et(_)}}else n!==null&&et(a);var E=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(gt|$))===0;if(!E&&!l&&e&&(s!==null&&En(a,s),u!==null&&u.f&y)){var c=u;(c.effects??(c.effects=[])).push(a)}return a}function mr(t){Ct();var n=f!==null&&(f.f&x)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:f,reaction:u})}else{var e=Pt(t);return e}}function gr(t){return Ct(),yn(t)}function Tr(t){const n=H(j,t,!0);return(r={})=>new Promise(e=>{r.outro?gn(n,()=>{I(n),e(void 0)}):(I(n),e(void 0))})}function Pt(t){return H(wt,t,!1)}function yn(t){return H(J,t,!0)}function Ar(t,n=[],r=It){const e=n.map(r);return wn(()=>t(...e.map(Cn)))}function wn(t,n=0){return H(J|ot|n,t,!0)}function Rr(t,n=!0){return H(J|x,t,!0,n)}function bt(t){var n=t.teardown;if(n!==null){const r=it,e=u;yt(!0),Z(null);try{n.call(null)}finally{yt(r),Z(e)}}}function Ft(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;I(r,n),r=e}}function mn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&x||I(n),n=r}}function I(t,n=!0){var r=!1;if((n||t.f&tn)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var s=e===l?null:q(e);e.remove(),e=s}r=!0}Ft(t,n&&!r),X(t,0),R(t,Q);var a=t.transitions;if(a!==null)for(const E of a)E.stop();bt(t);var _=t.parent;_!==null&&_.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function gn(t,n){var r=[];Mt(t,r,!0),Tn(r,()=>{I(t),n&&n()})}function Tn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function Mt(t,n,r){if(!(t.f&P)){if(t.f^=P,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var l=e.next,s=(e.f&mt)!==0||(e.f&x)!==0;Mt(e,n,s?r:!1),e=l}}}function xr(t){Lt(t,!0)}function Lt(t,n){if(t.f&P){t.f^=P,t.f&p||(t.f^=p),U(t)&&(R(t,D),et(t));for(var r=t.first;r!==null;){var e=r.next,l=(r.f&mt)!==0||(r.f&x)!==0;Lt(r,l?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}let K=!1,at=[];function Yt(){K=!1;const t=at.slice();at=[],Jt(t)}function Dr(t){K||(K=!0,queueMicrotask(Yt)),at.push(t)}function An(){K&&Yt()}const jt=0,Rn=1;let B=!1,V=jt,L=!1,Y=null,N=!1,it=!1;function Et(t){N=t}function yt(t){it=t}let k=[],C=0;let u=null,T=!1;function Z(t){u=t}let f=null;function z(t){f=t}let w=null;function xn(t){w=t}let v=null,d=0,g=null;function Dn(t){g=t}let Ht=1,W=0,S=!1;function Ut(){return++Ht}function U(t){var c;var n=t.f;if(n&D)return!0;if(n&F){var r=t.deps,e=(n&m)!==0;if(r!==null){var l,s,a=(n&G)!==0,_=e&&f!==null&&!S,E=r.length;if(a||_){for(l=0;l<E;l++)s=r[l],(a||!((c=s==null?void 0:s.reactions)!=null&&c.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);a&&(t.f^=G)}for(l=0;l<E;l++)if(s=r[l],U(s)&&Nt(s),s.wv>t.wv)return!0}(!e||f!==null&&!S)&&R(t,p)}return!1}function kn(t,n){for(var r=n;r!==null;){if(r.f&$)try{r.fn(t);return}catch{r.f^=$}r=r.parent}throw B=!1,t}function Sn(t){return(t.f&Q)===0&&(t.parent===null||(t.parent.f&$)===0)}function rt(t,n,r,e){if(B){if(r===null&&(B=!1),Sn(n))throw t;return}r!==null&&(B=!0);{kn(t,n);return}}function Bt(t,n,r=0){var e=t.reactions;if(e!==null)for(var l=0;l<e.length;l++){var s=e[l];s.f&y?Bt(s,n,r+1):n===s&&(r===0?R(s,D):s.f&p&&R(s,F),et(s))}}function Vt(t){var ct;var n=v,r=d,e=g,l=u,s=S,a=w,_=i,E=T,c=t.f;v=null,d=0,g=null,u=c&(x|j)?null:t,S=(c&m)!==0&&(!N||(l===null||E)&&t.parent!==null),w=null,ht(t.ctx),T=!1,W++;try{var O=(0,t.fn)(),h=t.deps;if(v!==null){var o;if(X(t,d),h!==null&&d>0)for(h.length=d+v.length,o=0;o<v.length;o++)h[d+o]=v[o];else t.deps=h=v;if(!S)for(o=d;o<h.length;o++)((ct=h[o]).reactions??(ct.reactions=[])).push(t)}else h!==null&&d<h.length&&(X(t,d),h.length=d);if(nt()&&g!==null&&!(t.f&(y|F|D)))for(o=0;o<g.length;o++)Bt(g[o],t);return l!==null&&W++,O}finally{v=n,d=r,g=e,u=l,S=s,w=a,ht(_),T=E}}function In(t,n){let r=n.reactions;if(r!==null){var e=zt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(R(n,F),n.f&(m|G)||(n.f^=G),Ot(n),X(n,0))}function X(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)In(t,r[e])}function _t(t){var n=t.f;if(!(n&Q)){R(t,p);var r=f,e=i;f=t;try{n&ot?mn(t):Ft(t),bt(t);var l=Vt(t);t.teardown=typeof l=="function"?l:null,t.wv=Ht;var s=t.deps,a}catch(_){rt(_,t,r,e||t.ctx)}finally{f=r}}}function $t(){if(C>1e3){C=0;try{sn()}catch(t){if(Y!==null)rt(t,Y,null);else throw t}}C++}function Gt(t){var n=t.length;if(n!==0){$t();var r=N;N=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&p||(l.f^=p);var s=[];Kt(l,s),On(s)}}finally{N=r}}}function On(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(Q|P)))try{U(e)&&(_t(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?qt(e):e.fn=null))}catch(l){rt(l,e,null,e.ctx)}}}function Nn(){if(L=!1,C>1001)return;const t=k;k=[],Gt(t),L||(C=0,Y=null)}function et(t){V===jt&&(L||(L=!0,queueMicrotask(Nn))),Y=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(j|x)){if(!(r&p))return;n.f^=p}}k.push(n)}function Kt(t,n){var r=t.first,e=[];t:for(;r!==null;){var l=r.f,s=(l&x)!==0,a=s&&(l&p)!==0,_=r.next;if(!a&&!(l&P))if(l&J){if(s)r.f^=p;else{var E=u;try{u=r,U(r)&&_t(r)}catch(o){rt(o,r,null,r.ctx)}finally{u=E}}var c=r.first;if(c!==null){r=c;continue}}else l&wt&&e.push(r);if(_===null){let o=r.parent;for(;o!==null;){if(t===o)break t;var O=o.next;if(O!==null){r=O;continue t}o=o.parent}}r=_}for(var h=0;h<e.length;h++)c=e[h],n.push(c),Kt(c,n)}function Zt(t){var n=V,r=k;try{$t();const l=[];V=Rn,k=l,L=!1,Gt(r);var e=t==null?void 0:t();return An(),(k.length>0||l.length>0)&&Zt(),C=0,Y=null,e}finally{V=n,k=r}}async function kr(){await Promise.resolve(),Zt()}function Cn(t){var n=t.f,r=(n&y)!==0;if(u!==null&&!T){w!==null&&w.includes(t)&&an();var e=u.deps;t.rv<W&&(t.rv=W,v===null&&e!==null&&e[d]===t?d++:v===null?v=[t]:v.push(t))}else if(r&&t.deps===null&&t.effects===null){var l=t,s=l.parent;s!==null&&!(s.f&m)&&(l.f^=m)}return r&&(l=t,U(l)&&Nt(l)),t.v}function Sr(t){var n=T;try{return T=!0,t()}finally{T=n}}const Pn=-7169;function R(t,n){t.f=t.f&Pn|n}function Ir(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(pt in t)ut(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&pt in r&&ut(r)}}}function ut(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ut(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let l in e){const s=e[l].get;if(s)try{s.call(t)}catch{}}}}}export{ar as $,xr as A,gn as B,Pt as C,yn as D,mt as E,Dr as F,qn as G,fn as H,Z as I,z as J,u as K,lt as L,tn as M,on as N,q as O,st as P,pr as Q,Rt as R,pt as S,_n as T,lr as U,xt as V,Bn as W,yr as X,Fn as Y,Tr as Z,sr as _,Rr as a,rr as a0,er as a1,gr as a2,Jt as a3,jn as a4,Ir as a5,It as a6,Kn as a7,Ar as a8,hr as a9,nn as aA,cr as aa,Er as ab,Vn as ac,Hn as ad,Qn as ae,At as af,or as ag,tr as ah,Un as ai,Jn as aj,x as ak,j as al,Xn as am,nr as an,wr as ao,Zt as ap,ur as aq,kr as ar,P as as,vn as at,zn as au,Mt as av,Tn as aw,Zn as ax,Wn as ay,pn as az,wn as b,A as c,I as d,i as e,dr as f,Sr as g,b as h,Ln as i,Gn as j,Cn as k,tt as l,fr as m,Yn as n,Mn as o,vt as p,f as q,$n as r,ft as s,Xt as t,mr as u,bn as v,_r as w,vr as x,M as y,ir as z};
