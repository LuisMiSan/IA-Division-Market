
import React from 'react';
import { LOGO_BASE64 } from '../constants';
import { GithubIcon, TwitterIcon, FacebookIcon, InstagramIcon } from './icons';
import { SiteConfig } from '../types';

interface FooterProps {
    config?: SiteConfig;
    onAdminClick: () => void; // Keeping prop definition for compatibility, though not used in UI directly anymore (or passed but unused)
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const brandName = config?.brandName || "IA DIVISION WorkSpace";

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
  };

  return (
    <footer className="bg-[#030712] border-t border-white/5 mt-24 pb-12 relative overflow-hidden">
      {/* Background glow for footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
                    <img src={LOGO_BASE64} alt="Logo" className="h-8 w-auto" />
                </div>
                <span className="text-xl font-bold ml-4 text-white tracking-wider">
                    {renderBrand()}
                </span>
            </div>
            <p className="text-gray-400 mt-4 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Diseñando el futuro con herramientas inteligentes que potencian tu creatividad.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href={config?.socials.twitter || '#'} target="_blank" rel="noreferrer" className="group text-gray-400 hover:text-white transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href={config?.socials.facebook || '#'} target="_blank" rel="noreferrer" className="group text-gray-400 hover:text-white transition-colors">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href={config?.socials.instagram || '#'} target="_blank" rel="noreferrer" className="group text-gray-400 hover:text-white transition-colors">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={config?.socials.github || '#'} target="_blank" rel="noreferrer" className="group text-gray-400 hover:text-white transition-colors">
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
