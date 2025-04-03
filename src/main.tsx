
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root on DOMContentLoaded for better performance
const initApp = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Check if the document is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
