import{u as x,r as l,j as e}from"./app-b50ddac6.js";import{a as n}from"./axios-21b846bc.js";import{L as h}from"./Layout-29e4172a.js";import{$ as p}from"./module-f3901b7c.js";/* empty css            */import"./logo-1a4f8099.js";const j=({balance:s,user_currency:i})=>{const{darkMode:t}=x(),[r,d]=l.useState(null);return l.useEffect(()=>{const a=()=>{n.get(route("frontend.share-data")).then(o=>{d(o.data.data)})};a();const c=setInterval(a,5e3);return()=>clearInterval(c)},[]),console.log(r),e.jsx(h,{children:e.jsxs("div",{className:"container mx-auto",children:[e.jsxs("div",{className:`p-3 rounded-lg flex justify-between items-center ${t?"bg-gray-900 text-white":"bg-white text-black"}`,children:[e.jsxs("div",{children:[e.jsx("h2",{className:"extra_small",children:"Balance (USDT)"}),e.jsxs("p",{className:"large font-bold",children:["$ ",parseFloat(s).toFixed(3)," "]}),e.jsxs("p",{className:"medium font-bold text-gray-400",children:["≈ ",(parseFloat(s)/i.rate_per_usdt).toFixed(3)," ",i.symbol]})]}),e.jsx("a",{href:route("frontend.trade"),className:`medium px-4 py-1 rounded shadow focus:outline-none ${t?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Trade"})]}),e.jsxs("div",{className:`p-3 rounded-lg mt-4 ${t?"bg-gray-900 text-white":"bg-white text-black"} mb-12`,children:[e.jsx("h2",{className:"extra_small",children:"Stock Market"}),r?e.jsxs("table",{className:`min-w-full divide-y ${t?"divide-gray-700":"divide-gray-200"}`,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:`px-6 py-3 ${t?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Display"}),e.jsx("th",{className:`px-6 py-3 ${t?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Price"}),e.jsx("th",{className:`px-6 py-3 ${t?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Action"})]})}),e.jsx("tbody",{className:`${t?"bg-gray-900 text-white":"bg-white text-black"} divide-y ${t?"divide-gray-700":"divide-gray-200"}`,children:Object.keys(r).map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r[a].display}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r[a].price}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("a",{className:"text-yellow-600 hover:text-white",href:route("frontend.trade",{source:r[a].id,type:"stock"}),children:"Trade"})})]},a))})]}):e.jsx("div",{className:"flex justify-center py-4",children:e.jsx(p,{height:"50",width:"50",color:"#4fa94d",ariaLabel:"circles-loading",wrapperStyle:{},wrapperClass:"",visible:!0})})]})]})})};export{j as default};
