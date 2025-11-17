import React, { useState, useEffect } from 'react';
import { LOGO_BASE64 } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
            <img src={LOGO_BASE64} alt="IA Division Logo" className="h-8 w-auto" />
          </div>
          <span className="text-xl font-bold ml-3 text-white tracking-wider">IA DIVISION <span className="font-light">Market</span></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a>
          <a href="#apps" className="text-gray-300 hover:text-white transition-colors">Aplicaciones</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Sobre Nosotros</a>
        </nav>
        <a 
          href="#" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
        >
          Contacto
        </a>
      </div>
    </header>
  );
};

export default Header;