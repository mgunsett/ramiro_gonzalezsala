import { useRef, useLayoutEffect } from 'react'
import { Box, Flex, Grid, Text, Icon } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coachData } from '../../data/coachData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// CONTACTO
//  · Título + texto exacto de la placa.
//  · Los 5 accesos en UNA sola fila (también en móvil), cada uno en su
//    panel con las líneas de la placa. Al pasar el mouse el panel se
//    enciende en celeste.
// ─────────────────────────────────────────────────────────────

const HOVER = '@media (hover: hover) and (pointer: fine)'

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

function ContactCard({ c }) {
  const disabled = c.id === 'email' && !coachData.email
  const href = c.id === 'email' ? `mailto:${coachData.email}` : c.href
  const external = !href.startsWith('mailto:')

  return (
    <Flex
      as={disabled ? 'div' : 'a'}
      href={disabled ? undefined : href}
      target={!disabled && external ? '_blank' : undefined}
      rel={!disabled && external ? 'noopener noreferrer' : undefined}
      aria-label={`${c.label} · ${c.network}`}
      aria-disabled={disabled || undefined}
      className="ct-card"
      direction="column"
      align="center"
      gap={{ base: 2.5, lg: 4 }}
      minW={0}
      opacity={disabled ? 0.45 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      role="group"
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}
    >
      {/* Panel con las líneas de la placa */}
      <Flex
        position="relative"
        w="100%"
        align="center"
        justify="center"
        overflow="hidden"
        border="1px solid"
        borderColor="brand.linea"
        bg="linear-gradient(110deg, rgba(76,184,242,0.22) 0%, transparent 35%), linear-gradient(290deg, rgba(76,184,242,0.16) 0%, transparent 30%), #0B1118"
        transition="border-color 220ms ease, box-shadow 220ms ease"
        sx={{
          aspectRatio: '1',
          [HOVER]: disabled ? {} : {
            '[role=group]:hover &': { borderColor: 'brand.celeste', boxShadow: '0 0 0 1px #4CB8F2, 0 18px 40px rgba(76,184,242,0.18)' },
          },
        }}
      >
        <Box position="absolute" left={0} bottom="22%" w="22%" h="22%" borderTop="1px solid" borderRight="1px solid"
          borderColor="rgba(140,200,240,0.55)" aria-hidden="true" />
        <Box position="absolute" right="9%" bottom={0} h="30%" w="1px" bg="rgba(140,200,240,0.55)" aria-hidden="true"
          _before={{ content: '""', position: 'absolute', top: '-3px', left: '-3px', boxSize: '7px', borderRadius: 'full', bg: 'brand.celeste' }} />
        <Box
          color="brand.bone"
          transition="transform 300ms cubic-bezier(0.23,1,0.32,1), color 200ms ease"
          sx={{ [HOVER]: disabled ? {} : { '[role=group]:hover &': { transform: 'translateY(-4px) scale(1.04)', color: 'brand.celeste' } } }}
        >
          {c.icon === 'tm'
            ? <TmIcon boxSize={{ base: '30px', sm: '42px', lg: 'clamp(56px, 5vw, 92px)' }} />
            : <Icon as={c.icon} boxSize={{ base: '28px', sm: '40px', lg: 'clamp(52px, 4.6vw, 86px)' }} />}
        </Box>
      </Flex>

      <Flex direction="column" align="center" gap={1} textAlign="center">
        <Text
          fontFamily="heading"
          fontSize={{ base: '13px', sm: '17px', lg: 'clamp(20px, 1.7vw, 28px)' }}
          letterSpacing="0.04em"
          lineHeight={1.05}
          textDecoration="underline"
          textUnderlineOffset="4px"
          textDecorationThickness="2px"
          textDecorationColor="brand.celeste"
          transition="color 160ms ease"
          sx={{ [HOVER]: disabled ? {} : { '[role=group]:hover &': { color: 'brand.celeste' } } }}
        >
          {c.label}
        </Text>
        <Text fontFamily="mono" fontWeight="600" fontSize={{ base: '10px', sm: '12px', lg: '13px' }} letterSpacing="0.1em"
          color="brand.gray" textTransform="uppercase">
          {c.network}
        </Text>
      </Flex>
    </Flex>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const { title, paragraphs } = coachData.contact

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref)
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
      tl.from(q('.ct-title'), { yPercent: 30, opacity: 0, duration: 1, ease: 'expo.out' })
        .from(q('.ct-p'), { y: 16, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.6')
      gsap.from(q('.ct-card'), {
        y: 28, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: q('.ct-row')[0], start: 'top 90%' },
      })
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
      px={{ base: 4, md: 10, lg: '6vw' }}
      py={{ base: 20, lg: '14vh' }}
    >
      {/* halos de la placa */}
      <Box position="absolute" left="-10%" top="-20%" w="40%" h="70%" borderRadius="50%" bg="rgba(76,184,242,0.16)" filter="blur(90px)" pointerEvents="none" />
      <Box position="absolute" right="-10%" bottom="-25%" w="40%" h="70%" borderRadius="50%" bg="rgba(76,184,242,0.14)" filter="blur(90px)" pointerEvents="none" />

      <Box position="relative" maxW="1300px" mx="auto">
        <Text as="h2" id="ct-title" className="ct-title" fontFamily="heading" fontWeight="400" textAlign="center"
          letterSpacing="0.03em" lineHeight={0.85} fontSize={{ base: '72px', md: '110px', lg: 'clamp(100px, 9vw, 160px)' }}>
          {title}
        </Text>

        <Flex direction="column" gap={5} maxW="62ch" mx="auto" mt={{ base: 8, lg: '5vh' }} textAlign="center">
          {paragraphs.map((p) => (
            <Text key={p} className="ct-p" fontSize={{ base: '17px', lg: 'clamp(18px, 1.45vw, 23px)' }} lineHeight={1.55}
              color="brand.bone" sx={{ textWrap: 'pretty' }}>
              {p}
            </Text>
          ))}
        </Flex>

        {/* Los 5 accesos en una sola fila */}
        <Grid className="ct-row" templateColumns="repeat(5, minmax(0, 1fr))" gap={{ base: 2, sm: 4, lg: '2vw' }}
          mt={{ base: 12, lg: '9vh' }}>
          {coachData.contacts.map((c) => <ContactCard key={c.id} c={c} />)}
        </Grid>
      </Box>
    </Box>
  )
}
