import{u as y,a as f,r as c,j as e}from"./app-5416490c.js";import{L as N}from"./Layout-5cdf7ce6.js";import{a as T}from"./axios-21b846bc.js";/* empty css            */import"./logo-1a4f8099.js";const A=({symbol:s,balance:m,user_currency:d,form_type:u})=>{const{darkMode:n}=y(),{data:a,setData:o,post:x,errors:r}=f({tradeType:u||"long",amount:"",duration:"3",symbol:s});console.log("test page here 1"),console.log("test page here");const[l,h]=c.useState(null);c.useEffect(()=>{const t=async()=>{try{const i=await T.get(route("binance_ticker",{symbol:s}));h(i)}catch(i){console.error("Error fetching ticker data:",i)}};t();const v=setInterval(t,3e3);return()=>clearInterval(v)},[s]);const p=t=>{o("tradeType",t.target.value)},g=t=>{o("amount",t.target.value)},b=t=>{o("duration",t.target.value)},j=t=>{t.preventDefault(),x(route("frontend.crypto.trade",{data:a}),{onSuccess:()=>{o("amount","")}})};return e.jsx(N,{children:e.jsxs("div",{className:"container mx-auto",children:[e.jsxs("div",{className:`p-3 rounded-lg flex justify-between items-center ${n?"bg-gray-900 text-white":"bg-white text-black"}`,children:[e.jsxs("div",{children:[e.jsx("h2",{className:"",children:s}),e.jsx("h2",{className:"font-semibold",style:{fontSize:"25pt"},children:l?parseFloat(l.data.price).toFixed(4):"NA"}),e.jsxs("p",{className:"medium font-bold text-gray-400",children:["≈ ",l?parseFloat(l.data.price).toFixed(4)*parseFloat(d.rate_per_usdt):"NA"," ",d.symbol]})]}),e.jsx("a",{href:route("frontend.active-trade"),children:"Active Trades"})]}),e.jsx("div",{className:`p-3 rounded-lg mt-4 ${n?"bg-gray-900 text-white":"bg-white text-black"}`,children:e.jsxs("form",{className:"mt-4",onSubmit:j,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",htmlFor:"tradeType",children:"Type"}),e.jsxs("select",{id:"tradeType",value:a.tradeType,onChange:p,className:`w-full p-2 border rounded extra_small ${n?"bg-gray-800 text-white":"bg-white text-gray-600"}`,children:[e.jsx("option",{value:"long",children:"Long"}),e.jsx("option",{value:"short",children:"Short"})]}),r.tradeType&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.tradeType})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2",htmlFor:"amount",children:["Amount (USDT)        Available (",m," USDT)"]}),e.jsx("input",{type:"number",id:"amount",value:a.amount,onChange:g,className:"p-2 border rounded w-full"}),r.amount&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.amount})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",htmlFor:"duration",children:"Duration"}),e.jsxs("select",{id:"duration",value:a.duration,onChange:b,className:`w-full p-2 border rounded extra_small ${n?"bg-gray-800 text-white":"bg-white text-gray-600"}`,children:[e.jsx("option",{value:"3",children:"3 minutes"}),e.jsx("option",{value:"5",children:"5 minutes"}),e.jsx("option",{value:"15",children:"15 minutes"}),e.jsx("option",{value:"30",children:"30 minutes"}),e.jsx("option",{value:"60",children:"60 minutes"})]}),r.duration&&e.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.duration})]}),e.jsx("div",{className:"flex justify-center mt-8 mb-12",children:e.jsx("button",{type:"submit",className:`py-2 px-4 rounded w-1/2 text-center ${a.tradeType==="long"?"bg-green-500 text-white":"bg-red-500 text-white"}`,children:a.tradeType==="long"?"Long":"Short"})})]})})]})})};export{A as default};
