import { useRef, useLayoutEffect, useState } from 'react'
import { Box, Text, Flex, Image, Link, Icon, useToken } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

// ─────────────────────────────────────────────────────────────
// HERO · Opción D "Coach Panel" (línea Rondelli)
//  · Nombre gigante en 3 líneas detrás de la foto (outline / sólido / outline)
//  · Foto principal revelada desde abajo (clip-path)
//  · Foto secundaria en grises con máscara radial de fondo
//  · Panel RG + datos exactos de la placa
//  · Pestaña lateral de Contacto (reemplaza al MatchBox)
//  · Sticky 200vh + viñeta que se cierra con el scroll
// ─────────────────────────────────────────────────────────────

/* Número destacado dentro de "+160 partidos y 13 titulos" */
function Num({ children }) {
  return (
    <Box
      as="span"
      fontFamily="heading"
      color="brand.celeste"
      fontSize="1.9em"
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
          {initials}
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
          <Text color="brand.celeste" fontWeight="700" fontSize="clamp(13px, 1.35vw, 24px)">
            {hero.role}
          </Text>
          <Text color="brand.bone" fontWeight="500" fontSize="clamp(12px, 1.25vw, 22px)">
            {hero.license}
          </Text>
          <Text color="brand.bone" fontWeight="500" fontSize="clamp(12px, 1.25vw, 22px)">
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

function ContactTab() {
  const [open, setOpen] = useState(false)

  return (
    <Flex className="hero-contact" align="stretch">
      <Box
        as="button"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="hero-contact-card"
        aria-label={open ? 'Cerrar contacto' : 'Abrir contacto'}
        position="relative"
        minH={{ base: '150px', lg: '34vh' }}
        py={{ base: 4, lg: '2vh' }}
        px={{ base: 2, lg: 3 }}
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        bg="whiteAlpha.100"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="brand.celeste"
        borderRightWidth={0}
        borderLeftRadius="10px"
        color="brand.celeste"
        cursor="pointer"
        transition="background 0.3s"
        _hover={{ bg: 'whiteAlpha.200' }}
        _focusVisible={{ outline: '2px solid', outlineColor: 'brand.bone', outlineOffset: '2px' }}
        _before={{
          content: '""', position: 'absolute', top: '10px', right: 0,
          w: '2px', h: '28px', bg: 'brand.celeste',
        }}
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: '15px', lg: 'clamp(15px, 1.5vw, 22px)' }}
          letterSpacing="0.2em"
          lineHeight={1}
          sx={{ writingMode: 'vertical-rl' }}
        >
          CONTACTO
        </Text>
        <Box
          as="span"
          aria-hidden="true"
          fontSize="18px"
          lineHeight={1}
          transform={open ? 'rotate(180deg)' : 'none'}
          transition="transform 0.4s"
        >
          ‹
        </Box>
      </Box>

      <AnimatePresence initial={false}>
        {open && (
          <MotionBox
            id="hero-contact-card"
            key="card"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            overflow="hidden"
            bg="rgba(5,8,12,0.82)"
            backdropFilter="blur(12px)"
            borderY="1px solid"
            borderColor="brand.linea"
          >
            <Flex as="ul" listStyleType="none" direction="column" gap={2} px={5} py={5} minW="230px">
              {coachData.contacts.map(({ id, label, network, href, icon }) => (
                <Box as="li" key={id}>
                  <Link
                    href={href}
                    isExternal
                    display="flex"
                    alignItems="center"
                    gap={3}
                    py={2}
                    borderBottom="1px solid"
                    borderColor="brand.linea"
                    fontFamily="mono"
                    letterSpacing="0.12em"
                    color="brand.bone"
                    _hover={{ color: 'brand.celeste', textDecoration: 'none' }}
                  >
                    <Flex
                      boxSize="30px"
                      flex="0 0 auto"
                      align="center"
                      justify="center"
                      border="1px solid"
                      borderColor="brand.celeste"
                      color="brand.celeste"
                    >
                      <Icon as={icon} boxSize="14px" />
                    </Flex>
                    <Box>
                      <Text fontSize="13px" lineHeight={1.2}>{label}</Text>
                      <Text fontSize="10px" color="brand.gray" letterSpacing="0.18em" textTransform="uppercase">
                        {network}
                      </Text>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const [celeste] = useToken('colors', ['brand.celeste'])
  const [l1, l2, l3] = coachData.nameLines

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
        .fromTo('.hero-contact',
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
          pt={{ base: '8vh', lg: '4vh' }}
          pl={{ base: 0, lg: '6vw' }}
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
          pt={{ base: '14vh', lg: 0 }}
          mt={{ base: 0, lg: '-12vh' }}
        >
          <Flex as="h1" direction="column" fontFamily="heading" lineHeight={0.9} letterSpacing="0.01em" m={0}>
            <Box as="span" display="block" overflow="hidden">
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '15vw', md: '11vw', lg: '9vw' }} sx={outline}>
                {l1}
              </Box>
            </Box>
            <Box as="span" display="block" overflow="hidden" mt={{ base: '-1vw', lg: '-1.2vw' }}>
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '22vw', md: '16vw', lg: '13vw' }} color="brand.bone">
                {l2}
              </Box>
            </Box>
            <Box as="span" display="block" overflow="hidden" alignSelf="flex-end" mt={{ base: '-1vw', lg: '-1vw' }}>
              <Box as="span" className="hero-name-line" display="block"
                fontSize={{ base: '15vw', md: '11vw', lg: '9vw' }} sx={outline}>
                {l3}
              </Box>
            </Box>
          </Flex>
        </Flex>

        {/* Foto principal */}
        <Box
          position="absolute"
          left={{ base: '50%', lg: '9vw' }}
          transform={{ base: 'translateX(-35%)', lg: 'none' }}
          bottom={0}
          h={{ base: '62vh', md: '68vh', lg: '93vh' }}
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
              filter="drop-shadow(0 20px 40px rgba(0,0,0,0.55))"
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

        {/* Pestaña de contacto */}
        <Box
          position="absolute"
          right={0}
          top={{ base: '34vh', lg: '50%' }}
          transform={{ base: 'none', lg: 'translateY(-50%)' }}
          zIndex={16}
        >
          <ContactTab />
        </Box>

        {/* Indicador de scroll */}
        <Box
          className="hero-scroll-cue"
          position="absolute"
          left="50%"
          bottom="2vh"
          zIndex={18}
          w="1px"
          h="36px"
          bgGradient={`linear(to-b, ${celeste}, transparent)`}
          display={{ base: 'none', lg: 'block' }}
          aria-hidden="true"
        />

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
