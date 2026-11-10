import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { Box, Flex, Grid, Text, Collapse, useBreakpointValue } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  TXT, Segs, SubTitle, Diamond, StarCard, StreakCard, Trophy, Achievements, ChapterPhoto,
} from './careerParts'
import { useT } from '../../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// Cuerpo "compacto" de un capítulo (JDT):
//  · Escritorio → colapso parcial: Funciones muestra 3 y se despliega;
//    Logros, Rendimiento y Rachas a la vista.
//  · Móvil → acordeón total: Logros siempre visibles; Funciones,
//    Rendimiento y Rachas en un acordeón (uno abierto por vez).
// ─────────────────────────────────────────────────────────────

const VISIBLE = 3

const MORE = {
  more: { es: 'VER LAS {n} FUNCIONES', en: 'SHOW ALL {n}', it: 'MOSTRA TUTTE ({n})' },
  less: { es: 'VER MENOS', en: 'SHOW LESS', it: 'MOSTRA MENO' },
}

/* Cuenta de 0 al valor en los elementos con data-count */
function countUp(els) {
  els.forEach((el) => {
    const end = Number(el.dataset.count)
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const o = { v: 0 }
    gsap.to(o, { v: end, duration: 1.4, ease: 'power2.out', onUpdate: () => { el.textContent = prefix + Math.round(o.v) + suffix } })
  })
}

/* Más / menos (acordeón) */
function ToggleIcon({ open, accent }) {
  return (
    <Box position="relative" boxSize="28px" flex="0 0 auto" borderRadius="full" border="1px solid"
      borderColor={open ? accent : 'brand.linea'} transform={open ? 'rotate(180deg)' : 'none'}
      transition="transform 300ms cubic-bezier(0.23,1,0.32,1), border-color 200ms ease"
      _before={{ content: '""', position: 'absolute', left: '50%', top: '50%', w: '10px', h: '1.5px', bg: 'brand.bone', transform: 'translate(-50%,-50%)' }}
      _after={{ content: '""', position: 'absolute', left: '50%', top: '50%', w: '10px', h: '1.5px', bg: 'brand.bone',
        transform: `translate(-50%,-50%) rotate(${open ? 0 : 90}deg)`, transition: 'transform 300ms cubic-bezier(0.23,1,0.32,1)' }} />
  )
}

/* Punto de la línea de nodos */
function NodeItem({ segs, accent, lit, delay = 0, className = 'cx-node' }) {
  return (
    <Box as="li" className={`${className}${lit ? ' is-on' : ''}`} position="relative"
      sx={{ '&.is-on .cx-dot': { bg: accent, borderColor: accent, boxShadow: `0 0 0 4px ${accent}29, 0 0 12px ${accent}99` } }}>
      <Box className="cx-dot" position="absolute" left="-30px" top="0.5em" boxSize="9px" borderRadius="full"
        bg="brand.ink" border="1px solid" borderColor={`${accent}99`}
        transition="background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease"
        style={{ transitionDelay: `${delay}ms` }} />
      <Text fontSize={{ base: '16px', lg: 'clamp(15px, 1.2vw, 19px)' }} lineHeight={1.5} color="brand.bone" sx={{ textWrap: 'pretty' }}>
        <Segs segs={segs} accent={accent} />
      </Text>
    </Box>
  )
}

/* ── Escritorio · colapso parcial ── */
function DesktopBody({ club, t }) {
  const { accent, functions, trophies, achievements, performance, streaks } = club
  const [more, setMore] = useState(false)
  const shown = functions.slice(0, VISIBLE)
  const rest = functions.slice(VISIBLE)

  return (
    <>
      <Grid templateColumns="minmax(0, 7fr) minmax(0, 5fr)" gap="5vw">
        <Box>
          <SubTitle>{t(TXT.functions)}</SubTitle>
          <Box className="cx-nodes" position="relative" pl="30px">
            <Box position="absolute" left="4px" top="6px" bottom="6px" w="1px" bg="brand.linea" />
            <Box className="cx-fill" position="absolute" left="4px" top="6px" bottom="6px" w="1px" bg={accent}
              transformOrigin="top" transform="scaleY(0)" />
            <Box position="relative"
              _after={more ? undefined : { content: '""', position: 'absolute', left: '-30px', right: 0, bottom: 0, h: '46px',
                bgGradient: 'linear(to-b, transparent, brand.ink)', pointerEvents: 'none' }}>
              <Flex as="ul" direction="column" gap="2.2vh" listStyleType="none" m={0} p={0}>
                {shown.map((segs, i) => <NodeItem key={i} segs={segs} accent={accent} />)}
              </Flex>
            </Box>
            <Collapse in={more} animateOpacity style={{ marginLeft: '-30px', paddingLeft: '30px' }}>
              <Flex as="ul" id="cx-more" direction="column" gap="2.2vh" listStyleType="none" m={0} p={0} pt="2.2vh">
                {rest.map((segs, i) => <NodeItem key={i} segs={segs} accent={accent} lit={more} delay={120 + i * 90} className="cx-extra" />)}
              </Flex>
            </Collapse>
          </Box>
          <Flex as="button" type="button" onClick={() => setMore((m) => !m)} aria-expanded={more} aria-controls="cx-more"
            mt="2.6vh" align="center" gap={2.5} px={4} py={2.5} border="1px solid" borderColor={accent}
            fontFamily="mono" fontWeight="700" fontSize="15px" letterSpacing="0.08em" color="brand.bone"
            transition="background-color 200ms ease, transform 160ms ease-out"
            _hover={{ bg: `${accent}24` }} _active={{ transform: 'scale(0.97)' }}>
            {more ? t(MORE.less) : t(MORE.more).replace('{n}', functions.length)}
            <Box as="span" aria-hidden="true" display="inline-block" transition="transform 300ms ease"
              transform={more ? 'rotate(180deg)' : 'none'}>↓</Box>
          </Flex>
        </Box>

        <Box>
          <SubTitle>{t(TXT.trophies)}</SubTitle>
          <Grid className="cx-trophies" templateColumns="repeat(2, minmax(0,1fr))" gap="3vh 1vw">
            {trophies.map((tr) => (
              <Trophy key={tr.name} className="cx-trophy" tr={tr} accent={accent} alt={`${t(TXT.trophy)} ${tr.name}`} />
            ))}
          </Grid>
        </Box>
      </Grid>

      <Achievements items={achievements} accent={accent} columns={`repeat(${achievements.length}, minmax(0,1fr))`} mt="6vh" />

      <Grid templateColumns="minmax(0, 4fr) minmax(0, 7fr)" gap="4vw" mt="12vh" alignItems="start">
        <ChapterPhoto className="cx-photo" src={performance.photo} alt={performance.photoAlt} accent={accent} mask
          position="sticky" top="14vh" />
        <Box minW={0}>
          <SubTitle>{performance.title}</SubTitle>
          <Grid className="cx-stars" templateColumns="repeat(2, minmax(0,1fr))" gap="10px" mb="7vh">
            {performance.items.map((s, i, arr) => (
              <StarCard key={i} className="cx-star" countAttr="data-count" value={s.value} prefix={s.prefix} label={s.label} note={s.note}
                accent={accent} gridColumn={i === arr.length - 1 && arr.length % 2 ? '1 / -1' : 'auto'} />
            ))}
          </Grid>
          <SubTitle>{streaks.title}</SubTitle>
          <Grid className="cx-streaks" templateColumns="repeat(2, minmax(0,1fr))" gap={4}>
            {streaks.items.map((s, i) => <StreakCard key={i} className="cx-streak" item={s} accent={accent} countAttr="data-count" />)}
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

/* ── Móvil · acordeón total (Logros siempre visibles) ── */
function MobileBody({ club, t }) {
  const { accent, functions, trophies, achievements, performance, streaks } = club
  const [open, setOpen] = useState(-1)
  const panels = useRef([])

  const sections = [
    {
      title: t(TXT.functions),
      body: (
        <Box as="ul" listStyleType="none" m={0} p={0}>
          {functions.map((segs, i) => (
            <Grid as="li" key={i} templateColumns="20px minmax(0,1fr)" gap="10px" py={3} borderBottom="1px solid" borderColor="brand.linea">
              <Diamond accent={accent} />
              <Text fontSize="16px" lineHeight={1.45} color="brand.bone"><Segs segs={segs} accent={accent} /></Text>
            </Grid>
          ))}
        </Box>
      ),
    },
    {
      title: performance.title,
      body: (
        <Grid templateColumns="1fr" gap="10px">
          {performance.items.map((s, i) => (
            <StarCard key={i} countAttr="data-count" value={s.value} prefix={s.prefix} label={s.label} note={s.note} accent={accent} />
          ))}
        </Grid>
      ),
    },
    {
      title: streaks.title,
      body: (
        <Grid templateColumns="1fr" gap={3}>
          {streaks.items.map((s, i) => <StreakCard key={i} item={s} accent={accent} countAttr="data-count" />)}
        </Grid>
      ),
    },
  ]

  // Al abrir una fila, sus cifras cuentan desde cero
  useEffect(() => {
    if (open < 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = panels.current[open]
    if (el) countUp(el.querySelectorAll('[data-count]'))
  }, [open])

  return (
    <Flex direction="column" gap={11}>
      {/* Logros siempre visibles */}
      <Box>
        <SubTitle>{t(TXT.trophies)}</SubTitle>
        <Grid className="cx-trophies" position="relative" templateColumns={`repeat(${trophies.length}, minmax(0,1fr))`} gap="6px"
          px={2} pt="18px" pb="16px" border="1px solid" borderColor="brand.linea"
          sx={{ background: `radial-gradient(120% 90% at 50% 100%, ${accent}24, transparent 70%), var(--chakra-colors-brand-carbon)` }}
          _before={{ content: '""', position: 'absolute', left: '-1px', top: '-1px', w: '36%', h: '2px', bg: accent }}>
          {trophies.map((tr) => (
            <Trophy key={tr.name} className="cx-trophy" tr={tr} accent={accent} compact alt={`${t(TXT.trophy)} ${tr.name}`} />
          ))}
        </Grid>
        <Achievements items={achievements} accent={accent} columns="repeat(2, minmax(0,1fr))" mt="10px" />
      </Box>

      {/* Acordeón */}
      <Box as="ul" listStyleType="none" m={0} p={0} borderTop="1px solid" borderColor="brand.linea">
        {sections.map((s, i) => {
          const isOpen = open === i
          return (
            <Box as="li" key={i} position="relative" borderBottom="1px solid" borderColor="brand.linea"
              _before={{ content: '""', position: 'absolute', left: 0, top: '-1px', h: '2px', w: isOpen ? '100%' : 0, bg: accent,
                transition: 'width 420ms cubic-bezier(0.23,1,0.32,1)' }}>
              <Flex as="button" type="button" w="100%" align="center" gap={3} py="18px" textAlign="left"
                aria-expanded={isOpen} aria-controls={`cx-panel-${i}`} id={`cx-head-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}>
                <Text as="span" fontFamily="heading" fontSize="30px" lineHeight={1} color={isOpen ? accent : 'transparent'}
                  sx={{ WebkitTextStroke: isOpen ? '0' : `1px ${accent}B3` }} transition="color 250ms ease">
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text as="span" flex={1} fontFamily="heading" fontSize="28px" letterSpacing="0.05em" lineHeight={1} color="brand.bone">
                  {s.title}
                </Text>
                <ToggleIcon open={isOpen} accent={accent} />
              </Flex>
              <Collapse in={isOpen} animateOpacity>
                <Box id={`cx-panel-${i}`} role="region" aria-labelledby={`cx-head-${i}`} pb={6}
                  ref={(el) => { panels.current[i] = el }}>
                  {s.body}
                </Box>
              </Collapse>
            </Box>
          )
        })}
      </Box>

      <ChapterPhoto className="cx-photo" src={performance.photo} alt={performance.photoAlt} accent={accent} mask maxW="280px" />
    </Flex>
  )
}

export default function CareerCompact({ club }) {
  const ref = useRef(null)
  const t = useT()
  const desktop = useBreakpointValue({ base: false, lg: true }, { ssr: false })

  useLayoutEffect(() => {
    if (desktop === undefined) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)

      // Línea de nodos (Funciones · escritorio)
      q('.cx-nodes').forEach((n) => {
        gsap.fromTo(n.querySelector('.cx-fill'), { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: n, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        })
        n.querySelectorAll('.cx-node').forEach((li) => {
          ScrollTrigger.create({ trigger: li, start: 'top 72%', toggleClass: { targets: li, className: 'is-on' } })
        })
      })

      if (reduce) return

      // Contadores visibles al hacer scroll (escritorio)
      if (desktop) {
        q('[data-count]').forEach((el) => {
          ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => countUp([el]) })
        })
      }

      const stagger = (sel, from, trigger, start = 'top 85%') => {
        if (!q(sel).length || !q(trigger).length) return
        gsap.fromTo(q(sel), from, {
          x: 0, y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: q(trigger)[0], start },
        })
      }
      stagger('.cx-trophy', { y: 26, opacity: 0 }, '.cx-trophies', 'top 88%')
      stagger('.cc-ach', { y: 14, opacity: 0 }, '.cc-achs', 'top 92%')
      stagger('.cx-star', { x: -20, opacity: 0 }, '.cx-stars')
      stagger('.cx-streak', { y: 24, opacity: 0 }, '.cx-streaks', 'top 90%')
      q('.cx-photo .cc-reveal').forEach((img) => {
        gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: img, start: 'top 85%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [desktop])

  if (desktop === undefined) return null
  return (
    <Box ref={ref}>
      {desktop ? <DesktopBody club={club} t={t} /> : <MobileBody club={club} t={t} />}
    </Box>
  )
}
