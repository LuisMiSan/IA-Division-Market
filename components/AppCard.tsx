
import React from 'react';
import { App } from '../types';
import { DownloadIcon, PlayIcon, PencilIcon, ExternalLinkIcon } from './icons';

interface AppCardProps {
  app: App;
  onEdit?: (app: App) => void;
}

export const AppCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
        <div className="w-full aspect-[4/3] bg-white/5 rounded-2xl border border-white/5"></div>
        <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-full bg-white/5"></div>
            <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-white/5 rounded"></div>
                <div className="h-2 w-16 bg-white/5 rounded"></div>
            </div>
        </div>
    </div>
  );
};

const AppCard: React.FC<AppCardProps> = ({ app, onEdit }) => {
  const isWeb = app.type === 'web';

  return (
    <div className="group relative flex flex-col gap-4">
        {/* Thumbnail Image Container */}
        <div className="relative w-full aspect-[4/3] bg-[#121212] rounded-2xl overflow-hidden border border-white/5 group-hover:border-sky-500/30 transition-all duration-500 shadow-2xl">
            
            {/* Image */}
            {app.coverUrl ? (
                <img 
                    src={app.coverUrl} 
                    alt={app.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#111] to-black flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                     <img 
                        src={app.icon} 
                        alt="icon" 
                        className="w-16 h-16 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                     />
                </div>
            )}
            
            {/* Type Badge */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/80 z-10">
                {isWeb ? 'WEB' : 'APP'}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5 backdrop-blur-[4px]">
                <a 
                    href={app.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl"
                    title={isWeb ? "Visitar Sitio" : "Ver Demo"}
                >
                    {isWeb ? <ExternalLinkIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 fill-current ml-1" />}
                </a>
                 
                 {(!isWeb || (app.downloadUrl && app.downloadUrl !== '#')) && (
                    <a 
                        href={app.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-14 h-14 bg-black/40 text-white border border-white/20 rounded-full hover:bg-black hover:border-white hover:scale-110 transition-all shadow-2xl backdrop-blur-md"
                        title="Descargar"
                    >
                        <DownloadIcon className="w-6 h-6" />
                    </a>
                 )}
            </div>

            {/* Edit Button */}
            {onEdit && (
                <button
                    onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         onEdit(app);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-black/60 text-white/70 hover:text-white border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black backdrop-blur-md z-20"
                >
                    <PencilIcon className="w-4 h-4" />
                </button>
            )}
        </div>

        {/* Card Footer Info */}
        <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
                {/* Author/App Icon */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 p-1">
                    <img src={app.icon} alt="" className="w-full h-full object-contain rounded-lg" />
                </div>
                
                {/* Text Info */}
                <div className="flex flex-col">
                    <h3 className="text-white font-bold text-base leading-tight group-hover:text-sky-400 transition-colors">
                        {app.name}
                    </h3>
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-0.5">
                        {app.category}
                    </span>
                </div>
            </div>

            {/* Mock Stats */}
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold opacity-60">
                <svg className="w-3.5 h-3.5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{(app.id * 124).toLocaleString()}</span>
            </div>
        </div>
    </div>
  );
};

export default AppCard;
