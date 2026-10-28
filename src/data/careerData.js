// ─────────────────────────────────────────────────────────────
// TRAYECTORIA · un "capítulo" por club.
// ⚠️ Textos EXACTOS de las placas del portfolio original.
//    No corregir ortografía ni cifras sin autorización del cliente
//    (ej.: "TAKZIM", "TITULOS", "porterias").
//
// Segmentos de texto: { t: 'texto', hl: true } → resaltado (color del club)
//                     { t: 'texto', b: true }  → negrita
//                     { t: 'texto', big: true } → cifra grande
//                     { t: 'texto', small: true } → texto chico/gris
// ─────────────────────────────────────────────────────────────

// Johor Darul Ta'zim FC
import jdtCrest from '@assets/jdt/crest.webp'
import jdtPhoto from '@assets/jdt/ramiro_jdt.webp'
import trMsl from '@assets/jdt/msl.webp'
import trFa from '@assets/jdt/fa.webp'
import trMc from '@assets/jdt/mc.webp'
import trCs from '@assets/jdt/cs.webp'

// Club Atlético Tucumán
import catCrest from '@assets/cat/crest.webp'
import catPhoto1 from '@assets/cat/ramiro_cat_1.webp'
import catPhoto2 from '@assets/cat/ramiro_cat_2.webp'

// Posiciones de las pizarras (x %, y %; ataque hacia arriba, arquero abajo)
const FORMATIONS = {
  '4-3-3':   [[50, 92], [14, 74], [37, 78], [63, 78], [86, 74], [28, 52], [50, 55], [72, 52], [22, 25], [50, 20], [78, 25]],
  '3-4-3':   [[50, 92], [26, 77], [50, 79], [74, 77], [12, 52], [38, 54], [62, 54], [88, 52], [24, 25], [50, 20], [76, 25]],
  '3-5-2':   [[50, 92], [26, 77], [50, 79], [74, 77], [10, 50], [32, 54], [50, 62], [68, 54], [90, 50], [38, 26], [62, 26]],
  '4-2-3-1': [[50, 92], [14, 74], [37, 78], [63, 78], [86, 74], [36, 62], [64, 62], [18, 40], [50, 42], [82, 40], [50, 20]],
}

export const careerData = [
  {
    id: 'jdt',
    accent: '#E8304A', // rojo JDT (resaltados de la placa)
    titleOutline: 'JOHOR DARUL',
    titleSolid: 'TAKZIM FC',
    role: 'Entrenador Asistente',
    from: 'Diciembre 2020',
    to: 'Marzo 2025',
    crest: jdtCrest,
    crestAlt: 'Escudo de Johor Darul Ta’zim FC',
    totals: { matches: 167, titles: 13 }, // "167 PARTIDOS | 13 TITULOS"

    functions: [
      [{ t: 'Consolidación de un ' }, { t: 'MODELO DE JUEGO COMPETITIVO Y DOMINANTE.', hl: true }],
      [{ t: 'DISEÑO Y EJECUCIÓN', hl: true }, { t: ' diaria de sesiones de entrenamiento.' }],
      [{ t: 'PLANIFICACIÓN TÁCTICA, AJUSTES EN PARTIDO Y ANÁLISIS PRE Y POST-COMPETENCIA.', hl: true }],
      [{ t: 'Responsable de ' }, { t: 'ACCIONES A BALÓN PARADO.', hl: true }],
      [{ t: 'COORDINACIÓN DE FUTBOLISTAS', hl: true }, { t: ' entre primer equipo y filial.' }],
      [{ t: 'COORDINACIÓN DEL DEPARTAMENTO DE ANÁLISIS', hl: true }, { t: ' (2022).' }],
      [{ t: 'TALLERES DE TECNIFICACIÓN', hl: true }, { t: ' para el desarrollo individual de futbolistas destacados.' }],
    ],

    trophies: [
      { name: 'Malaysian Super League', count: 4, img: trMsl },
      { name: 'FA CUP', count: 3, img: trFa },
      { name: 'Malaysia Cup', count: 2, img: trMc },
      { name: 'Charity Shield', count: 4, img: trCs },
    ],

    achievements: [
      [{ t: 'Triple Cuádruple Corona', b: true }, { t: ' (2022, 2023, 2024).', small: true }],
      [{ t: 'Tri-Campeón invicto de Liga.', b: true }],
      [{ t: '4 Participaciones en AFC CHAMPIONS LEAGUE.', b: true }],
      [{ t: '85% de los puntos obtenidos.', b: true }],
    ],

    performance: {
      title: 'RENDIMIENTO DEL EQUIPO',
      photo: jdtPhoto,
      photoAlt: 'Ramiro Gonzalez Sales dando indicaciones en un entrenamiento de Johor Darul Ta’zim FC',
      items: [
        [{ t: '138', big: true }, { t: ' victorias', b: true }, { t: ' (167 partidos)' }],
        [{ t: '500', big: true }, { t: ' GF', b: true }, { t: ' (3,0 por partido)' }],
        [{ t: '97', big: true }, { t: ' GC', b: true }, { t: ' (0,58 por partido)' }],
        [{ t: 'DG total: ', b: true }, { t: '+403', big: true }],
        [{ t: '99', big: true }, { t: ' porterias a cero', b: true }],
      ],
    },

    streaks: {
      title: 'RACHAS DESTACADAS',
      items: [
        { text: [{ t: 'MAYOR RACHA INVICTA', hl: true }, { t: ' EN LA SUPERLIGA DE MALASIA' }], value: 82, unit: 'PARTIDOS' },
        { text: [{ t: 'MAYOR RACHA INVICTA COMO VISITANTE', hl: true }, { t: ' EN SUPERLIGA' }], value: 72, unit: 'PARTIDOS' },
      ],
    },
  },
  {
    id: 'cat',
    accent: '#4CB8F2', // celeste Atlético Tucumán
    titleOutline: 'CLUB ATLÉTICO',
    titleSolid: 'TUCUMÁN',
    role: 'DIRECTOR TÉCNICO – DIVISIÓN RESERVA',
    from: 'DICIEMBRE 2025',
    between: '–',
    to: 'ACTUALIDAD',
    crest: catCrest,
    crestAlt: 'Escudo de Club Atlético Tucumán',
    tagline: 'DESARROLLO COMPETITIVO, PROFESIONALIZACIÓN E IDENTIDAD DE JUEGO EN CONTEXTOS DE ALTA EXIGENCIA.',

    paragraphs: [
      [{ t: 'Conducción integral del ' }, { t: 'proyecto de Reserva', b: true }, { t: ', promoviendo estándares profesionales de ' }, { t: 'trabajo, competitividad y desarrollo individual', b: true }, { t: ' dentro de una estructura de formación orientada al ' }, { t: 'alto rendimiento.', b: true }],
      [{ t: 'Construcción de una ' }, { t: 'identidad de juego', b: true }, { t: ' basada en ' }, { t: 'presión alta, intensidad competitiva, salida limpia desde campo propio y juego combinativo agresivo,', b: true }, { t: ' buscando protagonismo en todas las canchas.' }],
      [{ t: 'Equipo ' }, { t: 'competitivo', b: true }, { t: ' durante todo el campeonato, ' }, { t: 'alcanzando posiciones de liderazgo y manteniéndose en la lucha por la clasificación en un campeonato de máxima exigencia y paridad.', b: true }],
      [{ t: 'Coordinación ' }, { t: 'metodológica y operativa', b: true }, { t: ' con ' }, { t: 'Primera División e Inferiores', b: true }, { t: ', fortaleciendo procesos de ' }, { t: 'transición y desarrollo de futbolistas dentro de la estructura institucional.', b: true }],
      [{ t: 'Experiencia en ' }, { t: 'gestión de grupos juveniles de alta complejidad,', b: true }, { t: ' integrando futbolistas de distintos contextos ' }, { t: 'sociales, culturales y competitivos.', b: true }],
      [{ t: 'Conducción interina del plantel profesional de ' }, { t: 'Primera División', b: true }, { t: ' durante proceso de transición institucional.' }],
    ],
    paragraphsPhoto: { src: catPhoto1, alt: 'Ramiro Gonzalez Sales con la indumentaria de Atlético Tucumán' },

    responsibilities: {
      title: 'Responsabilidades principales:',
      items: [
        'Planificación semanal y diseño de microciclos.',
        'Diseño y conducción de entrenamientos.',
        'Análisis de rivales y análisis propio.',
        'Gestión de cargas y monitoreo GPS.',
        'Estrategias de balón parado.',
        'Desarrollo individual de futbolistas.',
        'Liderazgo integral de grupo y cuerpo técnico.',
      ],
    },

    tactics: {
      title: 'SISTEMAS TÁCTICOS IMPLEMENTADOS',
      photo: catPhoto2,
      photoAlt: 'Ramiro Gonzalez Sales dando indicaciones desde el borde del campo',
      systems: ['4-3-3', '3-4-3', '3-5-2', '4-2-3-1'].map((name) => ({ label: 'Sistema', name, positions: FORMATIONS[name] })),
    },
  },
]
