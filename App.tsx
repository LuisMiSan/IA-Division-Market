import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import AppCard from './components/AppCard';
import Footer from './components/Footer';
import { APPS } from './constants';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const uniqueCategories = ['Todos', ...new Set(APPS.map(app => app.category))];
    return uniqueCategories;
  }, []);

  const filteredApps = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return APPS;
    }
    return APPS.filter(app => app.category === selectedCategory);
  }, [selectedCategory, APPS]);

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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Aplicaciones Destacadas
          </h2>
          
          {/* Category Filters */}
          <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-12">
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
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;