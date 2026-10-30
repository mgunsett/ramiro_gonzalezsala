import { useRef, useLayoutEffect, useId } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formation } from '../../data/formationData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// FORMACIÓN · opción A "Expediente"
//  · Títulos con tilde (se "marca" al aparecer) + collage de la placa:
//    foto con la cabeza sobresaliendo del recuadro, credencial CONMEBOL
//    colgando y carta AFC.
//  · Bloques 1-2-3 (idiomas, competencias, cursos) unidos por una línea
//    que se llena con el scroll.
// ─────────────────────────────────────────────────────────────

function Check() {
  return (
    <Box as="svg" viewBox="0 0 34 34" boxSize={{ base: '30px', lg: '34px' }} flex="0 0 auto" aria-hidden="true">
      <circle cx="17" cy="17" r="15" fill="none" stroke="#4CB8F2" strokeWidth="2" />
      <path className="fm-check" d="M10 17.5l5 5 9-10" fill="none" stroke="#4CB8F2" strokeWidth="2.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  )
}

function Flag({ code }) {
  const id = useId().replace(/:/g, '')
  let svg
  if (code === 'ES') svg = (
    <svg viewBox="0 0 3 2"><rect width="3" height="2" fill="#AA151B" /><rect y=".5" width="3" height="1" fill="#F1BF00" /></svg>
  )
  else if (code === 'IT') svg = (
    <svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#009246" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#CE2B37" /></svg>
  )
  else svg = (
    <svg viewBox="0 0 60 30">
      <clipPath id={`uk-${id}`}><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" /></clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0L60,30M60,0L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0L60,30M60,0L0,30" clipPath={`url(#uk-${id})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
  return (
    <Box as="span" display="inline-block" w={{ base: '30px', lg: '36px' }} h={{ base: '20px', lg: '24px' }} borderRadius="2px"
      overflow="hidden" flex="0 0 auto" boxShadow="0 0 0 1px rgba(255,255,255,0.15)" aria-hidden="true"
      sx={{ '& svg': { display: 'block', w: '100%', h: '100%' } }}>
      {svg}
    </Box>
  )
}

function Panel({ n, title, children }) {
  return (
    <Box className="fm-panel" position="relative" border="1px solid rgba(140,200,240,0.6)" bg="rgba(11,17,24,0.6)"
      px={{ base: 4, lg: '3vw' }} py={{ base: 6, lg: '3.4vh' }}>
      <Flex position="absolute" left={{ base: '-48px', lg: '-60px' }} top="-2px" boxSize={{ base: '34px', lg: '42px' }}
        borderRadius="full" border="1.5px solid" borderColor="brand.celeste" bg="brand.ink" align="center" justify="center"
        fontFamily="heading" fontSize={{ base: '22px', lg: '26px' }} color="brand.celeste" lineHeight={1} pt="3px"
        aria-hidden="true"
        _after={{ content: '""', position: 'absolute', left: '100%', top: '50%', w: { base: '12px', lg: '18px' }, h: '1px', bg: 'brand.celeste' }}>
        {n}
      </Flex>
      <Text as="h3" fontFamily="heading" fontWeight="400" textAlign="center" letterSpacing="0.04em" lineHeight={1}
        fontSize={{ base: '32px', lg: 'clamp(34px, 3.4vw, 56px)' }} mb={{ base: 5, lg: '3vh' }}>
        {title}
      </Text>
      {children}
    </Box>
  )
}

export default function FormationSection() {
  const ref = useRef(null)
  const { title, collage, collageAlt, degrees, languages, software, courses } = formation

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      gsap.fromTo(q('.fm-fill'), { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: q('.fm-steps')[0], start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
      })
      if (reduce) return

      // Tildes que se marcan
      q('.fm-check').forEach((p) => {
        gsap.fromTo(p, { strokeDasharray: 30, strokeDashoffset: 30 }, {
          strokeDashoffset: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: p.closest('li'), start: 'top 85%' },
        })
      })
      gsap.from(q('.fm-deg'), { x: -16, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: q('.fm-degs')[0], start: 'top 85%' } })
      gsap.from(q('.fm-title > span'), { yPercent: 100, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } })

      // Collage: aparece de abajo hacia arriba y flota levemente con el scroll
      gsap.fromTo(q('.fm-collage'), { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: q('.fm-collage')[0], start: 'top 80%' },
      })
      gsap.to(q('.fm-collage'), { yPercent: -4, ease: 'none',
        scrollTrigger: { trigger: q('.fm-collage')[0], start: 'top bottom', end: 'bottom top', scrub: true } })

      q('.fm-panel').forEach((p) => gsap.from(p, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 85%' } }))
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box as="section" id="formacion" ref={ref} aria-labelledby="fm-title" bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      {/* ── Formación académica ── */}
      <Box px={{ base: 5, md: 10, lg: '6vw' }} pt={{ base: 20, lg: '12vh' }} pb={{ base: 16, lg: '10vh' }}>
        <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 6fr) minmax(0, 5fr)' }} gap={{ base: 12, lg: '5vw' }}
          alignItems="end" maxW="1400px" mx="auto">
          <Box>
            <Text as="h2" id="fm-title" className="fm-title" fontFamily="heading" fontWeight="400" lineHeight={0.88}
              letterSpacing="0.02em" fontSize={{ base: '56px', md: '80px', lg: 'clamp(72px, 7vw, 124px)' }} mb={{ base: 8, lg: '5vh' }}>
              {title.map((t) => (
                // padding arriba para que no se recorten las tildes (Ó, É) con overflow hidden
                <Box as="span" key={t} display="block" overflow="hidden" pt="0.16em" mt="-0.16em">
                  <Box as="span" display="block">{t}</Box>
                </Box>
              ))}
            </Text>

            <Box as="ul" className="fm-degs" listStyleType="none" m={0} p={0} borderTop="1px solid" borderColor="brand.linea">
              {degrees.map((d) => (
                <Flex as="li" key={d.title} className="fm-deg" align="center" justify="space-between" gap={5}
                  py={{ base: 4, lg: '2.6vh' }} borderBottom="1px solid" borderColor="brand.linea">
                  <Box>
                    <Text as="h3" fontFamily="mono" fontWeight="700" fontSize={{ base: '19px', lg: 'clamp(18px, 1.55vw, 25px)' }}
                      letterSpacing="0.02em" lineHeight={1.15} color="brand.bone">
                      {d.title}
                    </Text>
                    <Text mt={1} fontSize={{ base: '15px', lg: 'clamp(14px, 1.1vw, 17px)' }} color="brand.gray" lineHeight={1.4}>
                      {d.detail}
                    </Text>
                  </Box>
                  <Check />
                </Flex>
              ))}
            </Box>
          </Box>

          {/* Collage: misma composición que la placa */}
          <Box justifySelf="center" w="100%" maxW={{ base: '360px', lg: '520px' }}>
            <Image className="fm-collage" src={collage} alt={collageAlt} w="100%" h="auto" display="block"
              filter="drop-shadow(0 30px 50px rgba(0,0,0,0.55))" />
          </Box>
        </Grid>
      </Box>

      {/* ── Bloques 1-2-3 ── */}
      <Box px={{ base: 5, md: 10, lg: '6vw' }} pb={{ base: 20, lg: '12vh' }}>
        <Flex className="fm-steps" direction="column" gap={{ base: 10, lg: '5vh' }} maxW="1050px" mx="auto"
          pl={{ base: '48px', lg: '60px' }} position="relative"
          _before={{ content: '""', position: 'absolute', left: { base: '17px', lg: '21px' }, top: '22px', bottom: '40px', w: '1px', bg: 'brand.linea' }}>
          <Box className="fm-fill" position="absolute" left={{ base: '17px', lg: '21px' }} top="22px" bottom="40px" w="1px"
            bg="brand.celeste" transformOrigin="top" transform="scaleY(0)" />

          <Panel n="1" title={languages.title}>
            <Flex justify="center" align="center" wrap="wrap" direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 0 }}>
              {languages.items.map((l, i) => (
                <Flex key={l.name} align="center" gap={3.5} px={{ md: '3vw' }}
                  borderLeft={{ md: i ? '1px solid' : 0 }} borderColor={{ md: 'brand.celeste' }}>
                  <Text as="span" fontWeight="500" fontSize={{ base: '24px', lg: 'clamp(24px, 2.4vw, 38px)' }}>{l.name}</Text>
                  <Flag code={l.flag} />
                </Flex>
              ))}
            </Flex>
          </Panel>

          <Panel n="2" title={software.title}>
            <Flex wrap="wrap" justify="center" gap={3}>
              {software.items.map((s) => (
                <Flex key={s.name} align="center" justify="center" border="1px solid" borderColor="brand.linea"
                  h={{ base: '46px', lg: '58px' }} px={{ base: 2.5, lg: 4 }}>
                  <Image src={s.logo} alt={s.name} h={{ base: '22px', lg: '28px' }} w="auto" opacity={0.92} />
                </Flex>
              ))}
            </Flex>
          </Panel>

          <Panel n="3" title={courses.title}>
            <Grid as="ul" listStyleType="none" m={0} p={0} templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 3, md: '12px 4vw' }}>
              {courses.items.map((c) => (
                <Flex as="li" key={c} gap={2.5} align="flex-start" fontSize={{ base: '16px', lg: 'clamp(15px, 1.3vw, 19px)' }} lineHeight={1.4}
                  _before={{ content: '""', flex: '0 0 auto', boxSize: '8px', mt: '0.5em', borderRadius: 'full', bg: 'brand.celeste',
                    boxShadow: '0 0 0 3px rgba(76,184,242,0.16)' }}>
                  {c}
                </Flex>
              ))}
            </Grid>
          </Panel>
        </Flex>
      </Box>
    </Box>
  )
}
