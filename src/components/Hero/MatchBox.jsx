import { useState } from 'react'
import { Box, Flex, Text, Image, HStack, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const MotionBox = motion(Box)

// ─────────────────────────────────────────────────────────────
// MatchBox · último resultado + próximo partido
// Pestaña lateral del Hero en el lenguaje "Pizarra":
// borde celeste, texto vertical, nodo activo. Los datos vienen
// de Firestore (useMatches) y se cargan desde /admin.
// ─────────────────────────────────────────────────────────────

function Shield({ src, name, size = '36px' }) {
  if (src) return <Image src={src} alt={name} boxSize={size} objectFit="contain" />
  return (
    <Flex
      boxSize={size}
      align="center"
      justify="center"
      border="1px solid"
      borderColor="brand.linea"
      borderRadius="full"
    >
      <Text fontFamily="heading" fontSize="11px" color="brand.celesteLight" lineHeight={1} pt="2px">
        {name?.slice(0, 3).toUpperCase()}
      </Text>
    </Flex>
  )
}

function MatchSlot({ data, label, accent }) {
  const { home, away, homeScore, awayScore, date, stadium, competition } = data
  const played = homeScore !== null && awayScore !== null

  return (
    <Box>
      <Flex align="center" gap={2} mb={3}>
        <Box boxSize="7px" borderRadius="full" bg={accent ? 'brand.celeste' : 'transparent'}
          border="1px solid" borderColor="brand.celeste"
          boxShadow={accent ? '0 0 10px rgba(76,184,242,0.7)' : 'none'} />
        <Text fontFamily="mono" fontSize="12px" fontWeight="700" letterSpacing="0.12em"
          textTransform="uppercase" color={accent ? 'brand.celeste' : 'brand.gray'}>
          {label}
        </Text>
      </Flex>

      <Flex align="center" justify="space-between" gap={2}>
        <VStack spacing={1.5} align="center" flex={1} minW={0}>
          <Shield src={home.shield} name={home.name} />
          <Text fontFamily="mono" fontSize="11px" fontWeight="600" color="brand.bone" textTransform="uppercase"
            letterSpacing="0.08em" textAlign="center" noOfLines={1}>
            {home.name}
          </Text>
        </VStack>

        <Box textAlign="center" px={1}>
          {played ? (
            <HStack spacing={1.5} justify="center">
              <Text fontFamily="heading" fontSize="34px" color="brand.bone" lineHeight={1}>{homeScore}</Text>
              <Text fontFamily="heading" fontSize="18px" color="brand.celeste" lineHeight={1}>–</Text>
              <Text fontFamily="heading" fontSize="34px" color="brand.bone" lineHeight={1}>{awayScore}</Text>
            </HStack>
          ) : (
            <Text fontFamily="heading" fontSize="26px" color="brand.celeste" letterSpacing="0.06em" lineHeight={1}>
              VS
            </Text>
          )}
          {competition && (
            <Text fontFamily="mono" fontSize="10px" color="brand.gray" letterSpacing="0.08em"
              textTransform="uppercase" mt={1}>
              {competition}
            </Text>
          )}
        </Box>

        <VStack spacing={1.5} align="center" flex={1} minW={0}>
          <Shield src={away.shield} name={away.name} />
          <Text fontFamily="mono" fontSize="11px" fontWeight="600" color="brand.bone" textTransform="uppercase"
            letterSpacing="0.08em" textAlign="center" noOfLines={1}>
            {away.name}
          </Text>
        </VStack>
      </Flex>

      <Flex mt={3} justify="space-between" gap={3} fontFamily="mono" fontSize="11px" color="brand.gray" letterSpacing="0.06em">
        <Text sx={{ fontVariantNumeric: 'tabular-nums' }}>{date}</Text>
        {stadium && <Text textAlign="right" noOfLines={1}>{stadium}</Text>}
      </Flex>
    </Box>
  )
}

/* Pestaña cerrada: texto vertical + mini marcador del último partido */
function Handle({ last, open, onClick }) {
  const reduce = useReducedMotion()
  const played = last && last.homeScore !== null && last.awayScore !== null

  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="hero-matches-card"
      aria-label={open ? 'Cerrar partidos' : 'Ver último y próximo partido'}
      position="relative"
      minH={{ base: '170px', lg: '34vh' }}
      py={{ base: 4, lg: '2vh' }}
      px={{ base: 2, lg: 3 }}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      bg="whiteAlpha.100"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="brand.celeste"
      borderRightWidth={0}
      borderLeftRadius="10px"
      color="brand.celeste"
      cursor="pointer"
      transition="background-color 0.2s ease, transform 0.14s ease-out"
      _active={{ transform: 'scale(0.97)' }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.bone', outlineOffset: '2px' }}
      sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { bg: 'whiteAlpha.200' } } }}
      _before={{
        content: '""', position: 'absolute', top: '10px', right: 0,
        w: '2px', h: '28px', bg: 'brand.celeste',
      }}
    >
      <Text
        fontFamily="heading"
        fontSize={{ base: '15px', lg: 'clamp(15px, 1.4vw, 22px)' }}
        letterSpacing="0.2em"
        lineHeight={1}
        sx={{ writingMode: 'vertical-rl' }}
      >
        PARTIDOS
      </Text>

      {played && !open && (
        <VStack spacing={1} align="center">
          <Text fontFamily="heading" fontSize="18px" color="brand.bone" lineHeight={1}>{last.homeScore}</Text>
          <Box w="10px" h="1px" bg="brand.celeste" />
          <Text fontFamily="heading" fontSize="18px" color="brand.bone" lineHeight={1}>{last.awayScore}</Text>
        </VStack>
      )}

      <MotionBox
        as="span"
        aria-hidden="true"
        display="block"
        fontSize="18px"
        lineHeight={1}
        animate={open ? { rotate: 180 } : reduce ? { rotate: 0 } : { rotate: 0, x: [0, -4, 0] }}
        transition={open || reduce ? { duration: 0.3 } : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      >
        ‹
      </MotionBox>
    </Box>
  )
}

export function MatchBox({ last, next }) {
  const [open, setOpen] = useState(false)
  if (!last && !next) return null

  return (
    <Flex className="hero-matches" align="stretch">
      <Handle last={last} open={open} onClick={() => setOpen((o) => !o)} />

      <AnimatePresence initial={false}>
        {open && (
          <MotionBox
            id="hero-matches-card"
            key="card"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            overflow="hidden"
            bg="rgba(5,8,12,0.86)"
            backdropFilter="blur(12px)"
            borderY="1px solid"
            borderColor="brand.linea"
          >
            <VStack w={{ base: '270px', lg: '300px' }} spacing={5} align="stretch" px={5} py={5}>
              {last && <MatchSlot data={last} label="Último resultado" accent />}
              {last && next && <Box h="1px" bg="brand.linea" />}
              {next && <MatchSlot data={next} label="Próximo partido" />}
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default MatchBox
