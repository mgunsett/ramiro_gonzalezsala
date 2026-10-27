import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// PERFIL PROFESIONAL · Opción A "Pizarra"
//  · Foto con el mismo encuadre de la placa (corte diagonal, halo,
//    líneas de marco con nodo) — las líneas se redibujan en CSS.
//  · Título en caja con borde celeste.
//  · 7 puntos unidos por una línea con nodos: la línea se llena con
//    el scroll y cada nodo se enciende al llegar a su punto.
// ─────────────────────────────────────────────────────────────

const NODE_OFF = {
  bg: 'brand.ink',
  border: '1px solid rgba(120,190,235,0.5)',
  boxShadow: 'none',
}

export default function ProfileSection() {
  const sectionRef = useRef(null)
  const { title, image, items } = coachData.profile

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const list = sectionRef.current.querySelector('.pf-list')
      const lis = gsap.utils.toArray('.pf-item')

      // Línea de la lista: se llena con el scroll
      gsap.fromTo('.pf-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      })

      // Nodos: se encienden al pasar la línea de lectura
      lis.forEach((li) => {
        ScrollTrigger.create({
          trigger: li,
          start: 'top 60%',
          onEnter: () => li.classList.add('is-on'),
          onLeaveBack: () => li.classList.remove('is-on'),
        })
      })

      if (reduce) return

      // Foto: aparece desde abajo + líneas del marco se dibujan
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.pf-photo', start: 'top 80%' } })
      tl.fromTo('.pf-photo-img',
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out' })
        .fromTo('.pf-line-h', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut', stagger: 0.1 }, '-=0.6')
        .fromTo('.pf-line-v', { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: 'power2.inOut' }, '<')
        .fromTo('.pf-node', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.2')

      // Título: la caja se abre de izquierda a derecha
      gsap.fromTo('.pf-title',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.pf-title', start: 'top 85%' } })

      // Puntos: entrada suave
      lis.forEach((li) => {
        gsap.fromTo(li, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: li, start: 'top 88%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="section"
      id="perfil"
      ref={sectionRef}
      aria-labelledby="perfil-title"
      position="relative"
      bg="brand.ink"
      px={{ base: 5, md: 10, lg: '7vw' }}
      py={{ base: 20, lg: '14vh' }}
      overflow="hidden"
    >
      {/* Halo celeste de fondo, como el degradé de la placa */}
      <Box
        position="absolute"
        right="-10%"
        bottom="-20%"
        w="50%"
        h="70%"
        borderRadius="50%"
        bg="rgba(76,184,242,0.10)"
        filter="blur(90px)"
        pointerEvents="none"
      />

      <Grid
        templateColumns={{ base: '1fr', lg: 'minmax(0,5fr) minmax(0,7fr)' }}
        gap={{ base: 12, lg: '5vw' }}
        alignItems="start"
        maxW="1400px"
        mx="auto"
        position="relative"
      >
        {/* ── Foto con el encuadre de la placa ── */}
        <Box
          className="pf-photo"
          position={{ base: 'relative', lg: 'sticky' }}
          top={{ lg: '14vh' }}
          justifySelf={{ base: 'center', lg: 'end' }}
          w={{ base: 'min(100%, 340px)', lg: 'auto' }}
          h={{ lg: 'min(76vh, 720px)' }}
          sx={{ aspectRatio: '588 / 1166' }}
        >
          <Image
            className="pf-photo-img"
            src={image}
            alt="Ramiro Gonzalez Sales en un entrenamiento de Atlético Tucumán"
            w="100%"
            h="100%"
            objectFit="cover"
            display="block"
            draggable={false}
            // funde la franja oscura de la derecha con el fondo, como en la placa
            sx={{
              maskImage: 'linear-gradient(90deg, #000 84%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, #000 84%, transparent 100%)',
            }}
          />

          {/* Línea superior que sale hacia la izquierda y termina en un nodo */}
          <Box className="pf-line-h" position="absolute" top={0} left={{ base: '-20px', lg: '-6vw' }} right="8.2%"
            h="1px" bg="brand.celeste" transformOrigin="right" />
          <Box className="pf-node" position="absolute" top="-3.5px" left="91.8%" ml="-3.5px" boxSize="8px"
            borderRadius="full" bg="brand.celeste" boxShadow="0 0 10px rgba(76,184,242,0.7)" />

          {/* Marco inferior: línea horizontal + vertical (sobre las de la foto) */}
          <Box className="pf-line-h" position="absolute" top="95.8%" left={0} w="83%" h="1px"
            bg="brand.celeste" opacity={0.85} transformOrigin="left" />
          <Box className="pf-line-v" position="absolute" top="95.8%" left="83%" w="1px" bottom={{ base: '-24px', lg: '-6vh' }}
            bg="brand.celeste" opacity={0.85} transformOrigin="top" />

          {/* Línea vertical a la izquierda, como el borde de la placa */}
          <Box className="pf-line-v" display={{ base: 'none', lg: 'block' }} position="absolute" left="-6vw" top="62%"
            bottom="-6vh" w="1px" bg="brand.celeste" opacity={0.6} transformOrigin="top" />
        </Box>

        {/* ── Texto ── */}
        <Box>
          <Box
            className="pf-title"
            display="inline-block"
            border="1px solid"
            borderColor="brand.celeste"
            px={{ base: 4, lg: 6 }}
            pt={{ base: 3, lg: 4 }}
            pb={{ base: 2, lg: 3 }}
            mb={{ base: 8, lg: '5vh' }}
          >
            <Text
              as="h2"
              id="perfil-title"
              fontFamily="heading"
              fontWeight="400"
              fontSize={{ base: '44px', md: '58px', lg: 'clamp(52px, 4.6vw, 80px)' }}
              lineHeight={0.9}
              letterSpacing="0.01em"
              color="brand.bone"
            >
              {title}
            </Text>
          </Box>

          <Flex
            as="ul"
            className="pf-list"
            listStyleType="none"
            direction="column"
            gap={{ base: 6, lg: '3.2vh' }}
            m={0}
            pl={{ base: 7, lg: 8 }}
            position="relative"
            _before={{
              content: '""', position: 'absolute', left: 0, top: '10px', bottom: '10px',
              w: '1px', bg: 'brand.linea',
            }}
          >
            <Box
              className="pf-fill"
              as="span"
              aria-hidden="true"
              position="absolute"
              left={0}
              top="10px"
              bottom="10px"
              w="1px"
              bg="brand.celeste"
              transformOrigin="top"
              transform="scaleY(0)"
            />
            {items.map(({ text, highlight }, i) => (
              <Box
                as="li"
                key={i}
                className="pf-item"
                position="relative"
                // conector horizontal desde la línea
                _after={{
                  content: '""', position: 'absolute', left: { base: '-21px', lg: '-25px' }, top: 'calc(0.75em + 4px)',
                  w: { base: '12px', lg: '16px' }, h: '1px', bg: 'brand.linea',
                }}
                // nodo
                _before={{
                  content: '""', position: 'absolute', left: { base: '-32px', lg: '-36px' }, top: '0.75em',
                  boxSize: '9px', borderRadius: 'full', transition: 'background-color 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
                  ...NODE_OFF,
                }}
                sx={{
                  '&.is-on::before': {
                    bg: 'var(--chakra-colors-brand-celeste)',
                    borderColor: 'var(--chakra-colors-brand-celeste)',
                    boxShadow: '0 0 0 4px rgba(76,184,242,0.16), 0 0 12px rgba(76,184,242,0.6)',
                  },
                }}
              >
                <Text
                  fontFamily="body"
                  fontSize={{ base: '16px', lg: 'clamp(16px, 1.25vw, 20px)' }}
                  lineHeight={1.5}
                  color="brand.gray"
                  maxW="58ch"
                  sx={{ textWrap: 'pretty' }}
                >
                  {text}
                  <Box as="strong" fontWeight="600" color="brand.bone">{highlight}</Box>
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}
