import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa'

// Hero
import heroMain from '@assets/hero/ramiro_hero.webp'
import heroBg from '@assets/hero/ramiro_bg.webp'
// Perfil
import profileImg from '@assets/perfil/ramiro_perfil.webp'

// ─────────────────────────────────────────────────────────────
// Fuente única de los datos de Ramiro Gonzalez Sales.
// ⚠️ Los textos se copian EXACTOS del portfolio original
//    (sites.google.com/view/portfolioramirogonzalez). No corregir
//    ortografía ni redacción sin autorización del cliente.
// ─────────────────────────────────────────────────────────────

export const coachData = {
  // Nombre en 3 líneas, tal como aparece en la placa
  nameLines: ['RAMIRO', 'GONZALEZ', 'SALES'],
  displayName: 'Ramiro Gonzalez Sales',
  initials: 'RG', // monograma (camiseta)

  image: heroMain,   // foto principal (brazos cruzados)
  imageBg: heroBg,   // foto secundaria, difuminada de fondo

  // Placa del Hero — textos exactos
  hero: {
    role: 'Entrenador de Fútbol',
    license: 'Licencia Pro',
    exPlayer: 'Ex Futbolista profesional.',
    // "+160 partidos y 13 titulos" — se arma con los números destacados
    impact: { matches: '+160', titles: '13' },
  },

  // Perfil profesional — textos EXACTOS de la placa.
  // `text` va en gris y `highlight` (la parte en negrita) en blanco.
  profile: {
    title: 'PERFIL PROFESIONAL',
    image: profileImg,
    items: [
      { text: 'Entrenador ', highlight: 'con experiencia internacional en proyectos de alto rendimiento y contextos competitivos de máxima exigencia.' },
      { text: 'Perfil orientado a la construcción de equipos ', highlight: 'intensos, organizados y competitivos, con liderazgo centrado en las personas.' },
      { text: 'Experiencia en ', highlight: 'planificación táctica, diseño de entrenamientos, análisis competitivo y desarrollo individual de futbolistas.' },
      { text: 'Entrenador Asistente en ', highlight: 'Johor Darul Ta’zim FC durante cuatro temporadas, participando en la obtención de 13 títulos y competencias AFC Champions League.' },
      { text: 'Actual Director ', highlight: 'Técnico de la División Reserva de Atlético Tucumán, enfocado en el desarrollo competitivo y la transición al fútbol profesional.' },
      { text: 'Experiencia en ', highlight: 'contextos multiculturales de alta exigencia, trabajando con futbolistas de distintas nacionalidades y trayectorias.' },
      { text: 'Formación internacional complementada con ', highlight: 'Licencias UEFA, CONMEBOL Y AFC, estudios de posgrado en dirección y metodología del entrenamiento, y experiencia profesional en Europa, Asia y Sudamérica.' },
    ],
  },

  // Navbar — ids de las secciones (provisorio: Perfil, Trayectoria,
  // Títulos y Formación se confirman al ver las placas restantes)
  nav: [
    { label: 'Perfil',      id: 'perfil' },
    { label: 'Trayectoria', id: 'trayectoria' },
    { label: 'Títulos',     id: 'titulos' },
    { label: 'Formación',   id: 'formacion' },
    { label: 'Media',       id: 'media' },
  ],
  contactId: 'contacto',

  // Contacto — texto EXACTO de la placa
  contact: {
    title: 'CONTACTO',
    paragraphs: [
      'Considero que el verdadero valor del trabajo en el fútbol se aprecia al explorarlo en profundidad y en acción. Cada uno de los puntos compartidos en este documento pueden desarrollarse con mayor detalle.',
      'Creo en la conexiones a largo plazo, en el intercambio genuino de ideas, y en la búsqueda constante de ser mejores cada día. Si compartimos esa visión: hablemos!',
    ],
  },

  // ⚠️ PENDIENTE: dirección de e-mail (no figura en el sitio original).
  //    Mientras esté vacía, "ENVIAR E-MAIL" se muestra deshabilitado.
  email: '',

  // Contacto / redes — textos de botón exactos del sitio original, en el mismo orden
  contacts: [
    { id: 'whatsapp',      label: 'ENVIAR MENSAJE', network: 'WhatsApp',      href: 'https://wa.link/iaiccu',                                              icon: FaWhatsapp },
    { id: 'transfermarkt', label: 'VER PERFIL',     network: 'Transfermarkt', href: 'https://www.transfermarkt.com/ramiro-gonzalez/profil/trainer/114109', icon: 'tm' },
    { id: 'email',         label: 'ENVIAR E-MAIL',  network: 'E-mail',        href: 'mailto:',                                                             icon: FaEnvelope },
    { id: 'linkedin',      label: 'VER PERFIL',     network: 'LinkedIn',      href: 'https://www.linkedin.com/in/ramagonzalez5/',                           icon: FaLinkedinIn },
    { id: 'instagram',     label: 'VER PERFIL',     network: 'Instagram',     href: 'https://www.instagram.com/ramirogonzalez.dt',                          icon: FaInstagram },
  ],
}
