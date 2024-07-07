import{r as b,o as v,a as he,b as Ee,j as C}from"./app-90e89022.js";import{l as be}from"./logo-1a4f8099.js";/* empty css            */function pe(e){var t,s,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(s=pe(e[t]))&&(o&&(o+=" "),o+=s)}else for(s in e)e[s]&&(o&&(o+=" "),o+=s);return o}function F(){for(var e,t,s=0,o="",a=arguments.length;s<a;s++)(e=arguments[s])&&(t=pe(e))&&(o&&(o+=" "),o+=t);return o}const K=e=>typeof e=="number"&&!isNaN(e),Y=e=>typeof e=="string",k=e=>typeof e=="function",se=e=>Y(e)||k(e)?e:null,le=e=>b.isValidElement(e)||Y(e)||k(e)||K(e);function Te(e,t,s){s===void 0&&(s=300);const{scrollHeight:o,style:a}=e;requestAnimationFrame(()=>{a.minHeight="initial",a.height=o+"px",a.transition=`all ${s}ms`,requestAnimationFrame(()=>{a.height="0",a.padding="0",a.margin="0",setTimeout(t,s)})})}function ae(e){let{enter:t,exit:s,appendPosition:o=!1,collapse:a=!0,collapseDuration:d=300}=e;return function(n){let{children:h,position:l,preventExitTransition:I,done:p,nodeRef:_,isIn:x,playToast:L}=n;const f=o?`${t}--${l}`:t,u=o?`${s}--${l}`:s,T=b.useRef(0);return b.useLayoutEffect(()=>{const m=_.current,c=f.split(" "),r=g=>{g.target===_.current&&(L(),m.removeEventListener("animationend",r),m.removeEventListener("animationcancel",r),T.current===0&&g.type!=="animationcancel"&&m.classList.remove(...c))};m.classList.add(...c),m.addEventListener("animationend",r),m.addEventListener("animationcancel",r)},[]),b.useEffect(()=>{const m=_.current,c=()=>{m.removeEventListener("animationend",c),a?Te(m,p,d):p()};x||(I?c():(T.current=1,m.className+=` ${u}`,m.addEventListener("animationend",c)))},[x]),v.createElement(v.Fragment,null,h)}}function de(e,t){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const w=new Map;let Z=[];const ce=new Set,xe=e=>ce.forEach(t=>t(e)),me=()=>w.size>0;function fe(e,t){var s;if(t)return!((s=w.get(t))==null||!s.isToastActive(e));let o=!1;return w.forEach(a=>{a.isToastActive(e)&&(o=!0)}),o}function ge(e,t){le(e)&&(me()||Z.push({content:e,options:t}),w.forEach(s=>{s.buildToast(e,t)}))}function ue(e,t){w.forEach(s=>{t!=null&&t!=null&&t.containerId?(t==null?void 0:t.containerId)===s.id&&s.toggle(e,t==null?void 0:t.id):s.toggle(e,t==null?void 0:t.id)})}function Ie(e){const{subscribe:t,getSnapshot:s,setProps:o}=b.useRef(function(d){const n=d.containerId||1;return{subscribe(h){const l=function(p,_,x){let L=1,f=0,u=[],T=[],m=[],c=_;const r=new Map,g=new Set,A=()=>{m=Array.from(r.values()),g.forEach(i=>i())},R=i=>{T=i==null?[]:T.filter(E=>E!==i),A()},N=i=>{const{toastId:E,onOpen:$,updateId:B,children:S}=i.props,q=B==null;i.staleId&&r.delete(i.staleId),r.set(E,i),T=[...T,i.props.toastId].filter(z=>z!==i.staleId),A(),x(de(i,q?"added":"updated")),q&&k($)&&$(b.isValidElement(S)&&S.props)};return{id:p,props:c,observe:i=>(g.add(i),()=>g.delete(i)),toggle:(i,E)=>{r.forEach($=>{E!=null&&E!==$.props.toastId||k($.toggle)&&$.toggle(i)})},removeToast:R,toasts:r,clearQueue:()=>{f-=u.length,u=[]},buildToast:(i,E)=>{if((M=>{let{containerId:P,toastId:j,updateId:D}=M;const V=P?P!==p:p!==1,G=r.has(j)&&D==null;return V||G})(E))return;const{toastId:$,updateId:B,data:S,staleId:q,delay:z}=E,Q=()=>{R($)},ee=B==null;ee&&f++;const O={...c,style:c.toastStyle,key:L++,...Object.fromEntries(Object.entries(E).filter(M=>{let[P,j]=M;return j!=null})),toastId:$,updateId:B,data:S,closeToast:Q,isIn:!1,className:se(E.className||c.toastClassName),bodyClassName:se(E.bodyClassName||c.bodyClassName),progressClassName:se(E.progressClassName||c.progressClassName),autoClose:!E.isLoading&&(H=E.autoClose,W=c.autoClose,H===!1||K(H)&&H>0?H:W),deleteToast(){const M=r.get($),{onClose:P,children:j}=M.props;k(P)&&P(b.isValidElement(j)&&j.props),x(de(M,"removed")),r.delete($),f--,f<0&&(f=0),u.length>0?N(u.shift()):A()}};var H,W;O.closeButton=c.closeButton,E.closeButton===!1||le(E.closeButton)?O.closeButton=E.closeButton:E.closeButton===!0&&(O.closeButton=!le(c.closeButton)||c.closeButton);let U=i;b.isValidElement(i)&&!Y(i.type)?U=b.cloneElement(i,{closeToast:Q,toastProps:O,data:S}):k(i)&&(U=i({closeToast:Q,toastProps:O,data:S}));const X={content:U,props:O,staleId:q};c.limit&&c.limit>0&&f>c.limit&&ee?u.push(X):K(z)?setTimeout(()=>{N(X)},z):N(X)},setProps(i){c=i},setToggle:(i,E)=>{r.get(i).toggle=E},isToastActive:i=>T.some(E=>E===i),getSnapshot:()=>c.newestOnTop?m.reverse():m}}(n,d,xe);w.set(n,l);const I=l.observe(h);return Z.forEach(p=>ge(p.content,p.options)),Z=[],()=>{I(),w.delete(n)}},setProps(h){var l;(l=w.get(n))==null||l.setProps(h)},getSnapshot(){var h;return(h=w.get(n))==null?void 0:h.getSnapshot()}}}(e)).current;o(e);const a=b.useSyncExternalStore(t,s,s);return{getToastToRender:function(d){if(!a)return[];const n=new Map;return a.forEach(h=>{const{position:l}=h.props;n.has(l)||n.set(l,[]),n.get(l).push(h)}),Array.from(n,h=>d(h[0],h[1]))},isToastActive:fe,count:a==null?void 0:a.length}}function _e(e){const[t,s]=b.useState(!1),[o,a]=b.useState(!1),d=b.useRef(null),n=b.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:h,pauseOnHover:l,closeToast:I,onClick:p,closeOnClick:_}=e;var x,L;function f(){s(!0)}function u(){s(!1)}function T(r){const g=d.current;n.canDrag&&g&&(n.didMove=!0,t&&u(),n.delta=e.draggableDirection==="x"?r.clientX-n.start:r.clientY-n.start,n.start!==r.clientX&&(n.canCloseOnClick=!1),g.style.transform=`translate3d(${e.draggableDirection==="x"?`${n.delta}px, var(--y)`:`0, calc(${n.delta}px + var(--y))`},0)`,g.style.opacity=""+(1-Math.abs(n.delta/n.removalDistance)))}function m(){document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",m);const r=d.current;if(n.canDrag&&n.didMove&&r){if(n.canDrag=!1,Math.abs(n.delta)>n.removalDistance)return a(!0),e.closeToast(),void e.collapseAll();r.style.transition="transform 0.2s, opacity 0.2s",r.style.removeProperty("transform"),r.style.removeProperty("opacity")}}(L=w.get((x={id:e.toastId,containerId:e.containerId,fn:s}).containerId||1))==null||L.setToggle(x.id,x.fn),b.useEffect(()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||u(),window.addEventListener("focus",f),window.addEventListener("blur",u),()=>{window.removeEventListener("focus",f),window.removeEventListener("blur",u)}},[e.pauseOnFocusLoss]);const c={onPointerDown:function(r){if(e.draggable===!0||e.draggable===r.pointerType){n.didMove=!1,document.addEventListener("pointermove",T),document.addEventListener("pointerup",m);const g=d.current;n.canCloseOnClick=!0,n.canDrag=!0,g.style.transition="none",e.draggableDirection==="x"?(n.start=r.clientX,n.removalDistance=g.offsetWidth*(e.draggablePercent/100)):(n.start=r.clientY,n.removalDistance=g.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(r){const{top:g,bottom:A,left:R,right:N}=d.current.getBoundingClientRect();r.nativeEvent.type!=="touchend"&&e.pauseOnHover&&r.clientX>=R&&r.clientX<=N&&r.clientY>=g&&r.clientY<=A?u():f()}};return h&&l&&(c.onMouseEnter=u,e.stacked||(c.onMouseLeave=f)),_&&(c.onClick=r=>{p&&p(r),n.canCloseOnClick&&I()}),{playToast:f,pauseToast:u,isRunning:t,preventExitTransition:o,toastRef:d,eventHandlers:c}}function Ce(e){let{delay:t,isRunning:s,closeToast:o,type:a="default",hide:d,className:n,style:h,controlledProgress:l,progress:I,rtl:p,isIn:_,theme:x}=e;const L=d||l&&I===0,f={...h,animationDuration:`${t}ms`,animationPlayState:s?"running":"paused"};l&&(f.transform=`scaleX(${I})`);const u=F("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${x}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":p}),T=k(n)?n({rtl:p,type:a,defaultClassName:u}):F(u,n),m={[l&&I>=1?"onTransitionEnd":"onAnimationEnd"]:l&&I<1?null:()=>{_&&o()}};return v.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":L},v.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${x} Toastify__progress-bar--${a}`}),v.createElement("div",{role:"progressbar","aria-hidden":L?"true":"false","aria-label":"notification timer",className:T,style:f,...m}))}let Ne=1;const ye=()=>""+Ne++;function Le(e){return e&&(Y(e.toastId)||K(e.toastId))?e.toastId:ye()}function J(e,t){return ge(e,t),t.toastId}function oe(e,t){return{...t,type:t&&t.type||e,toastId:Le(t)}}function te(e){return(t,s)=>J(t,oe(e,s))}function y(e,t){return J(e,oe("default",t))}y.loading=(e,t)=>J(e,oe("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),y.promise=function(e,t,s){let o,{pending:a,error:d,success:n}=t;a&&(o=Y(a)?y.loading(a,s):y.loading(a.render,{...s,...a}));const h={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(p,_,x)=>{if(_==null)return void y.dismiss(o);const L={type:p,...h,...s,data:x},f=Y(_)?{render:_}:_;return o?y.update(o,{...L,...f}):y(f.render,{...L,...f}),x},I=k(e)?e():e;return I.then(p=>l("success",n,p)).catch(p=>l("error",d,p)),I},y.success=te("success"),y.info=te("info"),y.error=te("error"),y.warning=te("warning"),y.warn=y.warning,y.dark=(e,t)=>J(e,oe("default",{theme:"dark",...t})),y.dismiss=function(e){(function(t){var s;if(me()){if(t==null||Y(s=t)||K(s))w.forEach(o=>{o.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){const o=w.get(t.containerId);o?o.removeToast(t.id):w.forEach(a=>{a.removeToast(t.id)})}}else Z=Z.filter(o=>t!=null&&o.options.toastId!==t)})(e)},y.clearWaitingQueue=function(e){e===void 0&&(e={}),w.forEach(t=>{!t.props.limit||e.containerId&&t.id!==e.containerId||t.clearQueue()})},y.isActive=fe,y.update=function(e,t){t===void 0&&(t={});const s=((o,a)=>{var d;let{containerId:n}=a;return(d=w.get(n||1))==null?void 0:d.toasts.get(o)})(e,t);if(s){const{props:o,content:a}=s,d={delay:100,...o,...t,toastId:t.toastId||e,updateId:ye()};d.toastId!==e&&(d.staleId=e);const n=d.render||a;delete d.render,J(n,d)}},y.done=e=>{y.update(e,{progress:1})},y.onChange=function(e){return ce.add(e),()=>{ce.delete(e)}},y.play=e=>ue(!0,e),y.pause=e=>ue(!1,e);const we=typeof window<"u"?b.useLayoutEffect:b.useEffect,ne=e=>{let{theme:t,type:s,isLoading:o,...a}=e;return v.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${s})`,...a})},ie={info:function(e){return v.createElement(ne,{...e},v.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return v.createElement(ne,{...e},v.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return v.createElement(ne,{...e},v.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return v.createElement(ne,{...e},v.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return v.createElement("div",{className:"Toastify__spinner"})}},$e=e=>{const{isRunning:t,preventExitTransition:s,toastRef:o,eventHandlers:a,playToast:d}=_e(e),{closeButton:n,children:h,autoClose:l,onClick:I,type:p,hideProgressBar:_,closeToast:x,transition:L,position:f,className:u,style:T,bodyClassName:m,bodyStyle:c,progressClassName:r,progressStyle:g,updateId:A,role:R,progress:N,rtl:i,toastId:E,deleteToast:$,isIn:B,isLoading:S,closeOnClick:q,theme:z}=e,Q=F("Toastify__toast",`Toastify__toast-theme--${z}`,`Toastify__toast--${p}`,{"Toastify__toast--rtl":i},{"Toastify__toast--close-on-click":q}),ee=k(u)?u({rtl:i,position:f,type:p,defaultClassName:Q}):F(Q,u),O=function(X){let{theme:M,type:P,isLoading:j,icon:D}=X,V=null;const G={theme:M,type:P};return D===!1||(k(D)?V=D({...G,isLoading:j}):b.isValidElement(D)?V=b.cloneElement(D,G):j?V=ie.spinner():(ve=>ve in ie)(P)&&(V=ie[P](G))),V}(e),H=!!N||!l,W={closeToast:x,type:p,theme:z};let U=null;return n===!1||(U=k(n)?n(W):b.isValidElement(n)?b.cloneElement(n,W):function(X){let{closeToast:M,theme:P,ariaLabel:j="close"}=X;return v.createElement("button",{className:`Toastify__close-button Toastify__close-button--${P}`,type:"button",onClick:D=>{D.stopPropagation(),M(D)},"aria-label":j},v.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},v.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(W)),v.createElement(L,{isIn:B,done:$,position:f,preventExitTransition:s,nodeRef:o,playToast:d},v.createElement("div",{id:E,onClick:I,"data-in":B,className:ee,...a,style:T,ref:o},v.createElement("div",{...B&&{role:R},className:k(m)?m({type:p}):F("Toastify__toast-body",m),style:c},O!=null&&v.createElement("div",{className:F("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!S})},O),v.createElement("div",null,h)),U,v.createElement(Ce,{...A&&!H?{key:`pb-${A}`}:{},rtl:i,theme:z,delay:l,isRunning:t,isIn:B,closeToast:x,hide:_,type:p,style:g,className:r,controlledProgress:H,progress:N||0})))},re=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},ke=ae(re("bounce",!0));ae(re("slide",!0));ae(re("zoom"));ae(re("flip"));const Pe={position:"top-right",transition:ke,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function je(e){let t={...Pe,...e};const s=e.stacked,[o,a]=b.useState(!0),d=b.useRef(null),{getToastToRender:n,isToastActive:h,count:l}=Ie(t),{className:I,style:p,rtl:_,containerId:x}=t;function L(u){const T=F("Toastify__toast-container",`Toastify__toast-container--${u}`,{"Toastify__toast-container--rtl":_});return k(I)?I({position:u,rtl:_,defaultClassName:T}):F(T,se(I))}function f(){s&&(a(!0),y.play())}return we(()=>{if(s){var u;const T=d.current.querySelectorAll('[data-in="true"]'),m=12,c=(u=t.position)==null?void 0:u.includes("top");let r=0,g=0;Array.from(T).reverse().forEach((A,R)=>{const N=A;N.classList.add("Toastify__toast--stacked"),R>0&&(N.dataset.collapsed=`${o}`),N.dataset.pos||(N.dataset.pos=c?"top":"bot");const i=r*(o?.2:1)+(o?0:m*R);N.style.setProperty("--y",`${c?i:-1*i}px`),N.style.setProperty("--g",`${m}`),N.style.setProperty("--s",""+(1-(o?g:0))),r+=N.offsetHeight,g+=.025})}},[o,l,s]),v.createElement("div",{ref:d,className:"Toastify",id:x,onMouseEnter:()=>{s&&(a(!1),y.pause())},onMouseLeave:f},n((u,T)=>{const m=T.length?{...p}:{...p,pointerEvents:"none"};return v.createElement("div",{className:L(u),style:m,key:`container-${u}`},T.map(c=>{let{content:r,props:g}=c;return v.createElement($e,{...g,stacked:s,collapseAll:f,isIn:h(g.toastId,g.containerId),style:g.style,key:`toast-${g.key}`},r)}))}))}const Re=()=>{const{data:e,setData:t,post:s,processing:o,errors:a}=he({email:"john.doe@example.com",password:"password123"}),{props:d}=Ee(),{flash:n}=d;b.useEffect(()=>{n.success&&y.success(n.success),n.error&&y.error(n.error)},[n]);const h=l=>{l.preventDefault(),s("/login")};return C.jsxs("div",{children:[C.jsx(je,{}),C.jsx("div",{className:"flex items-center justify-center min-h-screen",children:C.jsxs("div",{className:"max-w-md mx-auto bg-white p-8 rounded-lg shadow-md",children:[C.jsx("div",{className:"flex justify-center mb-4 mt-8",children:C.jsx("img",{src:be,alt:"Logo",className:"h-8"})}),C.jsx("h2",{className:"text-2xl font-bold text-center mb-6",children:"Login to Your Account"}),C.jsxs("form",{onSubmit:h,children:[C.jsxs("div",{className:"mb-4",children:[C.jsx("input",{type:"email",placeholder:"Email",value:e.email,onChange:l=>t("email",l.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),a.email&&C.jsx("div",{className:"text-red-500 mt-2",children:a.email})]}),C.jsxs("div",{className:"mb-4",children:[C.jsx("input",{type:"password",placeholder:"Password",value:e.password,onChange:l=>t("password",l.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),a.password&&C.jsx("div",{className:"text-red-500 mt-2",children:a.password})]}),C.jsx("div",{className:"flex items-center justify-between",children:C.jsx("button",{type:"submit",disabled:o,className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600",children:"Login"})})]}),C.jsxs("div",{className:"mt-8 text-center",children:[C.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"Don't have an account? "}),C.jsx("a",{href:route("app.register"),className:"text-blue-600 dark:text-blue-400 hover:underline",children:"Register here"})]})]})})]})};export{Re as default};
