import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import ScrollToTop from './ScrollToTop.jsx';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <HashRouter>
  <ScrollToTop />
  <StrictMode>
    
    <App />
  
  </StrictMode>
  </HashRouter>
)
