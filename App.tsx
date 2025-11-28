
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import AppCard, { AppCardSkeleton } from './components/AppCard';
import AddAppModal from './components/AddAppModal';
import Footer from './components/Footer';
import { APPS as INITIAL_APPS } from './constants';
import { App as AppType } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState<AppType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppType | null>(null);

  // Load apps from localStorage or fallback to constants
  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      const savedApps = localStorage.getItem('ia-workspace-apps');
      if (savedApps) {
        try {
          setApps(JSON.parse(savedApps));
        } catch (e) {
          console.error("Failed to parse saved apps", e);
          setApps(INITIAL_APPS);
        }
      } else {
        setApps(INITIAL_APPS);
      }
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveApp = (appToSave: AppType) => {
    let updatedApps: AppType[];

    // Check if we are updating an existing app
    const existingIndex = apps.findIndex(a => a.id === appToSave.id);

    if (existingIndex >= 0) {
      // Update existing
      updatedApps = [...apps];
      updatedApps[existingIndex] = appToSave;
    } else {
      // Add new
      updatedApps = [appToSave, ...apps];
    }
    
    setApps(updatedApps);
    localStorage.setItem('ia-workspace-apps', JSON.stringify(updatedApps));
    setIsModalOpen(false);
    setEditingApp(null); // Clear editing state
    
    // Switch to 'Todos' or ensure category visibility
    if (selectedCategory !== 'Todos' && selectedCategory !== appToSave.category) {
        setSelectedCategory('Todos');
    }
  };

  const handleEditClick = (app: AppType) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingApp(null);
  };

  const categories = useMemo(() => {
    const uniqueCategories = ['Todos', ...new Set(apps.map(app => app.category))];
    return uniqueCategories;
  }, [apps]);

  const filteredApps = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return apps;
    }
    return apps.filter(app => app.category === selectedCategory);
  }, [selectedCategory, apps]);

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans antialiased">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center my-16 md:my-24">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Bienvenido a IA DIVISION WorkSpace
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre, descarga y revoluciona tu fuerza de trabajo con nuestra selección de herramientas de inteligencia artificial de vanguardia.
          </p>
          <a 
            href="#apps" 
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1"
          >
            Explorar Aplicaciones
          </a>
        </section>

        {/* Apps Grid Section */}
        <section id="apps" className="my-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
             <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 md:mb-0">
                Aplicaciones Destacadas
             </h2>
             
             {/* Add App Button */}
             <button
                onClick={() => {
                  setEditingApp(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group"
             >
                <div className="bg-slate-700 group-hover:bg-white/20 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span className="font-semibold text-sm">Instalar App</span>
             </button>
          </div>
          
          {/* Category Filters */}
          <div className="flex justify-center md:justify-start flex-wrap gap-3 md:gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm md:px-6 md:py-2 md:text-base rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 transform hover:-translate-y-0.5 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Updated Grid: More columns (lg:grid-cols-4, xl:grid-cols-5) and smaller gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {isLoading 
              ? Array.from({ length: 5 }).map((_, i) => (
                  <AppCardSkeleton key={i} />
                ))
              : filteredApps.map(app => (
                  <AppCard 
                    key={app.id} 
                    app={app} 
                    onEdit={handleEditClick} 
                  />
                ))
            }
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Modal - Reused for Add and Edit */}
      <AddAppModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveApp}
        initialData={editingApp}
      />
    </div>
  );
};

export default App;
