import { Helmet } from 'react-helmet-async'
import { useLang } from '../../i18n/LanguageContext'

export const SITE_URL = 'https://ramirogonzalezdt.com'

// Textos por idioma. Descriptions de ≤160 caracteres (límite del snippet de Google).
const META = {
  es: {
    locale: 'es_AR',
    title: 'Ramiro Gonzalez Sales | Entrenador de Fútbol · Licencia Pro',
    description: "Ramiro Gonzalez Sales, entrenador de fútbol con Licencia Pro. DT de la Reserva de Atlético Tucumán, ex asistente en Johor Darul Ta'zim. Contactalo.",
    ogTitle: 'Ramiro Gonzalez Sales — Entrenador de Fútbol',
    ogDescription: 'Entrenador de Fútbol · Licencia Pro · +200 partidos y 13 títulos · Ex futbolista profesional.',
  },
  en: {
    locale: 'en_US',
    title: 'Ramiro Gonzalez Sales | Football Coach · Pro Licence',
    description: "Ramiro Gonzalez Sales, football coach with Pro Licence. Head Coach of Atlético Tucumán Reserves, ex Johor Darul Ta'zim assistant. Get in touch.",
    ogTitle: 'Ramiro Gonzalez Sales — Football Coach',
    ogDescription: 'Football Coach · Pro Licence · 200+ matches and 13 titles · Former professional footballer.',
  },
  it: {
    locale: 'it_IT',
    title: 'Ramiro Gonzalez Sales | Allenatore di Calcio · Licenza Pro',
    description: "Ramiro Gonzalez Sales, allenatore di calcio con Licenza Pro. Allenatore Riserve Atlético Tucumán, ex vice al Johor Darul Ta'zim. Contattalo.",
    ogTitle: 'Ramiro Gonzalez Sales — Allenatore di Calcio',
    ogDescription: 'Allenatore di Calcio · Licenza Pro · +200 partite e 13 titoli · Ex calciatore professionista.',
  },
}

/* Meta tags por página e idioma. `noindex` para rutas privadas (admin). */
export function Seo({ path = '/', title, noindex = false }) {
  const { lang } = useLang()
  const m = META[lang] ?? META.es
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{title ?? m.title}</title>
      <meta name="description" content={m.description} />
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <link rel="canonical" href={url} />}
      <meta property="og:locale" content={m.locale} />
      <meta property="og:title" content={m.ogTitle} />
      <meta property="og:description" content={m.ogDescription} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={m.ogTitle} />
      <meta name="twitter:description" content={m.ogDescription} />
    </Helmet>
  )
}
