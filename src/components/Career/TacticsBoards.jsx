import { useRef, useState, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'

// ─────────────────────────────────────────────────────────────
// Sistemas tácticos: pizarras dibujadas en código (nítidas y animables).
//  · Escritorio: foto + grilla 2×2.
//  · Móvil: slider horizontal con scroll-snap y puntos de navegación,
//    para no ocupar tanta altura.
// ─────────────────────────────────────────────────────────────

const PITCH_BG = 'repeating-linear-gradient(180deg, #0A1A16 0 10%, #0C1F1A 10% 20%)'

export function Pitch({ positions, label, accent = 'var(--chakra-colors-brand-celeste)' }) {
  return (
    <Box
      className="tb-pitch"
      position="relative"
      w="100%"
      sx={{ aspectRatio: '68 / 100' }}
      bg={PITCH_BG}
      border="1px solid rgba(120,190,235,0.35)"
      overflow="hidden"
      role="img"
      aria-label={label}
    >
      <Box as="svg" viewBox="0 0 68 100" preserveAspectRatio="none" position="absolute" inset={0} w="100%" h="100%"
        aria-hidden="true" sx={{ '& *': { fill: 'none', stroke: 'rgba(140,200,240,0.38)', strokeWidth: 0.5 } }}>
        <rect x="2" y="2" width="64" height="96" />
        <line x1="2" y1="50" x2="66" y2="50" />
        <circle cx="34" cy="50" r="8" />
        <rect x="16" y="2" width="36" height="15" />
        <rect x="25" y="2" width="18" height="6" />
        <rect x="16" y="83" width="36" height="15" />
        <rect x="25" y="92" width="18" height="6" />
      </Box>
      {positions.map(([x, y], i) => (
        <Box
          key={i}
          className="tb-player"
          position="absolute"
          left={`${x}%`}
          top={`${y}%`}
          w="9%"
          ml="-4.5%"
          mt="-4.5%"
          sx={{ aspectRatio: '1' }}
          borderRadius="full"
          bg={i === 0 ? 'brand.bone' : accent}
          border="1.5px solid"
          borderColor={i === 0 ? accent : 'brand.bone'}
          boxShadow="0 0 10px rgba(76,184,242,0.55)"
        />
      ))}
    </Box>
  )
}

function Board({ system }) {
  return (
    <Flex direction="column" align="center" gap={2.5}>
      <Box w={{ base: '100%', lg: 'min(100%, 230px)' }}>
        <Pitch positions={system.positions} label={`${system.label} ${system.name}`} />
      </Box>
      <Text fontFamily="mono" fontWeight="500" fontSize="15px" letterSpacing="0.06em" color="brand.gray" textAlign="center" lineHeight={1.1}>
        {system.label}
        <Box as="span" display="block" fontFamily="heading" fontSize={{ base: '38px', lg: 'clamp(30px, 2.6vw, 44px)' }}
          color="brand.celeste" letterSpacing="0.06em" lineHeight={0.95}>
          {system.name}
        </Box>
      </Text>
    </Flex>
  )
}

export default function TacticsBoards({ tactics }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const { photo, photoAlt, systems } = tactics

  // Slider móvil: punto activo según la tarjeta centrada
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const mid = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let dist = Infinity
      Array.from(track.children).forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (d < dist) { dist = d; best = i }
      })
      setActive(best)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i) => {
    const track = trackRef.current
    const el = track?.children[i]
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 4fr) minmax(0, 7fr)' }} gap={{ base: 0, lg: '4vw' }} alignItems="start">
      {/* Foto (solo escritorio: en móvil se prioriza la altura) */}
      <Box display={{ base: 'none', lg: 'block' }} borderTopRightRadius="46px" overflow="hidden">
        <Image className="cc-reveal" src={photo} alt={photoAlt} w="100%" h="auto" display="block" />
      </Box>

      <Box minW={0}>
        <Flex
          ref={trackRef}
          className="tb-track"
          role="group"
          aria-roledescription="carrusel"
          aria-label="Sistemas tácticos"
          // móvil: slider · escritorio: grilla 2×2
          display={{ base: 'flex', lg: 'grid' }}
          gridTemplateColumns={{ lg: 'repeat(2, minmax(0,1fr))' }}
          gap={{ base: 4, lg: '3vh 3vw' }}
          overflowX={{ base: 'auto', lg: 'visible' }}
          mx={{ base: -5, md: -10, lg: 0 }}
          // móvil: la tarjeta ocupa ~el 52% y deja ver las vecinas a los costados
          px={{ base: '24%', lg: 0 }}
          sx={{
            scrollSnapType: { base: 'x mandatory', lg: 'none' },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            '@media (prefers-reduced-motion: no-preference)': { scrollBehavior: 'smooth' },
          }}
        >
          {systems.map((s) => (
            <Box key={s.name} flex={{ base: '0 0 100%', lg: 'initial' }} sx={{ scrollSnapAlign: 'center' }}>
              <Board system={s} />
            </Box>
          ))}
        </Flex>

        {/* Puntos del slider (móvil) */}
        <Flex display={{ base: 'flex', lg: 'none' }} justify="center" gap={2} mt={5}>
          {systems.map((s, i) => (
            <Box
              as="button"
              type="button"
              key={s.name}
              onClick={() => goTo(i)}
              aria-label={`Ver ${s.label} ${s.name}`}
              aria-current={active === i ? 'true' : undefined}
              h="8px"
              w={active === i ? '26px' : '8px'}
              borderRadius="full"
              bg={active === i ? 'brand.celeste' : 'brand.humo'}
              border="1px solid"
              borderColor={active === i ? 'brand.celeste' : 'rgba(120,190,235,0.4)'}
              transition="width 220ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease"
              _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}
            />
          ))}
        </Flex>
      </Box>
    </Grid>
  )
}
