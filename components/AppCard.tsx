
import React from 'react';
import { App } from '../types';
import { DownloadIcon, PlayIcon } from './icons';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="group relative flex flex-col h-full items-center">
        
        {/* Mobile Screen Representation - Dashboard Mockup */}
        {/* Reduced size: max-w-[170px], reduced border, adjusted aspect ratio */}
        <div className="relative w-full max-w-[170px] aspect-[9/18] bg-gray-900 rounded-[1.25rem] border-[4px] border-gray-800 shadow-xl overflow-hidden mb-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-blue-900/20">
            
            {/* Internal App UI Container */}
            <div className="absolute inset-0 bg-slate-900 flex flex-col cursor-default select-none">
                
                {/* 1. Status Bar */}
                <div className="h-4 px-3 flex justify-between items-center bg-slate-900/95 backdrop-blur z-10 pt-0.5">
                    <div className="text-[6px] text-slate-500 font-medium">9:41</div>
                    <div className="flex space-x-0.5">
                        <div className="w-0.5 h-0.5 bg-slate-500 rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-slate-500 rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-slate-500 rounded-full"></div>
                    </div>
                </div>

                {/* 2. App Header */}
                <div className="px-3 py-2 flex items-center justify-between bg-slate-900/50 border-b border-slate-800/50">
                    <div className="space-y-0.5">
                        <div className="w-2.5 h-0.5 bg-slate-600 rounded-full"></div>
                        <div className="w-1.5 h-0.5 bg-slate-600 rounded-full"></div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-300 tracking-wide uppercase opacity-90 truncate max-w-[80px]">{app.name}</span>
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-700/50 shadow-sm">
                        <img src={app.icon} alt="profile" className="w-full h-full object-cover opacity-80" />
                    </div>
                </div>

                {/* 3. Scrollable Content Area */}
                <div className="flex-1 p-2 space-y-2 overflow-hidden relative">
                    
                    {/* Widget / Hero Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 p-2 rounded-lg border border-slate-700/30 shadow-sm">
                        <div className="flex justify-between items-start mb-1.5">
                            <div className="w-4 h-4 rounded bg-slate-700/50 flex items-center justify-center border border-slate-600/30">
                                <img src={app.icon} className="w-2.5 h-2.5 opacity-70" />
                            </div>
                            <div className="px-1 py-px rounded bg-blue-500/10 text-blue-400 text-[5px] font-bold uppercase tracking-wider border border-blue-500/10">New</div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-1 w-3/4 bg-slate-600/80 rounded-full"></div>
                            <div className="h-1 w-1/2 bg-slate-700/50 rounded-full"></div>
                        </div>
                    </div>

                    {/* List Items */}
                    <div className="space-y-1.5">
                        <div className="text-[6px] font-bold text-slate-600 uppercase tracking-wider ml-0.5 mb-0.5">Reciente</div>
                        
                        {/* Mock List Rows */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-1.5 bg-slate-800/20 rounded-md border border-slate-800/50">
                                <div className="w-4 h-4 rounded bg-slate-700/30 mr-1.5 flex-shrink-0 border border-slate-700/20"></div>
                                <div className="flex-1 space-y-0.5">
                                    <div className="h-1 w-2/3 bg-slate-600/60 rounded-full"></div>
                                    <div className="h-1 w-full bg-slate-700/30 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom fade for scroll effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                </div>

                {/* 4. Bottom Navigation Bar */}
                <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-1 pb-1">
                    <div className="w-6 h-6 flex items-center justify-center text-blue-500">
                        <div className="w-2.5 h-2.5 bg-current rounded-[2px] opacity-80"></div>
                    </div>
                    {[2, 3, 4].map((i) => (
                        <div key={i} className="w-6 h-6 flex items-center justify-center text-slate-700">
                            <div className="w-2.5 h-2.5 bg-current rounded-[2px] opacity-50"></div>
                        </div>
                    ))}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-slate-700 rounded-full"></div>
            </div>

            {/* Hover Overlay - Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>
        </div>

        {/* App Details - Centered & Compact */}
        <div className="flex-grow flex flex-col px-1 w-full max-w-[170px] items-center text-center">
            <div className="flex flex-col items-center mb-1.5">
                <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate w-full">{app.name}</h3>
                <span className="text-[8px] font-bold uppercase tracking-wide bg-slate-800 text-slate-400 py-0.5 px-1.5 rounded border border-slate-700 mt-1">
                    {app.category}
                </span>
            </div>
            
            <p className="text-gray-500 text-[9px] leading-relaxed mb-2 line-clamp-2 h-7 w-full">
                {app.description}
            </p>

            {/* Buttons - Compact */}
            <div className="mt-auto flex items-stretch gap-1.5 w-full">
                <a 
                    href={app.demoUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-1 px-1 text-[9px] rounded flex items-center justify-center transition-all duration-300 group-hover:bg-slate-800"
                >
                    <PlayIcon className="w-2.5 h-2.5 mr-1" />
                    <span>Demo</span>
                </a>
                <a 
                    href={app.downloadUrl}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-1 text-[9px] rounded flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-900/20"
                >
                    <DownloadIcon className="w-2.5 h-2.5 mr-1" />
                    <span>Obtener</span>
                </a>
            </div>
        </div>
    </div>
  );
};

export default AppCard;
