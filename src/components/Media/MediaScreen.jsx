import { useState, useEffect } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { KIND_LABEL } from '../../data/mediaData'

// ─────────────────────────────────────────────────────────────
// "Pantalla" del destacado, según el tipo de nota:
//  · video   → reproductor: miniatura de YouTube en alta + play; al tocar
//              play se reproduce ahí mismo (youtube-nocookie).
//  · article → ventana de navegador con el dominio del medio y el titular
//              en texto real grande sobre la imagen.
//  · post    → publicación de Instagram en un celular + titular al lado.
// Todas mantienen 16:10 para que el cambio entre notas no salte.
// ─────────────────────────────────────────────────────────────

const RATIO = { aspectRatio: '16 / 10' }

function Dots() {
  return (
    <Flex gap="6px" flex="0 0 auto" aria-hidden="true">
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <Box key={c} boxSize="10px" borderRadius="full" bg={c} />)}
    </Flex>
  )
}

function Headline({ children, size }) {
  return (
    <Text fontFamily="heading" fontWeight="400" lineHeight={0.95} letterSpacing="0.01em" color="brand.bone"
      fontSize={size || { base: '26px', md: '34px', lg: 'clamp(30px, 2.5vw, 46px)' }} sx={{ textWrap: 'balance' }}>
      {children}
    </Text>
  )
}

/* Miniatura de YouTube en alta con respaldo: maxres → hq → imagen local */
function YtThumb({ id, fallback, alt }) {
  const sources = [`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, fallback]
  const [i, setI] = useState(0)
  useEffect(() => setI(0), [id])
  return (
    <Image
      src={sources[i]}
      alt={alt}
      position="absolute" inset={0} w="100%" h="100%" objectFit="cover"
      onError={() => setI((n) => Math.min(n + 1, sources.length - 1))}
      // maxresdefault inexistente devuelve una imagen gris de 120px: la descartamos
      onLoad={(e) => { if (i === 0 && e.currentTarget.naturalWidth < 200) setI(1) }}
    />
  )
}

function VideoScreen({ item }) {
  const [playing, setPlaying] = useState(false)
  useEffect(() => setPlaying(false), [item])

  return (
    <Box position="relative" sx={RATIO} bg="black" overflow="hidden" border="1px solid" borderColor="brand.linea">
      {playing ? (
        <Box as="iframe"
          src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0`}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          position="absolute" inset={0} w="100%" h="100%" border={0}
        />
      ) : (
        <Box as="button" type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir: ${item.title}`}
          position="absolute" inset={0} w="100%" cursor="pointer" role="group">
          <YtThumb id={item.youtube} fallback={item.thumb} alt="" />
          <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(5,8,12,0.85) 0%, transparent 22%)" />
          <Flex position="absolute" left="50%" boxSize={{ base: '62px', lg: '84px' }} ml={{ base: '-31px', lg: '-42px' }}
            mt={{ base: '-31px', lg: '-42px' }} top="50%" borderRadius="full" bg="rgba(5,8,12,0.55)" border="1.5px solid"
            borderColor="brand.bone" align="center" justify="center" backdropFilter="blur(4px)"
            transition="transform 200ms cubic-bezier(0.23,1,0.32,1), background-color 200ms ease"
            sx={{ '@media (hover:hover) and (pointer:fine)': { '[role=group]:hover &': { transform: 'scale(1.06)', bg: 'brand.celeste' } } }}>
            <Box as="svg" viewBox="0 0 24 24" boxSize={{ base: '22px', lg: '30px' }} ml="4px"><path d="M6 4l14 8-14 8z" fill="#EEF3F7" /></Box>
          </Flex>
          {/* barra de reproductor */}
          <Box position="absolute" left={0} right={0} bottom={0} px={{ base: 4, lg: 6 }} pb={{ base: 3, lg: 4 }} textAlign="left">
            {/* la miniatura ya trae su propio titular: la pantalla queda limpia */}
            <Box h="3px" bg="whiteAlpha.300" position="relative">
              <Box position="absolute" left={0} top={0} bottom={0} w="18%" bg="brand.celeste" />
            </Box>
            <Flex mt={2} justify="space-between" fontFamily="mono" fontSize="12px" letterSpacing="0.1em" color="brand.gray">
              <span>{item.source.toUpperCase()}</span><span>▶ REPRODUCIR</span>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  )
}

function ArticleScreen({ item }) {
  return (
    <Box as="a" href={item.href} target="_blank" rel="noopener noreferrer" display="block"
      border="1px solid" borderColor="rgba(140,200,240,0.35)" borderRadius="10px" overflow="hidden" bg="#0E141B"
      boxShadow="0 30px 60px rgba(0,0,0,0.45)" role="group">
      {/* barra del navegador */}
      <Flex align="center" gap={3} px={3} h="36px" bg="#121A23" borderBottom="1px solid" borderColor="brand.linea">
        <Dots />
        <Flex flex={1} minW={0} align="center" gap={2} h="22px" px={3} borderRadius="full" bg="#05080C"
          fontFamily="mono" fontSize="12px" color="brand.gray" letterSpacing="0.04em">
          <Box as="svg" viewBox="0 0 24 24" boxSize="11px" flex="0 0 auto" aria-hidden="true">
            <path d="M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z" fill="none" stroke="currentColor" strokeWidth="2" />
          </Box>
          <Text as="span" noOfLines={1}>{item.source}</Text>
        </Flex>
      </Flex>
      {/* página */}
      <Box position="relative" sx={{ aspectRatio: '16 / 9.4' }} overflow="hidden">
        <Image src={item.thumb} alt="" position="absolute" inset={0} w="100%" h="100%" objectFit="cover"
          filter="blur(2px) saturate(1.1)" transform="scale(1.06)"
          transition="transform 600ms cubic-bezier(0.23,1,0.32,1)"
          sx={{ '@media (hover:hover) and (pointer:fine)': { '[role=group]:hover &': { transform: 'scale(1.1)' } } }} />
        <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(5,8,12,0.96) 30%, rgba(5,8,12,0.55) 70%, rgba(5,8,12,0.3))" />
        <Flex position="absolute" inset={0} direction="column" justify="flex-end" gap={3} p={{ base: 4, lg: 7 }}>
          <Text fontFamily="mono" fontWeight="700" fontSize="12px" letterSpacing="0.16em" color="brand.celeste">
            {item.source.toUpperCase()}
          </Text>
          <Headline>{item.title}</Headline>
          <Box w="64px" h="2px" bg="brand.celeste" />
        </Flex>
      </Box>
    </Box>
  )
}

function PostScreen({ item }) {
  return (
    <Box as="a" href={item.href} target="_blank" rel="noopener noreferrer" display="block" position="relative"
      sx={RATIO} overflow="hidden" border="1px solid" borderColor="brand.linea" role="group"
      bg="radial-gradient(120% 120% at 0% 100%, rgba(221,42,123,0.28), transparent 50%), radial-gradient(120% 120% at 100% 0%, rgba(81,91,212,0.3), transparent 55%), #0B1118">
      <Flex position="absolute" inset={0} align="center" gap={{ base: 4, lg: '3vw' }} px={{ base: 4, lg: '3vw' }}>
        {/* celular */}
        <Box flex="0 0 auto" h="88%" sx={{ aspectRatio: '9 / 17.5' }} bg="#0A0A0A" border="2px solid #555" borderRadius="22px"
          p="5px" boxShadow="0 24px 50px rgba(0,0,0,0.55)" transform="rotate(-3deg)"
          transition="transform 400ms cubic-bezier(0.23,1,0.32,1)"
          sx={{ '@media (hover:hover) and (pointer:fine)': { '[role=group]:hover &': { transform: 'rotate(0deg) translateY(-6px)' } } }}>
          <Image src={item.screen || item.thumb} alt="" w="100%" h="100%" objectFit="cover" objectPosition="50% 0" borderRadius="16px" />
        </Box>
        <Flex direction="column" gap={3} minW={0}>
          <Flex align="center" gap={2} fontFamily="mono" fontWeight="700" fontSize="12px" letterSpacing="0.16em" color="brand.celeste">
            <Box as="svg" viewBox="0 0 24 24" boxSize="16px" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            </Box>
            INSTAGRAM
          </Flex>
          <Headline>{item.title}</Headline>
        </Flex>
      </Flex>
    </Box>
  )
}

export default function MediaScreen({ item }) {
  if (item.kind === 'video' && item.youtube) return <VideoScreen item={item} />
  if (item.kind === 'post') return <PostScreen item={item} />
  return <ArticleScreen item={item} />
}

export function KindTag({ kind }) {
  const icon = {
    video: <path d="M7 5l12 7-12 7z" fill="currentColor" />,
    article: <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" strokeWidth="2" />,
    post: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /></>,
  }[kind]
  return (
    <Flex as="span" align="center" gap={1.5} fontFamily="mono" fontWeight="700" fontSize="12px" letterSpacing="0.14em" color="brand.celeste">
      <Box as="svg" viewBox="0 0 24 24" boxSize="14px" aria-hidden="true">{icon}</Box>
      {KIND_LABEL[kind]}
    </Flex>
  )
}
