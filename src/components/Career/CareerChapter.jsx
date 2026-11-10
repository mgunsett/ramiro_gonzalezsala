import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CareerCompact from './CareerCompact'
import { TXT, Segs, SubTitle, Diamond, StarCard, ChapterPhoto } from './careerParts'
import { useT } from '../../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function CareerChapter({ club }) {
  const ref = useRef(null)
  const t = useT()
  const {
    accent, titleOutline, titleSolid, roleParts, from, to, crest, crestAlt, totals, tagline,
    motto, board, dayToDay, interim, results, compact,
  } = club
  const stackDash = Boolean(tagline || motto)
  // Atlético: en escritorio todo se dimensiona con vh para entrar bajo el navbar (76px)
  const fit = !compact
  // Subtítulos de "Rendimiento y formación" más compactos (solo existe en Atlético)
  const subTitleFit = {
    fontSize: { base: '30px', lg: 'clamp(24px, min(2.2vw, 4.2vh), 40px)' },
    mb: { base: 5, lg: '2.2vh' },
  }

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)

      // Línea entre fechas
      gsap.to(q('.cc-dates-fill'), {
        scaleX: 1, duration: reduce ? 0 : 1.1, ease: 'power2.inOut', delay: reduce ? 0 : 0.3,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })

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

      // Contadores (totales, rendimiento y formación)
      if (!reduce) {
        q('[data-to]').forEach((el) => {
          const end = Number(el.dataset.to)
          const prefix = el.dataset.prefix || ''
          const suffix = el.dataset.suffix || ''
          const o = { v: 0 }
          gsap.to(o, {
            v: end, duration: 1.6, ease: 'power2.out',
            onUpdate: () => { el.textContent = prefix + Math.round(o.v) + suffix },
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })
      }

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
          x: 0, y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: q(trigger)[0], start },
        })
      }
      stagger('.cc-chip, .cc-interim', { y: 14, opacity: 0 }, '.cc-extra', 'top 90%')
      stagger('.cc-star', { x: -20, opacity: 0 }, '.cc-stars')
      q('.cc-res-list').forEach((list) => {
        gsap.fromTo(list.children, { x: -14, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: list, start: 'top 85%' },
        })
      })
      q('.cc-chapter-photo .cc-reveal').forEach((img) => {
        gsap.fromTo(img, { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: img, start: 'top 85%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      as="article"
      ref={ref}
      aria-labelledby={`cc-${club.id}`}
      position="relative"
      px={{ base: 5, md: 10, lg: '9vw' }}
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

      <Box minW={0} position="relative">
        {/* Fechas */}
        <Flex align="center" gap={{ base: 3, lg: '14px' }} mb={{ base: 4, lg: fit ? '1.4vh' : '14px' }} fontFamily="heading"
          fontSize={{ base: '22px', lg: fit ? 'clamp(18px, min(1.9vw, 3.2vh), 30px)' : 'clamp(20px, 1.9vw, 30px)' }} lineHeight={1}>
          <Text as="span">{from}</Text>
          <Box position="relative" w={{ base: '48px', lg: 'clamp(40px, 8vw, 120px)' }} h="1px" bg="brand.linea"
            role="img" aria-label={t(TXT.until)}>
            <Box className="cc-dates-fill" position="absolute" inset={0} bg={accent} transformOrigin="left" transform="scaleX(0)" />
          </Box>
          <Text as="span" color={accent}>{to}</Text>
        </Flex>

        <Text
          as="h3"
          id={`cc-${club.id}`}
          className="cc-title"
          fontFamily="heading"
          fontWeight="400"
          fontSize={{ base: '58px', md: '84px', lg: fit ? 'clamp(56px, min(8vw, 13vh), 140px)' : 'clamp(64px, 8vw, 140px)' }}
          lineHeight={0.9}
          letterSpacing="0.01em"
          color="transparent"
          sx={{ WebkitTextStroke: '1.5px var(--chakra-colors-brand-bone)' }}
        >
          {titleOutline}{' '}
          <Box as="span" color="brand.bone" sx={{ WebkitTextStroke: '0' }}>{titleSolid}</Box>
        </Text>

        {/* Puesto destacado bajo el título */}
        <Flex className="cc-role" display="inline-flex" align="stretch" border="1px solid" borderColor={accent} mt={{ base: 4, lg: fit ? '1.8vh' : '18px' }}>
          {roleParts.map((part, i) => (
            <Text key={i} as="span" fontFamily="heading" fontSize={{ base: '21px', md: '26px', lg: fit ? 'clamp(18px, min(2.2vw, 3.6vh), 36px)' : 'clamp(22px, 2.2vw, 36px)' }}
              letterSpacing="0.06em" lineHeight={1} whiteSpace="nowrap" px={{ base: '11px', lg: 4 }} pt={{ base: '8px', lg: '10px' }} pb={{ base: '6px', lg: '7px' }}
              bg={i === 0 ? accent : 'transparent'} color={i === 0 ? club.roleInk || 'brand.ink' : 'brand.bone'}>
              {part}
            </Text>
          ))}
        </Flex>

        {/* Escudo + totales / lema */}
        <Flex
          align={{ base: stackDash ? 'flex-start' : 'center', md: 'center' }}
          direction={{ base: stackDash ? 'column' : 'row', md: 'row' }}
          gap={{ base: 5, lg: '3vw' }}
          my={{ base: 8, lg: fit ? '3vh' : '5vh' }}
          py={{ base: 6, lg: fit ? '2.4vh' : '4vh' }}
          borderY="1px solid"
          borderColor="brand.linea"
        >
          <Image src={crest} alt={crestAlt} h={{ base: '76px', lg: fit ? 'clamp(70px, 11vh, 140px)' : 'clamp(90px, 13vh, 140px)' }} w="auto"
            filter={`drop-shadow(0 0 22px ${accent}4D)`} />
          {totals && (
            <Text fontFamily="heading" fontSize={{ base: '28px', sm: '34px', md: '44px', lg: 'clamp(36px, 3.6vw, 60px)' }}
              lineHeight={0.95} color="brand.bone" whiteSpace="nowrap" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              <Box as="span" color={accent} data-to={totals.matches}>{totals.matches}</Box> {t(TXT.matches)}{' '}
              <Box as="span" color="brand.gray">|</Box>{' '}
              <Box as="span" color={accent} data-to={totals.titles}>{totals.titles}</Box> {t(TXT.titles)}
            </Text>
          )}
          {tagline && (
            <Text bg={accent} color="brand.ink" fontFamily="mono" fontWeight="700" fontSize={{ base: '16px', lg: 'clamp(16px, 1.4vw, 22px)' }}
              letterSpacing="0.04em" lineHeight={1.2} px={{ base: 4, lg: 5 }} py={3} maxW="58ch">
              {tagline}
            </Text>
          )}
          {motto && (
            <Text fontFamily="heading" fontSize={{ base: '36px', md: '44px', lg: fit ? 'clamp(28px, min(3.4vw, 5.6vh), 58px)' : 'clamp(30px, 3.4vw, 58px)' }}
              lineHeight={0.95} letterSpacing="0.02em" color="brand.bone">
              {motto[0]}<br />
              <Box as="span" color={accent}>{motto[1]}</Box>
            </Text>
          )}
        </Flex>

        {/* JDT: colapso parcial (escritorio) / acordeón total (móvil) */}
        {compact && <CareerCompact club={club} />}

        {/* El proyecto | Idea de juego · pizarra con línea de nodos */}
        {board && (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap={{ base: 12, md: '4vw' }}>
            {board.map((col, ci) => (
              <Box key={ci} className="cc-board-col" position="relative" pl="30px">
                <Box position="absolute" left="4px" top={{ base: '50px', lg: '58px' }} bottom="8px" w="1px" bg="brand.linea" />
                <Box className="cc-board-fill" position="absolute" left="4px" top={{ base: '50px', lg: '58px' }} bottom="8px" w="1px"
                  bg={accent} transformOrigin="top" transform="scaleY(0)" />
                <Text as="h4" display="inline-block" ml="-30px" mb={{ base: 5, lg: fit ? '2vh' : '2.6vh' }} bg={accent} color="brand.ink"
                  fontFamily="heading" fontWeight="400" fontSize={{ base: '26px', lg: fit ? 'clamp(20px, min(2.1vw, 3.6vh), 34px)' : 'clamp(24px, 2.1vw, 34px)' }}
                  letterSpacing="0.06em" lineHeight={1} px={4} pt="9px" pb="6px">
                  {col.title}
                </Text>
                <Flex as="ul" direction="column" gap={{ base: 5, lg: fit ? '1.6vh' : '2.4vh' }} listStyleType="none" m={0} p={0}>
                  {col.items.map((segs, i) => (
                    <Box as="li" key={i} className="cc-node" position="relative"
                      sx={{ '&.is-on .cc-node-dot': { bg: accent, borderColor: accent, boxShadow: `0 0 0 4px ${accent}29, 0 0 12px ${accent}99` } }}>
                      <Box className="cc-node-dot" position="absolute" left="-30px" top="0.5em" boxSize="9px" borderRadius="full"
                        bg="brand.ink" border="1px solid" borderColor="rgba(120,190,235,0.6)"
                        transition="background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease" />
                      <Text fontSize={{ base: '17px', lg: fit ? 'clamp(14px, min(1.2vw, 2.1vh), 20px)' : 'clamp(15px, 1.25vw, 20px)' }}
                        lineHeight={fit ? 1.45 : 1.5} color="brand.gray" sx={{ textWrap: 'pretty' }}>
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
          <Grid className="cc-extra" templateColumns={{ base: '1fr', lg: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap="12px" mt={{ base: 12, lg: fit ? '3.5vh' : '6vh' }}>
            {dayToDay && (
              <Box position="relative" border="1px solid" borderColor="brand.linea" bg="rgba(11,17,24,0.7)"
                px={{ base: '18px', lg: '2vw' }} py={{ base: '18px', lg: fit ? '2vh' : '2.6vh' }}
                _before={{ content: '""', position: 'absolute', left: '-1px', top: '-1px', bottom: '-1px', w: '3px', bg: accent }}>
                <Text fontFamily="mono" fontWeight="700" fontSize="13px" letterSpacing="0.14em" color={accent} mb={2.5}>{dayToDay.label}</Text>
                <Flex as="ul" wrap="wrap" gap={2} listStyleType="none" m={0} p={0}>
                  {dayToDay.items.map((chip) => (
                    <Box as="li" key={chip} className="cc-chip" px={3} py="6px" border="1px solid" borderColor="brand.linea" borderRadius="full"
                      fontFamily="mono" fontWeight="600" fontSize={{ base: '15px', lg: fit ? 'clamp(13px, min(1.15vw, 1.9vh), 17px)' : 'clamp(14px, 1.15vw, 17px)' }} lineHeight={1.2} color="brand.bone">
                      {chip}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
            {interim && (
              <Flex className="cc-interim" direction="column" justify="center" position="relative" border="1px solid" borderColor="brand.linea"
                px={{ base: '18px', lg: '2vw' }} py={{ base: '18px', lg: fit ? '2vh' : '2.6vh' }}
                sx={{ background: `linear-gradient(120deg, ${accent}29, rgba(11,17,24,0.7) 60%)` }}
                _before={{ content: '""', position: 'absolute', left: '-1px', top: '-1px', bottom: '-1px', w: '3px', bg: accent }}>
                <Text fontFamily="heading" fontSize={{ base: '28px', lg: fit ? 'clamp(22px, min(2.4vw, 4vh), 38px)' : 'clamp(26px, 2.4vw, 38px)' }} lineHeight={1} letterSpacing="0.03em" color="brand.bone">
                  {interim.map((s, i) => <Box as="span" key={i} color={s.hl ? accent : undefined}>{s.t}</Box>)}
                </Text>
              </Flex>
            )}
          </Grid>
        )}

        {/* Rendimiento y formación */}
        {results && (
          <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 4fr) minmax(0, 7fr)' }} gap={{ base: 10, lg: '4vw' }}
            mt={{ base: 16, lg: '12vh' }} alignItems={{ base: 'start', lg: 'stretch' }}>
            <ChapterPhoto className="cc-chapter-photo" src={results.photo} alt={results.photoAlt} accent={accent} fill
              maxW={{ base: '320px', lg: 'none' }} minH={{ lg: 0 }} />

            <Box minW={0}>
              <SubTitle {...subTitleFit}>{results.title}</SubTitle>
              <Grid className="cc-stars" templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))' }} gap="10px" mb={{ base: 12, lg: '3.5vh' }}>
                {results.stars.map((s, i) => (
                  <StarCard key={i} className="cc-star" fit value={s.value} suffix={s.suffix || ''} label={s.label} accent={accent} />
                ))}
              </Grid>

              {results.lists.map((list, li) => (
                <Box key={li} mt={li ? { base: 12, lg: '3.5vh' } : 0}>
                  <SubTitle {...subTitleFit}>{list.title}</SubTitle>
                  <Box as="ul" className="cc-res-list" listStyleType="none" m={0} p={0}>
                    {list.items.map((segs, i) => (
                      <Grid as="li" key={i} templateColumns="20px minmax(0,1fr)" gap="10px" py={{ base: 3.5, lg: '1.1vh' }}
                        borderBottom="1px solid" borderColor="brand.linea">
                        <Diamond accent={accent} />
                        <Text fontSize={{ base: '16px', lg: 'clamp(14px, min(1.15vw, 2vh), 18px)' }} lineHeight={1.4} color="brand.gray" sx={{ textWrap: 'pretty' }}>
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
      </Box>
    </Box>
  )
}
