import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TacticsBoards from './TacticsBoards'

gsap.registerPlugin(ScrollTrigger)

/* Texto por segmentos (resaltado / negrita / cifra / chico) */
function Segs({ segs, accent }) {
  return segs.map((s, i) => {
    if (s.hl) return (
      <Box as="span" key={i} color={accent} fontFamily="mono" fontWeight="700" letterSpacing="0.03em">{s.t}</Box>
    )
    if (s.big) return (
      <Box as="span" key={i} fontFamily="heading" fontWeight="400" color={accent} fontSize="1.9em" lineHeight={0.8}
        verticalAlign="-0.1em" letterSpacing="0.01em" sx={{ fontVariantNumeric: 'tabular-nums' }}
        {...countAttrs(s.t)}>
        {s.t}
      </Box>
    )
    if (s.b) return <Box as="strong" key={i} fontWeight="600" color="brand.bone">{s.t}</Box>
    if (s.small) return <Box as="span" key={i} fontSize="0.78em" color="brand.gray" fontWeight="400">{s.t}</Box>
    return <Box as="span" key={i}>{s.t}</Box>
  })
}

/* "+403" → data-to=403, data-prefix="+" (para el contador) */
function countAttrs(str) {
  const m = String(str).match(/^([^\d]*)(\d+)$/)
  return m ? { 'data-to': m[2], 'data-prefix': m[1] } : {}
}

function SubTitle({ children }) {
  return (
    <Flex as="h3" align="center" gap={3} fontFamily="heading" fontWeight="400"
      fontSize={{ base: '30px', lg: 'clamp(28px, 2.4vw, 40px)' }} letterSpacing="0.05em" lineHeight={1}
      color="brand.bone" mb={{ base: 5, lg: '3vh' }}
      _after={{ content: '""', flex: 1, h: '1px', bg: 'brand.linea' }}>
      {children}
    </Flex>
  )
}

function Star({ color }) {
  return (
    <Box as="svg" viewBox="0 0 24 24" boxSize="16px" flex="0 0 auto" mt="0.35em" aria-hidden="true">
      <path fill={color} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" />
    </Box>
  )
}

export default function CareerChapter({ club }) {
  const ref = useRef(null)
  const {
    accent, titleOutline, titleSolid, role, from, to, between = 'hasta', crest, crestAlt, totals, tagline,
    functions, trophies, achievements, performance, streaks,
    paragraphs, paragraphsPhoto, responsibilities, tactics,
  } = club

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // Riel de fechas: se llena a lo largo del capítulo
      gsap.fromTo('.cc-rail-fill', { scale: 0 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', end: 'bottom 70%', scrub: 0.6 },
      })

      // Contadores (totales, rendimiento, rachas)
      gsap.utils.toArray('[data-to]').forEach((el) => {
        const to = Number(el.dataset.to)
        const prefix = el.dataset.prefix || ''
        if (reduce) return
        const o = { v: 0 }
        gsap.to(o, {
          v: to, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = prefix + Math.round(o.v) },
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      if (reduce) return

      gsap.fromTo('.cc-title', { yPercent: 30, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.to('.cc-watermark', {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      const q = gsap.utils.selector(ref)
      const stagger = (sel, from, trigger, start = 'top 85%') => {
        if (!q(sel).length || !q(trigger).length) return
        gsap.fromTo(q(sel), from, {
          x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: q(trigger)[0], start },
        })
      }
      stagger('.cc-fn', { x: -14, opacity: 0 }, '.cc-fn-list')
      stagger('.cc-trophy', { y: 30, opacity: 0 }, '.cc-trophies')
      stagger('.cc-ach', { y: 14, opacity: 0 }, '.cc-achs', 'top 90%')
      stagger('.cc-perf', { x: -14, opacity: 0 }, '.cc-perf-list')
      stagger('.cc-streak', { y: 24, opacity: 0 }, '.cc-streaks', 'top 90%')
      stagger('.cc-par', { x: -14, opacity: 0 }, '.cc-par-list')
      stagger('.cc-resp', { y: 16, opacity: 0 }, '.cc-resp-list', 'top 90%')
      // Fotos: aparecen desde abajo
      q('.cc-reveal').forEach((img) => {
        gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: img, start: 'top 85%' },
        })
      })
      // Pizarras: los jugadores salen del arco y se acomodan en su posición
      q('.tb-pitch').forEach((pitch) => {
        gsap.from(pitch.querySelectorAll('.tb-player'), {
          left: '50%', top: '92%', duration: 0.9, stagger: 0.03, ease: 'power3.inOut',
          scrollTrigger: { trigger: q('.tb-track')[0], start: 'top 85%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Grid
      as="article"
      ref={ref}
      aria-labelledby={`cc-${club.id}`}
      position="relative"
      templateColumns={{ base: '1fr', lg: 'minmax(0, 13vw) minmax(0, 1fr)' }}
      pr={{ base: 5, md: 10, lg: '6vw' }}
      pl={{ base: 5, md: 10, lg: 0 }}
      py={{ base: 20, lg: '12vh' }}
      overflow="hidden"
    >
      {/* Escudo gigante de fondo */}
      <Image
        className="cc-watermark"
        src={crest}
        alt=""
        aria-hidden="true"
        position="absolute"
        right={{ base: '-30%', lg: '-6vw' }}
        top={{ base: 'auto', lg: '6vh' }}
        bottom={{ base: '30%', lg: 'auto' }}
        h={{ base: '60vh', lg: '90vh' }}
        w="auto"
        opacity={0.07}
        filter="grayscale(1)"
        pointerEvents="none"
      />

      {/* ── Riel de fechas ── */}
      <Box position="relative">
        <Flex
          position={{ base: 'relative', lg: 'sticky' }}
          top={{ lg: '14vh' }}
          direction={{ base: 'row', lg: 'column' }}
          wrap={{ base: 'wrap', lg: 'nowrap' }}
          align="center"
          justify={{ base: 'flex-start', lg: 'flex-start' }}
          gap={{ base: '8px 12px', lg: '14px' }}
          textAlign="center"
          pl={{ lg: '2vw' }}
          mb={{ base: 5, lg: 0 }}
        >
          <Text fontFamily="heading" fontSize={{ base: '24px', lg: 'clamp(22px, 2vw, 34px)' }} lineHeight={1}>{from}</Text>
          <Text fontFamily="mono" fontSize="14px" color="brand.gray" letterSpacing="0.1em">{between}</Text>
          <Box position="relative" w={{ base: '40px', lg: '1px' }} h={{ base: '1px', lg: '26vh' }} bg="brand.linea">
            <Box className="cc-rail-fill" position="absolute" inset={0} bg={accent}
              transformOrigin={{ base: 'left', lg: 'top' }} transform="scale(0)" />
          </Box>
          <Text fontFamily="heading" fontSize={{ base: '24px', lg: 'clamp(22px, 2vw, 34px)' }} lineHeight={1}>{to}</Text>
          <Text
            fontFamily="mono" fontWeight="600" fontSize="14px" letterSpacing="0.08em" color="brand.celeste"
            w={{ base: '100%', lg: 'auto' }} textAlign={{ base: 'left', lg: 'center' }} mt={{ lg: 2 }}
            sx={{ '@media (min-width: 62em)': { writingMode: 'vertical-rl', transform: 'rotate(180deg)' } }}
          >
            {role}
          </Text>
        </Flex>
      </Box>

      {/* ── Contenido ── */}
      <Box minW={0} position="relative">
        <Text
          as="h3"
          id={`cc-${club.id}`}
          className="cc-title"
          fontFamily="heading"
          fontWeight="400"
          fontSize={{ base: '58px', md: '84px', lg: 'clamp(64px, 8vw, 140px)' }}
          lineHeight={0.9}
          letterSpacing="0.01em"
          color="transparent"
          sx={{ WebkitTextStroke: '1.5px var(--chakra-colors-brand-bone)' }}
        >
          {titleOutline}{' '}
          <Box as="span" color="brand.bone" sx={{ WebkitTextStroke: '0' }}>{titleSolid}</Box>
        </Text>

        {/* Escudo + totales */}
        <Flex
          align={{ base: tagline ? 'flex-start' : 'center', md: 'center' }}
          direction={{ base: tagline ? 'column' : 'row', md: 'row' }}
          gap={{ base: 5, lg: '3vw' }}
          my={{ base: 8, lg: '5vh' }}
          py={{ base: 6, lg: '4vh' }}
          borderY="1px solid"
          borderColor="brand.linea"
        >
          <Image src={crest} alt={crestAlt} h={{ base: '80px', lg: 'clamp(90px, 13vh, 140px)' }} w="auto"
            filter="drop-shadow(0 0 22px rgba(76,184,242,0.3))" />
          {totals && (
            <Text fontFamily="heading" fontSize={{ base: '32px', md: '44px', lg: 'clamp(36px, 3.6vw, 60px)' }}
              lineHeight={0.95} color="brand.bone" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              <Box as="span" color={accent} data-to={totals.matches}>{totals.matches}</Box> PARTIDOS{' '}
              <Box as="span" color="brand.gray">|</Box>{' '}
              <Box as="span" color={accent} data-to={totals.titles}>{totals.titles}</Box> TITULOS
            </Text>
          )}
          {tagline && (
            <Text
              bg={accent}
              color="brand.ink"
              fontFamily="mono"
              fontWeight="700"
              fontSize={{ base: '16px', lg: 'clamp(16px, 1.4vw, 22px)' }}
              letterSpacing="0.04em"
              lineHeight={1.2}
              px={{ base: 4, lg: 5 }}
              py={3}
              maxW="58ch"
            >
              {tagline}
            </Text>
          )}
        </Flex>

        {/* Funciones | Logros */}
        {functions && (
        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 7fr) minmax(0, 5fr)' }} gap={{ base: 14, xl: '5vw' }}>
          <Box>
            <SubTitle>FUNCIONES</SubTitle>
            <Box as="ul" className="cc-fn-list" listStyleType="none" m={0} p={0}>
              {functions.map((segs, i) => (
                <Grid
                  as="li"
                  key={i}
                  className="cc-fn"
                  templateColumns="20px minmax(0,1fr)"
                  gap="10px"
                  py={{ base: 3, lg: '1.6vh' }}
                  borderBottom="1px solid"
                  borderColor="brand.linea"
                >
                  <Box boxSize="9px" mt="0.55em" border="1px solid" borderColor={accent} transform="rotate(45deg)" />
                  <Text fontSize={{ base: '16px', lg: 'clamp(15px, 1.15vw, 19px)' }} lineHeight={1.45} color="brand.bone">
                    <Segs segs={segs} accent={accent} />
                  </Text>
                </Grid>
              ))}
            </Box>
          </Box>

          <Box>
            <SubTitle>LOGROS</SubTitle>
            <Grid className="cc-trophies" templateColumns="repeat(2, minmax(0,1fr))" gap={{ base: 6, lg: '3vh 1vw' }}>
              {trophies.map((t) => (
                <Flex key={t.name} className="cc-trophy" direction="column" align="center" gap={1.5}>
                  <Image src={t.img} alt={`Trofeo ${t.name}`} h={{ base: '110px', lg: 'clamp(90px, 13vh, 130px)' }} w="auto"
                    filter="drop-shadow(0 12px 18px rgba(0,0,0,0.5))" />
                  <Text fontFamily="heading" fontSize="38px" lineHeight={0.85} color={accent}>
                    <Box as="span" fontFamily="mono" fontWeight="700" fontSize="0.72em">x</Box>{t.count}
                  </Text>
                  <Text fontFamily="mono" fontWeight="600" fontSize="13px" letterSpacing="0.04em" color="brand.gray" textAlign="center">
                    {t.name}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Grid>
        )}

        {/* Logros a lo ancho, al pie de Funciones | Logros */}
        {achievements && (
          <Grid
            as="ul"
            className="cc-achs"
            listStyleType="none"
            m={0}
            mt={{ base: 10, lg: '6vh' }}
            p={0}
            templateColumns={{ base: 'repeat(2, minmax(0,1fr))', lg: `repeat(${achievements.length}, minmax(0,1fr))` }}
            borderTop="1px solid"
            borderLeft="1px solid"
            borderColor="brand.linea"
          >
            {achievements.map((segs, i) => (
              <Flex
                as="li"
                key={i}
                className="cc-ach"
                direction="column"
                align="center"
                justify="center"
                gap={2}
                textAlign="center"
                bg="brand.ink"
                borderRight="1px solid"
                borderBottom="1px solid"
                borderColor="brand.linea"
                px={{ base: 3, lg: 4 }}
                py={{ base: 5, lg: '3vh' }}
              >
                <Box boxSize="8px" borderRadius="full" bg={accent} boxShadow={`0 0 0 3px ${accent}26`} />
                <Text fontSize={{ base: '15px', lg: 'clamp(14px, 1.05vw, 17px)' }} lineHeight={1.35} color="brand.bone" sx={{ textWrap: 'balance' }}>
                  <Segs segs={segs} accent={accent} />
                </Text>
              </Flex>
            ))}
          </Grid>
        )}

        {/* Párrafos + foto fija */}
        {paragraphs && (
          <Grid
            templateColumns={{ base: '1fr', lg: 'minmax(0, 7fr) minmax(0, 4fr)' }}
            gap={{ base: 10, lg: '5vw' }}
            alignItems="start"
          >
            <Box as="ul" className="cc-par-list" listStyleType="none" m={0} p={0}>
              {paragraphs.map((segs, i) => (
                <Grid
                  as="li"
                  key={i}
                  className="cc-par"
                  templateColumns="20px minmax(0,1fr)"
                  gap="10px"
                  py={{ base: 4, lg: '2vh' }}
                  borderBottom="1px solid"
                  borderColor="brand.linea"
                >
                  <Box boxSize="9px" mt="0.6em" border="1px solid" borderColor={accent} transform="rotate(45deg)" />
                  <Text fontSize={{ base: '16px', lg: 'clamp(15px, 1.2vw, 19px)' }} lineHeight={1.55} color="brand.gray" sx={{ textWrap: 'pretty' }}>
                    <Segs segs={segs} accent={accent} />
                  </Text>
                </Grid>
              ))}
            </Box>
            {paragraphsPhoto && (
              <Box
                position={{ base: 'relative', lg: 'sticky' }}
                top={{ lg: '14vh' }}
                maxW={{ base: '320px', lg: 'none' }}
                borderTopRightRadius="46px"
                overflow="hidden"
              >
                <Image className="cc-reveal" src={paragraphsPhoto.src} alt={paragraphsPhoto.alt} w="100%" h="auto" display="block" />
              </Box>
            )}
          </Grid>
        )}

        {/* Responsabilidades */}
        {responsibilities && (
          <Box mt={{ base: 16, lg: '10vh' }}>
            <SubTitle>{responsibilities.title}</SubTitle>
            <Grid as="ul" className="cc-resp-list" listStyleType="none" m={0} p={0}
              templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap="10px">
              {responsibilities.items.map((item, i, arr) => (
                <Flex
                  as="li"
                  key={i}
                  className="cc-resp"
                  align="stretch"
                  gap={4}
                  gridColumn={{ md: i === arr.length - 1 && arr.length % 2 ? '1 / -1' : 'auto' }}
                  border="1px solid"
                  borderColor="brand.linea"
                  bg="rgba(11,17,24,0.7)"
                  pr={5}
                >
                  <Box w="4px" flex="0 0 auto" bg={accent} />
                  <Text py={3.5} fontFamily="mono" fontWeight="600" fontSize={{ base: '17px', lg: 'clamp(16px, 1.25vw, 20px)' }}
                    letterSpacing="0.02em" color="brand.bone" lineHeight={1.25}>
                    {item}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Box>
        )}

        {/* Sistemas tácticos */}
        {tactics && (
          <Box mt={{ base: 16, lg: '10vh' }}>
            <SubTitle>{tactics.title}</SubTitle>
            <TacticsBoards tactics={tactics} />
          </Box>
        )}

        {/* Rendimiento del equipo + Rachas */}
        {performance && (
          <Grid
            templateColumns={{ base: '1fr', lg: 'minmax(0, 5fr) minmax(0, 7fr)' }}
            gap={{ base: 10, lg: '4vw' }}
            mt={{ base: 16, lg: '12vh' }}
            alignItems="start"
          >
            <Box position="relative" maxW={{ base: '420px', lg: 'none' }}>
              <Box position="absolute" top={0} left={0} right="12%" h="1px" bg="brand.celeste" zIndex={1} />
              <Box position="absolute" top="-3.5px" right="12%" mr="-4px" boxSize="8px" borderRadius="full"
                bg="brand.celeste" boxShadow="0 0 10px rgba(76,184,242,0.7)" zIndex={1} />
              <Image
                className="cc-reveal"
                src={performance.photo}
                alt={performance.photoAlt}
                w="100%"
                h="auto"
                display="block"
                sx={{
                  maskImage: 'linear-gradient(180deg, #000 70%, transparent)',
                  WebkitMaskImage: 'linear-gradient(180deg, #000 70%, transparent)',
                  aspectRatio: '684 / 1056',
                  objectFit: 'cover',
                }}
              />
            </Box>

            <Box>
              <SubTitle>{performance.title}</SubTitle>
              <Box as="ul" className="cc-perf-list" listStyleType="none" m={0} p={0} mb={{ base: 12, lg: '7vh' }}>
                {performance.items.map((segs, i) => (
                  <Flex
                    as="li"
                    key={i}
                    className="cc-perf"
                    gap={4}
                    align="flex-start"
                    py={{ base: 3, lg: '1.8vh' }}
                    borderBottom="1px solid"
                    borderColor="brand.linea"
                  >
                    <Star color={accent} />
                    <Text fontSize={{ base: '17px', lg: 'clamp(16px, 1.3vw, 21px)' }} lineHeight={1.3} color="brand.gray">
                      <Segs segs={segs} accent={accent} />
                    </Text>
                  </Flex>
                ))}
              </Box>

              {streaks && (
                <>
                  <SubTitle>{streaks.title}</SubTitle>
                  <Grid className="cc-streaks" templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap={4}>
                    {streaks.items.map((s, i) => (
                      <Flex
                        key={i}
                        className="cc-streak"
                        align="stretch"
                        border="1px solid"
                        borderColor="brand.linea"
                        bg="rgba(11,17,24,0.7)"
                      >
                        <Text
                          flex={1}
                          alignSelf="center"
                          px={{ base: 4, lg: 5 }}
                          py={4}
                          fontFamily="mono"
                          fontWeight="700"
                          fontSize={{ base: '17px', lg: 'clamp(15px, 1.2vw, 20px)' }}
                          lineHeight={1.15}
                          letterSpacing="0.03em"
                          color="brand.bone"
                        >
                          <Segs segs={s.text} accent={accent} />
                        </Text>
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          bg={accent}
                          color="white"
                          px={{ base: 4, lg: 5 }}
                          minW={{ base: '104px', lg: '118px' }}
                        >
                          <Text fontFamily="heading" fontSize={{ base: '62px', lg: '72px' }} lineHeight={0.85}
                            sx={{ fontVariantNumeric: 'tabular-nums' }} data-to={s.value}>
                            {s.value}
                          </Text>
                          <Text fontFamily="mono" fontWeight="600" fontSize="12px" letterSpacing="0.08em">{s.unit}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          </Grid>
        )}
      </Box>
    </Grid>
  )
}
