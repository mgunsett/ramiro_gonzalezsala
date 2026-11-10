import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'

// Piezas compartidas de los capítulos de Trayectoria

export const GOLD = '#C9A45C'

export const TXT = {
  matches: { es: 'PARTIDOS', en: 'MATCHES', it: 'PARTITE' },
  titles: { es: 'TITULOS', en: 'TITLES', it: 'TITOLI' },
  functions: { es: 'FUNCIONES', en: 'ROLE', it: 'FUNZIONI' },
  trophies: { es: 'LOGROS', en: 'HONOURS', it: 'TROFEI' },
  trophy: { es: 'Trofeo', en: 'Trophy', it: 'Trofeo' },
  until: { es: 'hasta', en: 'to', it: 'fino a' },
}

/* Texto por segmentos (resaltado / negrita / cifra / chico) */
export function Segs({ segs, accent }) {
  return segs.map((s, i) => {
    if (s.hl) return (
      <Box as="span" key={i} color={accent} fontFamily="mono" fontWeight="700" letterSpacing="0.03em">{s.t}</Box>
    )
    if (s.b) return <Box as="strong" key={i} fontWeight="600" color="brand.bone">{s.t}</Box>
    if (s.small) return <Box as="span" key={i} fontSize="0.78em" color="brand.gray" fontWeight="400">{s.t}</Box>
    return <Box as="span" key={i}>{s.t}</Box>
  })
}

export function SubTitle({ children, ...rest }) {
  return (
    <Flex as="h3" align="center" gap={3} fontFamily="heading" fontWeight="400"
      fontSize={{ base: '30px', lg: 'clamp(28px, 2.4vw, 40px)' }} letterSpacing="0.05em" lineHeight={1}
      color="brand.bone" mb={{ base: 5, lg: '3vh' }}
      _after={{ content: '""', flex: 1, minW: '24px', h: '1px', bg: 'brand.linea' }} {...rest}>
      {children}
    </Flex>
  )
}

export function Star({ color, size = '16px', mt = '0.35em' }) {
  return (
    <Box as="svg" viewBox="0 0 24 24" boxSize={size} flex="0 0 auto" mt={mt} aria-hidden="true">
      <path fill={color} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z" />
    </Box>
  )
}

/* Rombo de lista */
export function Diamond({ accent }) {
  return <Box boxSize="9px" mt="0.55em" border="1px solid" borderColor={accent} transform="rotate(45deg)" />
}

/* Tarjeta con estrella dorada + cifra + texto (Rendimiento) */
export function StarCard({ value, prefix = '', suffix = '', label, note, accent, countAttr = 'data-to', fit = false, ...rest }) {
  const count = { [countAttr]: value, 'data-prefix': prefix, 'data-suffix': suffix }
  return (
    <Flex align="center" gap={{ base: 3.5, lg: 4 }} px={{ base: 4, lg: '1.6vw' }} py={{ base: 3.5, lg: fit ? '1.6vh' : '2.2vh' }}
      border="1px solid" borderColor={`${accent}59`}
      sx={{ background: `linear-gradient(90deg, ${accent}2E, ${accent}0A)` }} {...rest}>
      <Star color={GOLD} size={fit ? 'clamp(22px, 3.2vh, 30px)' : '30px'} mt={0} />
      <Text fontFamily="heading" fontSize={{ base: '46px', lg: fit ? 'clamp(30px, min(3vw, 5.6vh), 56px)' : 'clamp(34px, 3.4vw, 56px)' }}
        lineHeight={0.85} color={accent} sx={{ fontVariantNumeric: 'tabular-nums' }} {...count}>
        {prefix}{value}{suffix}
      </Text>
      <Text fontFamily="mono" fontWeight="600" fontSize={{ base: '17px', lg: fit ? 'clamp(14px, min(1.2vw, 2.1vh), 20px)' : 'clamp(15px, 1.3vw, 20px)' }}
        lineHeight={1.15} color="brand.bone">
        {label}
        {note && <Box as="span" color="brand.gray" fontWeight="500" fontSize="0.88em">{' '}{note}</Box>}
      </Text>
    </Flex>
  )
}

/* Racha: texto + bloque de color con la cifra */
export function StreakCard({ item, accent, countAttr = 'data-to', ...rest }) {
  return (
    <Flex align="stretch" border="1px solid" borderColor="brand.linea" bg="rgba(11,17,24,0.7)" {...rest}>
      <Text flex={1} alignSelf="center" px={{ base: 4, lg: 5 }} py={4} fontFamily="mono" fontWeight="700"
        fontSize={{ base: '17px', lg: 'clamp(15px, 1.2vw, 20px)' }} lineHeight={1.15} letterSpacing="0.03em" color="brand.bone">
        <Segs segs={item.text} accent={accent} />
      </Text>
      <Flex direction="column" align="center" justify="center" bg={accent} color="white" px={{ base: 4, lg: 5 }} minW={{ base: '104px', lg: '118px' }}>
        <Text fontFamily="heading" fontSize={{ base: '62px', lg: '72px' }} lineHeight={0.85}
          sx={{ fontVariantNumeric: 'tabular-nums' }} {...{ [countAttr]: item.value }}>
          {item.value}
        </Text>
        <Text fontFamily="mono" fontWeight="600" fontSize="12px" letterSpacing="0.08em">{item.unit}</Text>
      </Flex>
    </Flex>
  )
}

/* Trofeo con cantidad y nombre */
export function Trophy({ tr, accent, alt, compact = false, ...rest }) {
  return (
    <Flex direction="column" align="center" gap={compact ? 1 : 1.5} textAlign="center" {...rest}>
      <Image src={tr.img} alt={alt} h={compact ? '74px' : { base: '110px', lg: 'clamp(90px, 13vh, 130px)' }} w="auto"
        filter="drop-shadow(0 12px 18px rgba(0,0,0,0.5))" />
      <Text fontFamily="heading" fontSize={compact ? '30px' : '38px'} lineHeight={0.85} color={accent}>
        <Box as="span" fontFamily="mono" fontWeight="700" fontSize="0.72em">x</Box>{tr.count}
      </Text>
      <Text fontFamily="mono" fontWeight="600" fontSize={compact ? '11px' : '13px'} lineHeight={compact ? 1.15 : 1.3}
        letterSpacing={compact ? '0.02em' : '0.04em'} color="brand.gray">
        {tr.name}
      </Text>
    </Flex>
  )
}

/* Hitos en grilla con borde (Logros) */
export function Achievements({ items, accent, columns, ...rest }) {
  return (
    <Grid as="ul" className="cc-achs" listStyleType="none" m={0} p={0} templateColumns={columns}
      borderTop="1px solid" borderLeft="1px solid" borderColor="brand.linea" {...rest}>
      {items.map((segs, i) => (
        <Flex as="li" key={i} className="cc-ach" direction="column" align="center" justify="center" gap={2} textAlign="center"
          bg="brand.ink" borderRight="1px solid" borderBottom="1px solid" borderColor="brand.linea"
          px={{ base: 2, lg: 4 }} py={{ base: 3.5, lg: '3vh' }}>
          <Box boxSize="8px" borderRadius="full" bg={accent} boxShadow={`0 0 0 3px ${accent}26`} />
          <Text fontSize={{ base: '14px', lg: 'clamp(14px, 1.05vw, 17px)' }} lineHeight={1.35} color="brand.bone" sx={{ textWrap: 'balance' }}>
            <Segs segs={segs} accent={accent} />
          </Text>
        </Flex>
      ))}
    </Grid>
  )
}

/* Foto con esquina redondeada y línea de color arriba */
export function ChapterPhoto({ src, alt, accent, mask = false, fill = false, ...rest }) {
  // fill: en escritorio la foto toma el alto de la columna de texto (recortada con cover)
  const fillProps = fill
    ? { position: { base: 'static', lg: 'absolute' }, inset: 0, h: { base: 'auto', lg: '100%' }, objectFit: 'cover', objectPosition: '50% 15%' }
    : { h: 'auto' }
  return (
    <Box position="relative" borderTopRightRadius="46px" overflow="hidden" {...rest}>
      <Box position="absolute" top={0} left={0} right="12%" h="1px" bg={accent} zIndex={1} />
      <Image loading="lazy" decoding="async" className="cc-reveal" src={src} alt={alt} w="100%" display="block" {...fillProps}
        sx={mask ? { maskImage: 'linear-gradient(180deg, #000 72%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, #000 72%, transparent)' } : undefined} />
    </Box>
  )
}
