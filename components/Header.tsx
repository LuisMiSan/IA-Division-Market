
import React, { useState, useEffect } from 'react';
import { LOGO_BASE64 } from '../constants';
import { LockIcon } from './icons';

interface HeaderProps {
  brandName?: string;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ brandName = "IA DIVISION WorkSpace", onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderBrand = () => {
    const parts = brandName.split(' ');
    if (parts.length > 1) {
        const lastWord = parts.pop();
        return (
            <>
                {parts.join(' ')} <span className="font-light">{lastWord}</span>
            </>
        );
    }
    return brandName;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-black/90 backdrop-blur-xl border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white/5 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
            <img src={LOGO_BASE64} alt="Logo" className="h-7 w-auto" />
          </div>
          <span className="text-xl font-bold ml-3 text-white tracking-tight">
            {renderBrand()}
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold tracking-wide">Inicio</a>
          <a href="#apps" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold tracking-wide">Aplicaciones</a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold tracking-wide">Nosotros</a>
        </nav>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={onAdminClick}
                className="p-2.5 text-gray-500 hover:text-sky-400 transition-colors rounded-full hover:bg-white/5"
                title="Admin"
            >
                <LockIcon className="w-5 h-5" />
            </button>
            <a 
                href="#contact" 
                className="bg-white hover:bg-gray-200 text-black font-black py-2.5 px-7 rounded-full transition-all duration-300 shadow-xl text-xs uppercase tracking-widest"
            >
                Contacto
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
