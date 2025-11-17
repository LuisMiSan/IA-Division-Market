
import React from 'react';
import { App } from '../types';
import { DownloadIcon } from './icons';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="group relative bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-2xl shadow-[0_0_2rem_0_theme(colors.blue.500)]" />
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <img src={app.icon} alt={`${app.name} icon`} className="w-16 h-16 rounded-xl mr-4 border-2 border-slate-700"/>
                <div>
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                    <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 py-1 px-3 rounded-full">{app.category}</span>
                </div>
            </div>
            <p className="text-gray-400 text-sm flex-grow mb-4">{app.description}</p>
            <a 
                href={app.downloadUrl}
                className="mt-auto w-full bg-slate-800 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-105"
            >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Descargar
            </a>
        </div>
    </div>
  );
};

export default AppCard;
