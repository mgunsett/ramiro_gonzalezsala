// ─────────────────────────────────────────────────────────────
// FORMACIÓN · textos EXACTOS de las placas del portfolio original.
// (Única corrección autorizada por el cliente: "Diplomatura en
//  Entrenamiento Sistemático", que en la placa figuraba con errores.)
// ─────────────────────────────────────────────────────────────

import collage from '@assets/formacion/collage.webp'
import hudl from '@assets/software/hudl.webp'
import wyscout from '@assets/software/wyscout.webp'
import instat from '@assets/software/instat.webp'
import keynote from '@assets/software/keynote.webp'
import catapult from '@assets/software/catapult.webp'
import nacsport from '@assets/software/nacsport.webp'
import klipdraw from '@assets/software/klipdraw.webp'
import efficiency from '@assets/software/efficiency.webp'

export const formation = {
  title: ['FORMACIÓN', 'ACADÉMICA'],
  collage,
  collageAlt: 'Ramiro Gonzalez Sales en su graduación, junto a su credencial de Licencia PRO CONMEBOL y la carta de reconocimiento de la AFC',

  degrees: [
    { title: 'Master en Dirección Técnica de Fútbol y Metodologías del Juego', detail: 'Real Madrid - Universidad Europea (2023-2024)' },
    { title: 'Licencia CONMEBOL PRO', detail: 'Escuela de Entrenadores Cesar Luis Menotti (2020-2023)' },
    { title: 'Licencia AFC PRO Recc', detail: 'Confederación Asiática de Fútbol (2024)' },
    { title: 'Licencia UEFA B', detail: 'Federación Alemana de Fútbol (2025)' },
    { title: 'Abogacía', detail: 'Universidad Siglo XXI (2025)' },
  ],

  languages: {
    title: 'MIS IDIOMAS',
    items: [
      { name: 'Español', flag: 'ES' },
      { name: 'Inglés', flag: 'UK' },
      { name: 'Italiano', flag: 'IT' },
    ],
  },

  software: {
    title: 'COMPETENCIAS TÉCNICAS',
    items: [
      { name: 'Hudl Sportscode', logo: hudl },
      { name: 'Wyscout', logo: wyscout },
      { name: 'InStat', logo: instat },
      { name: 'Keynote', logo: keynote },
      { name: 'Catapult', logo: catapult },
      { name: 'Nacsport', logo: nacsport },
      { name: 'KlipDraw', logo: klipdraw },
      { name: 'Efficiency Match Sports', logo: efficiency },
    ],
  },

  courses: {
    title: 'CURSOS Y ESPECIALIZACIONES',
    items: [
      'Diplomatura en Entrenamiento Sistemático.',
      'Especialización en Derecho Deportivo.',
      'Estrategias avanzadas en ABP.',
      'Liderazgo y gestión de equipos.',
      'Master en Juego de Posición.',
      'Coaching y técnicas conductuales.',
    ],
  },
}
