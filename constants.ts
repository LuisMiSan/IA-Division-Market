
import { App } from './types';

export const LOGO_BASE64 = 'data:image/png;base64,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';

export const APPS: App[] = [
  {
    id: 1,
    name: 'Quantum Writer',
    category: 'Productividad',
    description: 'Un asistente de escritura con IA que te ayuda a redactar correos, artículos y más en segundos.',
    icon: 'https://picsum.photos/seed/quantum/100',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Visionary Art',
    category: 'Diseño',
    description: 'Genera imágenes y arte espectaculares a partir de descripciones de texto simples.',
    icon: 'https://picsum.photos/seed/visionary/100',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Code Companion',
    category: 'Desarrollo',
    description: 'Tu compañero de programación IA que autocompleta código y encuentra errores.',
    icon: 'https://picsum.photos/seed/code/100',
    downloadUrl: '#',
  },
  {
    id: 4,
    name: 'Synth Speak',
    category: 'Audio',
    description: 'Clona voces y genera audio realista para videos, podcasts y audiolibros.',
    icon: 'https://picsum.photos/seed/synth/100',
    downloadUrl: '#',
  },
  {
    id: 5,
    name: 'Market Analyzer',
    category: 'Finanzas',
    description: 'Analiza tendencias del mercado y obtén predicciones financieras con IA avanzada.',
    icon: 'https://picsum.photos/seed/market/100',
    downloadUrl: '#',
  },
  {
    id: 6,
    name: 'Mind Map AI',
    category: 'Educación',
    description: 'Crea mapas mentales y organiza tus ideas de forma inteligente y automática.',
    icon: 'https://picsum.photos/seed/mindmap/100',
    downloadUrl: '#',
  },
  {
    id: 7,
    name: 'Fitness AI Coach',
    category: 'Salud',
    description: 'Tu entrenador personal virtual que crea rutinas de ejercicio y dietas personalizadas.',
    icon: 'https://picsum.photos/seed/fitness/100',
    downloadUrl: '#',
  },
  {
    id: 8,
    name: 'Game Weaver',
    category: 'Entretenimiento',
    description: 'Diseña niveles y personajes para tus juegos con la ayuda de la inteligencia artificial.',
    icon: 'https://picsum.photos/seed/game/100',
    downloadUrl: '#',
  },
  {
    id: 9,
    name: 'Legal Eagle AI',
    category: 'Negocios',
    description: 'Simplifica la jerga legal y genera documentos contractuales básicos con IA.',
    icon: 'https://picsum.photos/seed/legal/100',
    downloadUrl: '#',
  },
];
