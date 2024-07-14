import React from 'react';
import about from '../../../../images/about.jpg'
const AboutBanner = () => {
  return (
    <div className="relative w-full h-64">
      <img 
        src={about}
        // src="https://cdn.pixabay.com/photo/2023/11/30/08/36/chhathpuja-8421051_1280.jpg" 
        alt="About Us Banner" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">About Us</h1>
      </div>
    </div>
  );
};

export default AboutBanner;
