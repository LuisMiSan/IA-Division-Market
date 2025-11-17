import React from 'react';
import { LOGO_BASE64 } from '../constants';
import { GithubIcon, TwitterIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-slate-800 mt-24">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
                    <img src={LOGO_BASE64} alt="IA Division Logo" className="h-10 w-auto" />
                </div>
                <span className="text-2xl font-bold ml-4 text-white tracking-wider">IA DIVISION <span className="font-light">Market</span></span>
            </div>
            <p className="text-gray-400 mt-2 text-sm max-w-xs text-center md:text-left">
              Potenciando el futuro con aplicaciones de inteligencia artificial de vanguardia.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <GithubIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IA DIVISION Market. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;