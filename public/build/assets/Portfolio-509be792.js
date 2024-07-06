import{a as s,j as e}from"./app-a4aaabc3.js";import{L as a}from"./Layout-29760884.js";/* empty css            */import"./logo-1a4f8099.js";const c=({user:l})=>{const{darkMode:t}=s();return e.jsx(a,{children:e.jsx("div",{className:"container mx-auto mb-4",children:e.jsxs("div",{className:`p-3 rounded-lg ${t?"bg-gray-900 text-white":"bg-white text-black"}`,children:[e.jsxs("div",{className:"flex justify-between mb-4 pt-4",children:[e.jsx("a",{href:route("frontend.deposit"),className:`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${t?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Deposit"}),e.jsx("a",{href:route("frontend.withdraw"),className:`block text-center medium px-4 py-2 rounded shadow focus:outline-none ${t?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Withdraw"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12",children:[e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Available Balance"}),e.jsxs("p",{className:"mt-2",children:[l.balance_usdt.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsxs("h2",{className:"text-xl font-bold",children:["≈ ",l.currency.symbol]}),e.jsxs("p",{className:"mt-2",children:[(l.balance_usdt*l.currency.rate_per_usdt).toFixed(2)," ",l.currency.symbol]})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Total Deposit"}),e.jsxs("p",{className:"mt-2",children:[l.total_deposit," USDT"]})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Total Withdraw"}),e.jsxs("p",{className:"mt-2",children:[l.total_withdraw," USDT"]})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Credit Score"}),e.jsx("p",{className:"mt-2",children:l.credit_score})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"}`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Freezed Amount"}),e.jsxs("p",{className:"mt-2",children:[l.pending_deposit," USDT"]})]}),e.jsxs("div",{className:`p-4 rounded-lg shadow-lg ${t?"bg-gray-800 text-white":"bg-white text-black"} mb-12`,children:[e.jsx("h2",{className:"text-xl font-bold",children:"Traded Amount"}),e.jsx("p",{className:"mt-2",children:"100 USDT"})]})]})]})})})};export{c as default};
