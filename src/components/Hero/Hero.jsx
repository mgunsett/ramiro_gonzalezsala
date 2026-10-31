import { useRef, useLayoutEffect } from 'react'
import { Box, Text, Flex, Image, useToken } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'
import MatchBox from './MatchBox'
import useMatches from '../../hooks/useMatches'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)


/* Número destacado dentro de "+160 partidos y 13 titulos" */
function Num({ children }) {
  return (
    <Box
      as="span"
      fontFamily="heading"
      color="brand.celeste"
      fontSize="1.5em"
      lineHeight={0.8}
      verticalAlign="-0.12em"
      letterSpacing="0.02em"
    >
      {children}
    </Box>
  )
}

function CoachPanel() {
  const [celeste] = useToken('colors', ['brand.celeste'])
  const { hero, initials } = coachData

  return (
    <Flex direction="column" gap={{ base: 3, lg: '1.6vh' }}>
      <Flex align="flex-start" gap={{ base: 3, lg: '1.6vw' }}>
        <Text
          className="coach-mono hero-panel-item"
          as="span"
          fontFamily="heading"
          fontSize={{ base: '15vw', md: '11vw', lg: '6vw' }}
          lineHeight={0.85}
          color="transparent"
          sx={{ WebkitTextStroke: `2px ${celeste}` }}
          aria-hidden="true"
        >
          DT
        </Text>
        <Box className="hero-panel-item" w="1px" alignSelf="stretch" bg="brand.celeste" opacity={0.8} />
        <Flex
          className="hero-panel-item"
          direction="column"
          gap={{ base: 1, lg: '0.6vh' }}
          fontFamily="mono"
          letterSpacing="0.14em"
          textTransform="uppercase"
        >
          <Text color="brand.celeste" fontWeight="700" fontSize="clamp(13px, 1.35vw, 18px)">
            {hero.role}
          </Text>
          <Text color="brand.bone" fontWeight="500" fontSize="clamp(12px, 1.25vw, 16px)">
            {hero.license}
          </Text>
          <Text color="brand.bone" fontWeight="500" fontSize="clamp(12px, 1.25vw, 16px)">
            {hero.exPlayer}
          </Text>
        </Flex>
      </Flex>

      <Text
        className="hero-panel-item"
        fontFamily="mono"
        fontWeight="600"
        fontSize="clamp(15px, 1.55vw, 27px)"
        letterSpacing="0.06em"
        color="brand.bone"
        pt={{ base: 3, lg: '1.4vh' }}
        borderTop="1px solid"
        borderColor="brand.linea"
      >
        <Num>{hero.impact.matches}</Num> partidos y <Num>{hero.impact.titles}</Num> titulos
      </Text>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const [celeste] = useToken('colors', ['brand.celeste'])
  const [l1, l2, l3] = coachData.nameLines
  const { matches } = useMatches()

  const outline = { color: 'transparent', WebkitTextStroke: `2px ${celeste}` }

  // Entrada
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo('.hero-bg-img',
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .fromTo('.hero-name-line',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, 0.3)
        .fromTo('.hero-photo',
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out' }, 0.5)
        .fromTo('.hero-panel-item',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 1.2)
        .fromTo('.hero-matches-wrap',
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 1.5)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // Scroll: viñeta + leve desplazamiento del nombre
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: outerRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: 1.2,
      }
      gsap.fromTo('.hero-vignette', { opacity: 0.15 }, { opacity: 0.8, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-name', { yPercent: -8, ease: 'none', scrollTrigger: { ...st } })
      gsap.to('.hero-scroll-cue', { opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '+=15%' } })
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id="hero">
      <Box
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.ink"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          '@supports (height: 100dvh)': { height: '100dvh' },
        }}
      >
        {/* Glow celeste */}
        <Box
          position="absolute"
          w={{ base: '90vw', lg: '50vw' }}
          h="70%"
          left={{ base: '5vw', lg: '35vw' }}
          top="10%"
          borderRadius="50%"
          bg="brand.glow"
          filter="blur(70px)"
          pointerEvents="none"
        />

        {/* Foto secundaria — difuminada de fondo */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          pt={{ base: '2vh', lg: '4vh' }}
          pl={{ base: '50vw', lg: '56vw' }}
          sx={{
            maskImage: 'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
          }}
        >
          <Box className="hero-bg-img" h={{ base: '90vh', lg: '112vh' }}>
            <Image
              src={coachData.imageBg}
              alt=""
              aria-hidden="true"
              draggable={false}
              h="100%"
              w="auto"
              maxW="none"
              opacity={0.2}
              filter="grayscale(100%) contrast(1.05)"
              sx={{ mixBlendMode: 'luminosity' }}
            />
          </Box>
        </Box>

        {/* Nombre gigante */}
        <Flex
          className="hero-name"
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
          align={{ base: 'flex-start', lg: 'center' }}
          justify="center"
          pl={{ base: 4, lg: '16vw' }}
          pr={{ base: 4, lg: 0 }}
          pt={{ base: '20vh', lg: 0 }}
          mt={{ base: 0, lg: '-12vh' }}
        >
          <Flex as="h1" direction="column" fontFamily="heading" lineHeight={0.9} letterSpacing="0.01em" m={0}>
            <Box as="span" display="block" overflow="hidden">
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '22vw', md: '11vw', lg: '9vw' }} sx={outline}>
                {l1}
              </Box>
            </Box>
            <Box as="span" display="block" overflow="hidden" mt={{ base: '-1vw', lg: '-1.2vw' }}>
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '29vw', md: '16vw', lg: '13vw' }} color="brand.bone">
                {l2}
              </Box>
            </Box>
            <Box as="span" display="block" overflow="hidden" alignSelf="flex-end" mt={{ base: '-1vw', lg: '-1vw' }}>
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '22vw', md: '11vw', lg: '9vw' }} sx={outline}>
                {l3}
              </Box>
            </Box>
          </Flex>
        </Flex>

        {/* Foto principal */}
        <Box
          position="absolute"
          left={{ base: '30%', lg: '15vw' }}
          transform={{ base: 'translateX(-35%)', lg: 'none' }}
          bottom={0}
          h={{ base: '64vh', md: '68vh', lg: '90vh' }}
          zIndex={9}
          pointerEvents="none"
        >
          <Box className="hero-photo" h="100%">
            <Image
              className="coach-photo"
              src={coachData.image}
              alt={`${coachData.displayName}, entrenador de fútbol`}
              h="100%"
              w="auto"
              maxW="none"
              draggable={false}
              
            />
          </Box>
        </Box>

        {/* Panel RG */}
        <Box
          className="coach-info"
          position="absolute"
          zIndex={15}
          left={{ base: 0, lg: '40vw' }}
          right={{ base: 0, lg: 'auto' }}
          bottom={{ base: 0, lg: '8vh' }}
          px={{ base: 4, md: 8, lg: 0 }}
          pt={{ base: 6, lg: 0 }}
          pb={{ base: '7vh', lg: 0 }}
          bg={{ base: 'linear-gradient(transparent, rgba(5,8,12,0.92) 35%)', lg: 'transparent' }}
        >
          <CoachPanel />
        </Box>

        {/* Pestaña de partidos */}
        <Box
          className="hero-matches-wrap"
          position="absolute"
          right={0}
          top={{ base: '34vh', lg: '50%' }}
          transform={{ base: 'none', lg: 'translateY(-50%)' }}
          zIndex={16}
        >
          <MatchBox last={matches.last} next={matches.next} />
        </Box>

       

        {/* Viñeta */}
        <Box
          className="hero-vignette"
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)"
          pointerEvents="none"
          opacity={0.15}
        />
      </Box>
    </Box>
  )
}
