import { extendTheme } from '@chakra-ui/react'

// ─────────────────────────────────────────────────────────────
// Paleta Ramiro Gonzalez Sales — tomada del Hero (placa original).
//
//  · Celeste     → color de ACCIÓN y MARCA: líneas, bordes, outlines,
//                  cifras destacadas, hovers.
//  · Azul JDT    → acento profundo (camiseta): fondos de énfasis.
//  · Negro tinta → FONDO: negro con matiz azulado, donde el celeste
//                  y el blanco hueso destacan sin competir.
//  · Hueso       → texto principal (blanco frío, no puro).
// ─────────────────────────────────────────────────────────────
const brand = {
  // ── Tokens principales (usar estos en código nuevo) ──
  celeste:      '#4CB8F2', // celeste de la placa (líneas, nodos, outlines)
  celesteLight: '#8AD3FA', // celeste claro (hovers, highlights)
  celesteDark:  '#1E7FB8', // celeste profundo (estados activos, gradientes)
  azul:         '#1B3F8F', // azul camiseta JDT (fondos de énfasis)
  azulDeep:     '#0E2350', // azul noche (bordes, gradientes)
  ink:          '#05080C', // fondo principal — negro azulado
  carbon:       '#0B1118', // paneles / tarjetas elevadas
  humo:         '#16202B', // bordes neutros / divisores sólidos
  bone:         '#EEF3F7', // texto principal
  gray:         '#8C9AA6', // texto secundario
  linea:        'rgba(120,190,235,0.16)', // divisores sutiles
  celesteAlpha: 'rgba(76,184,242,0.12)',  // bg de hover celeste
  glow:         'rgba(76,184,242,0.18)',  // halos / glow de fondo

  // ── Alias legacy (nombres heredados del template de jugador) ──
  // Mapean la nomenclatura vieja a la paleta nueva para que las
  // secciones existentes se re-tinten sin refactor masivo.
  // Se irán eliminando a medida que rehagamos cada sección.
  brown:       '#4CB8F2',               // acento activo → celeste
  brownDark:   '#14496B',               // bordes oscuros → celeste profundo apagado
  brownLight:  '#8AD3FA',               // → celeste claro
  amber:       '#4CB8F2',               // bordes / headings → celeste
  amber2:      'rgba(76,184,242,0.55)', // bordes laterales → celeste translúcido
  amberDark:   '#1E7FB8',
  amberLight:  'rgba(76,184,242,0.30)', // bordes suaves → celeste translúcido
  dorado:      '#8AD3FA',
  orange:      '#1E7FB8',               // hover de botones
  orangeDark:  '#14496B',
  orangeLight: '#8AD3FA',
  dark:        '#05080C',               // fondo → negro tinta
  dark2:       '#B4C0CA',
  dark3:       'rgba(5,8,12,0.72)',     // navbar translúcida
  gray2:       '#8AD3FA',               // detalle (underscores, hovers)
  boneWarm:    '#8AD3FA',               // kickers de sección
  rec:         '#E5484D',               // indicador rojo vivo
  rose:        '#8AD3FA',
  panel:       '#0B1118',
  accent:      '#4CB8F2',
  accentDeep:  '#1E7FB8',
  accentMid:   '#4CB8F2',
  bgRef:       'rgba(76,184,242,0.10)', // bg de hover en cajas
}

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading: `'Bebas Neue', 'Arial Narrow', sans-serif`,
    body:    `'Barlow', system-ui, sans-serif`,
    mono:    `'Barlow Condensed', 'Arial Narrow', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.ink,
        color: brand.bone,
        overflowX: 'hidden',
      },
      '::selection': {
        bg: brand.celeste,
        color: brand.ink,
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.ink },
      '::-webkit-scrollbar-thumb': { bg: brand.celeste, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
