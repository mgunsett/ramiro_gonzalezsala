import n1 from '@assets/media/nota_1.webp'
import n2 from '@assets/media/nota_2.webp'
import n3 from '@assets/media/nota_3.webp'
import n4 from '@assets/media/nota_4.webp'
import n5 from '@assets/media/nota_5.webp'
import n6 from '@assets/media/nota_6.webp'
import n7 from '@assets/media/nota_7.webp'
import n8 from '@assets/media/nota_8.webp'
import n9 from '@assets/media/nota_9.webp'
import post5 from '@assets/media/post_5.webp'
import ig1 from '@assets/media/ig_1.webp'
import ig2 from '@assets/media/ig_2.webp'
import ig3 from '@assets/media/ig_3.webp'
import ig4 from '@assets/media/ig_4.webp'
import ig5 from '@assets/media/ig_5.webp'

const CTA = {
  article: { es: 'VER ARTICULO', en: 'READ ARTICLE', it: 'LEGGI ARTICOLO' },
  video: { es: 'VER VIDEO', en: 'WATCH VIDEO', it: 'GUARDA VIDEO' },
  post: { es: 'VER PUBLICACIÓN', en: 'VIEW POST', it: 'VEDI POST' },
}

export const media = {
  title: 'MEDIA',
  // `id` estable (no depende del idioma): se usa como key de la lista
  items: [
    {
      id: 'yt-liderazgo', kind: 'video', cta: CTA.article, youtube: 'uv39sSGej0o', thumb: n1, source: 'YouTube',
      title: {
        es: 'Liderazgo y Gestión para ENTRENADORES de FÚTBOL en la ERA DIGITAL',
        en: 'Leadership and Management for FOOTBALL COACHES in the DIGITAL AGE',
        it: 'Leadership e Gestione per ALLENATORI di CALCIO nell’ERA DIGITALE',
      },
      href: 'https://www.youtube.com/watch?v=uv39sSGej0o&t=18s',
    },
    {
      id: 'makanbola', kind: 'article', cta: CTA.article, thumb: n2, source: 'makanbola.com',
      title: {
        es: 'Ramiro Gonzalez announces departure from JDT',
        en: 'Ramiro Gonzalez announces departure from JDT',
        it: 'Ramiro Gonzalez annuncia l’addio al JDT',
      },
      href: 'https://makanbola.com/ramiro-gonzalez-umum-tinggalkan-jdt/',
    },
    {
      id: 'yt-real-madrid', kind: 'video', cta: CTA.video, youtube: 'Oknnb4LZ5iw', thumb: n4, source: 'YouTube',
      title: {
        es: 'Another achievement for JDT - Assistant Coach recognized by Real Madrid coaching programme',
        en: 'Another achievement for JDT - Assistant Coach recognized by Real Madrid coaching programme',
        it: 'Un altro traguardo per il JDT: il suo Allenatore in seconda premiato dal programma allenatori del Real Madrid',
      },
      href: 'https://www.youtube.com/watch?v=Oknnb4LZ5iw',
    },
    {
      id: 'ig-real-madrid', kind: 'post', cta: CTA.post, thumb: n5, screen: post5, source: 'Instagram',
      title: {
        es: 'JDT Coach Excels in Real Madrid Graduate School Coaching Programme',
        en: 'JDT Coach Excels in Real Madrid Graduate School Coaching Programme',
        it: 'Allenatore del JDT si distingue nel programma allenatori della Real Madrid Graduate School',
      },
      href: 'https://www.instagram.com/p/C73E3rLPuqa/',
    },
    {
      id: 'yt-entrevistas', kind: 'video', cta: CTA.video, youtube: 'ByOAXJaPmyE', thumb: n7, source: 'YouTube',
      title: {
        es: 'Ciclo de entrevistas - Ramiro Gonzalez',
        en: 'Interview series - Ramiro Gonzalez',
        it: 'Ciclo di interviste - Ramiro Gonzalez',
      },
      href: 'https://www.youtube.com/watch?v=ByOAXJaPmyE',
    },
    {
      id: 'tyc', kind: 'article', cta: CTA.article, thumb: n8, source: 'tycsports.com',
      title: {
        es: 'Jugó en Italia, dirigió en Malasia y ahora será entrenador de la Reserva de Atlético Tucumán',
        en: 'He played in Italy, coached in Malaysia and will now lead Atlético Tucumán’s Reserve team',
        it: 'Ha giocato in Italia, ha allenato in Malesia e ora guiderà la squadra Riserve dell’Atlético Tucumán',
      },
      href: 'https://www.tycsports.com/liga-profesional-de-futbol/jugo-en-italia-dirigio-en-malasia-y-ahora-sera-entrenador-de-la-reserva-de-atletico-tucuman-id704561.html',
    },
    {
      id: 'la-gaceta', kind: 'article', cta: CTA.article, thumb: n9, source: 'lagaceta.com.ar',
      title: {
        es: 'Quiém es Ramiro González, el nuevo DT de la Reserva de Atlético Tucumán: su recorrido internacional y la idea que trae al club',
        en: 'Who is Ramiro González, Atlético Tucumán’s new Reserve team coach: his international career and the ideas he brings to the club',
        it: 'Chi è Ramiro González, il nuovo allenatore delle Riserve dell’Atlético Tucumán: il suo percorso internazionale e l’idea che porta al club',
      },
      href: 'https://www.lagaceta.com.ar/nota/1119342/deportes/quien-ramiro-gonzalez-nuevo-dt-reserva-atletico-tucuman-recorrido-internacional-idea-trae-al-club.html',
    },
  ],

  instagram: {
    title: 'INSTAGRAM',
    handle: '@ramirogonzalez.dt',
    profile: 'https://www.instagram.com/ramirogonzalez.dt',
    cta: { es: 'VER PERFIL', en: 'VIEW PROFILE', it: 'VEDI PROFILO' },
    // Grilla por defecto (en este orden) si no hay publicaciones cargadas desde /admin.
    posts: [
      { id: 'ig-1', url: ig1, link: 'https://www.instagram.com/p/De2bYKrFs9B/' },
      { id: 'ig-2', url: ig2, link: 'https://www.instagram.com/p/Dd9fBmHCWPZ/' },
      { id: 'ig-3', url: ig3, link: 'https://www.instagram.com/p/DdsI0Hhibk2/' },
      { id: 'ig-4', url: ig4, link: 'https://www.instagram.com/p/DcAAapeDeo6/' },
      { id: 'ig-5', url: ig5, link: 'https://www.instagram.com/p/Dbq7RL7CQkN/' },
    ],
  },
}

export const KIND_LABEL = {
  video: 'VIDEO',
  article: { es: 'ARTÍCULO', en: 'ARTICLE', it: 'ARTICOLO' },
  post: { es: 'PUBLICACIÓN', en: 'POST', it: 'POST' },
}
