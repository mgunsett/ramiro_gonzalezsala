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

const cat = {
  id: 'cat',
  accent: '#4CB8F2', // celeste Atlético Tucumán
  titleOutline: 'CLUB ATLÉTICO',
  titleSolid: 'TUCUMÁN',
  // Cabecera horizontal: fechas arriba, título y puesto destacado debajo
  roleParts: [
    { es: 'DIRECTOR TÉCNICO', en: 'HEAD COACH', it: 'ALLENATORE' },
    { es: 'RESERVA', en: 'RESERVE TEAM', it: 'RISERVE' },
  ],
  from: { es: 'DIC. 2025', en: 'DEC. 2025', it: 'DIC. 2025' },
  to: { es: 'ACTUALIDAD', en: 'PRESENT', it: 'OGGI' },
  crest: catCrest,
  crestAlt: { es: 'Escudo de Club Atlético Tucumán', en: 'Club Atlético Tucumán crest', it: 'Stemma del Club Atlético Tucumán' },
  motto: {
    es: ['Competir para formar.', 'Formar para Primera.'],
    en: ['Compete to develop.', 'Develop for the First Team.'],
    it: ['Competere per formare.', 'Formare per la Prima Squadra.'],
  },

  // El proyecto | Idea de juego (dos columnas con línea de nodos)
  board: [
    {
      title: { es: 'EL PROYECTO', en: 'THE PROJECT', it: 'IL PROGETTO' },
      items: {
        es: [
          [{ t: 'Conducción integral de la Reserva: ' }, { t: 'estándares profesionales y desarrollo individual', b: true }],
          [{ t: 'Plantel mixto: ' }, { t: 'profesionales hasta 25 años y juveniles desde los 15', b: true }],
          [{ t: 'Coordinación metodológica', b: true }, { t: ' con Primera División e Inferiores' }],
        ],
        en: [
          [{ t: 'Full leadership of the Reserve team: ' }, { t: 'professional standards and individual development', b: true }],
          [{ t: 'Mixed squad: ' }, { t: 'professionals up to 25 and youth players from 15', b: true }],
          [{ t: 'Methodological coordination', b: true }, { t: ' with the First Team and Academy' }],
        ],
        it: [
          [{ t: 'Guida completa della squadra Riserve: ' }, { t: 'standard professionali e sviluppo individuale', b: true }],
          [{ t: 'Rosa mista: ' }, { t: 'professionisti fino a 25 anni e giovani dai 15', b: true }],
          [{ t: 'Coordinamento metodologico', b: true }, { t: ' con Prima Squadra e Settore Giovanile' }],
        ],
      },
    },
    {
      title: { es: 'IDEA DE JUEGO', en: 'GAME MODEL', it: 'IDEA DI GIOCO' },
      items: {
        es: [
          [{ t: 'Presión alta', b: true }, { t: ' e intensidad competitiva' }],
          [{ t: 'Salida limpia', b: true }, { t: ' desde campo propio' }],
          [{ t: 'Juego combinativo', b: true }, { t: ' y protagonista en cualquier cancha' }],
        ],
        en: [
          [{ t: 'High pressing', b: true }, { t: ' and competitive intensity' }],
          [{ t: 'Clean build-up', b: true }, { t: ' from our own half' }],
          [{ t: 'Combination play', b: true }, { t: ', taking the initiative at any ground' }],
        ],
        it: [
          [{ t: 'Pressing alto', b: true }, { t: ' e intensità competitiva' }],
          [{ t: 'Uscita pulita', b: true }, { t: ' dalla propria metà campo' }],
          [{ t: 'Gioco combinativo', b: true }, { t: ' e da protagonista su qualsiasi campo' }],
        ],
      },
    },
  ],

  dayToDay: {
    label: { es: 'DÍA A DÍA', en: 'DAY TO DAY', it: 'GIORNO PER GIORNO' },
    items: {
      es: ['microciclos', 'gestión de cargas con GPS', 'análisis de rivales y propio', 'balón parado'],
      en: ['microcycles', 'GPS load management', 'opposition and self-analysis', 'set pieces'],
      it: ['microcicli', 'gestione dei carichi con GPS', 'analisi degli avversari e propria', 'palle inattive'],
    },
  },
  interim: {
    es: [{ t: 'DT interino de ' }, { t: 'Primera División', hl: true }, { t: ' (2026)' }],
    en: [{ t: 'Interim ' }, { t: 'First Team', hl: true }, { t: ' head coach (2026)' }],
    it: [{ t: 'Allenatore ad interim della ' }, { t: 'Prima Squadra', hl: true }, { t: ' (2026)' }],
  },

  // Rendimiento y formación
  results: {
    title: { es: 'RENDIMIENTO Y FORMACIÓN', en: 'PERFORMANCE AND DEVELOPMENT', it: 'RENDIMENTO E FORMAZIONE' },
    photo: catPhoto1, // foto actual del entrenador (no se reemplaza)
    photoAlt: {
      es: 'Ramiro Gonzalez Sales con la indumentaria de Atlético Tucumán',
      en: 'Ramiro Gonzalez Sales wearing Atlético Tucumán kit',
      it: 'Ramiro Gonzalez Sales con la divisa dell’Atlético Tucumán',
    },
    stars: [
      { value: 4, suffix: { es: '°', en: 'th', it: '°' }, label: { es: 'mejor posición histórica', en: 'best-ever finish', it: 'miglior piazzamento storico' } },
      { value: 48, label: { es: 'pts récord anual', en: 'pts – annual record', it: 'punti, record annuale' } },
      { value: 10, label: { es: 'promovidos a Primera', en: 'promoted to the First Team', it: 'promossi in Prima Squadra' } },
      { value: 3, label: { es: 'convocados a selecciones', en: 'national-team call-ups', it: 'convocati in nazionale' } },
    ],
    lists: [
      {
        title: { es: 'TORNEO APERTURA 2026: CAMPAÑA HISTÓRICA', en: '2026 APERTURA TOURNAMENT: HISTORIC CAMPAIGN', it: 'TORNEO DI APERTURA 2026: STAGIONE STORICA' },
        items: {
          es: [
            [{ t: '4° · 30 pts (9G 3E 6P)', b: true }, { t: ' · cuartos de final nacionales ante Boca' }],
            [{ t: 'Récords de la Reserva: ' }, { t: 'mejor posición y más puntos', b: true }, { t: ' en un torneo' }],
            [{ t: 'Récords de la Reserva: ' }, { t: 'mayor efectividad (55,5%), más victorias (9) y más puntos de visitante (15)', b: true }],
          ],
          en: [
            [{ t: '4th · 30 pts (9W 3D 6L)', b: true }, { t: ' · national quarter-finals against Boca' }],
            [{ t: 'Reserve team records: ' }, { t: 'best finish and most points', b: true }, { t: ' in a tournament' }],
            [{ t: 'Reserve team records: ' }, { t: 'highest points ratio (55.5%), most wins (9) and most away points (15)', b: true }],
          ],
          it: [
            [{ t: '4° · 30 pt (9V 3N 6P)', b: true }, { t: ' · quarti di finale nazionali contro il Boca' }],
            [{ t: 'Record della squadra Riserve: ' }, { t: 'miglior piazzamento e più punti', b: true }, { t: ' in un torneo' }],
            [{ t: 'Record della squadra Riserve: ' }, { t: 'miglior rendimento (55,5%), più vittorie (9) e più punti in trasferta (15)', b: true }],
          ],
        },
      },
      {
        title: { es: 'FUTBOLISTAS FORMADOS', en: 'PLAYERS DEVELOPED', it: 'CALCIATORI FORMATI' },
        items: {
          es: [
            [{ t: '10 promovidos', b: true }, { t: ' al primer equipo · ' }, { t: '3 debuts', b: true }, { t: ' en Primera División' }],
            [{ t: '3 convocados a selecciones Sub-20:', b: true }, { t: ' 2 a Argentina y 1 a Bolivia' }],
            [{ t: '1 disputó los ' }, { t: 'Juegos ODESUR', b: true }, { t: ' con la ' }, { t: 'Selección Argentina Sub-19', b: true }],
          ],
          en: [
            [{ t: '10 promoted', b: true }, { t: ' to the first team · ' }, { t: '3 debuts', b: true }, { t: ' in the First Division' }],
            [{ t: '3 called up to U-20 national teams:', b: true }, { t: ' 2 to Argentina and 1 to Bolivia' }],
            [{ t: '1 played at the ' }, { t: 'ODESUR Games', b: true }, { t: ' with ' }, { t: 'Argentina’s U-19 national team', b: true }],
          ],
          it: [
            [{ t: '10 promossi', b: true }, { t: ' in prima squadra · ' }, { t: '3 esordi', b: true }, { t: ' in Prima Divisione' }],
            [{ t: '3 convocati nelle nazionali Under 20:', b: true }, { t: ' 2 con l’Argentina e 1 con la Bolivia' }],
            [{ t: '1 ha disputato i ' }, { t: 'Giochi ODESUR', b: true }, { t: ' con la ' }, { t: 'Nazionale Argentina Under 19', b: true }],
          ],
        },
      },
    ],
  },
}

const jdt = {
  id: 'jdt',
  accent: '#E8304A', // rojo JDT (resaltados de la placa)
  titleOutline: 'JOHOR DARUL',
  titleSolid: 'TAKZIM FC',
  // Cabecera horizontal (igual que Atlético Tucumán): "Entrenador Asistente"
  roleParts: [
    { es: 'ENTRENADOR', en: 'ASSISTANT', it: 'ALLENATORE' },
    { es: 'ASISTENTE', en: 'COACH', it: 'IN SECONDA' },
  ],
  from: { es: 'DICIEMBRE 2020', en: 'DECEMBER 2020', it: 'DICEMBRE 2020' },
  to: { es: 'MARZO 2025', en: 'MARCH 2025', it: 'MARZO 2025' },
  // Escritorio: colapso parcial (opción B) · Móvil: acordeón total (opción A)
  compact: true,
  roleInk: 'white', // texto sobre el rojo del puesto
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

  performance: {
    title: { es: 'RENDIMIENTO DEL EQUIPO', en: 'TEAM PERFORMANCE', it: 'RENDIMENTO DELLA SQUADRA' },
    photo: jdtPhoto,
    photoAlt: {
      es: 'Ramiro Gonzalez Sales dando indicaciones en un entrenamiento de Johor Darul Ta’zim FC',
      en: 'Ramiro Gonzalez Sales giving instructions during a Johor Darul Ta’zim FC training session',
      it: 'Ramiro Gonzalez Sales dà indicazioni durante un allenamento del Johor Darul Ta’zim FC',
    },
    // Tarjetas con estrella (mismo diseño que Atlético Tucumán)
    items: [
      { value: 138, label: { es: 'victorias', en: 'wins', it: 'vittorie' }, note: { es: '(167 partidos)', en: '(167 matches)', it: '(167 partite)' } },
      { value: 500, label: 'GF', note: { es: '(3,0 por partido)', en: '(3.0 per match)', it: '(3,0 a partita)' } },
      { value: 97, label: { es: 'GC', en: 'GA', it: 'GS' }, note: { es: '(0,58 por partido)', en: '(0.58 per match)', it: '(0,58 a partita)' } },
      { value: 403, prefix: '+', label: { es: 'DG total', en: 'Total GD', it: 'DR totale' } },
      { value: 99, label: { es: 'porterias a cero', en: 'clean sheets', it: 'partite senza subire gol' } },
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
}

// Orden en la página: Atlético Tucumán (actual) → JDT
export const careerData = [cat, jdt]
