import{u as y,r as n,j as e}from"./app-d00e8af9.js";import{a as u}from"./axios-21b846bc.js";import{L as b}from"./Layout-f8536301.js";import{$ as f}from"./module-26473f43.js";/* empty css            */import"./logo-1a4f8099.js";const T=({balance:d,user_currency:c,user_remark:o,username:x})=>{const{darkMode:a}=y(),[r,p]=n.useState(null);function h(t){return Object.entries(t).sort(([,s],[,l])=>parseFloat(l.price)-parseFloat(s.price)).reduce((s,[l,g])=>({...s,[l]:g}),{})}n.useEffect(()=>{const t=()=>{u.get(route("frontend.crypto-data")).then(s=>{p(h(s.data.data))})};t();const i=setInterval(t,5e3);return()=>clearInterval(i)},[]),console.log(r);const m=t=>({AAVE:"AAVEUSDT",Chainlink:"LINKUSDT",Bitcoin:"BTCUSDT",Ripple:"XRPUSDT",Ethereum:"ETHUSDT",Cardano:"ADAUSDT","DASH (USD)":"DASHUSDT","LITECOIN (USD)":"LTCUSDT"})[t]||t;return e.jsx(b,{children:e.jsxs("div",{className:"container mx-auto",children:[o&&e.jsxs("p",{className:"text-center text-sm font-semibold mb-2",children:["Dear ",x,", ",e.jsx("br",{}),o]}),e.jsxs("div",{className:`p-3 rounded-lg flex justify-between items-center ${a?"bg-gray-900 text-white":"bg-white text-black"}`,children:[e.jsxs("div",{children:[e.jsx("h2",{className:"extra_small",children:"Balance (USDT)"}),e.jsxs("p",{className:"large font-bold",children:["$ ",parseFloat(d).toFixed(3)," "]}),e.jsxs("p",{className:"medium font-bold text-gray-400",children:["≈ ",(parseFloat(d)/c.rate_per_usdt).toFixed(3)," ",c.symbol]})]}),e.jsx("a",{href:route("frontend.deposit"),className:`medium px-4 py-1 rounded shadow focus:outline-none ${a?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Add Funds"})]}),e.jsxs("div",{className:`p-3 rounded-lg mt-4 mb-8 ${a?"bg-gray-900 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"extra_small",children:"Featured CryptoCurrencies"}),r?e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:`min-w-full divide-y ${a?"divide-gray-700":"divide-gray-200"}`,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:`px-6 py-3 ${a?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Crypto"}),e.jsx("th",{className:`px-6 py-3 ${a?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Price"}),e.jsx("th",{className:`px-6 py-3 ${a?"bg-gray-800 text-gray-300":"bg-gray-50 text-gray-500"} text-left text-xs font-medium uppercase tracking-wider`,children:"Action"})]})}),e.jsx("tbody",{className:`${a?"bg-gray-900 text-white":"bg-white text-black"} divide-y ${a?"divide-gray-700":"divide-gray-200"}`,children:Object.keys(r).map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap extra_small",children:m(r[t].display)}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap extra_small",children:r[t].price}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap extra_small",children:e.jsx("a",{className:"text-yellow-600 hover:text-white",href:route("frontend.trade",{source:r[t].id,type:"crypto"}),children:"Trade"})})]},t))})]})}):e.jsx("div",{className:"flex justify-center py-4",children:e.jsx(f,{height:"50",width:"50",color:"#4fa94d",ariaLabel:"circles-loading",wrapperStyle:{},wrapperClass:"",visible:!0})})]})]})})};export{T as default};