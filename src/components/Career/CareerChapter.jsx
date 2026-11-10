import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const TXT = {
  matches: { es: 'PARTIDOS', en: 'MATCHES', it: 'PARTITE' },
  titles: { es: 'TITULOS', en: 'TITLES', it: 'TITOLI' },
  functions: { es: 'FUNCIONES', en: 'ROLE', it: 'FUNZIONI' },
  trophies: { es: 'LOGROS', en: 'HONOURS', it: 'TROFEI' },
  trophy: { es: 'Trofeo', en: 'Trophy', it: 'Trofeo' },
}

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

const GOLD = '#C9A45C'

function Star({ color, size = '16px', mt = '0.35em' }) {
  return (
    <Box as="svg" viewBox="0 0 24 24" boxSize={size} flex="0 0 auto" mt={mt} aria-hidden="true">
      <path fill={color} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" />
    </Box>
  )
}

export default function CareerChapter({ club }) {
  const ref = useRef(null)
  const t = useT()
  const {
    accent, titleOutline, titleSolid, role, roleParts, from, to, between, crest, crestAlt, totals, tagline,
    motto, board, dayToDay, interim, results,
    functions, trophies, achievements, performance, streaks,
  } = club
  // Cabecera horizontal (fechas arriba + puesto bajo el título) vs. riel vertical de fechas
  const horizontal = Boolean(roleParts)
  const stackDash = Boolean(tagline || motto)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      // Riel de fechas: se llena a lo largo del capítulo
      if (q('.cc-rail-fill').length) {
        gsap.fromTo(q('.cc-rail-fill'), { scale: 0 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 60%', end: 'bottom 70%', scrub: 0.6 },
        })
      }
      // Línea entre fechas (cabecera horizontal)
      if (q('.cc-dates-fill').length) {
        gsap.to(q('.cc-dates-fill'), {
          scaleX: 1, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', delay: reduce ? 0 : 0.3,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        })
      }
      // Pizarra: la línea se llena y los nodos se encienden al pasar
      q('.cc-board-col').forEach((col) => {
        gsap.fromTo(col.querySelector('.cc-board-fill'), { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: col, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        })
        col.querySelectorAll('.cc-node').forEach((li) => {
          ScrollTrigger.create({ trigger: li, start: 'top 72%', toggleClass: { targets: li, className: 'is-on' } })
        })
      })

      // Contadores (totales, rendimiento, rachas)
      gsap.utils.toArray('[data-to]').forEach((el) => {
        const to = Number(el.dataset.to)
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        if (reduce) return
        const o = { v: 0 }
        gsap.to(o, {
          v: to, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = prefix + Math.round(o.v) + suffix },
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      if (reduce) return

      gsap.fromTo(q('.cc-title, .cc-role'), { yPercent: 30, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.to(q('.cc-watermark'), {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
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
      stagger('.cc-chip, .cc-interim', { y: 14, opacity: 0 }, '.cc-extra', 'top 90%')
      stagger('.cc-star', { x: -20, opacity: 0 }, '.cc-stars')
      q('.cc-res-list').forEach((list) => {
        gsap.fromTo(list.children, { x: -14, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: list, start: 'top 85%' },
        })
      })
      // Fotos: aparecen desde abajo
      q('.cc-reveal').forEach((img) => {
        gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: img, start: 'top 85%' },
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
      templateColumns={{ base: '1fr', lg: horizontal ? '1fr' : 'minmax(0, 13vw) minmax(0, 1fr)' }}
      pr={{ base: 5, md: 10, lg: '6vw' }}
      pl={{ base: 5, md: 10, lg: horizontal ? '6vw' : 0 }}
      py={{ base: 20, lg: '12vh' }}
      overflow="hidden"
    >
      {/* Escudo gigante de fondo */}
      <Image loading="lazy" decoding="async"
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

      {/* ── Riel de fechas (vertical) ── */}
      {!horizontal && (
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
      )}

      {/* ── Contenido ── */}
      <Box minW={0} position="relative">
        {/* Fechas en línea (cabecera horizontal) */}
        {horizontal && (
          <Flex align="center" gap={{ base: 3, lg: '14px' }} mb={{ base: 4, lg: '14px' }} fontFamily="heading"
            fontSize={{ base: '22px', lg: 'clamp(20px, 1.9vw, 30px)' }} lineHeight={1}>
            <Text as="span">{from}</Text>
            <Box position="relative" w={{ base: '48px', lg: 'clamp(40px, 8vw, 120px)' }} h="1px" bg="brand.linea" aria-hidden="true">
              <Box className="cc-dates-fill" position="absolute" inset={0} bg={accent} transformOrigin="left" transform="scaleX(0)" />
            </Box>
            <Text as="span" color={accent}>{to}</Text>
          </Flex>
        )}
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

        {/* Puesto destacado bajo el título */}
        {horizontal && (
          <Flex className="cc-role" display="inline-flex" align="stretch" border="1px solid" borderColor={accent} mt={{ base: 4, lg: '18px' }}>
            {roleParts.map((part, i) => (
              <Text key={i} as="span" fontFamily="heading" fontSize={{ base: '21px', md: '26px', lg: 'clamp(22px, 2.2vw, 36px)' }}
                letterSpacing="0.06em" lineHeight={1} whiteSpace="nowrap" px={{ base: '11px', lg: 4 }} pt={{ base: '8px', lg: '10px' }} pb={{ base: '6px', lg: '7px' }}
                bg={i === 0 ? accent : 'transparent'} color={i === 0 ? 'brand.ink' : 'brand.bone'}>
                {part}
              </Text>
            ))}
          </Flex>
        )}

        {/* Escudo + totales */}
        <Flex
          align={{ base: stackDash ? 'flex-start' : 'center', md: 'center' }}
          direction={{ base: stackDash ? 'column' : 'row', md: 'row' }}
          gap={{ base: 5, lg: '3vw' }}
          my={{ base: 8, lg: '5vh' }}
          py={{ base: 6, lg: '4vh' }}
          borderY="1px solid"
          borderColor="brand.linea"
        >
          <Image loading="lazy" decoding="async" src={crest} alt={crestAlt} h={{ base: '80px', lg: 'clamp(90px, 13vh, 140px)' }} w="auto"
            filter="drop-shadow(0 0 22px rgba(76,184,242,0.3))" />
          {totals && (
            <Text fontFamily="heading" fontSize={{ base: '32px', md: '44px', lg: 'clamp(36px, 3.6vw, 60px)' }}
              lineHeight={0.95} color="brand.bone" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              <Box as="span" color={accent} data-to={totals.matches}>{totals.matches}</Box> {t(TXT.matches)}{' '}
              <Box as="span" color="brand.gray">|</Box>{' '}
              <Box as="span" color={accent} data-to={totals.titles}>{totals.titles}</Box> {t(TXT.titles)}
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
          {motto && (
            <Text fontFamily="heading" fontSize={{ base: '36px', md: '44px', lg: 'clamp(30px, 3.4vw, 58px)' }}
              lineHeight={0.95} letterSpacing="0.02em" color="brand.bone">
              {motto[0]}<br />
              <Box as="span" color={accent}>{motto[1]}</Box>
            </Text>
          )}
        </Flex>

        {/* El proyecto | Idea de juego · pizarra con línea de nodos */}
        {board && (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap={{ base: 12, md: '4vw' }}>
            {board.map((col, ci) => (
              <Box key={ci} className="cc-board-col" position="relative" pl="30px">
                <Box position="absolute" left="4px" top={{ base: '50px', lg: '58px' }} bottom="8px" w="1px" bg="brand.linea" />
                <Box className="cc-board-fill" position="absolute" left="4px" top={{ base: '50px', lg: '58px' }} bottom="8px" w="1px"
                  bg={accent} transformOrigin="top" transform="scaleY(0)" />
                <Text as="h4" display="inline-block" ml="-30px" mb={{ base: 5, lg: '2.6vh' }} bg={accent} color="brand.ink"
                  fontFamily="heading" fontWeight="400" fontSize={{ base: '26px', lg: 'clamp(24px, 2.1vw, 34px)' }}
                  letterSpacing="0.06em" lineHeight={1} px={4} pt="9px" pb="6px">
                  {col.title}
                </Text>
                <Flex as="ul" direction="column" gap={{ base: 5, lg: '2.4vh' }} listStyleType="none" m={0} p={0}>
                  {col.items.map((segs, i) => (
                    <Box as="li" key={i} className="cc-node" position="relative"
                      sx={{ '&.is-on .cc-node-dot': { bg: accent, borderColor: accent, boxShadow: `0 0 0 4px ${accent}29, 0 0 12px ${accent}99` } }}>
                      <Box className="cc-node-dot" position="absolute" left="-30px" top="0.5em" boxSize="9px" borderRadius="full"
                        bg="brand.ink" border="1px solid" borderColor="rgba(120,190,235,0.6)"
                        transition="background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease" />
                      <Text fontSize={{ base: '17px', lg: 'clamp(15px, 1.25vw, 20px)' }} lineHeight={1.5} color="brand.gray" sx={{ textWrap: 'pretty' }}>
                        <Segs segs={segs} accent={accent} />
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Grid>
        )}

        {/* Día a día + DT interino */}
        {(dayToDay || interim) && (
          <Grid className="cc-extra" templateColumns={{ base: '1fr', lg: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap="12px" mt={{ base: 12, lg: '6vh' }}>
            {dayToDay && (
              <Box position="relative" border="1px solid" borderColor="brand.linea" bg="rgba(11,17,24,0.7)"
                px={{ base: '18px', lg: '2vw' }} py={{ base: '18px', lg: '2.6vh' }}
                _before={{ content: '""', position: 'absolute', left: '-1px', top: '-1px', bottom: '-1px', w: '3px', bg: accent }}>
                <Text fontFamily="mono" fontWeight="700" fontSize="13px" letterSpacing="0.14em" color={accent} mb={2.5}>{dayToDay.label}</Text>
                <Flex as="ul" wrap="wrap" gap={2} listStyleType="none" m={0} p={0}>
                  {dayToDay.items.map((chip) => (
                    <Box as="li" key={chip} className="cc-chip" px={3} py="6px" border="1px solid" borderColor="brand.linea" borderRadius="full"
                      fontFamily="mono" fontWeight="600" fontSize={{ base: '15px', lg: 'clamp(14px, 1.15vw, 17px)' }} lineHeight={1.2} color="brand.bone">
                      {chip}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
            {interim && (
              <Flex className="cc-interim" direction="column" justify="center" position="relative" border="1px solid" borderColor="brand.linea"
                px={{ base: '18px', lg: '2vw' }} py={{ base: '18px', lg: '2.6vh' }}
                sx={{ background: `linear-gradient(120deg, ${accent}29, rgba(11,17,24,0.7) 60%)` }}
                _before={{ content: '""', position: 'absolute', left: '-1px', top: '-1px', bottom: '-1px', w: '3px', bg: accent }}>
                <Text fontFamily="heading" fontSize={{ base: '28px', lg: 'clamp(26px, 2.4vw, 38px)' }} lineHeight={1} letterSpacing="0.03em" color="brand.bone">
                  {interim.map((s, i) => <Box as="span" key={i} color={s.hl ? accent : undefined}>{s.t}</Box>)}
                </Text>
              </Flex>
            )}
          </Grid>
        )}

        {/* Funciones | Logros */}
        {functions && (
        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 7fr) minmax(0, 5fr)' }} gap={{ base: 14, xl: '5vw' }}>
          <Box>
            <SubTitle>{t(TXT.functions)}</SubTitle>
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
            <SubTitle>{t(TXT.trophies)}</SubTitle>
            <Grid className="cc-trophies" templateColumns="repeat(2, minmax(0,1fr))" gap={{ base: 6, lg: '3vh 1vw' }}>
              {trophies.map((tr) => (
                <Flex key={tr.name} className="cc-trophy" direction="column" align="center" gap={1.5}>
                  <Image loading="lazy" decoding="async" src={tr.img} alt={`${t(TXT.trophy)} ${tr.name}`} h={{ base: '110px', lg: 'clamp(90px, 13vh, 130px)' }} w="auto"
                    filter="drop-shadow(0 12px 18px rgba(0,0,0,0.5))" />
                  <Text fontFamily="heading" fontSize="38px" lineHeight={0.85} color={accent}>
                    <Box as="span" fontFamily="mono" fontWeight="700" fontSize="0.72em">x</Box>{tr.count}
                  </Text>
                  <Text fontFamily="mono" fontWeight="600" fontSize="13px" letterSpacing="0.04em" color="brand.gray" textAlign="center">
                    {tr.name}
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

        {/* Rendimiento y formación */}
        {results && (
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 4fr) minmax(0, 7fr)' }} gap={{ base: 10, lg: '4vw' }}
            mt={{ base: 16, lg: '12vh' }} alignItems="start">
            <Box position={{ base: 'relative', lg: 'sticky' }} top={{ lg: '14vh' }} maxW={{ base: '320px', lg: 'none' }}
              borderTopRightRadius="46px" overflow="hidden">
              <Box position="absolute" top={0} left={0} right="12%" h="1px" bg={accent} zIndex={1} />
              <Image loading="lazy" decoding="async" className="cc-reveal" src={results.photo} alt={results.photoAlt} w="100%" h="auto" display="block" />
            </Box>

            <Box minW={0}>
              <SubTitle>{results.title}</SubTitle>
              <Grid className="cc-stars" templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap="10px" mb={{ base: 12, lg: '6vh' }}>
                {results.stars.map((s, i) => (
                  <Flex key={i} className="cc-star" align="center" gap={{ base: 3.5, lg: 4 }}
                    px={{ base: 4, lg: '1.6vw' }} py={{ base: 3.5, lg: '2.2vh' }} border="1px solid" borderColor={`${accent}59`}
                    sx={{ background: `linear-gradient(90deg, ${accent}2E, ${accent}0A)` }}>
                    <Star color={GOLD} size="30px" mt={0} />
                    <Text fontFamily="heading" fontSize={{ base: '46px', lg: 'clamp(34px, 3.4vw, 56px)' }} lineHeight={0.85} color={accent}
                      sx={{ fontVariantNumeric: 'tabular-nums' }} data-to={s.value} data-suffix={s.suffix || ''}>
                      {s.value}{s.suffix}
                    </Text>
                    <Text fontFamily="mono" fontWeight="600" fontSize={{ base: '17px', lg: 'clamp(15px, 1.3vw, 20px)' }} lineHeight={1.15} color="brand.bone">
                      {s.label}
                    </Text>
                  </Flex>
                ))}
              </Grid>

              {results.lists.map((list, li) => (
                <Box key={li} mt={li ? { base: 12, lg: '6vh' } : 0}>
                  <SubTitle>{list.title}</SubTitle>
                  <Box as="ul" className="cc-res-list" listStyleType="none" m={0} p={0}>
                    {list.items.map((segs, i) => (
                      <Grid as="li" key={i} templateColumns="20px minmax(0,1fr)" gap="10px" py={{ base: 3.5, lg: '1.8vh' }}
                        borderBottom="1px solid" borderColor="brand.linea">
                        <Box boxSize="9px" mt="0.55em" border="1px solid" borderColor={accent} transform="rotate(45deg)" />
                        <Text fontSize={{ base: '16px', lg: 'clamp(15px, 1.25vw, 19px)' }} lineHeight={1.5} color="brand.gray" sx={{ textWrap: 'pretty' }}>
                          <Segs segs={segs} accent={accent} />
                        </Text>
                      </Grid>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
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
              <Image loading="lazy" decoding="async"
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
