
import React from 'react';
import { App } from '../types';
import { DownloadIcon, PlayIcon } from './icons';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="group relative flex flex-col h-full">
        
        {/* Mobile Screen Representation - Reduced size props */}
        <div className="relative w-full aspect-[9/18] bg-gray-900 rounded-[2rem] border-[6px] border-gray-800 shadow-xl overflow-hidden mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-blue-900/20">
            
            {/* Screen "Glass" / Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-gray-950 flex flex-col items-center justify-center p-4">
                
                {/* Faux Status Bar */}
                <div className="absolute top-0 left-0 w-full h-6 px-4 flex justify-between items-center opacity-50">
                    <div className="text-[9px] text-white font-medium">9:41</div>
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* App Content Visualization (Smaller Icon) */}
                <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <img src={app.icon} alt={`${app.name} icon`} className="w-8 h-8 opacity-90"/>
                </div>
                
                <div className="text-center">
                    <h4 className="text-white font-bold text-base mb-1">{app.name}</h4>
                    <p className="text-gray-500 text-[10px] px-2">v2.0.4 • IA Powered</p>
                </div>

                {/* Faux UI Elements at bottom of screen */}
                <div className="absolute bottom-4 w-1/3 h-1 bg-gray-700 rounded-full"></div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* App Details - Compact */}
        <div className="flex-grow flex flex-col px-1">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate mr-2">{app.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-800 text-slate-300 py-0.5 px-2 rounded border border-slate-700 whitespace-nowrap">
                    {app.category}
                </span>
            </div>
            
            <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                {app.description}
            </p>

            {/* Buttons - Compact */}
            <div className="mt-auto flex items-stretch gap-2">
                <a 
                    href={app.demoUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-2 px-3 text-xs rounded-lg flex items-center justify-center transition-all duration-300"
                >
                    <PlayIcon className="w-3 h-3 mr-1.5" />
                    <span>Demo</span>
                </a>
                <a 
                    href={app.downloadUrl}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3 text-xs rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-900/20"
                >
                    <DownloadIcon className="w-3 h-3 mr-1.5" />
                    <span>Obtener</span>
                </a>
            </div>
        </div>
    </div>
  );
};

export default AppCard;
