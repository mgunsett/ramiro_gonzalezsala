import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Text, Image, useBreakpointValue } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COUNTRY_NAME } from '../../data/statsData'
import { useT } from '../../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// Trayectoria como jugador · "Línea deslizante"
//  · Escritorio: la sección se fija y la línea avanza de costado con
//    el scroll; cada año se enciende al pasar por su nodo (contador 01/13).
//  · Móvil: la misma línea en vertical, con nodos que se encienden.
// ─────────────────────────────────────────────────────────────

const CREST = { es: 'Escudo de', en: 'Crest of', it: 'Stemma del' }
const LINE_TOP = '34%' // altura de la línea dentro del riel
const ON = 'is-on'

/* country: código 'AR' | 'IT' (ver statsData) */
export function Flag({ country, size = 'md' }) {
  const t = useT()
  const bg = country === 'IT'
    ? 'linear-gradient(90deg,#009246 33.3%,#fff 33.3% 66.6%,#CE2B37 66.6%)'
    : 'linear-gradient(#74ACDF 33.3%,#fff 33.3% 66.6%,#74ACDF 66.6%)'
  return (
    <Box as="span" role="img" aria-label={t(COUNTRY_NAME[country])} display="inline-block" flex="0 0 auto"
      w={size === 'sm' ? '18px' : '22px'} h={size === 'sm' ? '12px' : '14px'} borderRadius="2px"
      bg={bg} boxShadow="0 0 0 1px rgba(255,255,255,0.15)" />
  )
}

function Title({ children, ...rest }) {
  return (
    <Text as="h2" fontFamily="heading" fontWeight="400" textAlign="center" letterSpacing="0.02em" lineHeight={0.9}
      fontSize={{ base: '40px', md: '58px', lg: 'clamp(52px, 5.2vw, 88px)' }} sx={{ textWrap: 'balance' }} {...rest}>
      {children}
    </Text>
  )
}

const nodeOn = {
  bg: 'brand.celeste', borderColor: 'brand.celeste',
  boxShadow: '0 0 0 5px rgba(76,184,242,0.16), 0 0 14px rgba(76,184,242,0.7)',
}

/* ── Escritorio: riel horizontal fijado ── */
function DesktopRail({ title, clubs, t }) {
  return (
    <Flex className="pt-pin" direction="column" justify="center" h="100vh" overflow="hidden" position="relative" pt="8vh">
      <Title mb="4vh" px="6vw">{title}</Title>
      <Box position="relative" h="60vh">
        <Box position="absolute" left={0} right={0} top={LINE_TOP} h="1px" bg="brand.linea">
          <Box className="pt-line-fill" position="absolute" inset={0} bg="brand.celeste" transformOrigin="left" transform="scaleX(0)" />
        </Box>
        <Flex as="ol" className="pt-track" position="absolute" left={0} top={0} bottom={0} m={0} p={0} px="6vw"
          listStyleType="none" sx={{ willChange: 'transform' }}>
          {clubs.map((c) => (
            <Flex as="li" key={`${c.club}-${c.year}`} className="pt-stop" position="relative" direction="column" align="center"
              flex="0 0 auto" w="clamp(210px, 20vw, 300px)"
              sx={{
                [`&.${ON} .pt-year`]: { color: 'brand.celeste', WebkitTextStrokeColor: 'var(--chakra-colors-brand-celeste)' },
                [`&.${ON} .pt-node`]: nodeOn,
                [`&.${ON} .pt-card`]: { opacity: 1, transform: 'none' },
              }}>
              <Flex className="pt-year" h={LINE_TOP} align="flex-end" pb="22px" fontFamily="heading"
                fontSize="clamp(60px, 6.6vw, 108px)" lineHeight={0.8} color="transparent"
                sx={{ WebkitTextStroke: '1px rgba(76,184,242,0.45)', fontVariantNumeric: 'tabular-nums' }}
                transition="color 400ms ease, -webkit-text-stroke-color 400ms ease">
                {c.year}
              </Flex>
              <Box className="pt-node" position="absolute" top={LINE_TOP} left="50%" boxSize="13px" mt="-6.5px" ml="-6.5px"
                borderRadius="full" bg="brand.ink" border="1px solid" borderColor="rgba(76,184,242,0.6)"
                transition="background-color 300ms ease, box-shadow 300ms ease" />
              <Flex className="pt-card" direction="column" align="center" gap={3} mt="24px" textAlign="center"
                opacity={0.45} transform="translateY(10px)" transition="opacity 400ms ease, transform 500ms cubic-bezier(0.23,1,0.32,1)">
                <Image src={c.crest} alt={`${t(CREST)} ${c.club}`} h="clamp(110px, 18vh, 170px)" w="auto" maxW="100%" objectFit="contain"
                  loading="lazy" decoding="async" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.55))" />
                <Text fontFamily="heading" fontSize="clamp(24px, 2.2vw, 34px)" letterSpacing="0.03em" lineHeight={0.95}>{c.club}</Text>
                <Flag country={c.country} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Flex position="absolute" right="6vw" bottom="5vh" align="baseline" gap={1} fontFamily="mono" fontWeight="700"
        fontSize="14px" letterSpacing="0.14em" color="brand.gray" aria-hidden="true">
        <Text as="span" className="pt-count" fontFamily="heading" fontWeight="400" fontSize="34px" letterSpacing="0.02em" color="brand.bone"
          sx={{ fontVariantNumeric: 'tabular-nums' }}>01</Text>
        / {String(clubs.length).padStart(2, '0')}
      </Flex>
    </Flex>
  )
}

/* ── Móvil: línea vertical ── */
function MobileList({ title, clubs, t }) {
  return (
    <Box px={{ base: 5, md: 10 }} py={20}>
      <Title mb={8}>{title}</Title>
      <Box as="ol" className="pt-vlist" position="relative" m={0} p={0} pl="34px" listStyleType="none">
        <Box position="absolute" left="6px" top="10px" bottom="10px" w="1px" bg="brand.linea" />
        <Box className="pt-vfill" position="absolute" left="6px" top="10px" bottom="10px" w="1px" bg="brand.celeste"
          transformOrigin="top" transform="scaleY(0)" />
        {clubs.map((c) => (
          <Box as="li" key={`${c.club}-${c.year}`} className="pt-vstop" position="relative" display="grid" gridTemplateColumns="62px minmax(0,1fr)"
            gap={4} alignItems="center" py="14px" borderBottom="1px solid" borderColor="brand.linea"
            sx={{
              [`&.${ON} .pt-node`]: { ...nodeOn, boxShadow: '0 0 0 4px rgba(76,184,242,0.16), 0 0 12px rgba(76,184,242,0.7)' },
              [`&.${ON} .pt-year`]: { color: 'brand.celeste' },
            }}>
            <Box className="pt-node" position="absolute" left="-33px" top="50%" boxSize="11px" mt="-5.5px" borderRadius="full"
              bg="brand.ink" border="1px solid" borderColor="rgba(76,184,242,0.6)" transition="background-color 300ms ease, box-shadow 300ms ease" />
            <Image src={c.crest} alt={`${t(CREST)} ${c.club}`} h="62px" w="62px" objectFit="contain" loading="lazy" decoding="async"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))" />
            <Box>
              <Text className="pt-year" fontFamily="heading" fontSize="34px" lineHeight={0.85} color="transparent"
                sx={{ WebkitTextStroke: '1px rgba(76,184,242,0.6)', fontVariantNumeric: 'tabular-nums' }} transition="color 300ms ease">
                {c.year}
              </Text>
              <Flex align="center" gap={2.5} mt={1}>
                <Text fontFamily="heading" fontSize="24px" letterSpacing="0.03em" lineHeight={1}>{c.club}</Text>
                <Flag country={c.country} size="sm" />
              </Flex>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function PlayerTimeline({ title, clubs }) {
  const ref = useRef(null)
  const t = useT()
  const desktop = useBreakpointValue({ base: false, lg: true }, { ssr: false })

  useLayoutEffect(() => {
    if (desktop === undefined) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)

      if (desktop) {
        const pin = q('.pt-pin')[0]
        const track = q('.pt-track')[0]
        const stops = q('.pt-stop')
        const count = q('.pt-count')[0]
        const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth)
        const setOn = (p) => {
          const n = Math.min(stops.length - 1, Math.round(p * (stops.length - 1)))
          stops.forEach((s, i) => s.classList.toggle(ON, i <= n))
          count.textContent = String(n + 1).padStart(2, '0')
        }
        setOn(0)
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: pin, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6,
            invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (s) => setOn(s.progress),
          },
        })
        gsap.fromTo(q('.pt-line-fill'), { scaleX: 0 }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${dist()}`, scrub: 0.6, invalidateOnRefresh: true },
        })
      } else {
        const list = q('.pt-vlist')[0]
        gsap.fromTo(q('.pt-vfill'), { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
        })
        q('.pt-vstop').forEach((s) => {
          ScrollTrigger.create({ trigger: s, start: 'top 72%', toggleClass: { targets: s, className: ON } })
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [desktop])

  if (desktop === undefined) return null
  return (
    <Box ref={ref} borderTop="1px solid" borderColor="brand.linea">
      {desktop ? <DesktopRail title={title} clubs={clubs} t={t} /> : <MobileList title={title} clubs={clubs} t={t} />}
    </Box>
  )
}
