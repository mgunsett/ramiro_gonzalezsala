import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { coachData } from '../../data/coachData'

// ─────────────────────────────────────────────────────────────
// NAVBAR · Opción A "Pizarra"
//  · La barra es una línea táctica: cada sección es un nodo y un
//    punto celeste ("puck") se desliza al nodo de la sección activa.
//  · Fondo transparente sobre el Hero; tinta + blur al scrollear.
//  · Móvil: pantalla completa que se despliega desde arriba, con las
//    secciones unidas por la misma línea.
// ─────────────────────────────────────────────────────────────

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const EASE_IO = 'cubic-bezier(0.77, 0, 0.175, 1)'
const EASE_DRAWER = 'cubic-bezier(0.32, 0.72, 0, 1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'

const { nav: NAV, contactId: CONTACT_ID, displayName, initials } = coachData
const [firstName, ...rest] = displayName.split(' ')

function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return
  // el Hero arranca arriba de todo; el resto deja lugar a la barra fija
  const offset = id === 'hero' ? 0 : -(window.innerWidth >= 992 ? 76 : 68)
  if (window.__lenis) window.__lenis.scrollTo(target, { offset })
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}

/* Sección activa según el scroll (las que no existen todavía se ignoran) */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = null
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActive(current)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute) }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ids])
  return active
}

const SECTION_IDS = [...NAV.map((l) => l.id), CONTACT_ID]

/* Botón "Contactar": relleno que barre de izquierda a derecha */
function CtaContact({ onClick, full = false }) {
  return (
    <Box
      as="a"
      href={`#${CONTACT_ID}`}
      onClick={onClick}
      position="relative"
      overflow="hidden"
      display={full ? 'block' : 'inline-block'}
      textAlign="center"
      border="1px solid"
      borderColor="brand.celeste"
      color="brand.celeste"
      px={full ? 5 : '18px'}
      py={full ? '14px' : '10px'}
      fontFamily="mono"
      fontWeight="700"
      fontSize={full ? '17px' : '15px'}
      letterSpacing="0.06em"
      transition={`color 220ms ${EASE_OUT}, transform 140ms ease-out`}
      _active={{ transform: 'scale(0.97)' }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}
      _before={{
        content: '""', position: 'absolute', inset: 0, bg: 'brand.celeste',
        clipPath: 'inset(0 100% 0 0)', transition: `clip-path 220ms ${EASE_OUT}`,
      }}
      sx={{ [HOVER]: { '&:hover': { color: 'brand.ink' }, '&:hover::before': { clipPath: 'inset(0 0 0 0)' } } }}
    >
      <Box as="span" position="relative">Contactar</Box>
    </Box>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [puck, setPuck] = useState({ x: 0, visible: false })
  const navRef = useRef(null)
  const barRef = useRef(null)
  const linkRefs = useRef({})
  const menuBtnRef = useRef(null)
  const firstOverlayLink = useRef(null)
  const active = useActiveSection(SECTION_IDS)

  // Entrada
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(navRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.5, clearProps: 'transform' }
    )
  }, [])

  // Fondo al scrollear
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Posición del puck sobre el nodo activo
  const placePuck = useCallback(() => {
    const link = active && linkRefs.current[active]
    const bar = barRef.current
    if (!link || !bar || !link.offsetParent) {
      setPuck((p) => ({ ...p, visible: false }))
      return
    }
    const b = bar.getBoundingClientRect()
    const r = link.getBoundingClientRect()
    setPuck({ x: r.left - b.left + r.width / 2 - 4.5, visible: true })
  }, [active])

  useLayoutEffect(() => { placePuck() }, [placePuck])
  useEffect(() => {
    window.addEventListener('resize', placePuck)
    document.fonts?.ready?.then(placePuck)
    return () => window.removeEventListener('resize', placePuck)
  }, [placePuck])

  // Menú móvil: bloquear scroll, Escape, foco
  useEffect(() => {
    if (!open) return
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstOverlayLink.current?.focus(), 80)
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.__lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
    menuBtnRef.current?.focus()
  }

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    // espera a que el overlay libere el scroll antes de desplazar
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <Box ref={navRef} as="nav" aria-label="Principal" position="fixed" top={0} left={0} right={0} zIndex={1000}>
      {/* ── Barra ── */}
      <Flex
        ref={barRef}
        position="relative"
        zIndex={2}
        h={{ base: '68px', lg: '76px' }}
        align="center"
        justify="space-between"
        gap={6}
        px={{ base: 5, lg: '3.4vw' }}
        bg={scrolled && !open ? 'rgba(5,8,12,0.84)' : 'transparent'}
        backdropFilter={scrolled && !open ? 'blur(12px) saturate(140%)' : 'none'}
        transition="background-color 240ms ease, backdrop-filter 240ms ease"
        _after={{
          content: '""', position: 'absolute', bottom: 0,
          left: { base: 5, lg: '3.4vw' }, right: { base: 5, lg: '3.4vw' },
          h: '1px', bg: 'brand.linea', opacity: open ? 0 : 1, transition: 'opacity 200ms ease',
        }}
      >
        {/* Marca */}
        <Flex
          as="a"
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          aria-label={`${displayName}, ir al inicio`}
          align="center"
          gap={3}
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}
        >
          <Text
            as="span"
            fontFamily="heading"
            fontSize={{ base: '32px', lg: '36px' }}
            lineHeight={1}
            pt="3px"
            color="transparent"
            sx={{ WebkitTextStroke: '1.5px var(--chakra-colors-brand-celeste)' }}
          >
            {initials}
          </Text>
          <Box display={{ base: 'none', lg: 'block' }} w="1px" h="26px" bg="brand.linea" />
          <Text
            as="span"
            display={{ base: 'none', lg: 'block' }}
            fontFamily="mono"
            fontWeight="600"
            fontSize="15px"
            letterSpacing="0.04em"
            lineHeight={1.1}
            color="brand.bone"
          >
            {firstName}<br />{rest.join(' ')}
          </Text>
        </Flex>

        {/* Links con nodos */}
        <Flex as="ul" listStyleType="none" m={0} p={0} h="100%" gap="clamp(18px, 2.6vw, 40px)" display={{ base: 'none', lg: 'flex' }}>
          {NAV.map(({ label, id }) => {
            const on = active === id
            return (
              <Flex
                as="li"
                key={id}
                position="relative"
                align="center"
                _after={{
                  content: '""', position: 'absolute', left: '50%', bottom: '-3px',
                  w: '5px', h: '5px', ml: '-2.5px', borderRadius: 'full',
                  bg: 'brand.ink', border: '1px solid rgba(120,190,235,0.45)',
                }}
              >
                <Box
                  as="a"
                  ref={(el) => { linkRefs.current[id] = el }}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={on ? 'true' : undefined}
                  py="6px"
                  fontFamily="mono"
                  fontWeight="600"
                  fontSize="16px"
                  letterSpacing="0.04em"
                  color={on ? 'brand.bone' : 'brand.gray'}
                  transition="color 160ms ease"
                  _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}
                  sx={{ [HOVER]: { '&:hover': { color: 'brand.bone' } } }}
                >
                  {label}
                </Box>
              </Flex>
            )
          })}
        </Flex>

        {/* CTA desktop */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <CtaContact onClick={(e) => go(e, CONTACT_ID)} />
        </Box>

        {/* Botón menú móvil */}
        <Flex
          as="button"
          type="button"
          ref={menuBtnRef}
          onClick={() => (open ? closeMenu() : setOpen(true))}
          aria-expanded={open}
          aria-controls="nav-overlay"
          display={{ base: 'flex', lg: 'none' }}
          align="center"
          gap="10px"
          py={2}
          fontFamily="mono"
          fontWeight="600"
          fontSize="16px"
          letterSpacing="0.06em"
          color="brand.bone"
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}
        >
          <span>{open ? 'Cerrar' : 'Menú'}</span>
          <Flex direction="column" gap="5px" w="22px" aria-hidden="true">
            <Box h="1.5px" bg="brand.bone" transition={`transform 220ms ${EASE_OUT}`}
              transform={open ? 'translateY(3.25px) rotate(45deg)' : 'none'} />
            <Box h="1.5px" bg="brand.bone" transition={`transform 220ms ${EASE_OUT}`}
              transform={open ? 'translateY(-3.25px) rotate(-45deg)' : 'none'} />
          </Flex>
        </Flex>

        {/* Puck: nodo de la sección activa */}
        <Box
          aria-hidden="true"
          position="absolute"
          left={0}
          bottom="-5px"
          boxSize="9px"
          borderRadius="full"
          bg="brand.celeste"
          boxShadow="0 0 0 4px rgba(76,184,242,0.18), 0 0 14px rgba(76,184,242,0.6)"
          pointerEvents="none"
          display={{ base: 'none', lg: 'block' }}
          style={{ transform: `translateX(${puck.x}px)`, opacity: puck.visible ? 1 : 0 }}
          transition={`transform 380ms ${EASE_IO}, opacity 200ms ease`}
        />
      </Flex>

      {/* ── Overlay móvil ── */}
      <Flex
        id="nav-overlay"
        display={{ base: 'flex', lg: 'none' }}
        position="fixed"
        inset={0}
        zIndex={1}
        direction="column"
        justify="space-between"
        pt="110px"
        px={7}
        pb={8}
        bg="rgba(5,8,12,0.97)"
        aria-hidden={!open}
        visibility={open ? 'visible' : 'hidden'}
        sx={{
          clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: open
            ? `clip-path 360ms ${EASE_DRAWER}, visibility 0s`
            : `clip-path 300ms ${EASE_DRAWER}, visibility 0s linear 300ms`,
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        <Flex as="ul" listStyleType="none" direction="column" gap="6px" m={0} ml="6px" p={0} borderLeft="1px solid" borderColor="brand.linea">
          {NAV.map(({ label, id }, i) => {
            const on = active === id
            return (
              <Box
                as="li"
                key={id}
                position="relative"
                pl={6}
                opacity={open ? 1 : 0}
                transform={open ? 'none' : 'translateY(10px)'}
                transition={`opacity 220ms ease ${open ? 80 + i * 40 : 0}ms, transform 260ms ${EASE_OUT} ${open ? 80 + i * 40 : 0}ms`}
                _before={{
                  content: '""', position: 'absolute', left: '-4px', top: '50%', mt: '-3.5px',
                  boxSize: '7px', borderRadius: 'full',
                  bg: on ? 'brand.celeste' : 'brand.ink',
                  border: '1px solid', borderColor: on ? 'brand.celeste' : 'rgba(120,190,235,0.5)',
                  boxShadow: on ? '0 0 10px rgba(76,184,242,0.7)' : 'none',
                }}
              >
                <Box
                  as="a"
                  ref={i === 0 ? firstOverlayLink : undefined}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  tabIndex={open ? 0 : -1}
                  aria-current={on ? 'true' : undefined}
                  fontFamily="heading"
                  fontSize="46px"
                  lineHeight={1.05}
                  color={on ? 'brand.celeste' : 'brand.bone'}
                  _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '4px' }}
                >
                  {label}
                </Box>
              </Box>
            )
          })}
        </Flex>

        <Box>
          <CtaContact full onClick={(e) => go(e, CONTACT_ID)} />
        </Box>
      </Flex>
    </Box>
  )
}
