import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Icon, Image } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'
import { useLocalized } from '../../i18n/LanguageContext'
import { PAGE_PX } from '../../styles/layout'

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


/* Naranja de la marca LED Sports */
const LED = '#FDA43C'
const LED_D = '#FC9A20'
const LED_LINE = 'rgba(253,164,60,0.32)'

/* Ficha de marketing · LED Sports (abre su Instagram) */
function MarketingCard({ m }) {
  return (
    <Grid
      as="a"
      href={m.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${m.label} · ${m.name} · Instagram ${m.handle}`}
      className="ct-led"
      position="relative"
      templateColumns="auto minmax(0, 1fr) auto"
      alignItems="center"
      gap={{ base: 3.5, lg: 5 }}
      mt={{ base: 3.5, lg: '2.6vh' }}
      py={{ base: 3, lg: 3.5 }}
      pl={{ base: 3, lg: 3.5 }}
      pr={{ base: 3.5, lg: 6 }}
      border="1px solid"
      borderColor={LED_LINE}
      bg="rgba(11,17,24,0.55)"
      overflow="hidden"
      isolation="isolate"
      transition="transform 160ms ease-out"
      _active={{ transform: 'scale(0.99)' }}
      _after={{ content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, w: '3px', bg: LED }}
      _before={{
        content: '""', position: 'absolute', inset: 0, zIndex: -1,
        bgGradient: `linear(to-r, ${LED}, ${LED_D})`,
        clipPath: 'inset(0 100% 0 0)', transition: `clip-path 340ms ${EASE}`,
      }}
      sx={{
        [HOVER]: {
          '&:hover::before': { clipPath: 'inset(0 0 0 0)' },
          '&:hover .led-name, &:hover .led-k, &:hover .led-go': { color: 'brand.ink' },
          '&:hover .led-go': { borderColor: 'rgba(5,8,12,0.45)' },
          '&:hover .led-h': { color: 'rgba(5,8,12,0.72)' },
          '&:hover .led-arrow': { transform: 'translateX(5px)' },
        },
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: LED, outlineOffset: '3px' }}
    >
      {/* el "SPORTS" del logo es blanco: siempre sobre fondo oscuro */}
      <Flex w={{ base: '60px', lg: '76px' }} h={{ base: '60px', lg: '76px' }} align="center" justify="center"
        bg="brand.ink" border="1px solid" borderColor="rgba(253,164,60,0.25)" flexShrink={0}>
        <Image src={m.logo} alt="" w="70%" h="auto" loading="lazy" decoding="async" />
      </Flex>

      <Flex direction="column" gap={1} minW={0}>
        <Text className="led-k" fontFamily="mono" fontWeight="700" textTransform="uppercase" color={LED}
          letterSpacing="0.18em" fontSize={{ base: '10px', lg: '12px' }} lineHeight={1} transition="color 200ms ease">
          {m.label}
        </Text>
        <Text className="led-name" fontFamily="heading" letterSpacing="0.03em" lineHeight={0.95}
          fontSize={{ base: '26px', lg: 'clamp(26px, 2.1vw, 38px)' }} color="brand.bone" transition="color 200ms ease">
          {m.name}
        </Text>
        <Text className="led-h" fontFamily="mono" fontWeight="600" letterSpacing="0.06em" color="brand.gray"
          fontSize={{ base: '12px', lg: '14px' }} lineHeight={1.1} transition="color 200ms ease">
          {m.handle}
        </Text>
      </Flex>

      <Flex className="led-go" align="center" justify="center" color={LED} transition="color 200ms ease, border-color 200ms ease"
        w={{ base: '40px', lg: 'auto' }} h={{ base: '40px', lg: 'auto' }} borderRadius="full"
        border={{ base: '1px solid', lg: 0 }} borderColor="rgba(253,164,60,0.4)">
        <Icon as={FaArrowRight} className="led-arrow" boxSize={{ base: '15px', lg: '18px' }}
          transition={`transform 300ms ${EASE}`} />
      </Flex>
    </Grid>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const { title, paragraphs } = useLocalized(coachData.contact)
  const contacts = useLocalized(coachData.contacts)
  const marketing = useLocalized(coachData.marketing)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      tl.from(q('.ct-title'), { yPercent: 30, opacity: 0, duration: 1, ease: 'expo.out' })
        .from(q('.ct-p'), { y: 16, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.6')
        .from(q('.ct-band'), { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'power4.inOut' }, '-=0.7')
        .from(q('.ct-cell'), { y: 18, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.4')
        .from(q('.ct-led'), { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
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
      px={PAGE_PX}
      py={{ base: 20, lg: '14vh' }}
    >
      {/* halo de la placa */}
      <Box position="absolute" left="-12%" top="-30%" w="45%" h="80%" borderRadius="50%" bg="rgba(76,184,242,0.15)"
        filter="blur(90px)" pointerEvents="none" />

      <Grid position="relative" templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={{ base: 10, lg: '5vw' }} alignItems="center">
        {/* 50 % · título + texto */}
        <Box>
          <Text as="h2" id="ct-title" className="ct-title" fontFamily="heading" fontWeight="400" letterSpacing="0.02em"
            lineHeight={0.82} fontSize={{ base: '76px', md: '120px', lg: 'clamp(110px, 9.5vw, 170px)' }}>
            {title}
          </Text>
          <Flex direction="column" gap={4} mt={{ base: 6, lg: '4vh' }} pl={{ base: 4, lg: 6 }}
            borderLeft="2px solid" borderColor="brand.celeste" maxW="60ch">
            {paragraphs.map((p, i) => (
              <Text key={i} className="ct-p" fontSize={{ base: '17px', lg: 'clamp(16px, 1.3vw, 21px)' }} fontStyle={'italic'} lineHeight={1.55}
                color="brand.bone" sx={{ textWrap: 'pretty' }}>
                {p}
              </Text>
            ))}
          </Flex>
        </Box>

        {/* 50 % · banda de accesos + ficha de marketing */}
        <Box minW={0}>
          <Grid className="ct-band" templateColumns="repeat(5, minmax(0, 1fr))"
            borderY="1px solid" borderColor="brand.celeste" bg="rgba(11,17,24,0.55)">
            {contacts.map((c, i) => <ContactCell key={c.id} c={c} first={i === 0} />)}
          </Grid>
          <MarketingCard m={marketing} />
        </Box>
      </Grid>
    </Box>
  )
}
