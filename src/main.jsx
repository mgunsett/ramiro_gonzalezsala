import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import theme from './theme'
import App from './App'
import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration:       1.2,
  easing:         (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation:    'vertical',
  smoothWheel:    true,
  wheelMultiplier: 1,
})

window.__lenis = lenis
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Recalcular posiciones de ScrollTrigger cuando cambia la altura de la página
// (imágenes que terminan de cargar, fuentes, etc.). Sin esto, las animaciones
// de las secciones de abajo pueden dispararse tarde o no dispararse.
let stRefresh
const scheduleRefresh = () => {
  clearTimeout(stRefresh)
  stRefresh = setTimeout(() => ScrollTrigger.refresh(), 200)
}
window.addEventListener('load', scheduleRefresh)
document.fonts?.ready?.then(scheduleRefresh)
if ('ResizeObserver' in window) new ResizeObserver(scheduleRefresh).observe(document.body)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
