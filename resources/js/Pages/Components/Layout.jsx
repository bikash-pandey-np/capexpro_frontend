import React from 'react';
import { FaSun, FaHome, FaChartLine, FaExchangeAlt, FaWallet, FaUser } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { FaTelegram } from "react-icons/fa";

import { useDarkMode } from './DarkModeProvider';
import { usePage } from '@inertiajs/inertia-react';
import logo from '../../../images/logo.png';
import { BiLogoWhatsapp } from "react-icons/bi";

const Layout = ({ children }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { props } = usePage();
    const { flash } = props;

    return (
        <div className={darkMode ? 'dark body' : 'body'}>
            <div className="min-h-screen flex flex-col">
            <header className={`p-4 flex justify-between items-center shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            {/* Left side */}
            <div className="text-lg font-bold">
                <a href={route('frontend.dashboard')}>
                    <img src={logo} className='logo' alt="Logo" />
                </a>
            </div>
            {/* Right side */}
            <div className="flex items-center space-x-4 text-right">
                <a
                    href='https://t.me/officialcapex2024'
                    target='_blank' 
                className="focus:outline-none mr-2" style={{ textAlign:'right' }}>
                <FaTelegram size={24} color="#0088cc" />
                </a>
                <a
                href='https://wa.me/+18202018914'
                target='_blank' 
            className="focus:outline-none mr-2" style={{ textAlign:'right' }}>
            <BiLogoWhatsapp size={24} color="#25D366" />
            </a>
                <button onClick={toggleDarkMode} className="focus:outline-none">
                    {darkMode ? <FaSun size={24} /> : <IoMoon size={36} />}
                </button>
            </div>
        </header>
        
                <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 dark:text-white overflow-auto">
                    {flash.success && (
                        <div className="bg-green-500 text-white p-4 rounded mb-4">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-500 text-white p-4 rounded mb-4">
                            {flash.error}
                        </div>
                    )}
                    {children}
                </main>
                <footer className={`p-4 flex justify-around items-center shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} footer_menu_text`} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                    <div className="flex flex-col items-center">
                    <a href={route('frontend.dashboard')}
                    className='flex flex-col items-center'
                    >
                    <FaHome className="mb-1" />
                    <span>Home</span>
                    </a>
                    </div>
                    <div className="flex flex-col items-center">
                    <a href={route('frontend.market')}
                    className="flex flex-col items-center">
                    <FaChartLine className="mb-1" />
                    <span>Market</span>
                    </a>
                    </div>
                    <div className="flex flex-col items-center">
                    <a href={route('frontend.trade')}
                    className='flex flex-col items-center'
                    >
                    <FaExchangeAlt className="mb-1" />
                        <span>Trade</span>
                    </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <a href={route('frontend.portfolio')}
                        className='flex flex-col items-center'
                        
                        >
                        <FaWallet className="mb-1" />
                        <span>Portfolio</span>
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <a 
                        className='flex flex-col items-center'
                            href={route('frontend.profile')}>
                        <FaUser className="mb-1" />
                        <span>Profile</span>
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
