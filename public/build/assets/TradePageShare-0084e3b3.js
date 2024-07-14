import{u as y,a as T,r as m,j as e}from"./app-35d349e3.js";import{L as k}from"./Layout-6d4ded94.js";import{a as w}from"./axios-21b846bc.js";/* empty css            */import"./logo-1a4f8099.js";const C=({symbol:o,balance:u,user_currency:i,price_url:d,form_type:x})=>{const{darkMode:c}=y(),{data:a,setData:r,post:h,errors:s}=T({tradeType:x||"long",amount:"",duration:"3",symbol:""}),[n,p]=m.useState(null),b=()=>{switch(o){case"META":return"facebook";case"TSLA":return"tesla";case"GOOG":return"google";case"AAPL":return"apple";case"NVDA":return"nvidia";case"AMZN":return"amzn";case"NFLX":return"netflix";case"ADBE":return"adobe";default:return""}};m.useEffect(()=>{r("symbol",b()),console.log(d);const t=async()=>{try{const l=await w.get(d);p(l.data.data)}catch(l){console.error("Error fetching ticker data:",l)}};t();const N=setInterval(t,3e3);return()=>clearInterval(N)},[o]);const j=t=>{r("tradeType",t.target.value)},g=t=>{r("amount",t.target.value)},v=t=>{r("duration",t.target.value)},f=t=>{t.preventDefault(),h(route("frontend.stock.trade",{data:a}),{onSuccess:()=>{r("amount","")}})};return e.jsx(k,{children:e.jsxs("div",{className:"container mx-auto",children:[e.jsx("div",{className:`p-3 rounded-lg flex justify-between items-center ${c?"bg-gray-900 text-white":"bg-white text-black"}`,children:e.jsxs("div",{children:[e.jsx("h2",{className:"",children:o}),e.jsx("h2",{className:"font-semibold",style:{fontSize:"25pt"},children:n?e.jsx("span",{id:"entry_price",children:parseFloat(n.price).toFixed(4)}):"NA"}),e.jsxs("p",{className:"medium font-bold text-gray-400",children:["≈ ",n?(parseFloat(n.price).toFixed(4)*parseFloat(i.rate_per_usdt)).toFixed(4):"NA"," ",i.symbol]})]})}),e.jsx("div",{className:`p-3 rounded-lg mt-4 ${c?"bg-gray-900 text-white":"bg-white text-black"}`,children:e.jsxs("form",{className:"mt-4",onSubmit:f,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",htmlFor:"tradeType",children:"Type"}),e.jsxs("select",{id:"tradeType",value:a.tradeType,onChange:j,className:"p-2 border rounded w-full",children:[e.jsx("option",{value:"long",children:"Long"}),e.jsx("option",{value:"short",children:"Short"})]}),s.tradeType&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:s.tradeType})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2",htmlFor:"amount",children:["Amount (USDT)        Available (",u," USDT)"]}),e.jsx("input",{type:"number",id:"amount",value:a.amount,onChange:g,className:"p-2 border rounded w-full"}),s.amount&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:s.amount})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",htmlFor:"duration",children:"Duration"}),e.jsxs("select",{id:"duration",value:a.duration,onChange:v,className:"p-2 border rounded w-full",children:[e.jsx("option",{value:"3",children:"3 minutes"}),e.jsx("option",{value:"5",children:"5 minutes"}),e.jsx("option",{value:"15",children:"15 minutes"}),e.jsx("option",{value:"30",children:"30 minutes"}),e.jsx("option",{value:"60",children:"60 minutes"})]}),s.duration&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:s.duration})]}),e.jsx("div",{className:"flex justify-center mt-8 mb-12",children:e.jsx("button",{type:"submit",className:`py-2 px-4 rounded w-1/2 text-center ${a.tradeType==="long"?"bg-green-500 text-white":"bg-red-500 text-white"}`,children:a.tradeType==="long"?"Long":"Short"})})]})})]})})};export{C as default};