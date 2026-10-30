import { Box, Flex, Grid, Text, Link, Icon, useToken } from '@chakra-ui/react'
import { LiaLaptopCodeSolid } from 'react-icons/lia'
import { coachData } from '../../data/coachData'

// ─────────────────────────────────────────────────────────────
// FOOTER
//  · Marca RG + nombre + rol.
//  · Navegación (mismas secciones que el navbar) y redes.
//  · "Volver arriba", copyright y firma del desarrollador.
// ─────────────────────────────────────────────────────────────

const HOVER = '@media (hover: hover) and (pointer: fine)'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = id === 'hero' ? 0 : -(window.innerWidth >= 992 ? 76 : 68)
  if (window.__lenis) window.__lenis.scrollTo(el, { offset })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}

function ColTitle({ children }) {
  return (
    <Text fontFamily="mono" fontWeight="700" fontSize="12px" letterSpacing="0.16em" color="brand.celeste" mb={4}>
      {children}
    </Text>
  )
}

export default function Footer() {
  const [devCream] = useToken('colors', ['dev.cream'])
  const { nav, contactId, displayName, initials, hero, contacts, email } = coachData
  const links = [...nav, { label: 'Contacto', id: contactId }]
  const socials = contacts.filter((c) => c.id !== 'email' || email)
  const go = (e, id) => { e.preventDefault(); scrollToId(id) }

  return (
    <Box as="footer" position="relative" bg="#03060A" borderTop="1px solid" borderColor="brand.linea"
      px={{ base: 5, md: 10, lg: '6vw' }} pt={{ base: 14, lg: 20 }} pb={8} overflow="hidden">
      {/* línea con nodo, como en las placas */}
      <Box position="absolute" top={0} left="6vw" w="22%" h="1px" bg="brand.celeste" opacity={0.7} aria-hidden="true"
        _after={{ content: '""', position: 'absolute', right: '-3px', top: '-3px', boxSize: '7px', borderRadius: 'full', bg: 'brand.celeste' }} />

      <Grid maxW="1300px" mx="auto" templateColumns={{ base: '1fr', md: '1.4fr 1fr 1fr' }} gap={{ base: 10, md: 8 }}>
        {/* Marca */}
        <Box>
          <Flex as="a" href="#hero" onClick={(e) => go(e, 'hero')} align="center" gap={4} w="fit-content"
            aria-label={`${displayName}, volver al inicio`}
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}>
            <Text as="span" fontFamily="heading" fontSize="64px" lineHeight={0.85} pt="4px" color="transparent"
              sx={{ WebkitTextStroke: '1.5px var(--chakra-colors-brand-celeste)' }}>
              {initials}
            </Text>
            <Box w="1px" h="52px" bg="brand.linea" />
            <Box>
              <Text fontFamily="heading" fontSize="28px" lineHeight={0.95} letterSpacing="0.02em">{displayName.toUpperCase()}</Text>
              <Text fontFamily="mono" fontWeight="600" fontSize="14px" letterSpacing="0.06em" color="brand.gray" mt={1}>
                {hero.role} · {hero.license}
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Navegación */}
        <Box as="nav" aria-label="Pie de página">
          <ColTitle>SECCIONES</ColTitle>
          <Grid as="ul" listStyleType="none" m={0} p={0} templateColumns="repeat(2, minmax(0, 1fr))" gap="10px 20px">
            {links.map((l) => (
              <Box as="li" key={l.id}>
                <Box as="a" href={`#${l.id}`} onClick={(e) => go(e, l.id)} fontFamily="mono" fontWeight="600" fontSize="16px"
                  letterSpacing="0.04em" color="brand.gray" transition="color 160ms ease"
                  sx={{ [HOVER]: { '&:hover': { color: 'brand.bone' } } }}
                  _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}>
                  {l.label}
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Redes */}
        <Box>
          <ColTitle>REDES</ColTitle>
          <Flex gap={2.5} wrap="wrap">
            {socials.map((c) => (
              <Flex as="a" key={c.id} href={c.id === 'email' ? `mailto:${email}` : c.href}
                target={c.id === 'email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={c.network}
                boxSize="44px" align="center" justify="center" border="1px solid" borderColor="brand.linea" color="brand.bone"
                transition="border-color 160ms ease, color 160ms ease, transform 140ms ease-out" _active={{ transform: 'scale(0.95)' }}
                sx={{ [HOVER]: { '&:hover': { borderColor: 'brand.celeste', color: 'brand.celeste' } } }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}>
                {c.icon === 'tm'
                  ? <Text as="span" fontWeight="800" fontStyle="italic" fontSize="16px" lineHeight={1}>tm</Text>
                  : <Icon as={c.icon} boxSize="18px" />}
              </Flex>
            ))}
          </Flex>
          <Box as="button" type="button" onClick={() => scrollToId('hero')} mt={6} display="inline-flex" alignItems="center" gap={2}
            fontFamily="mono" fontWeight="700" fontSize="14px" letterSpacing="0.1em" color="brand.celeste"
            sx={{ [HOVER]: { '&:hover': { color: 'brand.celesteLight' } } }}
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}>
            <Box as="span" aria-hidden="true">↑</Box> VOLVER ARRIBA
          </Box>
        </Box>
      </Grid>

      <Flex maxW="1300px" mx="auto" mt={{ base: 12, lg: 16 }} pt={6} borderTop="1px solid" borderColor="brand.linea"
        direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={3}>
        <Text fontFamily="mono" fontSize="12px" letterSpacing="0.12em" color="brand.gray" textTransform="uppercase">
          © {new Date().getFullYear()} {displayName} · Todos los derechos reservados
        </Text>
        <Text fontSize="12px" color="brand.gray" letterSpacing="0.05em">
          Desarrollo Web -{' '}
          <Link href="https://matiasgunsett.netlify.app/" isExternal color="dev.cream" fontSize="14px"
            transition="color 0.3s" _hover={{ color: 'brand.celeste', textDecoration: 'none' }}>
            Matias Gunsett
            <LiaLaptopCodeSolid style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle', fontSize: '20px', color: devCream }} />
          </Link>
        </Text>
      </Flex>
    </Box>
  )
}
