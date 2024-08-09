import{u as w,a as c,j as s}from"./app-c3ebcaf4.js";import{L as m}from"./Layout-85b366e4.js";import"./logo-1a4f8099.js";const b=({email:n})=>{const{darkMode:a}=w(),{data:o,setData:t,post:d,processing:l,errors:r}=c({email:n,current_password:"",new_password:"",new_password_confirmation:""}),i=e=>{e.preventDefault(),d("/change-password",{onSuccess:()=>{t({email:n,current_password:"",new_password:"",new_password_confirmation:""})}})};return s.jsx(m,{children:s.jsx("div",{className:"container mx-auto",children:s.jsxs("div",{className:`p-3 rounded-lg ${a?"bg-gray-900 text-white":"bg-white text-black"}`,children:[s.jsx("h2",{className:"text-lg font-bold mb-4",children:"Change Password"}),s.jsxs("form",{onSubmit:i,children:[s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium mb-1",htmlFor:"current_password",children:"Current Password"}),s.jsx("input",{type:"password",id:"current_password",className:`w-full p-2 border rounded ${a?"bg-gray-800 text-white":"bg-white text-black"}`,value:o.current_password,onChange:e=>t("current_password",e.target.value)}),r.current_password&&s.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.current_password})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium mb-1",htmlFor:"new_password",children:"New Password"}),s.jsx("input",{type:"password",id:"new_password",className:`w-full p-2 border rounded ${a?"bg-gray-800 text-white":"bg-white text-black"}`,value:o.new_password,onChange:e=>t("new_password",e.target.value)}),r.new_password&&s.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.new_password})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium mb-1",htmlFor:"confirm_password",children:"Confirm Password"}),s.jsx("input",{type:"password",id:"confirm_password",className:`w-full p-2 border rounded ${a?"bg-gray-800 text-white":"bg-white text-black"}`,value:o.new_password_confirmation,onChange:e=>t("new_password_confirmation",e.target.value)}),r.new_password_confirmation&&s.jsx("div",{className:"text-red-500 text-sm mt-1",children:r.new_password_confirmation})]}),s.jsx("button",{type:"submit",className:`w-full p-2 rounded ${a?"bg-yellow-500 text-gray-800 hover:bg-yellow-600":"bg-blue-500 text-white hover:bg-blue-600"}`,disabled:l,children:"Change Password"})]})]})})})};export{b as default};
