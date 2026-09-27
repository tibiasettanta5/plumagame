import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nProvider } from './i18n'
import { SeoHead } from './shared/SeoHead'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SeoHead />
      <App />
    </I18nProvider>
  </StrictMode>,
)
