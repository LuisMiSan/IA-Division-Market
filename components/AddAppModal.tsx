
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
    type: 'app' as 'app' | 'web',
    name: '',
    category: '',
    description: '',
    icon: '',
    coverUrl: '',
    demoUrl: '#',
    downloadUrl: '#'
  });

  const [imageError, setImageError] = useState(false);
  const [iconError, setIconError] = useState(false);

  // Populate form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        type: initialData.type || 'app',
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
        type: 'app',
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

  // Reset image error states when URLs change
  useEffect(() => {
    setImageError(false);
  }, [formData.coverUrl]);

  useEffect(() => {
    setIconError(false);
  }, [formData.icon]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.category) return;

    const newApp: App = {
      id: initialData ? initialData.id : Date.now(), // Preserve ID if editing
      type: formData.type,
      name: formData.name,
      category: formData.category,
      description: formData.description || 'Sin descripción',
      icon: formData.icon || 'https://cdn-icons-png.flaticon.com/512/3269/3269817.png', // Default icon
      coverUrl: formData.coverUrl || undefined, // Store as undefined if empty
      demoUrl: formData.demoUrl,
      downloadUrl: formData.downloadUrl
    };

    onSave(newApp);
    
    if (!initialData) {
        setFormData({
            type: 'app',
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

  const defaultIcon = 'https://cdn-icons-png.flaticon.com/512/3269/3269817.png';

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
            <h3 className="text-xl font-bold text-white">{initialData ? 'Editar Elemento' : 'Añadir Nuevo'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Type Selector */}
            <div className="bg-slate-800 p-1 rounded-lg flex">
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'app'})}
                    className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${
                        formData.type === 'app' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Aplicación
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'web'})}
                    className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${
                        formData.type === 'web' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Sitio Web / Landing
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
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
                    placeholder="Ej. Productividad, Portafolio..."
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL del Icono</label>
                <div className="flex gap-3 items-center">
                    <input 
                        type="text" 
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                        placeholder="https://ejemplo.com/icono.png"
                        value={formData.icon}
                        onChange={e => setFormData({...formData, icon: e.target.value})}
                    />
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 overflow-hidden flex-shrink-0 flex items-center justify-center">
                         <img 
                            src={formData.icon || defaultIcon} 
                            alt="icon preview" 
                            className={`w-full h-full object-cover ${iconError ? 'opacity-50' : ''}`}
                            onError={() => setIconError(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Sección Cover URL con Vista Previa */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                 <label className="block text-sm font-bold text-blue-400 mb-2">
                    Imagen de Portada / Preview
                 </label>
                 <input 
                     type="text" 
                     className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-600 text-sm"
                     placeholder="Ej: https://misitio.com/imagen.jpg"
                     value={formData.coverUrl}
                     onChange={e => setFormData({...formData, coverUrl: e.target.value})}
                 />
                 <p className="text-xs text-gray-500 mt-2">
                    Recomendado para Landing Pages. Formato (4:3 o 16:9).
                 </p>

                 {/* Vista Previa */}
                 {formData.coverUrl && (
                     <div className="mt-5 flex flex-col items-center">
                        <div className="relative w-full aspect-video rounded-xl border-2 border-slate-600 bg-black overflow-hidden shadow-2xl flex items-center justify-center group">
                            {imageError ? (
                                <p className="text-xs text-red-400">Error de carga</p>
                            ) : (
                                <img 
                                    src={formData.coverUrl} 
                                    alt="Cover Preview" 
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            )}
                        </div>
                     </div>
                 )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        URL Demo / Visitar
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                        value={formData.demoUrl}
                        onChange={e => setFormData({...formData, demoUrl: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        URL Descarga {formData.type === 'web' && '(Opcional)'}
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                        value={formData.downloadUrl}
                        onChange={e => setFormData({...formData, downloadUrl: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                <textarea 
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                    placeholder="Breve descripción..."
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
                    {initialData ? 'Guardar Cambios' : 'Crear'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppModal;
