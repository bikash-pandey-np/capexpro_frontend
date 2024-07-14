import React from 'react';
import logo from '../../../../images/logo.png'
const Footer = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
          <a>
          <img src={logo} style={{ width:'24%' }}/>
          </a>
            <p className='mt-2'>
            Capex Pro is a premier trading platform for both Crypto and Stocks, offering users a seamless and intuitive experience to manage their investments and stay informed with real-time market data.
            </p>
          </div>
          <div>
           
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            Capex Pro LLC,<br />
            <p>support@thecapex.pro</p>
            <p>24/7 (Chat Support)</p>
            
          </div>
        </div>
      </div>
     
    </footer>
    <div className="bg-gray-900 text-gray-400 text-center py-4">
      <p>&copy; {new Date().getFullYear()} <a href={route('homepage')}>Thecapex.pro</a> All rights reserved.</p>
    </div>
    </>

  );
};

export default Footer;
