import{b as a,j as e}from"./app-0795022b.js";import c from"./Layout-be035a7d.js";import{h as o}from"./moment-a9aaa855.js";import"./index-69ec4f7e.js";import"./logo-1a4f8099.js";const h=({deposits:n})=>{const{darkMode:r}=a(),t=s=>o(s).format("LLL");return e.jsx(c,{children:e.jsxs("div",{className:"container mx-auto",children:[e.jsx("div",{className:`p-3 rounded-lg flex justify-between items-center ${r?"bg-gray-900 text-white":"bg-gray-200 text-black"}`,children:e.jsx("h3",{className:"text-xl font-semibold",children:"Deposit History"})}),e.jsx("div",{children:n.map(s=>e.jsxs("details",{className:`my-2 p-3 rounded-lg ${r?"bg-gray-900 text-white":"bg-gray-200 text-black"}`,children:[e.jsxs("summary",{children:[s.transaction_code," - ",s.request_amount," ",s.currency.symbol," - ",s.status]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Type:"})," ",s.type]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Is Approved:"})," ",s.is_approved?"Yes":"No"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Requested At:"})," ",t(s.requested_at)]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Status:"})," ",s.status]}),s.is_approved===1&&e.jsxs("p",{children:[e.jsx("strong",{children:"Approved Amount:"})," ",s.approved_amount," USDT"]}),s.status==="Rejected"&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Reject Reason:"})," ",s.reject_reason]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Rejected At:"})," ",t(s.rejected_at)]})]})]},s.id))})]})})};export{h as default};
