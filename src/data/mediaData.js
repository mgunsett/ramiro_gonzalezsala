// ─────────────────────────────────────────────────────────────
// MEDIA · las 9 notas del portfolio original.
// ⚠️ Títulos y textos de botón EXACTOS (incluido "Quiém").
//
// kind:   'video' | 'article' | 'post'  → define la "pantalla" del destacado
// cta:    texto del botón tal como figura en el sitio original
// youtube: id del video → la miniatura en alta se carga desde YouTube y el
//          destacado se reproduce en el mismo lugar.
// thumb:  imagen local (respaldo / fondo). Se puede reemplazar por una en
//         alta sin tocar el componente.
// ─────────────────────────────────────────────────────────────

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
import post6 from '@assets/media/post_6.webp'

export const media = {
  title: 'MEDIA',
  items: [
    {
      kind: 'video', cta: 'VER ARTICULO', youtube: 'uv39sSGej0o', thumb: n1, source: 'YouTube',
      title: 'Liderazgo y Gestión para ENTRENADORES de FÚTBOL en la ERA DIGITAL',
      href: 'https://www.youtube.com/watch?v=uv39sSGej0o&t=18s',
    },
    {
      kind: 'article', cta: 'VER ARTICULO', thumb: n2, source: 'makanbola.com',
      title: 'Ramiro Gonzalez announces departure from JDT',
      href: 'https://makanbola.com/ramiro-gonzalez-umum-tinggalkan-jdt/',
    },
    {
      kind: 'video', cta: 'VER VIDEO', youtube: 'Y_be7-K08lk', thumb: n3, source: 'YouTube',
      title: 'JDT loses the services of Real Madrid graduate, Assistant Coach Ramiro Gonzalez',
      href: 'https://www.youtube.com/watch?v=Y_be7-K08lk',
    },
    {
      kind: 'video', cta: 'VER VIDEO', youtube: 'Oknnb4LZ5iw', thumb: n4, source: 'YouTube',
      title: 'Another achievement for JDT - Assistant Coach recognized by Real Madrid coaching programme',
      href: 'https://www.youtube.com/watch?v=Oknnb4LZ5iw',
    },
    {
      kind: 'post', cta: 'VER PUBLICACIÓN', thumb: n5, screen: post5, source: 'Instagram',
      title: 'JDT Coach Excels in Real Madrid Graduate School Coaching Programme',
      href: 'https://www.instagram.com/p/C73E3rLPuqa/',
    },
    {
      kind: 'post', cta: 'VER PUBLICACIÓN', thumb: n6, screen: post6, source: 'Instagram',
      title: 'Congratulations Ramiro Gonzalez on completing Real Madrid Graduate School Coaching Programme',
      // ⚠️ En el sitio original apunta al mismo post que la nota anterior
      href: 'https://www.instagram.com/p/C73E3rLPuqa/',
    },
    {
      kind: 'video', cta: 'VER VIDEO', youtube: 'ByOAXJaPmyE', thumb: n7, source: 'YouTube',
      title: 'Ciclo de entrevistas - Ramiro Gonzalez',
      href: 'https://www.youtube.com/watch?v=ByOAXJaPmyE',
    },
    {
      kind: 'article', cta: 'VER ARTICULO', thumb: n8, source: 'tycsports.com',
      title: 'Jugó en Italia, dirigió en Malasia y ahora será entrenador de la Reserva de Atlético Tucumán',
      href: 'https://www.tycsports.com/liga-profesional-de-futbol/jugo-en-italia-dirigio-en-malasia-y-ahora-sera-entrenador-de-la-reserva-de-atletico-tucuman-id704561.html',
    },
    {
      kind: 'article', cta: 'VER ARTICULO', thumb: n9, source: 'lagaceta.com.ar',
      title: 'Quiém es Ramiro González, el nuevo DT de la Reserva de Atlético Tucumán: su recorrido internacional y la idea que trae al club',
      href: 'https://www.lagaceta.com.ar/nota/1119342/deportes/quien-ramiro-gonzalez-nuevo-dt-reserva-atletico-tucuman-recorrido-internacional-idea-trae-al-club.html',
    },
  ],

  instagram: {
    title: 'INSTAGRAM',
    handle: '@ramirogonzalez.dt',
    profile: 'https://www.instagram.com/ramirogonzalez.dt',
    cta: 'VER PERFIL',
  },
}

export const KIND_LABEL = { video: 'VIDEO', article: 'ARTÍCULO', post: 'PUBLICACIÓN' }
