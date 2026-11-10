import { useRef, useLayoutEffect, useState } from 'react'
import { Box, Flex, Grid, Text, Image, Collapse } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'
import { useT, useLocalized } from '../../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const PHOTO_ALT = {
  es: 'Ramiro Gonzalez Sales en un entrenamiento de Atlético Tucumán',
  en: 'Ramiro Gonzalez Sales at an Atlético Tucumán training session',
  it: 'Ramiro Gonzalez Sales durante un allenamento dell’Atlético Tucumán',
}

// ─────────────────────────────────────────────────────────────
// PERFIL PROFESIONAL · Opción A "Pizarra"
//  · Foto con el mismo encuadre de la placa (corte diagonal, halo,
//    líneas de marco con nodo) — las líneas se redibujan en CSS.
//  · Título en caja, licencias e intro en negrita.
//  · 4 subsecciones en acordeón sobre la línea con nodos: solo se ven
//    las etiquetas; al tocar una se despliega su texto (una por vez) y
//    su nodo se enciende.
// ─────────────────────────────────────────────────────────────

const HOVER = '@media (hover: hover) and (pointer: fine)'
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

function Segs({ segs }) {
  return segs.map((s, i) => (s.b
    ? <Box as="strong" key={i} fontWeight="600" color="brand.bone">{s.t}</Box>
    : <Box as="span" key={i}>{s.t}</Box>))
}

/* Ícono +/− que rota al abrir */
function ToggleIcon({ open }) {
  return (
    <Box position="relative" boxSize="28px" flex="0 0 auto" borderRadius="full" border="1px solid" borderColor="brand.celeste"
      bg={open ? 'brand.celeste' : 'transparent'} transform={open ? 'rotate(180deg)' : 'none'}
      transition={`transform 260ms ${EASE}, background-color 200ms ease`} aria-hidden="true"
      _before={{ content: '""', position: 'absolute', left: '50%', top: '50%', w: '11px', h: '1.5px', ml: '-5.5px', mt: '-0.75px',
        bg: open ? 'brand.ink' : 'brand.celeste', transition: 'background-color 200ms ease' }}
      _after={{ content: '""', position: 'absolute', left: '50%', top: '50%', w: '11px', h: '1.5px', ml: '-5.5px', mt: '-0.75px',
        bg: open ? 'brand.ink' : 'brand.celeste', transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
        transition: `transform 260ms ${EASE}, background-color 200ms ease` }} />
  )
}

export default function ProfileSection() {
  const sectionRef = useRef(null)
  const t = useT()
  const { title, image, licenses, intro, sections, pointsLabel } = useLocalized(coachData.profile)
  const [open, setOpen] = useState(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
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

      // Licencias, intro y etiquetas: entrada suave
      gsap.fromTo('.pf-in', { opacity: 0, y: 14 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.pf-acc', start: 'top 92%' },
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
          <Image loading="lazy" decoding="async"
            className="pf-photo-img"
            src={image}
            alt={t(PHOTO_ALT)}
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

          <Text className="pf-in" fontSize={{ base: '16px', lg: 'clamp(16px, 1.45vw, 23px)' }} color="brand.gray" letterSpacing="0.01em"
            mt={{ base: -4, lg: '-2.5vh' }}>
            {licenses}
          </Text>
          <Text className="pf-in" fontWeight="600" fontSize={{ base: '16px', lg: 'clamp(16px, 1.3vw, 20px)' }} lineHeight={1.45}
            color="brand.bone" maxW="58ch" mt={{ base: 5, lg: '3vh' }} mb={{ base: 7, lg: '4vh' }}>
            {intro.map((line, i) => <Box as="span" key={i} display="block">{line}</Box>)}
          </Text>

          {/* Acordeón sobre la línea con nodos */}
          <Box className="pf-acc" position="relative" pl={{ base: 7, lg: 8 }}
            _before={{ content: '""', position: 'absolute', left: '4px', top: '14px', bottom: '14px', w: '1px', bg: 'brand.linea' }}>
            {sections.map((sec, i) => {
              const isOpen = open === i
              const panelId = `pf-panel-${i}`
              return (
                <Box key={i} className="pf-in" position="relative" borderBottom="1px solid" borderColor="brand.linea"
                  _before={{
                    content: '""', position: 'absolute', left: { base: '-28px', lg: '-32px' }, top: '27px', boxSize: '9px',
                    borderRadius: 'full', border: '1px solid',
                    bg: isOpen ? 'brand.celeste' : 'brand.ink',
                    borderColor: isOpen ? 'brand.celeste' : 'rgba(120,190,235,0.5)',
                    boxShadow: isOpen ? '0 0 0 4px rgba(76,184,242,0.16), 0 0 12px rgba(76,184,242,0.6)' : 'none',
                    transition: 'background-color 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
                  }}>
                  <Flex as="button" type="button" w="100%" align="center" gap={4} py={4} textAlign="left" role="group"
                    aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}>
                    <Text as="h3" fontFamily="heading" fontWeight="400" letterSpacing="0.06em" lineHeight={1}
                      fontSize={{ base: '22px', lg: 'clamp(22px, 1.9vw, 30px)' }} px={3.5} pt="9px" pb="6px"
                      border="1px solid" borderColor="brand.celeste"
                      bg={isOpen ? 'brand.celeste' : 'transparent'} color={isOpen ? 'brand.ink' : 'brand.bone'}
                      transition="background-color 220ms ease, color 220ms ease"
                      sx={{ [HOVER]: { '[role=group]:hover &': { bg: isOpen ? 'brand.celeste' : 'rgba(76,184,242,0.14)' } } }}>
                      {sec.title}
                    </Text>
                    <Text ml="auto" fontFamily="mono" fontWeight="600" fontSize="14px" letterSpacing="0.08em" color="brand.gray"
                      display={{ base: 'none', sm: 'block' }}>
                      {sec.items.length} {pointsLabel}
                    </Text>
                    <Box ml={{ base: 'auto', sm: 0 }}><ToggleIcon open={isOpen} /></Box>
                  </Flex>

                  <Collapse in={isOpen} animateOpacity>
                    <Flex as="ul" id={panelId} listStyleType="none" direction="column" gap={3} m={0} p={0} pb={6}>
                      {sec.items.map((segs, j) => (
                        <Box as="li" key={j} position="relative" pl={4} fontSize={{ base: '16px', lg: 'clamp(15px, 1.2vw, 19px)' }}
                          lineHeight={1.45} color="brand.gray" maxW="62ch"
                          _before={{ content: '""', position: 'absolute', left: 0, top: '0.6em', boxSize: '6px', borderRadius: 'full', bg: 'brand.celeste' }}>
                          <Segs segs={segs} />
                        </Box>
                      ))}
                    </Flex>
                  </Collapse>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
