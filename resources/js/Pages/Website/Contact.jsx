import React, { useState } from 'react';
import Navbar from './Web/Navbar';
import Footer from './Web/Footer';
import ContactBanner from './Web/ContactBanner'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('form submited')    
    // Send email to bikasahaaya@gmail.com
 
  };

  return (
   <>
   <Navbar></Navbar>
   <ContactBanner />
   <section className="py-20 bg-gray-100">
   <div className="max-w-7xl mx-auto px-4">
     <div className="text-center mb-12">
       <h2 className="text-3xl font-bold">Contact Us</h2>
       <p className="text-lg">We would love to hear from you! Please fill out the form below to get in touch with us.</p>
     </div>
     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
           <input
             type="text"
             id="name"
             name="name"
             value={formData.name}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
         <div className="mb-4">
           <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
           <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg"
             required
           />
         </div>
         <div className="mb-4">
           <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
           <textarea
             id="message"
             name="message"
             value={formData.message}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg"
             rows="5"
             required
           ></textarea>
         </div>
         <div className="text-center">
           <button
             type="submit"
             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
           >
             Submit
           </button>
         </div>
       </form>
     </div>
   </div>
 </section>
 <Footer />
   </>
  );
};

export default Contact;
