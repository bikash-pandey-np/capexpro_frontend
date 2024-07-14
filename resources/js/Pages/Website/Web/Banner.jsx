import React from 'react';

const Banner = () => {
    const backgroundImage = 'https://cdn.pixabay.com/photo/2024/06/18/03/40/finance-8836903_960_720.jpg'
  return (
    <section className="bg-blue-900 text-white py-20" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center" style={{ height:'50vh' }}>
        <h1 className="text-4xl font-bold mb-6">Trade Crypto/Share with Confidence</h1>
        <p className="text-lg mb-8">
        Join Capex.Pro today & Experience seamless crypto/Stocks Trading.
        </p>
        <a href={route('app.register')} className="bg-white text-blue-900 hover:bg-gray-200 text-lg font-semibold px-6 py-3 rounded-lg"
        style={{ width:'180px' }}>Get Started</a>
      </div>
    </section>
  );
};

export default Banner;