import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './i18n'
import 'leaflet/dist/leaflet.css'
import './App.css'
import App from './App'

// Leaflet's default Icon resolves marker image URLs at runtime relative to the
// page, which 404s when the app is served under a non-root base path (e.g.
// GitHub Pages: /selin-ozyurt-website/). Importing the images lets Vite emit
// hashed assets under the configured base and wire the URLs in explicitly.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
