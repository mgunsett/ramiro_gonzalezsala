import { Box, Flex, Grid, Text, Link, Icon, useToken, Image } from '@chakra-ui/react'
import { coachData } from '../../data/coachData'
import { useT, useLocalized } from '../../i18n/LanguageContext'
import LangSwitch from './LangSwitch'
import { PAGE_PX, GUTTER_LG } from '../../styles/layout'
import sportfolio from '../../../assets/software/logo_sport.png'


const HOVER = '@media (hover: hover) and (pointer: fine)'

const TXT = {
  contact: { es: 'Contacto', en: 'Contact', it: 'Contatti' },
  home: { es: 'volver al inicio', en: 'back to top', it: 'torna all’inizio' },
  footerNav: { es: 'Pie de página', en: 'Footer', it: 'Piè di pagina' },
  sections: { es: 'SECCIONES', en: 'SECTIONS', it: 'SEZIONI' },
  socials: { es: 'REDES', en: 'SOCIAL', it: 'SOCIAL' },
  language: { es: 'IDIOMA', en: 'LANGUAGE', it: 'LINGUA' },
  top: { es: 'VOLVER ARRIBA', en: 'BACK TO TOP', it: 'TORNA SU' },
  rights: { es: 'Todos los derechos reservados', en: 'All rights reserved', it: 'Tutti i diritti riservati' },
  dev: { es: 'Desarrollo Web', en: 'Web Development', it: 'Sviluppo Web' },
}

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
  const t = useT()
  const { nav, contactId, displayName, initials, hero, contacts, email } = useLocalized(coachData)
  const links = [...nav, { label: t(TXT.contact), id: contactId }]
  const socials = contacts.filter((c) => c.id !== 'email' || email)
  const go = (e, id) => { e.preventDefault(); scrollToId(id) }

  return (
    <Box as="footer" position="relative" bg="#03060A" borderTop="1px solid" borderColor="brand.linea"
      px={PAGE_PX} pt={{ base: 14, lg: 20 }} pb={8} overflow="hidden">
      {/* línea con nodo, como en las placas */}
      <Box position="absolute" top={0} left={{ base: 5, md: 10, lg: GUTTER_LG }} w="22%" h="1px" bg="brand.celeste" opacity={0.7} aria-hidden="true"
        _after={{ content: '""', position: 'absolute', right: '-3px', top: '-3px', boxSize: '7px', borderRadius: 'full', bg: 'brand.celeste' }} />

      <Grid templateColumns={{ base: '1fr', md: '1.4fr 1fr 1fr' }} gap={{ base: 10, md: 8 }}>
        {/* Marca */}
        <Box>
          <Flex as="a" href="#hero" onClick={(e) => go(e, 'hero')} align="center" gap={4} w="fit-content"
            aria-label={`${displayName}, ${t(TXT.home)}`}
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

          <Box mt={{ base: 8, md: 10 }}>
            <ColTitle>{t(TXT.language)}</ColTitle>
            <LangSwitch placement="top-start" />
          </Box>
        </Box>

        {/* Navegación */}
        <Box as="nav" aria-label={t(TXT.footerNav)}>
          <ColTitle>{t(TXT.sections)}</ColTitle>
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
          <ColTitle>{t(TXT.socials)}</ColTitle>
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
            <Box as="span" aria-hidden="true">↑</Box> {t(TXT.top)}
          </Box>
        </Box>
      </Grid>

      <Flex mt={{ base: 12, lg: 16 }} pt={6} borderTop="1px solid" borderColor="brand.linea"
        direction={{ base: 'column', md: 'row' }} justify="space-between" align='center' gap={3}>
        <Text fontFamily="mono" fontSize="12px" letterSpacing="0.12em" color="brand.gray" textTransform="uppercase">
          © {new Date().getFullYear()} {displayName} · {t(TXT.rights)}
        </Text>
        <Flex direction="column" fontSize="12px" color="rgba(255,255,255,0.3)" letterSpacing="0.05em"
          textTransform="uppercase" fontFamily="'Barlow Condensed', sans-serif" >
            Desarrollo Web
            <Box width="95px" height="1px" color="rgba(255,255,255,0.3)"/>
            <Link 
            href="https://matiasgunsett.netlify.app/sportfolio" 
            isExternal 
            color="#2D5A47" 
            _hover={{ borderColor: '#e8d5a370', color: '#e8d5a380' }}
            transition="color 0.3s"
            >
             <Image loading="lazy" decoding="async" src={sportfolio} alt="Sportfolio Web" display="block" width="85px" height="22px" mr="2px" ml="2px" pt="4px" />
            </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
