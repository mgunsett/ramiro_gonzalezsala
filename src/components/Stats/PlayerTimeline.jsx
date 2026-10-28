import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'

// ─────────────────────────────────────────────────────────────
// Trayectoria como jugador
//  · Escritorio: línea en "S" de la placa (6 clubes arriba, 7 abajo).
//  · Móvil: línea vertical.
// Cada parada: escudo + club / año + bandera, alternando arriba y abajo.
// ─────────────────────────────────────────────────────────────

const ROW_H = 250 // alto de cada fila (px)
const GAP = 56 // separación entre filas
const MID1 = ROW_H / 2
const RET = ROW_H + GAP / 2
const MID2 = ROW_H + GAP + ROW_H / 2
const TOTAL = ROW_H * 2 + GAP

export function Flag({ country, size = 'md' }) {
  const bg = country === 'Italia'
    ? 'linear-gradient(90deg,#009246 33.3%,#fff 33.3% 66.6%,#CE2B37 66.6%)'
    : 'linear-gradient(#74ACDF 33.3%,#fff 33.3% 66.6%,#74ACDF 66.6%)'
  return (
    <Box as="span" role="img" aria-label={country} display="inline-block" flex="0 0 auto"
      w={size === 'sm' ? '18px' : '22px'} h={size === 'sm' ? '12px' : '14px'} borderRadius="2px"
      bg={bg} boxShadow="0 0 0 1px rgba(255,255,255,0.15)" />
  )
}

function ClubBlock({ c }) {
  return (
    <Flex direction="column" align="center" gap={2}>
      <Image src={c.crest} alt={`Escudo de ${c.club}`} h="44px" w="auto" maxW="56px" objectFit="contain"
        filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))" />
      <Text fontFamily="heading" fontSize="clamp(16px, 1.35vw, 22px)" letterSpacing="0.03em" lineHeight={0.95} textAlign="center">
        {c.club}
      </Text>
    </Flex>
  )
}

function YearBlock({ c }) {
  return (
    <Flex direction="column" align="center" gap={1.5}>
      <Text fontFamily="heading" fontSize="clamp(24px, 2vw, 32px)" color="brand.celeste" lineHeight={0.9}
        sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {c.year}
      </Text>
      <Flag country={c.country} />
    </Flex>
  )
}

function Stop({ c, i }) {
  const clubUp = i % 2 === 0
  return (
    <Box className="pt-stop" position="relative" h="100%" as="li" listStyleType="none">
      <Box position="absolute" left="50%" bottom="calc(50% + 18px)" transform="translateX(-50%)" w="150%">
        {clubUp ? <ClubBlock c={c} /> : <YearBlock c={c} />}
      </Box>
      <Box position="absolute" top="50%" left="50%" boxSize="14px" mt="-7px" ml="-7px" borderRadius="full"
        bg="brand.celeste" boxShadow="0 0 0 5px rgba(76,184,242,0.18), 0 0 14px rgba(76,184,242,0.6)" />
      <Box position="absolute" left="50%" top="calc(50% + 18px)" transform="translateX(-50%)" w="150%">
        {clubUp ? <YearBlock c={c} /> : <ClubBlock c={c} />}
      </Box>
    </Box>
  )
}

export default function PlayerTimeline({ clubs }) {
  const row1 = clubs.slice(0, 6)
  const row2 = clubs.slice(6)

  return (
    <>
      {/* Escritorio: línea en "S" */}
      <Box display={{ base: 'none', lg: 'block' }} position="relative" maxW="1200px" mx="auto" h={`${TOTAL}px`}>
        <Box as="svg" className="pt-path-svg" position="absolute" inset={0} w="100%" h="100%"
          viewBox={`0 0 100 ${TOTAL}`} preserveAspectRatio="none" aria-hidden="true" overflow="visible">
          <path className="pt-path" d={`M0 ${MID1} H99.6 V${RET} H0.4 V${MID2} H100`} pathLength="1"
            fill="none" stroke="#4CB8F2" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </Box>
        <Grid as="ol" m={0} p={0} templateColumns="repeat(6, 1fr)" h={`${ROW_H}px`} position="relative">
          {row1.map((c, i) => <Stop key={`${c.club}-${c.year}`} c={c} i={i} />)}
        </Grid>
        <Grid as="ol" m={0} p={0} templateColumns="repeat(7, 1fr)" h={`${ROW_H}px`} mt={`${GAP}px`} position="relative">
          {row2.map((c, i) => <Stop key={`${c.club}-${c.year}`} c={c} i={i} />)}
        </Grid>
      </Box>

      {/* Móvil: línea vertical */}
      <Box as="ol" display={{ base: 'block', lg: 'none' }} m={0} mt={2} ml="7px" pl={7} borderLeft="1px solid" borderColor="brand.celeste">
        {clubs.map((c) => (
          <Flex as="li" key={`${c.club}-${c.year}`} className="pt-row" listStyleType="none" position="relative" align="center" gap={4} py={3}
            _before={{
              content: '""', position: 'absolute', left: '-35px', top: '50%', mt: '-6.5px', boxSize: '13px', borderRadius: 'full',
              bg: 'brand.celeste', boxShadow: '0 0 0 4px rgba(76,184,242,0.18)',
            }}>
            <Image src={c.crest} alt={`Escudo de ${c.club}`} h="40px" w="44px" objectFit="contain" flex="0 0 auto" />
            <Box>
              <Flex align="center" gap={2}>
                <Text fontFamily="heading" fontSize="24px" color="brand.celeste" lineHeight={1}>{c.year}</Text>
                <Flag country={c.country} size="sm" />
              </Flex>
              <Text fontFamily="heading" fontSize="22px" letterSpacing="0.03em" lineHeight={1}>{c.club}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </>
  )
}
