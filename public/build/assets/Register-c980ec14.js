import{u as d,j as e}from"./app-a4aaabc3.js";import{l as u}from"./logo-1a4f8099.js";/* empty css            */const f=({countryCodes:o,currencies:r})=>{const{data:a,setData:n,post:t,processing:i,errors:l}=d({full_name:"dasd",email:"bikashaya@gmail.com",password:"Nepal@123",password_confirmation:"Nepal@123",country_code_id:"",contact_no:"9818252111",currency_id:""}),c=s=>{s.preventDefault(),console.log(a),t("/register")};return e.jsxs("div",{className:"max-w-md mx-auto bg-white p-8 rounded-lg shadow-md",children:[e.jsx("div",{className:"flex justify-center mb-4 mt-8",children:e.jsx("img",{src:u,alt:"Logo",className:"h-8"})}),e.jsx("h2",{className:"text-2xl font-bold text-center mb-6",children:"Register an Account"}),e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("input",{type:"text",placeholder:"Full Name",value:a.full_name,onChange:s=>n("full_name",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),l.full_name&&e.jsx("div",{className:"text-red-500 mt-2",children:l.full_name})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("input",{type:"email",placeholder:"Email",value:a.email,onChange:s=>n("email",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),l.email&&e.jsx("div",{className:"text-red-500 mt-2",children:l.email})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("input",{type:"password",placeholder:"Password",value:a.password,onChange:s=>n("password",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),l.password&&e.jsx("div",{className:"text-red-500 mt-2",children:l.password})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("input",{type:"password",placeholder:"Confirm Password",value:a.password_confirmation,onChange:s=>n("password_confirmation",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),l.password_confirmation&&e.jsx("div",{className:"text-red-500 mt-2",children:l.password_confirmation})]}),e.jsxs("div",{className:"mb-4 flex",children:[e.jsxs("div",{className:"w-2/5 pr-2",children:[e.jsxs("select",{value:a.country_code_id,onChange:s=>n("country_code_id",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",children:[e.jsx("option",{value:"",children:"Code"}),o.map(s=>e.jsx("option",{value:s.id,children:s.code},s.id))]}),l.country_code_id&&e.jsx("div",{className:"text-red-500 mt-2",children:l.country_code_id})]}),e.jsxs("div",{className:"w-3/5 pl-2",children:[e.jsx("input",{type:"text",placeholder:"Contact No",value:a.contact_no,onChange:s=>n("contact_no",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"}),l.contact_no&&e.jsx("div",{className:"text-red-500 mt-2",children:l.contact_no})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("select",{value:a.currency_id,onChange:s=>n("currency_id",s.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",children:[e.jsx("option",{value:"",children:"Currency"}),r.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]}),l.currency_id&&e.jsx("div",{className:"text-red-500 mt-2",children:l.currency_id})]}),e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("button",{type:"submit",disabled:i,className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600",children:"Register"})})]})]})};export{f as default};
