
import { App } from './types';

// A clean white CPU/Chip icon in Base64 SVG
export const LOGO_BASE64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgLz48cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiByeD0iMSIgLz48cGF0aCBkPSJNMTUgMnYyIiAvPjxwYXRoIGQ9Ik0xNSAyMnYtMiIgLz48cGF0aCBkPSJNOSAydjIiIC8+PHBhdGggZD0iTTkgMjJ2LTIiIC8+PHBhdGggZD0iTTIgMTVoMiIgLz48cGF0aCBkPSJNMjIgMTVoLTIiIC8+PHBhdGggZD0iTTIgOWgyIiAvPjxwYXRoIGQ9Ik0yMiA5aC0yIiAvPjwvc3ZnPg==';

export const APPS: App[] = [
  {
    id: 1,
    name: "NeuroWrite",
    category: "Productividad",
    description: "Asistente de redacción inteligente que adapta el tono y estilo a tu marca personal para correos y blogs.",
    icon: "https://cdn-icons-png.flaticon.com/512/6108/6108856.png",
    downloadUrl: "#",
    demoUrl: "#"
  },
  {
    id: 2,
    name: "PixelGenius",
    category: "Diseño",
    description: "Crea arte conceptual y activos de juegos en segundos con nuestra IA generativa de imágenes de alta fidelidad.",
    icon: "https://cdn-icons-png.flaticon.com/512/6840/6840494.png",
    downloadUrl: "#",
    demoUrl: "#"
  },
  {
    id: 3,
    name: "CodeSynthesizer",
    category: "Desarrollo",
    description: "Completa, refactoriza y documenta tu código automáticamente en tiempo real dentro de tu IDE favorito.",
    icon: "https://cdn-icons-png.flaticon.com/512/2010/2010990.png",
    downloadUrl: "#",
    demoUrl: "#"
  },
  {
    id: 4,
    name: "MarketSense",
    category: "Negocios",
    description: "Predice tendencias de mercado y comportamiento del consumidor con análisis predictivo de Big Data.",
    icon: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
    downloadUrl: "#",
    demoUrl: "#"
  },
  {
    id: 5,
    name: "LinguaFlow",
    category: "Educación",
    description: "Tutor de idiomas personalizado que conversa contigo en tiempo real para mejorar tu fluidez y pronunciación.",
    icon: "https://cdn-icons-png.flaticon.com/512/3269/3269817.png",
    downloadUrl: "#",
    demoUrl: "#"
  },
  {
    id: 6,
    name: "HealthScan AI",
    category: "Salud",
    description: "Analiza síntomas y sugiere diagnósticos preliminares basados en literatura médica reciente y segura.",
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    downloadUrl: "#",
    demoUrl: "#"
  }
];
