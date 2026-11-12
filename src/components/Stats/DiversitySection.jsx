import { useRef, useLayoutEffect } from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorldLeaguesMap from './WorldLeaguesMap'
import TacticsBoards from './TacticsBoards'
import { SubTitle } from '../Career/careerParts'
import { diversity as diversityData, tactics as tacticsData } from '../../data/statsData'
import { useT, useLocalized } from '../../i18n/LanguageContext'
import { PAGE_PX } from '../../styles/layout'

const LABEL = { es: 'Datos', en: 'Stats', it: 'Dati' }

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// DATOS · opción A "Mapa"
//  · Sistemas tácticos implementados: foto + pizarras (slider en móvil).
//  · Diversidad de jugadores dirigidos: 4 cifras con contador + mapa
//    con las 16 ligas unidas a su país.
//  (La trayectoria como jugador vive en PlayerCareerSection.)
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
  const t = useT()
  const diversity = useLocalized(diversityData)
  const tactics = useLocalized(tacticsData)

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

      if (reduce) return

      // Sistemas tácticos: foto que aparece desde abajo y jugadores que salen del arco
      q('.tb-section .cc-reveal').forEach((img) => {
        gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: img, start: 'top 85%' },
        })
      })
      q('.tb-pitch').forEach((pitch) => {
        gsap.from(pitch.querySelectorAll('.tb-player'), {
          left: '50%', top: '92%', duration: 0.9, stagger: 0.03, ease: 'power3.inOut',
          scrollTrigger: { trigger: q('.tb-track')[0], start: 'top 85%' },
        })
      })

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
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box as="section" id="datos" ref={ref} aria-label={t(LABEL)} bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      {/* ── Sistemas tácticos implementados ── */}
      <Box className="tb-section" px={PAGE_PX} py={{ base: 20, lg: '12vh' }} borderBottom="1px solid" borderColor="brand.linea">
        <SubTitle as="h2">{tactics.title}</SubTitle>
        <TacticsBoards tactics={tactics} />
      </Box>

      {/* ── Diversidad de jugadores dirigidos ── */}
      <Box px={PAGE_PX} py={{ base: 20, lg: '12vh' }}>
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
              key={s.value}
              px={{ base: 4, lg: 6 }}
              pt={{ base: 7, lg: '4.4vh' }}
              pb={{ base: 5, lg: '3vh' }}
              borderRight={{ base: i % 2 === 0 ? '1px solid' : 0, lg: i < 3 ? '1px solid' : 0 }}
              borderBottom={{ base: i < 2 ? '1px solid' : 0, lg: 0 }}
              borderColor="brand.linea"
            >
              <Text fontFamily="heading" color="brand.celeste" lineHeight={0.85} fontSize={{ base: '52px', lg: 'clamp(56px, 5.4vw, 88px)' }}
                position="relative" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {s.lead && (
                  <Box as="span" position="absolute" left={0} bottom="100%" mb="6px" whiteSpace="nowrap" fontFamily="mono" fontWeight="700" fontSize={{ base: '13px', lg: '15px' }}
                    letterSpacing="0.12em" lineHeight={1} textTransform="uppercase" color="brand.celesteLight">
                    {s.lead}
                  </Box>
                )}
                <Box as="span" data-to={s.value} data-pre={s.prefix}>{s.prefix}{s.value}</Box>
              </Text>
              <Text mt={2} fontFamily="mono" fontWeight="600" fontSize={{ base: '15px', lg: 'clamp(15px, 1.25vw, 20px)' }}
                color="brand.bone" lineHeight={1.2}>
                {s.label}
              </Text>
            </Box>
          ))}
        </Grid>

        <Box>
          <WorldLeaguesMap leagues={diversity.leagues} />
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
