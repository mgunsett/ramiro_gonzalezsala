import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Icon } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'

gsap.registerPlugin(ScrollTrigger)


const HOVER = '@media (hover: hover) and (pointer: fine)'
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

/* Logo "tm" de Transfermarkt (no está en react-icons) */
function TmIcon(props) {
  return (
    <Box as="svg" viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="3" />
      <text x="24" y="30" textAnchor="middle" fill="currentColor"
        style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontStyle: 'italic', fontSize: 17 }}>tm</text>
    </Box>
  )
}

function ContactCell({ c, first }) {
  const disabled = c.id === 'email' && !coachData.email
  const href = c.id === 'email' ? `mailto:${coachData.email}` : c.href
  const external = !href.startsWith('mailto:')
  const iconSize = { base: '26px', sm: '32px', lg: 'clamp(34px, 2.8vw, 48px)' }

  return (
    <Flex
      as={disabled ? 'div' : 'a'}
      href={disabled ? undefined : href}
      target={!disabled && external ? '_blank' : undefined}
      rel={!disabled && external ? 'noopener noreferrer' : undefined}
      aria-label={c.label ? `${c.label} · ${c.network}` : c.network}
      aria-disabled={disabled || undefined}
      className="ct-cell"
      position="relative"
      direction="column"
      align="center"
      justify="center"
      gap={{ base: 2.5, lg: 4 }}
      minW={0}
      py={{ base: 5, lg: '5vh' }}
      px={1}
      overflow="hidden"
      borderLeft={first ? 0 : '1px solid'}
      borderColor="brand.linea"
      color="brand.bone"
      opacity={disabled ? 0.4 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      transition={`color 200ms ease`}
      _before={{
        content: '""', position: 'absolute', inset: 0, bg: 'brand.celeste',
        clipPath: 'inset(100% 0 0 0)', transition: `clip-path 260ms ${EASE}`,
      }}
      sx={{
        '& > *': { position: 'relative' },
        [HOVER]: disabled ? {} : {
          '&:hover': { color: 'brand.ink' },
          '&:hover::before': { clipPath: 'inset(0 0 0 0)' },
          '&:hover .ct-net': { color: 'brand.ink' },
        },
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '-3px' }}
    >
      {c.icon === 'tm' ? <TmIcon boxSize={iconSize} /> : <Icon as={c.icon} boxSize={iconSize} />}
      <Text className="ct-net" fontFamily="mono" fontWeight="700" letterSpacing="0.06em" textAlign="center"
        fontSize={{ base: '10px', sm: '13px', lg: 'clamp(13px, 1.05vw, 17px)' }} lineHeight={1.1}
        color="brand.bone" transition="color 200ms ease" noOfLines={1}>
        {c.network}
      </Text>
    </Flex>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const { title, paragraphs } = coachData.contact

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      tl.from(q('.ct-title'), { yPercent: 30, opacity: 0, duration: 1, ease: 'expo.out' })
        .from(q('.ct-p'), { y: 16, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.6')
        .from(q('.ct-band'), { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'power4.inOut' }, '-=0.7')
        .from(q('.ct-cell'), { y: 18, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.4')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      id={coachData.contactId}
      ref={ref}
      aria-labelledby="ct-title"
      position="relative"
      overflow="hidden"
      bg="brand.ink"
      borderTop="1px solid"
      borderColor="brand.linea"
      px={{ base: 4, md: 10, lg: '6vw' }}
      py={{ base: 20, lg: '14vh' }}
    >
      {/* halo de la placa */}
      <Box position="absolute" left="-12%" top="-30%" w="45%" h="80%" borderRadius="50%" bg="rgba(76,184,242,0.15)"
        filter="blur(90px)" pointerEvents="none" />

      <Grid position="relative" maxW="1400px" mx="auto" templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={{ base: 10, lg: '5vw' }} alignItems="center">
        {/* 50 % · título + texto */}
        <Box>
          <Text as="h2" id="ct-title" className="ct-title" fontFamily="heading" fontWeight="400" letterSpacing="0.02em"
            lineHeight={0.82} fontSize={{ base: '76px', md: '120px', lg: 'clamp(110px, 9.5vw, 170px)' }}>
            {title}
          </Text>
          <Flex direction="column" gap={4} mt={{ base: 6, lg: '4vh' }} pl={{ base: 4, lg: 6 }}
            borderLeft="2px solid" borderColor="brand.celeste" maxW="60ch">
            {paragraphs.map((p) => (
              <Text key={p} className="ct-p" fontSize={{ base: '17px', lg: 'clamp(16px, 1.3vw, 21px)' }} fontStyle={'italic'} lineHeight={1.55}
                color="brand.bone" sx={{ textWrap: 'pretty' }}>
                {p}
              </Text>
            ))}
          </Flex>
        </Box>

        {/* 50 % · banda de accesos */}
        <Grid className="ct-band" templateColumns="repeat(5, minmax(0, 1fr))"
          borderY="1px solid" borderColor="brand.celeste" bg="rgba(11,17,24,0.55)">
          {coachData.contacts.map((c, i) => <ContactCell key={c.id} c={c} first={i === 0} />)}
        </Grid>
      </Grid>
    </Box>
  )
}
