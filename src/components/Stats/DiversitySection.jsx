import { useRef, useLayoutEffect } from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorldLeaguesMap from './WorldLeaguesMap'
import PlayerTimeline from './PlayerTimeline'
import { diversity, playerCareer } from '../../data/statsData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// DATOS · opción A "Mapa"
//  · Diversidad de jugadores dirigidos: 4 cifras con contador + mapa
//    con las 16 ligas unidas a su país.
//  · Trayectoria como jugador: línea en "S" con escudos.
// ─────────────────────────────────────────────────────────────

function Title({ children }) {
  return (
    <Text as="h2" fontFamily="heading" fontWeight="400" textAlign="center" letterSpacing="0.02em" lineHeight={0.9}
      fontSize={{ base: '40px', md: '58px', lg: 'clamp(52px, 5.2vw, 88px)' }} sx={{ textWrap: 'balance' }}>
      {children}
    </Text>
  )
}

export default function DiversitySection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)

      // Contadores
      q('[data-to]').forEach((el) => {
        if (reduce) return
        const to = Number(el.dataset.to)
        const pre = el.dataset.pre || ''
        const o = { v: 0 }
        gsap.to(o, {
          v: to, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = pre + Math.round(o.v) },
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Línea en "S" de la trayectoria: se dibuja con el scroll
      if (q('.pt-path').length) {
        gsap.fromTo(q('.pt-path'), { strokeDasharray: 1, strokeDashoffset: 1 }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: q('.pt-path-svg')[0], start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
        })
      }

      if (reduce) return

      const map = q('.wm-svg')[0]
      gsap.from(q('.wm-hl'), { opacity: 0, duration: 0.5, stagger: 0.04, scrollTrigger: { trigger: map, start: 'top 75%' } })
      q('.wm-lead').forEach((l) => {
        const L = l.getTotalLength()
        gsap.fromTo(l, { strokeDasharray: L, strokeDashoffset: L }, {
          strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: map, start: 'top 70%' },
        })
      })
      if (q('.wm-badge').length) {
        gsap.from(q('.wm-badge'), { opacity: 0, duration: 0.5, stagger: 0.04, scrollTrigger: { trigger: map, start: 'top 70%' } })
      }
      gsap.from(q('.pt-stop'), { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: q('.pt-path-svg')[0], start: 'top 80%' } })
      gsap.from(q('.pt-row'), { opacity: 0, x: -12, duration: 0.5, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: q('.pt-row')[0], start: 'top 90%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box as="section" id="datos" ref={ref} aria-label="Datos" bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      {/* ── Diversidad de jugadores dirigidos ── */}
      <Box px={{ base: 5, md: 10, lg: '3vw' }} py={{ base: 20, lg: '12vh' }}>
        <Title>{diversity.title}</Title>

        <Grid
          templateColumns={{ base: 'repeat(2, minmax(0,1fr))', lg: 'repeat(4, minmax(0,1fr))' }}
          maxW="1150px"
          mx="auto"
          mt={{ base: 8, lg: '5vh' }}
          mb={{ base: 8, lg: '4vh' }}
          borderY="1px solid"
          borderColor="brand.linea"
        >
          {diversity.stats.map((s, i) => (
            <Box
              key={s.label}
              px={{ base: 4, lg: 6 }}
              py={{ base: 5, lg: '3vh' }}
              borderRight={{ base: i % 2 === 0 ? '1px solid' : 0, lg: i < 3 ? '1px solid' : 0 }}
              borderBottom={{ base: i < 2 ? '1px solid' : 0, lg: 0 }}
              borderColor="brand.linea"
            >
              <Text fontFamily="heading" color="brand.celeste" lineHeight={0.85} fontSize={{ base: '52px', lg: 'clamp(56px, 5.4vw, 88px)' }}
                sx={{ fontVariantNumeric: 'tabular-nums' }} data-to={s.value} data-pre={s.prefix}>
                {s.prefix}{s.value}
              </Text>
              <Text mt={2} fontFamily="mono" fontWeight="600" fontSize={{ base: '15px', lg: 'clamp(15px, 1.25vw, 20px)' }}
                color="brand.bone" lineHeight={1.2}>
                {s.label}
              </Text>
            </Box>
          ))}
        </Grid>

        <Box maxW="1400px" mx="auto">
          <WorldLeaguesMap leagues={diversity.leagues} />
        </Box>
      </Box>

      {/* ── Trayectoria como jugador ── */}
      <Box px={{ base: 5, md: 10, lg: '6vw' }} py={{ base: 20, lg: '12vh' }} borderTop="1px solid" borderColor="brand.linea">
        <Title>{playerCareer.title}</Title>
        <Box mt={{ base: 8, lg: '7vh' }}>
          <PlayerTimeline clubs={playerCareer.clubs} />
        </Box>
      </Box>

      <style>{`
        .wm-ring{transform-box:fill-box;transform-origin:center;animation:wmPing 2.4s ease-out infinite}
        @keyframes wmPing{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.6);opacity:0}}
        @media (prefers-reduced-motion: reduce){.wm-ring{animation:none}}
      `}</style>
    </Box>
  )
}
