import{a as b,r as p,u as x,j as e}from"./app-a4aaabc3.js";import{L as h}from"./Layout-29760884.js";/* empty css            */import"./logo-1a4f8099.js";const j=({email:o,full_name:n,is_email_verified:i})=>{const{darkMode:t}=b(),[r,u]=p.useState(!1),{data:a,setData:c,post:s}=x({email:o,otp:""}),m=()=>{u(!0),s(route("frontend.generate-otp"),{email:a.email})},d=l=>{l.preventDefault(),s(route("frontend.verify-otp"),a)};return e.jsx(h,{children:e.jsx("div",{className:"container mx-auto mb-4",children:e.jsx("div",{className:`p-3 rounded-lg ${t?"bg-gray-900 text-white":"bg-white text-black"} pb-8`,children:i?e.jsx("p",{className:"mt-8",children:"Your email has been verified Successfully."}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"mt-8",children:["Dear ",n,","]}),e.jsx("p",{className:"mt-2",children:"You are about to verify your email."}),e.jsx("p",{className:"mt-2",children:"Verification Code will be sent to your registered email."}),e.jsx("input",{type:"email",value:o,readOnly:!0,className:`block w-full mt-4 p-2 rounded ${t?"bg-gray-800 text-white":"bg-gray-200 text-black"}`}),!r&&e.jsx("button",{onClick:m,className:`block w-full mt-4 p-2 rounded shadow focus:outline-none ${t?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Send OTP"}),r&&e.jsxs("form",{onSubmit:d,className:"mt-4",children:[e.jsx("input",{type:"text",placeholder:"Enter OTP",value:a.otp,onChange:l=>c("otp",l.target.value),className:`block w-full mt-4 p-2 rounded ${t?"bg-gray-800 text-white":"bg-gray-200 text-black"}`}),e.jsx("button",{type:"submit",className:`block w-full mt-4 p-2 rounded shadow focus:outline-none ${t?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,children:"Submit OTP"})]})]})})})})};export{j as default};
