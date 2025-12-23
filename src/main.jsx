import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext' // <--- 1. Import this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider> {/* <--- 2. Wrap the App component here */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)