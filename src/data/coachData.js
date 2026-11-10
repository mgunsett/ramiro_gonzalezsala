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
    impact: { matches: '+200', titles: '13' },
  },

  // Perfil profesional — textos EXACTOS de la placa (versión nueva).
  // Cada punto es una lista de segmentos: { t } texto normal (gris),
  // { t, b: true } negrita (blanco).
  profile: {
    title: { es: 'PERFIL PROFESIONAL', en: 'PROFESSIONAL PROFILE', it: 'PROFILO PROFESSIONALE' },
    image: profileImg,
    licenses: {
      es: 'CONMEBOL Pro · AFC Pro (reconocimiento) · UEFA B',
      en: 'CONMEBOL Pro · AFC Pro (recognition) · UEFA B',
      it: 'CONMEBOL Pro · AFC Pro (riconoscimento) · UEFA B',
    },
    intro: {
      es: ['+200 partidos profesionales entre Asia y Argentina · 13 títulos en Asia.', 'Hoy, formando futbolistas para Primera División.'],
      en: ['200+ professional matches across Asia and Argentina · 13 titles in Asia.', 'Today, developing players for the First Division.'],
      it: ['Oltre 200 partite professionistiche tra Asia e Argentina · 13 titoli in Asia.', 'Oggi, formando calciatori per la Prima Divisione.'],
    },
    sections: [
      {
        title: { es: 'TRAYECTORIA', en: 'CAREER', it: 'CARRIERA' },
        items: {
          es: [
            [{ t: 'Atlético Tucumán', b: true }, { t: ' · Director Técnico de Reserva · desde dic. 2025' }],
            [{ t: "Johor Darul Ta'zim (Malasia)", b: true }, { t: ' · Asistente técnico · 4 temporadas · 13 títulos · 4 campañas en AFC Champions League' }],
            [{ t: 'Ex futbolista profesional', b: true }, { t: ' en Argentina e Italia' }],
          ],
          en: [
            [{ t: 'Atlético Tucumán', b: true }, { t: ' · Reserve Team Head Coach · since Dec. 2025' }],
            [{ t: "Johor Darul Ta'zim (Malaysia)", b: true }, { t: ' · Assistant Coach · 4 seasons · 13 titles · 4 AFC Champions League campaigns' }],
            [{ t: 'Former professional footballer', b: true }, { t: ' in Argentina and Italy' }],
          ],
          it: [
            [{ t: 'Atlético Tucumán', b: true }, { t: ' · Allenatore della squadra Riserve · da dic. 2025' }],
            [{ t: "Johor Darul Ta'zim (Malesia)", b: true }, { t: ' · Allenatore in seconda · 4 stagioni · 13 titoli · 4 partecipazioni in AFC Champions League' }],
            [{ t: 'Ex calciatore professionista', b: true }, { t: ' in Argentina e Italia' }],
          ],
        },
      },
      {
        title: { es: 'IDEA DE JUEGO', en: 'GAME MODEL', it: 'IDEA DI GIOCO' },
        items: {
          es: [
            [{ t: 'Posesión con criterio y presión alta', b: true }],
            [{ t: 'Equipos protagonistas, intensos y organizados' }],
            [{ t: 'Desarrollo individual', b: true }, { t: ' como motor del rendimiento colectivo' }],
          ],
          en: [
            [{ t: 'Purposeful possession and high pressing', b: true }],
            [{ t: 'Proactive, intense and well-organised teams' }],
            [{ t: 'Individual development', b: true }, { t: ' as the engine of collective performance' }],
          ],
          it: [
            [{ t: 'Possesso ragionato e pressing alto', b: true }],
            [{ t: 'Squadre protagoniste, intense e organizzate' }],
            [{ t: 'Sviluppo individuale', b: true }, { t: ' come motore del rendimento collettivo' }],
          ],
        },
      },
      {
        title: { es: 'LIDERAZGO', en: 'LEADERSHIP', it: 'LEADERSHIP' },
        items: {
          es: [
            [{ t: 'Liderazgo centrado en las personas', b: true }],
            [{ t: 'Planteles ' }, { t: 'con más de 20 nacionalidades y 60 jugadores con pasado en selecciones', b: true }],
            [{ t: '* 27 futbolistas promovidos', b: true }, { t: ' al primer equipo · jugadores con pasado en ' }, { t: 'LaLiga, Premier League, Serie A y Ligue 1', b: true }],
          ],
          en: [
            [{ t: 'People-centred leadership', b: true }],
            [{ t: 'Squads ' }, { t: 'with more than 20 nationalities and 60 players with national-team experience', b: true }],
            [{ t: '* 27 players promoted', b: true }, { t: ' to the first team · players with experience in ' }, { t: 'LaLiga, Premier League, Serie A and Ligue 1', b: true }],
          ],
          it: [
            [{ t: 'Leadership centrata sulle persone', b: true }],
            [{ t: 'Rose ' }, { t: 'con più di 20 nazionalità e 60 giocatori con esperienza in nazionale', b: true }],
            [{ t: '* 27 calciatori promossi', b: true }, { t: ' in prima squadra · giocatori con esperienza in ' }, { t: 'LaLiga, Premier League, Serie A e Ligue 1', b: true }],
          ],
        },
      },
      {
        title: { es: 'DIFERENCIALES', en: 'WHAT SETS ME APART', it: 'ELEMENTI DISTINTIVI' },
        items: {
          es: [
            [{ t: 'Experiencia profesional en ' }, { t: '3 continentes:', b: true }, { t: ' Europa, Asia y Sudamérica' }],
            [{ t: 'Máster ' }, { t: 'Real Madrid – Universidad Europea', b: true }, { t: ' · Abogado · ' }, { t: 'Trilingüe', b: true }, { t: ' (español, inglés, italiano)' }],
          ],
          en: [
            [{ t: 'Professional experience on ' }, { t: '3 continents:', b: true }, { t: ' Europe, Asia and South America' }],
            [{ t: 'Master’s degree, ' }, { t: 'Real Madrid – Universidad Europea', b: true }, { t: ' · Lawyer · ' }, { t: 'Trilingual', b: true }, { t: ' (Spanish, English, Italian)' }],
          ],
          it: [
            [{ t: 'Esperienza professionale in ' }, { t: '3 continenti:', b: true }, { t: ' Europa, Asia e Sud America' }],
            [{ t: 'Master ' }, { t: 'Real Madrid – Universidad Europea', b: true }, { t: ' · Avvocato · ' }, { t: 'Trilingue', b: true }, { t: ' (spagnolo, inglese, italiano)' }],
          ],
        },
      },
    ],
    pointsLabel: { es: 'PUNTOS', en: 'POINTS', it: 'PUNTI' },
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
