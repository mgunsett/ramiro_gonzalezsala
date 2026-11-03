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
  title: { es: ['FORMACIÓN', 'ACADÉMICA'], en: ['ACADEMIC', 'BACKGROUND'], it: ['FORMAZIONE', 'ACCADEMICA'] },
  collage,
  collageAlt: {
    es: 'Ramiro Gonzalez Sales en su graduación, junto a su credencial de Licencia PRO CONMEBOL y la carta de reconocimiento de la AFC',
    en: 'Ramiro Gonzalez Sales at his graduation, alongside his CONMEBOL PRO Licence credential and the AFC letter of recognition',
    it: 'Ramiro Gonzalez Sales alla sua laurea, accanto al tesserino della Licenza PRO CONMEBOL e alla lettera di riconoscimento dell’AFC',
  },

  degrees: [
    {
      title: {
        es: 'Master en Dirección Técnica de Fútbol y Metodologías del Juego',
        en: 'Master’s in Football Coaching and Game Methodologies',
        it: 'Master in Direzione Tecnica Calcistica e Metodologie di Gioco',
      },
      detail: {
        es: 'Real Madrid - Universidad Europea (2023-2024)',
        en: 'Real Madrid - Universidad Europea (2023-2024)',
        it: 'Real Madrid - Universidad Europea (2023-2024)',
      },
    },
    {
      title: { es: 'Licencia CONMEBOL PRO', en: 'CONMEBOL PRO Licence', it: 'Licenza CONMEBOL PRO' },
      detail: {
        es: 'Escuela de Entrenadores Cesar Luis Menotti (2020-2023)',
        en: 'Cesar Luis Menotti Coaching School (2020-2023)',
        it: 'Scuola Allenatori Cesar Luis Menotti (2020-2023)',
      },
    },
    {
      title: { es: 'Licencia AFC PRO Recc', en: 'AFC PRO Licence (Recognition)', it: 'Licenza AFC PRO Recc' },
      detail: {
        es: 'Confederación Asiática de Fútbol (2024)',
        en: 'Asian Football Confederation (2024)',
        it: 'Confederazione Calcistica Asiatica (2024)',
      },
    },
    {
      title: { es: 'Licencia UEFA B', en: 'UEFA B Licence', it: 'Licenza UEFA B' },
      detail: {
        es: 'Federación Alemana de Fútbol (2025)',
        en: 'German Football Association (2025)',
        it: 'Federazione Calcistica Tedesca (2025)',
      },
    },
    {
      title: { es: 'Abogacía', en: 'Law Degree', it: 'Laurea in Giurisprudenza' },
      detail: { es: 'Universidad Siglo XXI (2025)', en: 'Siglo 21 University (2025)', it: 'Università Siglo XXI (2025)' },
    },
  ],

  languages: {
    title: { es: 'MIS IDIOMAS', en: 'MY LANGUAGES', it: 'LE MIE LINGUE' },
    items: [
      { name: { es: 'Español', en: 'Spanish', it: 'Spagnolo' }, flag: 'ES' },
      { name: { es: 'Inglés', en: 'English', it: 'Inglese' }, flag: 'UK' },
      { name: { es: 'Italiano', en: 'Italian', it: 'Italiano' }, flag: 'IT' },
    ],
  },

  software: {
    title: { es: 'COMPETENCIAS TÉCNICAS', en: 'TECHNICAL SKILLS', it: 'COMPETENZE TECNICHE' },
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
    title: { es: 'CURSOS Y ESPECIALIZACIONES', en: 'COURSES AND SPECIALISATIONS', it: 'CORSI E SPECIALIZZAZIONI' },
    items: {
      es: [
        'Diplomatura en Entrenamiento Sistemático.',
        'Especialización en Derecho Deportivo.',
        'Estrategias avanzadas en ABP.',
        'Liderazgo y gestión de equipos.',
        'Master en Juego de Posición.',
        'Coaching y técnicas conductuales.',
      ],
      en: [
        'Diploma in Systemic Training.',
        'Specialisation in Sports Law.',
        'Advanced set-piece strategies.',
        'Team leadership and management.',
        'Master’s in Positional Play.',
        'Coaching and behavioural techniques.',
      ],
      it: [
        'Diploma in Allenamento Sistemico.',
        'Specializzazione in Diritto Sportivo.',
        'Strategie avanzate sulle palle inattive.',
        'Leadership e gestione dei gruppi.',
        'Master in Gioco di Posizione.',
        'Coaching e tecniche comportamentali.',
      ],
    },
  },
}
