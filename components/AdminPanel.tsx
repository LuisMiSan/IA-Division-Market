
import React, { useState, useEffect } from 'react';
import { SiteConfig, App } from '../types';
import { PencilIcon, TrashIcon, PlayIcon } from './icons';
import AddAppModal from './AddAppModal';

interface AdminPanelProps {
  config: SiteConfig;
  apps: App[];
  onPublish: (newConfig: SiteConfig, newApps: App[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, apps, onPublish, onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'apps' | 'webs'>('general');
  
  // DRAFT STATE
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [localApps, setLocalApps] = useState<App[]>(apps);
  
  // Tracking Changes
  const [hasChanges, setHasChanges] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  // Derived state for lists
  const appList = localApps.filter(a => (a.type || 'app') === 'app');
  const webList = localApps.filter(a => a.type === 'web');

  const handleConfigChange = (field: keyof SiteConfig, value: string) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveAppLocal = (appToSave: App) => {
    let updatedApps: App[];
    const existingIndex = localApps.findIndex(a => a.id === appToSave.id);

    if (existingIndex >= 0) {
      updatedApps = [...localApps];
      updatedApps[existingIndex] = appToSave;
    } else {
      updatedApps = [appToSave, ...localApps];
    }
    
    setLocalApps(updatedApps);
    setHasChanges(true);
    setIsModalOpen(false);
    setEditingApp(null);
  };

  const handleDeleteAppLocal = (appId: number) => {
    const updatedApps = localApps.filter(a => a.id !== appId);
    setLocalApps(updatedApps);
    setHasChanges(true);
  };

  const handlePublishClick = () => {
    onPublish(localConfig, localApps);
    setHasChanges(false);
  };

  const handleEditClick = (app: App | null, type: 'app' | 'web') => {
    if (app) {
        setEditingApp(app);
    } else {
        // Create a dummy object just to pass the type to the modal if needed, 
        // OR rely on the modal to default. 
        // Better: Pass null and let user pick, OR pass a partial obj.
        // For now, passing null works as "Add New", user picks type in modal.
        // But to be helpful, let's pre-set the type if we could.
        // The modal logic resets to default, so user has to click the type toggle.
        setEditingApp({ type } as App); // Hacky way to pass initial type preference
    }
    setIsModalOpen(true);
  };

  const renderList = (items: App[], type: 'app' | 'web') => (
    <div className="space-y-6">
         <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div>
                <h2 className="text-3xl font-black text-white">{type === 'app' ? 'Aplicaciones' : 'Sitios Web'}</h2>
                <p className="text-gray-500 mt-2">
                    {type === 'app' ? 'Gestiona tus productos de software.' : 'Gestiona tus landing pages y sitios web.'}
                </p>
            </div>
            <button 
                onClick={() => handleEditClick(null, type)}
                className="bg-white text-black px-8 py-3.5 rounded-full font-black text-sm hover:bg-gray-200 transition-all shadow-xl"
            >
                + NUEVO {type === 'app' ? 'APP' : 'WEB'}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(app => (
                <div key={app.id} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 group transition-all hover:bg-white/[0.07] flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black/40 rounded-2xl border border-white/10 p-2 overflow-hidden">
                                <img src={app.icon} className="w-full h-full object-contain" alt="" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg group-hover:text-sky-400 transition-colors">{app.name}</h4>
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{app.category}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-6 font-light">{app.description}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                        <button 
                            onClick={() => handleEditClick(app, type)}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl transition-all border border-white/5"
                        >
                            EDITAR
                        </button>
                        <button 
                            onClick={() => handleDeleteAppLocal(app.id)}
                            className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
            
            {items.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No hay items en esta sección</p>
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
             <div className="bg-sky-600/20 p-2 rounded-xl border border-sky-500/30">
                <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </div>
             <div>
                <h1 className="text-lg font-bold">Modo Edición</h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Panel Administrativo</p>
             </div>
        </div>

        <div className="flex items-center gap-3">
            {hasChanges && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-tight">Cambios sin publicar</span>
                </div>
            )}
            
            <button 
                onClick={handlePublishClick}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black transition-all shadow-lg ${
                    hasChanges 
                    ? 'bg-sky-500 text-white hover:bg-sky-400 shadow-sky-500/20' 
                    : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                }`}
            >
                {hasChanges ? 'APROBAR Y PUBLICAR' : 'SIN CAMBIOS'}
            </button>

            <button onClick={onClose} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-all border border-white/10 font-bold">
                Cerrar Panel
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col gap-3">
            <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${
                    activeTab === 'general' 
                    ? 'bg-white text-black shadow-xl scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
            >
                Configuración
            </button>
            
            <div className="pt-4 pb-2 px-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                Catálogo
            </div>
            
            <button
                onClick={() => setActiveTab('apps')}
                className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${
                    activeTab === 'apps' 
                    ? 'bg-white text-black shadow-xl scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
            >
                <span>Apps</span>
                <span className="ml-auto bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">{appList.length}</span>
            </button>

            <button
                onClick={() => setActiveTab('webs')}
                className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${
                    activeTab === 'webs' 
                    ? 'bg-white text-black shadow-xl scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
            >
                <span>Webs</span>
                <span className="ml-auto bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">{webList.length}</span>
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
            
            {/* --- GENERAL TAB --- */}
            {activeTab === 'general' && (
                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="border-b border-white/5 pb-6">
                        <h2 className="text-3xl font-black text-white">General</h2>
                        <p className="text-gray-500 mt-2">Personaliza el contenido principal de tu landing page.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Identidad */}
                        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-6">
                            <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em]">Identidad de Marca</h3>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2 font-bold">Nombre del WorkSpace</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus:border-sky-500/50 outline-none transition-all text-white font-medium"
                                    value={localConfig.brandName}
                                    onChange={(e) => handleConfigChange('brandName', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Hero Section */}
                        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-6">
                            <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em]">Encabezado (Hero)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2 font-bold">Título Principal</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus:border-sky-500/50 outline-none transition-all text-white font-medium"
                                        value={localConfig.heroTitle}
                                        onChange={(e) => handleConfigChange('heroTitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2 font-bold">Subtítulo Descriptivo</label>
                                    <textarea 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus:border-sky-500/50 outline-none transition-all text-white font-medium min-h-[100px]"
                                        value={localConfig.heroSubtitle}
                                        onChange={(e) => handleConfigChange('heroSubtitle', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-6">
                            <h3 className="text-xs font-black text-sky-400 uppercase tracking-[0.2em]">Sección Nosotros</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2 font-bold">Título</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus:border-sky-500/50 outline-none transition-all text-white font-medium"
                                        value={localConfig.aboutTitle}
                                        onChange={(e) => handleConfigChange('aboutTitle', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2 font-bold">Descripción Larga</label>
                                    <textarea 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 focus:border-sky-500/50 outline-none transition-all text-white font-medium min-h-[120px]"
                                        value={localConfig.aboutDescription}
                                        onChange={(e) => handleConfigChange('aboutDescription', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- APPS TAB --- */}
            {activeTab === 'apps' && (
                <div className="max-w-6xl mx-auto">
                    {renderList(appList, 'app')}
                </div>
            )}

             {/* --- WEBS TAB --- */}
             {activeTab === 'webs' && (
                <div className="max-w-6xl mx-auto">
                    {renderList(webList, 'web')}
                </div>
            )}

        </div>
      </div>

      <AddAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveAppLocal}
        initialData={editingApp}
      />
    </div>
  );
};

export default AdminPanel;
