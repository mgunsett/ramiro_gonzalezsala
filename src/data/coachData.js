import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa'

// Hero
import heroMain from '@assets/hero/ramiro_hero.webp'
import heroBg from '@assets/hero/ramiro_bg.webp'
// Perfil
import profileImg from '@assets/perfil/ramiro_perfil.webp'


export const coachData = {
  // Nombre en 3 líneas, tal como aparece en la placa
  nameLines: ['RAMIRO', 'GONZALEZ', 'SALES'],
  displayName: 'Ramiro Gonzalez Sales',
  initials: 'RG', // monograma (camiseta)

  image: heroMain,
  imageBg: heroBg, 

  // Placa del Hero — textos exactos (en: inglés · it: italiano)
  hero: {
    role: { es: 'Entrenador de Fútbol', en: 'Football Coach', it: 'Allenatore di Calcio' },
    license: { es: 'Licencia Pro', en: 'Pro Licence', it: 'Licenza Pro' },
    exPlayer: { es: 'Ex Futbolista profesional.', en: 'Former professional footballer.', it: 'Ex calciatore professionista.' },
    impact: { matches: '+160', titles: '13' },
  },

  // Perfil profesional — textos EXACTOS de la placa.
  // `text` va en gris y `highlight` (la parte en negrita) en blanco.
  profile: {
    title: { es: 'PERFIL PROFESIONAL', en: 'PROFESSIONAL PROFILE', it: 'PROFILO PROFESSIONALE' },
    image: profileImg,
    items: [
      {
        es: { text: 'Entrenador ', highlight: 'con experiencia internacional en proyectos de alto rendimiento y contextos competitivos de máxima exigencia.' },
        en: { text: 'Coach ', highlight: 'with international experience in high-performance projects and highly demanding competitive environments.' },
        it: { text: 'Allenatore ', highlight: 'con esperienza internazionale in progetti di alto rendimento e contesti competitivi di massima esigenza.' },
      },
      {
        es: { text: 'Perfil orientado a la construcción de equipos ', highlight: 'intensos, organizados y competitivos, con liderazgo centrado en las personas.' },
        en: { text: 'Focused on building teams that are ', highlight: 'intense, organised and competitive, with people-centred leadership.' },
        it: { text: 'Profilo orientato alla costruzione di squadre ', highlight: 'intense, organizzate e competitive, con una leadership centrata sulle persone.' },
      },
      {
        es: { text: 'Experiencia en ', highlight: 'planificación táctica, diseño de entrenamientos, análisis competitivo y desarrollo individual de futbolistas.' },
        en: { text: 'Experience in ', highlight: 'tactical planning, training design, match analysis and individual player development.' },
        it: { text: 'Esperienza in ', highlight: 'pianificazione tattica, progettazione degli allenamenti, analisi competitiva e sviluppo individuale dei calciatori.' },
      },
      {
        es: { text: 'Entrenador Asistente en ', highlight: 'Johor Darul Ta’zim FC durante cuatro temporadas, participando en la obtención de 13 títulos y competencias AFC Champions League.' },
        en: { text: 'Assistant Coach at ', highlight: 'Johor Darul Ta’zim FC for four seasons, contributing to 13 titles and AFC Champions League campaigns.' },
        it: { text: 'Allenatore in seconda al ', highlight: 'Johor Darul Ta’zim FC per quattro stagioni, contribuendo alla conquista di 13 titoli e alle partecipazioni in AFC Champions League.' },
      },
      {
        es: { text: 'Actual Director ', highlight: 'Técnico de la División Reserva de Atlético Tucumán, enfocado en el desarrollo competitivo y la transición al fútbol profesional.' },
        en: { text: 'Current Head Coach ', highlight: 'of Atlético Tucumán’s Reserve Division, focused on competitive development and the transition to professional football.' },
        it: { text: 'Attuale Allenatore ', highlight: 'della squadra Riserve dell’Atlético Tucumán, focalizzato sullo sviluppo competitivo e sulla transizione al calcio professionistico.' },
      },
      {
        es: { text: 'Experiencia en ', highlight: 'contextos multiculturales de alta exigencia, trabajando con futbolistas de distintas nacionalidades y trayectorias.' },
        en: { text: 'Experience in ', highlight: 'demanding multicultural environments, working with players of different nationalities and backgrounds.' },
        it: { text: 'Esperienza in ', highlight: 'contesti multiculturali ad alta esigenza, lavorando con calciatori di diverse nazionalità e percorsi.' },
      },
      {
        es: { text: 'Formación internacional complementada con ', highlight: 'Licencias UEFA, CONMEBOL Y AFC, estudios de posgrado en dirección y metodología del entrenamiento, y experiencia profesional en Europa, Asia y Sudamérica.' },
        en: { text: 'International education complemented by ', highlight: 'UEFA, CONMEBOL and AFC licences, postgraduate studies in coaching and training methodology, and professional experience in Europe, Asia and South America.' },
        it: { text: 'Formazione internazionale completata da ', highlight: 'Licenze UEFA, CONMEBOL e AFC, studi post-laurea in direzione tecnica e metodologia dell’allenamento, ed esperienza professionale in Europa, Asia e Sud America.' },
      },
    ],
  },

  // Navbar y footer —
  nav: [
    { label: { es: 'Perfil', en: 'Profile', it: 'Profilo' },            id: 'perfil' },      // Perfil profesional
    { label: { es: 'Trayectoria', en: 'Career', it: 'Carriera' },       id: 'trayectoria' }, // JDT + Atlético Tucumán
    { label: { es: 'Datos', en: 'Stats', it: 'Dati' },                  id: 'datos' },       // Diversidad de jugadores + Trayectoria como jugador
    { label: { es: 'Formación', en: 'Education', it: 'Formazione' },    id: 'formacion' },   // Formación académica, idiomas, competencias, cursos
    { label: 'Media',                                                   id: 'media' },       // Notas, videos, publicaciones e Instagram
  ],
  contactId: 'contacto',

  // Contacto — texto EXACTO de la placa
  contact: {
    title: { es: 'CONTACTO', en: 'CONTACT', it: 'CONTATTI' },
    paragraphs: {
      es: [
        '" Considero que el verdadero valor del trabajo en el fútbol se aprecia al explorarlo en profundidad y en acción. Cada uno de los puntos compartidos en este documento pueden desarrollarse con mayor detalle.',
        'Creo en la conexiones a largo plazo, en el intercambio genuino de ideas, y en la búsqueda constante de ser mejores cada día. Si compartimos esa visión: hablemos! "',
      ],
      en: [
        '" I believe the true value of work in football is best appreciated by exploring it in depth and in action. Each of the points shared here can be developed in greater detail.',
        'I believe in long-term connections, in a genuine exchange of ideas, and in the constant pursuit of getting better every day. If we share that vision: let’s talk! "',
      ],
      it: [
        '" Credo che il vero valore del lavoro nel calcio si apprezzi esplorandolo in profondità e in azione. Ognuno dei punti condivisi qui può essere approfondito nel dettaglio.',
        'Credo nei rapporti a lungo termine, nello scambio sincero di idee e nella ricerca costante di migliorarsi ogni giorno. Se condividiamo questa visione: parliamone! "',
      ],
    },
  },

  email: 'ramirogonzalezdt@gmail.com',

  // Contacto
  contacts: [
    { id: 'whatsapp', label: { es: 'ENVIAR MENSAJE', en: 'SEND MESSAGE', it: 'INVIA MESSAGGIO' }, network: 'WhatsApp', href: 'https://wa.link/iaiccu', icon: FaWhatsapp },
    { id: 'transfermarkt', label: { es: 'VER PERFIL', en: 'VIEW PROFILE', it: 'VEDI PROFILO' }, network: 'Transfermarkt', href: 'https://www.transfermarkt.com/ramiro-gonzalez/profil/trainer/114109', icon: 'tm' },
    { id: 'email', label: { es: 'ENVIAR E-MAIL', en: 'SEND E-MAIL', it: 'INVIA E-MAIL' }, network: 'E-mail', href: `mailto:ramirogonzalezdt@gmail.com`, icon: FaEnvelope },
    { id: 'linkedin', label: { es: 'VER PERFIL', en: 'VIEW PROFILE', it: 'VEDI PROFILO' }, network: 'LinkedIn', href: 'https://www.linkedin.com/in/ramagonzalez5/', icon: FaLinkedinIn },
    { id: 'instagram', label: { es: 'VER PERFIL', en: 'VIEW PROFILE', it: 'VEDI PROFILO' }, network: 'Instagram', href: 'https://www.instagram.com/ramirogonzalez.dt', icon: FaInstagram },
  ],
}
