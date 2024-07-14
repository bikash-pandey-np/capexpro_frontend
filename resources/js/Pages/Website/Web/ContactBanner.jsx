import React from 'react';
import about from '../../../../images/about.jpg'

const ContactBanner = () => {
  return (
    <div className="relative w-full h-64">
      <img 
      src={about}

        alt="About Us Banner" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Contact Us</h1>
      </div>
    </div>
  );
};

export default ContactBanner;
