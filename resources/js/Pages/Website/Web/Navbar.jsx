import React, { useState } from 'react';
import logo from '../../../../images/logo.png'
import { usePage } from '@inertiajs/inertia-react';
import wa from '../../../../images/wa.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const {is_customer_auth} =  usePage().props
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href={route('homepage')}>
              <img src={logo} alt="Capex Pro Logo" className="h-8 mr-2" /> {/* Adjust image size as needed */}
            </a>
          </div>
          <div className="hidden md:flex">
            <a href={route('homepage')} className="text-white hover:text-gray-300 px-3 py-2">Home</a>
            <a href={route('homepage') + '#features'} className="text-white hover:text-gray-300 px-3 py-2">Features</a>
            <a href={route('about_page')} className="text-white hover:text-gray-300 px-3 py-2">About</a>
            <a href={route('contact_page')} className="text-white hover:text-gray-300 px-3 py-2">Contact</a>
           
            {!is_customer_auth  && (
                <a href={route('app.login')} className="text-white hover:text-gray-300 px-3 py-2"
                style={{ background: '#fe4948', borderRadius:'7px' }}    
            >Login</a>
            )}
            {is_customer_auth  && (
                <a href={route('dashboard')} className="text-white hover:text-gray-300 px-3 py-2"
                style={{ background: '#fe4948', borderRadius:'7px' }}    
            >Dashboard</a>
            )}

          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
          <a href={route('homepage')} className="text-white hover:text-gray-300 px-3 py-2">Home</a>
          <a href={route('homepage') + '#features'} className="text-white hover:text-gray-300 px-3 py-2">Features</a>
          <a href={route('about_page')} className="text-white hover:text-gray-300 px-3 py-2">About</a>
          <a href={route('contact_page')} className="text-white hover:text-gray-300 px-3 py-2">Contact</a>
          </div>
        )}
      </div>
    </nav>
    <a
    href='https://wa.me/+18202018914'
    className="whatsapp-button fixed bottom-4 right-4 bg-gray-500 p-2 flex items-center justify-center" style={{ borderRadius: '10px' }} target="_blank" rel="noopener noreferrer">
      <img src={wa} alt="WhatsApp" style={{ width: '100%' }}/> 
    </a>
    </>
  );
};

export default Navbar;
