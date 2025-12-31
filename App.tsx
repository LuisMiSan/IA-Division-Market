
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import AppCard, { AppCardSkeleton } from './components/AppCard';
import AddAppModal from './components/AddAppModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { APPS as INITIAL_APPS, INITIAL_CONFIG } from './constants';
import { App as AppType, SiteConfig } from './types';
import { SearchIcon } from './components/icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // LIVE STATE (What everyone sees)
  const [apps, setApps] = useState<AppType[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  
  // Navigation State
  const [view, setView] = useState<'store' | 'admin'>('store');
  
  // UI State
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Load data from localStorage or fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      // Load Published Apps
      const savedApps = localStorage.getItem('ia-workspace-apps');
      if (savedApps) {
        try { 
            const parsed = JSON.parse(savedApps);
            // Ensure compatibility if "type" is missing in older data
            const normalized = parsed.map((a: any) => ({ ...a, type: a.type || 'app' }));
            setApps(normalized); 
        } 
        catch (e) { setApps(INITIAL_APPS); }
      } else {
        setApps(INITIAL_APPS);
      }

      // Load Published Config
      const savedConfig = localStorage.getItem('ia-workspace-config');
      if (savedConfig) {
        try { setSiteConfig(JSON.parse(savedConfig)); }
        catch (e) { setSiteConfig(INITIAL_CONFIG); }
      }

      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- Core Action: Publish ---
  // This is called when the user clicks "Approve/Publish" in the Admin Panel
  const handlePublishChanges = (newConfig: SiteConfig, newApps: AppType[]) => {
    // Update Live State
    setApps(newApps);
    setSiteConfig(newConfig);
    
    // Persist to "Live" storage
    localStorage.setItem('ia-workspace-apps', JSON.stringify(newApps));
    localStorage.setItem('ia-workspace-config', JSON.stringify(newConfig));
    
    // Feedback and exit admin if desired or just stay
    alert('¡Cambios publicados con éxito!');
  };

  const handleAdminLogin = () => {
    setView('admin');
    window.scrollTo(0, 0);
  };

  // --- Filtering & Splitting ---
  
  const { filteredApps, filteredWebs, categories } = useMemo(() => {
    const onlyApps = apps.filter(a => (a.type || 'app') === 'app');
    const onlyWebs = apps.filter(a => a.type === 'web');

    // Get categories from both for the unified filter bar, or just from apps? 
    // Let's filter both lists by the same category selector for simplicity, 
    // but usually webs might have different categories.
    const uniqueCategories = ['Todos', ...new Set(apps.map(app => app.category))];

    const filterList = (list: AppType[]) => {
        if (selectedCategory === 'Todos') return list;
        return list.filter(app => app.category === selectedCategory);
    }

    return {
        filteredApps: filterList(onlyApps),
        filteredWebs: filterList(onlyWebs),
        categories: uniqueCategories
    };
  }, [apps, selectedCategory]);


  if (view === 'admin') {
    return (
        <AdminPanel 
            config={siteConfig}
            apps={apps}
            onPublish={handlePublishChanges}
            onClose={() => {
                setView('store');
                window.scrollTo(0, 0);
            }}
        />
    );
  }

  return (
    <div className="bg-[#030712] min-h-screen text-white font-sans antialiased selection:bg-sky-500/30">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>
      
      <Header brandName={siteConfig.brandName} onAdminClick={handleAdminLogin} />
      
      <main className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        
        {/* Hero Section */}
        <div id="home" className="mt-12 mb-10 scroll-mt-32">
             <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    {siteConfig.heroTitle}
                </h1>
                <p className="text-sky-400 font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                    ¿Estás listo para el siguiente nivel?
                </p>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {siteConfig.heroSubtitle}
                </p>
                <div className="pt-4">
                    <a href="#apps" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <SearchIcon className="w-5 h-5" />
                        EXPLORAR
                    </a>
                </div>
             </div>

             {/* Filters & Search */}
             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-white/5 pb-8 scroll-mt-24 sticky top-20 z-40 bg-[#030712]/80 backdrop-blur-md py-4 rounded-xl px-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 select-none ${
                            selectedCategory === category
                                ? 'bg-white text-black'
                                : 'bg-transparent text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="relative group w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-gray-500 group-focus-within:text-sky-400 transition-colors" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Buscar..." 
                        className="block w-full pl-10 pr-3 py-2 bg-[#1C1C1E] border border-white/10 rounded-lg text-sm placeholder-gray-500 text-gray-200 focus:outline-none focus:border-sky-500/50 transition-all shadow-sm"
                    />
                </div>
             </div>

             {/* --- APPS SECTION --- */}
             <div id="apps" className="mb-24 scroll-mt-32">
                 <div className="flex items-end gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-white">Aplicaciones</h2>
                    <div className="h-px flex-1 bg-white/10 mb-2"></div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {isLoading 
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <AppCardSkeleton key={i} />
                        ))
                    : filteredApps.map(app => (
                        <AppCard 
                            key={app.id} 
                            app={app} 
                        />
                        ))
                    }
                 </div>
                 {!isLoading && filteredApps.length === 0 && (
                     <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
                         <p className="text-gray-400 text-sm font-medium">No se encontraron apps en esta categoría.</p>
                     </div>
                 )}
             </div>

             {/* --- WEBS SECTION --- */}
             <div id="webs" className="mb-24 scroll-mt-32">
                 <div className="flex items-end gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-white">Sitios Web & Landings</h2>
                    <div className="h-px flex-1 bg-white/10 mb-2"></div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {isLoading 
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <AppCardSkeleton key={i} />
                        ))
                    : filteredWebs.map(app => (
                        <AppCard 
                            key={app.id} 
                            app={app} 
                        />
                        ))
                    }
                 </div>
                 {!isLoading && filteredWebs.length === 0 && (
                     <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
                         <p className="text-gray-400 text-sm font-medium">No se encontraron sitios web en esta categoría.</p>
                     </div>
                 )}
             </div>

        </div>

        {/* About Section */}
        <section id="about" className="my-32 pt-24 border-t border-white/5">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-sky-500/20">
                        Nuestra Misión
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1]">
                        {siteConfig.aboutTitle}
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed whitespace-pre-wrap font-light">
                        {siteConfig.aboutDescription}
                    </p>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative aspect-video bg-[#0f1115] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="text-center z-10">
                             <div className="text-7xl font-black text-white mb-2 tracking-tighter">10k+</div>
                             <div className="text-sky-400 uppercase font-bold tracking-[0.2em] text-xs">Descargas Globales</div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(14,165,233,0.1),transparent)]"></div>
                    </div>
                </div>
            </div>
        </section>

         {/* Contact CTA Section */}
         <section id="contact" className="my-24 text-center">
            <div className="bg-gradient-to-b from-[#111] to-black border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.08),transparent_50%)]"></div>
                 <div className="relative z-10 max-w-3xl mx-auto">
                    <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-sm mb-6">
                        Contacta con nosotros
                    </p>
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white leading-tight">
                        {siteConfig.contactTitle}
                    </h2>
                    <p className="text-gray-400 mb-12 text-xl font-light whitespace-pre-wrap">
                        {siteConfig.contactDescription}
                    </p>
                    <a href="mailto:contacto@iadivision.com" className="inline-block bg-white text-black hover:bg-gray-200 font-black py-5 px-12 rounded-full transition-all transform hover:-translate-y-1 shadow-2xl">
                        EMPEZAR AHORA
                    </a>
                 </div>
            </div>
         </section>

      </main>

      <Footer config={siteConfig} onAdminClick={handleAdminLogin} />
    </div>
  );
};

export default App;
