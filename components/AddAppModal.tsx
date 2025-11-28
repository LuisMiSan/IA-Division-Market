
import React, { useState, useEffect } from 'react';
import { App } from '../types';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: App) => void;
  initialData?: App | null;
}

const AddAppModal: React.FC<AddAppModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    icon: '',
    coverUrl: '',
    demoUrl: '#',
    downloadUrl: '#'
  });

  // Populate form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        description: initialData.description,
        icon: initialData.icon,
        coverUrl: initialData.coverUrl || '',
        demoUrl: initialData.demoUrl,
        downloadUrl: initialData.downloadUrl
      });
    } else if (isOpen && !initialData) {
      // Reset if opening in "Add New" mode
      setFormData({
        name: '',
        category: '',
        description: '',
        icon: '',
        coverUrl: '',
        demoUrl: '#',
        downloadUrl: '#'
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.category) return;

    const newApp: App = {
      id: initialData ? initialData.id : Date.now(), // Preserve ID if editing
      name: formData.name,
      category: formData.category,
      description: formData.description || 'Sin descripción',
      icon: formData.icon || 'https://cdn-icons-png.flaticon.com/512/3269/3269817.png', // Default icon
      coverUrl: formData.coverUrl || undefined, // Store as undefined if empty
      demoUrl: formData.demoUrl,
      downloadUrl: formData.downloadUrl
    };

    onSave(newApp);
    
    // Only clear if adding new, logic handled in useEffect mostly but safe to reset here
    if (!initialData) {
        setFormData({
            name: '',
            category: '',
            description: '',
            icon: '',
            coverUrl: '',
            demoUrl: '#',
            downloadUrl: '#'
        });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
            <h3 className="text-xl font-bold text-white">{initialData ? 'Editar App' : 'Instalar Nueva App'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre de la App</label>
                <input 
                    type="text" 
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                    placeholder="Ej. SuperBot AI"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
                <input 
                    type="text" 
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                    placeholder="Ej. Productividad, Diseño..."
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL del Icono</label>
                <input 
                    type="text" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                    placeholder="https://ejemplo.com/icono.png"
                    value={formData.icon}
                    onChange={e => setFormData({...formData, icon: e.target.value})}
                />
            </div>

            {/* Sección Cover URL mejorada con Vista Previa */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                 <label className="block text-sm font-bold text-blue-400 mb-2">
                    URL de la Imagen de Portada (Cover)
                 </label>
                 <input 
                     type="text" 
                     className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-600 text-sm"
                     placeholder="Ej: https://misitio.com/imagen-vertical.jpg"
                     value={formData.coverUrl}
                     onChange={e => setFormData({...formData, coverUrl: e.target.value})}
                 />
                 <p className="text-xs text-gray-500 mt-2">
                    Pega aquí la URL directa de la imagen. Se recomienda formato vertical (9:16).
                 </p>

                 {/* Vista Previa para verificar que la URL funciona */}
                 {formData.coverUrl && (
                     <div className="mt-4 flex flex-col items-center p-3 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[10px] uppercase font-bold text-gray-500 mb-2 tracking-wider">Vista Previa</span>
                        <div className="relative w-[85px] h-[150px] rounded border border-slate-700 bg-black overflow-hidden shadow-lg">
                            <img 
                                src={formData.coverUrl} 
                                alt="Cover Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    // Could show an error message here if needed
                                }}
                            />
                        </div>
                     </div>
                 )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                <textarea 
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                    placeholder="Breve descripción de lo que hace la app..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div className="pt-4 flex gap-3">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 font-bold"
                >
                    {initialData ? 'Guardar Cambios' : 'Instalar App'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppModal;
