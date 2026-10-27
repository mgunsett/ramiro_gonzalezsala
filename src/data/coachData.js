import { FaWhatsapp, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { IoMdStats } from 'react-icons/io'

// Hero
import heroMain from '@assets/hero/ramiro_hero.webp'
import heroBg from '@assets/hero/ramiro_bg.webp'

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

  // Contacto / redes — textos de botón exactos del sitio original
  contacts: [
    { id: 'whatsapp',     label: 'ENVIAR MENSAJE', network: 'WhatsApp',      href: 'https://wa.link/iaiccu',                                              icon: FaWhatsapp },
    { id: 'transfermarkt', label: 'VER PERFIL',    network: 'Transfermarkt', href: 'https://www.transfermarkt.com/ramiro-gonzalez/profil/trainer/114109', icon: IoMdStats },
    { id: 'linkedin',     label: 'VER PERFIL',     network: 'LinkedIn',      href: 'https://www.linkedin.com/in/ramagonzalez5/',                           icon: FaLinkedinIn },
    { id: 'instagram',    label: 'VER PERFIL',     network: 'Instagram',     href: 'https://www.instagram.com/ramirogonzalez.dt',                          icon: FaInstagram },
    // ⚠️ PENDIENTE: "ENVIAR E-MAIL" no tiene dirección en el sitio original
  ],
}
