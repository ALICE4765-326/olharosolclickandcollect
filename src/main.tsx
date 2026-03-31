import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useAuth } from './hooks/useAuth';
import App from './App.tsx';
import './index.css';

import { initGoogleMaps } from './lib/googleMaps';

// Safe initialization
try {
  // Initialize auth state
  const { initializeAuth } = useAuth.getState();
  initializeAuth();
  
  // Initialize Google Maps
  initGoogleMaps();
} catch (error) {
  console.error('❌ Error during initialization:', error);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Service Worker for 0ms image loading
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration failed:', err);
    });
  });
}
