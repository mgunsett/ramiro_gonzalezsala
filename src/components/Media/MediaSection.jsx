import { useRef, useState, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Image, Link } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MediaScreen, { KindTag } from './MediaScreen'
import useInstagram from '../../hooks/useInstagram'
import { media } from '../../data/mediaData'

gsap.registerPlugin(ScrollTrigger)

const HOVER = '@media (hover: hover) and (pointer: fine)'

function IgIcon(props) {
  return (
    <Box as="svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </Box>
  )
}

function IgButton() {
  const { profile, cta } = media.instagram
  return (
    <Flex as="a" href={profile} target="_blank" rel="noopener noreferrer" align="center" gap={2.5} px={5} py={3}
      border="1px solid" borderColor="brand.celeste" color="brand.celeste" fontFamily="mono" fontWeight="700" fontSize="16px"
      letterSpacing="0.06em" position="relative" overflow="hidden"
      transition="color 220ms cubic-bezier(0.23,1,0.32,1), transform 140ms ease-out" _active={{ transform: 'scale(0.97)' }}
      _before={{ content: '""', position: 'absolute', inset: 0, bg: 'brand.celeste', clipPath: 'inset(0 100% 0 0)',
        transition: 'clip-path 220ms cubic-bezier(0.23,1,0.32,1)' }}
      sx={{ '& > *': { position: 'relative' }, [HOVER]: { '&:hover': { color: 'brand.ink' }, '&:hover::before': { clipPath: 'inset(0 0 0 0)' } } }}>
      <IgIcon boxSize="18px" /><span>{cta}</span>
    </Flex>
  )
}

function IgTile({ post, big }) {
  return (
    <Box as="a" href={post.link || media.instagram.profile} target="_blank" rel="noopener noreferrer"
      aria-label="Ver publicación en Instagram" position="relative" display="block" overflow="hidden" bg="brand.carbon"
      gridColumn={big ? 'span 2' : 'auto'} gridRow={big ? 'span 2' : 'auto'} sx={{ aspectRatio: '1' }} role="group">
      <Image src={post.url} alt={post.alt || 'Publicación de Instagram de Ramiro Gonzalez Sales'} loading="lazy"
        w="100%" h="100%" objectFit="cover" transition="transform 500ms cubic-bezier(0.23,1,0.32,1)"
        sx={{ [HOVER]: { '[role=group]:hover &': { transform: 'scale(1.06)' } } }} />
      <Flex position="absolute" inset={0} align="center" justify="center" bg="rgba(5,8,12,0.55)" opacity={0}
        transition="opacity 220ms ease" color="white" sx={{ [HOVER]: { '[role=group]:hover &': { opacity: 1 } } }}>
        <IgIcon boxSize="34px" />
      </Flex>
    </Box>
  )
}

export default function MediaSection() {
  const ref = useRef(null)
  const featRef = useRef(null)
  const [active, setActive] = useState(0)
  const { posts } = useInstagram()
  const { items, instagram } = media
  const item = items[active]

  const select = (i) => {
    setActive(i)
    // en móvil, llevar la vista al destacado si quedó fuera de pantalla
    const el = featRef.current
    if (el && window.innerWidth < 992 && el.getBoundingClientRect().top < 0) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animación al cambiar de nota (crossfade corto)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(featRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
  }, [active])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.md-title'), { yPercent: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
      gsap.from(q('.md-row'), { x: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: q('.md-list')[0], start: 'top 85%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box as="section" id="media" ref={ref} aria-labelledby="md-title" bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      {/* ── Notas ── */}
      <Box px={{ base: 5, md: 10, lg: '6vw' }} py={{ base: 20, lg: '12vh' }}>
       <Box maxW="1400px" mx="auto">
        <Text as="h2" id="md-title" className="md-title" fontFamily="heading" fontWeight="400" lineHeight={0.85} letterSpacing="0.03em"
          fontSize={{ base: '56px', md: '80px', lg: 'clamp(72px, 7vw, 124px)' }}>
          {media.title}
        </Text>

        <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }} gap={{ base: 8, lg: '3vw' }}
          mt={{ base: 8, lg: '5vh' }} alignItems="start">
          {/* Destacado */}
          <Box position={{ lg: 'sticky' }} top={{ lg: '110px' }}>
            <Box ref={featRef} key={active}>
              <MediaScreen item={item} />
            </Box>
            <Flex direction="column" align="flex-start" gap={3} pt={{ base: 5, lg: '3vh' }}>
              <KindTag kind={item.kind} />
              <Text fontSize={{ base: '17px', lg: 'clamp(16px, 1.3vw, 20px)' }} color="brand.bone" lineHeight={1.45} maxW="60ch">
                "{item.title}"
              </Text>
              <Link href={item.href} isExternal fontFamily="heading" fontSize={{ base: '26px', lg: '30px' }} letterSpacing="0.04em"
                textDecoration="underline" textUnderlineOffset="5px" textDecorationThickness="2px" textDecorationColor="brand.celeste"
                _hover={{ color: 'brand.celeste' }}>
                {item.cta}
              </Link>
            </Flex>
          </Box>

          {/* Lista */}
          <Box as="ul" className="md-list" listStyleType="none" m={0} p={0} borderTop="1px solid" borderColor="brand.linea">
            {items.map((it, i) => {
              const on = i === active
              return (
                <Box as="li" key={it.title} className="md-row">
                  <Grid as="button" type="button" onClick={() => select(i)} aria-pressed={on} w="100%" textAlign="left"
                    templateColumns={{ base: '88px minmax(0,1fr)', lg: '104px minmax(0,1fr)' }} gap={4} alignItems="center"
                    py={3} pl={3} pr={2} position="relative" borderBottom="1px solid" borderColor="brand.linea"
                    bg={on ? 'rgba(76,184,242,0.07)' : 'transparent'} transition="background-color 160ms ease"
                    _before={{ content: '""', position: 'absolute', left: '-1px', top: 0, bottom: 0, w: '2px', bg: 'brand.celeste',
                      transform: on ? 'none' : 'scaleY(0)', transition: 'transform 220ms cubic-bezier(0.23,1,0.32,1)' }}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '-2px' }}
                    sx={{ [HOVER]: { '&:hover': { bg: 'rgba(76,184,242,0.07)' } } }}>
                    <Image src={it.thumb} alt="" w="100%" sx={{ aspectRatio: '16 / 10' }} objectFit="cover"
                      opacity={on ? 1 : 0.75} transition="opacity 200ms ease" />
                    <Flex direction="column" gap={1} minW={0}>
                      <KindTag kind={it.kind} />
                      <Text fontSize={{ base: '14px', lg: '15px' }} lineHeight={1.35} color={on ? 'brand.bone' : 'brand.gray'} noOfLines={3}>
                        "{it.title}"
                      </Text>
                    </Flex>
                  </Grid>
                </Box>
              )
            })}
          </Box>
        </Grid>
       </Box>
      </Box>

      {/* ── Instagram ── */}
      <Box px={{ base: 5, md: 10, lg: '6vw' }} pb={{ base: 20, lg: '12vh' }}>
       <Box maxW="1400px" mx="auto">
        <Flex wrap="wrap" justify="space-between" align="flex-end" gap={4} mb={{ base: 6, lg: '4vh' }}
          pt={{ base: 12, lg: '8vh' }} borderTop="1px solid" borderColor="brand.linea">
          <Flex align="center" gap={3.5}>
            <Flex boxSize="56px" borderRadius="full" p="2px" bg="linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)"
              align="center" justify="center" color="white">
              <Flex boxSize="100%" borderRadius="full" bg="brand.ink" align="center" justify="center"><IgIcon boxSize="24px" /></Flex>
            </Flex>
            <Box>
              <Text fontFamily="heading" fontSize={{ base: '36px', lg: '46px' }} lineHeight={0.9}>{instagram.title}</Text>
              <Text fontFamily="mono" fontWeight="600" fontSize="16px" color="brand.gray" letterSpacing="0.04em">{instagram.handle}</Text>
            </Box>
          </Flex>
          <IgButton />
        </Flex>

        {posts.length > 0 && (
          <Grid templateColumns={{ base: 'repeat(2, minmax(0,1fr))', md: 'repeat(4, minmax(0,1fr))' }} gap={2}>
            {posts.slice(0, 5).map((p, i) => <IgTile key={p.id} post={p} big={i === 0} />)}
          </Grid>
        )}
       </Box>
      </Box>
    </Box>
  )
}
