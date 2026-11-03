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
    role: { es: 'Entrenador Asistente', en: 'Assistant Coach', it: 'Allenatore in seconda' },
    from: { es: 'Diciembre 2020', en: 'December 2020', it: 'Dicembre 2020' },
    between: { es: 'hasta', en: 'to', it: 'fino a' },
    to: { es: 'Marzo 2025', en: 'March 2025', it: 'Marzo 2025' },
    crest: jdtCrest,
    crestAlt: { es: 'Escudo de Johor Darul Ta’zim FC', en: 'Johor Darul Ta’zim FC crest', it: 'Stemma del Johor Darul Ta’zim FC' },
    totals: { matches: 167, titles: 13 }, // "167 PARTIDOS | 13 TITULOS"

    functions: [
      {
        es: [{ t: 'Consolidación de un ' }, { t: 'MODELO DE JUEGO COMPETITIVO Y DOMINANTE.', hl: true }],
        en: [{ t: 'Consolidation of a ' }, { t: 'COMPETITIVE AND DOMINANT GAME MODEL.', hl: true }],
        it: [{ t: 'Consolidamento di un ' }, { t: 'MODELLO DI GIOCO COMPETITIVO E DOMINANTE.', hl: true }],
      },
      {
        es: [{ t: 'DISEÑO Y EJECUCIÓN', hl: true }, { t: ' diaria de sesiones de entrenamiento.' }],
        en: [{ t: 'DAILY DESIGN AND DELIVERY', hl: true }, { t: ' of training sessions.' }],
        it: [{ t: 'PROGETTAZIONE E CONDUZIONE', hl: true }, { t: ' quotidiana delle sedute di allenamento.' }],
      },
      {
        es: [{ t: 'PLANIFICACIÓN TÁCTICA, AJUSTES EN PARTIDO Y ANÁLISIS PRE Y POST-COMPETENCIA.', hl: true }],
        en: [{ t: 'TACTICAL PLANNING, IN-GAME ADJUSTMENTS AND PRE- AND POST-MATCH ANALYSIS.', hl: true }],
        it: [{ t: 'PIANIFICAZIONE TATTICA, CORREZIONI IN PARTITA E ANALISI PRE E POST-GARA.', hl: true }],
      },
      {
        es: [{ t: 'Responsable de ' }, { t: 'ACCIONES A BALÓN PARADO.', hl: true }],
        en: [{ t: 'In charge of ' }, { t: 'SET PIECES.', hl: true }],
        it: [{ t: 'Responsabile delle ' }, { t: 'PALLE INATTIVE.', hl: true }],
      },
      {
        es: [{ t: 'COORDINACIÓN DE FUTBOLISTAS', hl: true }, { t: ' entre primer equipo y filial.' }],
        en: [{ t: 'PLAYER COORDINATION', hl: true }, { t: ' between the first team and the reserve side.' }],
        it: [{ t: 'COORDINAMENTO DEI CALCIATORI', hl: true }, { t: ' tra prima squadra e squadra riserve.' }],
      },
      {
        es: [{ t: 'COORDINACIÓN DEL DEPARTAMENTO DE ANÁLISIS', hl: true }, { t: ' (2022).' }],
        en: [{ t: 'HEAD OF THE ANALYSIS DEPARTMENT', hl: true }, { t: ' (2022).' }],
        it: [{ t: 'COORDINAMENTO DEL REPARTO ANALISI', hl: true }, { t: ' (2022).' }],
      },
      {
        es: [{ t: 'TALLERES DE TECNIFICACIÓN', hl: true }, { t: ' para el desarrollo individual de futbolistas destacados.' }],
        en: [{ t: 'TECHNICAL SKILLS WORKSHOPS', hl: true }, { t: ' for the individual development of standout players.' }],
        it: [{ t: 'LABORATORI DI PERFEZIONAMENTO TECNICO', hl: true }, { t: ' per lo sviluppo individuale dei calciatori di spicco.' }],
      },
    ],

    trophies: [
      { name: 'Malaysian Super League', count: 4, img: trMsl },
      { name: 'FA CUP', count: 3, img: trFa },
      { name: 'Malaysia Cup', count: 2, img: trMc },
      { name: 'Charity Shield', count: 4, img: trCs },
    ],

    achievements: [
      {
        es: [{ t: 'Triple Cuádruple Corona', b: true }, { t: ' (2022, 2023, 2024).', small: true }],
        en: [{ t: 'Triple Quadruple Crown', b: true }, { t: ' (2022, 2023, 2024).', small: true }],
        it: [{ t: 'Triplo Poker di titoli', b: true }, { t: ' (2022, 2023, 2024).', small: true }],
      },
      {
        es: [{ t: 'Tri-Campeón invicto de Liga.', b: true }],
        en: [{ t: 'Three-time unbeaten League champions.', b: true }],
        it: [{ t: 'Tre volte campioni imbattuti del campionato.', b: true }],
      },
      {
        es: [{ t: '4 Participaciones en AFC CHAMPIONS LEAGUE.', b: true }],
        en: [{ t: '4 AFC CHAMPIONS LEAGUE campaigns.', b: true }],
        it: [{ t: '4 partecipazioni alla AFC CHAMPIONS LEAGUE.', b: true }],
      },
      {
        es: [{ t: '85% de los puntos obtenidos.', b: true }],
        en: [{ t: '85% of available points won.', b: true }],
        it: [{ t: '85% dei punti conquistati.', b: true }],
      },
    ],

    // Las cifras grandes (big) quedan en la misma posición en los 3 idiomas:
    // el contador de GSAP escribe sobre ese nodo.
    performance: {
      title: { es: 'RENDIMIENTO DEL EQUIPO', en: 'TEAM PERFORMANCE', it: 'RENDIMENTO DELLA SQUADRA' },
      photo: jdtPhoto,
      photoAlt: {
        es: 'Ramiro Gonzalez Sales dando indicaciones en un entrenamiento de Johor Darul Ta’zim FC',
        en: 'Ramiro Gonzalez Sales giving instructions during a Johor Darul Ta’zim FC training session',
        it: 'Ramiro Gonzalez Sales dà indicazioni durante un allenamento del Johor Darul Ta’zim FC',
      },
      items: [
        {
          es: [{ t: '138', big: true }, { t: ' victorias', b: true }, { t: ' (167 partidos)' }],
          en: [{ t: '138', big: true }, { t: ' wins', b: true }, { t: ' (167 matches)' }],
          it: [{ t: '138', big: true }, { t: ' vittorie', b: true }, { t: ' (167 partite)' }],
        },
        {
          es: [{ t: '500', big: true }, { t: ' GF', b: true }, { t: ' (3,0 por partido)' }],
          en: [{ t: '500', big: true }, { t: ' GF', b: true }, { t: ' (3.0 per match)' }],
          it: [{ t: '500', big: true }, { t: ' GF', b: true }, { t: ' (3,0 a partita)' }],
        },
        {
          es: [{ t: '97', big: true }, { t: ' GC', b: true }, { t: ' (0,58 por partido)' }],
          en: [{ t: '97', big: true }, { t: ' GA', b: true }, { t: ' (0.58 per match)' }],
          it: [{ t: '97', big: true }, { t: ' GS', b: true }, { t: ' (0,58 a partita)' }],
        },
        {
          es: [{ t: 'DG total: ', b: true }, { t: '+403', big: true }],
          en: [{ t: 'Total GD: ', b: true }, { t: '+403', big: true }],
          it: [{ t: 'DR totale: ', b: true }, { t: '+403', big: true }],
        },
        {
          es: [{ t: '99', big: true }, { t: ' porterias a cero', b: true }],
          en: [{ t: '99', big: true }, { t: ' clean sheets', b: true }],
          it: [{ t: '99', big: true }, { t: ' partite senza subire gol', b: true }],
        },
      ],
    },

    streaks: {
      title: { es: 'RACHAS DESTACADAS', en: 'STANDOUT STREAKS', it: 'STRISCE DA RECORD' },
      items: [
        {
          text: {
            es: [{ t: 'MAYOR RACHA INVICTA', hl: true }, { t: ' EN LA SUPERLIGA DE MALASIA' }],
            en: [{ t: 'LONGEST UNBEATEN RUN', hl: true }, { t: ' IN THE MALAYSIA SUPER LEAGUE' }],
            it: [{ t: 'PIÙ LUNGA STRISCIA DI IMBATTIBILITÀ', hl: true }, { t: ' NELLA SUPER LEAGUE MALESE' }],
          },
          value: 82,
          unit: { es: 'PARTIDOS', en: 'MATCHES', it: 'PARTITE' },
        },
        {
          text: {
            es: [{ t: 'MAYOR RACHA INVICTA COMO VISITANTE', hl: true }, { t: ' EN SUPERLIGA' }],
            en: [{ t: 'LONGEST UNBEATEN AWAY RUN', hl: true }, { t: ' IN THE SUPER LEAGUE' }],
            it: [{ t: 'PIÙ LUNGA IMBATTIBILITÀ IN TRASFERTA', hl: true }, { t: ' IN SUPER LEAGUE' }],
          },
          value: 72,
          unit: { es: 'PARTIDOS', en: 'MATCHES', it: 'PARTITE' },
        },
      ],
    },
  },
  {
    id: 'cat',
    accent: '#4CB8F2', // celeste Atlético Tucumán
    titleOutline: 'CLUB ATLÉTICO',
    titleSolid: 'TUCUMÁN',
    role: { es: 'DIRECTOR TÉCNICO – DIVISIÓN RESERVA', en: 'HEAD COACH – RESERVE DIVISION', it: 'ALLENATORE – SQUADRA RISERVE' },
    from: { es: 'DICIEMBRE 2025', en: 'DECEMBER 2025', it: 'DICEMBRE 2025' },
    between: '–',
    to: { es: 'ACTUALIDAD', en: 'PRESENT', it: 'OGGI' },
    crest: catCrest,
    crestAlt: { es: 'Escudo de Club Atlético Tucumán', en: 'Club Atlético Tucumán crest', it: 'Stemma del Club Atlético Tucumán' },
    tagline: {
      es: 'DESARROLLO COMPETITIVO, PROFESIONALIZACIÓN E IDENTIDAD DE JUEGO EN CONTEXTOS DE ALTA EXIGENCIA.',
      en: 'COMPETITIVE DEVELOPMENT, PROFESSIONALISATION AND A CLEAR PLAYING IDENTITY IN HIGHLY DEMANDING ENVIRONMENTS.',
      it: 'SVILUPPO COMPETITIVO, PROFESSIONALIZZAZIONE E IDENTITÀ DI GIOCO IN CONTESTI AD ALTA ESIGENZA.',
    },

    paragraphs: [
      {
        es: [{ t: 'Conducción integral del ' }, { t: 'proyecto de Reserva', b: true }, { t: ', promoviendo estándares profesionales de ' }, { t: 'trabajo, competitividad y desarrollo individual', b: true }, { t: ' dentro de una estructura de formación orientada al ' }, { t: 'alto rendimiento.', b: true }],
        en: [{ t: 'Full leadership of the ' }, { t: 'Reserve team project', b: true }, { t: ', promoting professional standards of ' }, { t: 'work, competitiveness and individual development', b: true }, { t: ' within a development structure geared towards ' }, { t: 'high performance.', b: true }],
        it: [{ t: 'Guida completa del ' }, { t: 'progetto Riserve', b: true }, { t: ', promuovendo standard professionali di ' }, { t: 'lavoro, competitività e sviluppo individuale', b: true }, { t: ' all’interno di una struttura formativa orientata all’' }, { t: 'alto rendimento.', b: true }],
      },
      {
        es: [{ t: 'Construcción de una ' }, { t: 'identidad de juego', b: true }, { t: ' basada en ' }, { t: 'presión alta, intensidad competitiva, salida limpia desde campo propio y juego combinativo agresivo,', b: true }, { t: ' buscando protagonismo en todas las canchas.' }],
        en: [{ t: 'Building a ' }, { t: 'playing identity', b: true }, { t: ' based on ' }, { t: 'high pressing, competitive intensity, clean build-up from our own half and aggressive combination play,', b: true }, { t: ' seeking to take the initiative at every ground.' }],
        it: [{ t: 'Costruzione di un’' }, { t: 'identità di gioco', b: true }, { t: ' basata su ' }, { t: 'pressing alto, intensità competitiva, uscita pulita dalla propria metà campo e gioco combinativo aggressivo,', b: true }, { t: ' cercando il protagonismo su ogni campo.' }],
      },
      {
        es: [{ t: 'Equipo ' }, { t: 'competitivo', b: true }, { t: ' durante todo el campeonato, ' }, { t: 'alcanzando posiciones de liderazgo y manteniéndose en la lucha por la clasificación en un campeonato de máxima exigencia y paridad.', b: true }],
        en: [{ t: 'A ' }, { t: 'competitive', b: true }, { t: ' team throughout the season, ' }, { t: 'reaching the top of the table and staying in the race for qualification in a highly demanding and evenly matched championship.', b: true }],
        it: [{ t: 'Squadra ' }, { t: 'competitiva', b: true }, { t: ' per tutto il campionato, ' }, { t: 'raggiungendo posizioni di vertice e restando in corsa per la qualificazione in un torneo di massima esigenza ed equilibrio.', b: true }],
      },
      {
        es: [{ t: 'Coordinación ' }, { t: 'metodológica y operativa', b: true }, { t: ' con ' }, { t: 'Primera División e Inferiores', b: true }, { t: ', fortaleciendo procesos de ' }, { t: 'transición y desarrollo de futbolistas dentro de la estructura institucional.', b: true }],
        en: [{ t: '' }, { t: 'Methodological and operational', b: true }, { t: ' coordination with the ' }, { t: 'First Team and Academy', b: true }, { t: ', strengthening the ' }, { t: 'transition and development of players within the club structure.', b: true }],
        it: [{ t: 'Coordinamento ' }, { t: 'metodologico e operativo', b: true }, { t: ' con ' }, { t: 'Prima Squadra e Settore Giovanile', b: true }, { t: ', rafforzando i processi di ' }, { t: 'transizione e sviluppo dei calciatori all’interno della struttura del club.', b: true }],
      },
      {
        es: [{ t: 'Experiencia en ' }, { t: 'gestión de grupos juveniles de alta complejidad,', b: true }, { t: ' integrando futbolistas de distintos contextos ' }, { t: 'sociales, culturales y competitivos.', b: true }],
        en: [{ t: 'Experience in ' }, { t: 'managing complex youth squads,', b: true }, { t: ' integrating players from different ' }, { t: 'social, cultural and competitive backgrounds.', b: true }],
        it: [{ t: 'Esperienza nella ' }, { t: 'gestione di gruppi giovanili di alta complessità,', b: true }, { t: ' integrando calciatori provenienti da contesti ' }, { t: 'sociali, culturali e competitivi diversi.', b: true }],
      },
      {
        es: [{ t: 'Conducción interina del plantel profesional de ' }, { t: 'Primera División', b: true }, { t: ' durante proceso de transición institucional.' }],
        en: [{ t: 'Interim charge of the professional ' }, { t: 'First Team', b: true }, { t: ' during a period of institutional transition.' }],
        it: [{ t: 'Guida ad interim della ' }, { t: 'Prima Squadra', b: true }, { t: ' professionistica durante una fase di transizione societaria.' }],
      },
    ],
    paragraphsPhoto: {
      src: catPhoto1,
      alt: {
        es: 'Ramiro Gonzalez Sales con la indumentaria de Atlético Tucumán',
        en: 'Ramiro Gonzalez Sales wearing Atlético Tucumán kit',
        it: 'Ramiro Gonzalez Sales con la divisa dell’Atlético Tucumán',
      },
    },

    responsibilities: {
      title: { es: 'Responsabilidades principales:', en: 'Main responsibilities:', it: 'Responsabilità principali:' },
      items: {
        es: [
          'Planificación semanal y diseño de microciclos.',
          'Diseño y conducción de entrenamientos.',
          'Análisis de rivales y análisis propio.',
          'Gestión de cargas y monitoreo GPS.',
          'Estrategias de balón parado.',
          'Desarrollo individual de futbolistas.',
          'Liderazgo integral de grupo y cuerpo técnico.',
        ],
        en: [
          'Weekly planning and microcycle design.',
          'Training design and delivery.',
          'Opposition and self-analysis.',
          'Load management and GPS monitoring.',
          'Set-piece strategies.',
          'Individual player development.',
          'Overall leadership of the squad and coaching staff.',
        ],
        it: [
          'Pianificazione settimanale e progettazione dei microcicli.',
          'Progettazione e conduzione degli allenamenti.',
          'Analisi degli avversari e della propria squadra.',
          'Gestione dei carichi e monitoraggio GPS.',
          'Strategie sulle palle inattive.',
          'Sviluppo individuale dei calciatori.',
          'Leadership complessiva del gruppo e dello staff tecnico.',
        ],
      },
    },

    tactics: {
      title: { es: 'SISTEMAS TÁCTICOS IMPLEMENTADOS', en: 'TACTICAL SYSTEMS USED', it: 'SISTEMI TATTICI UTILIZZATI' },
      photo: catPhoto2,
      photoAlt: {
        es: 'Ramiro Gonzalez Sales dando indicaciones desde el borde del campo',
        en: 'Ramiro Gonzalez Sales giving instructions from the touchline',
        it: 'Ramiro Gonzalez Sales dà indicazioni a bordo campo',
      },
      systems: ['4-3-3', '3-4-3', '3-5-2', '4-2-3-1'].map((name) => ({
        label: { es: 'Sistema', en: 'System', it: 'Modulo' }, name, positions: FORMATIONS[name],
      })),
    },
  },
]
