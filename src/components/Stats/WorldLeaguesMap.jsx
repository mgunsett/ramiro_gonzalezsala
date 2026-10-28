import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import worldMap from '../../data/worldMap.json'

// ─────────────────────────────────────────────────────────────
// Mapa vectorial (Natural Earth, 1000×500) con los países de las ligas
// en celeste. En escritorio, las ligas rodean el mapa unidas por líneas
// (como en la placa); en móvil, el mapa va solo y las ligas en etiquetas.
// ─────────────────────────────────────────────────────────────

const BW = 158 // ancho de insignia lateral
const BWB = 128 // ancho de insignia inferior
const BH = 38

function badgeGeom(l) {
  if (l.side === 'left') return { cx: -100, cy: 32 + l.slot * 84, w: BW, anchor: [-100 + BW / 2, 32 + l.slot * 84] }
  if (l.side === 'right') return { cx: 1100, cy: 40 + l.slot * 96, w: BW, anchor: [1100 - BW / 2, 40 + l.slot * 96] }
  const cx = 290 + l.slot * 136
  return { cx, cy: 560, w: BWB, anchor: [cx, 560 - BH / 2] }
}

export default function WorldLeaguesMap({ leagues }) {
  const desktop = useBreakpointValue({ base: false, lg: true }, { ssr: false })
  // escritorio: viewBox ajustado a las insignias (mapa más grande)
  const viewBox = desktop ? '-182 -4 1364 590' : '0 0 1000 500'
  const { base, hl, pins } = worldMap

  return (
    <Box>
      <Box
        as="svg"
        className="wm-svg"
        viewBox={viewBox}
        w="100%"
        h="auto"
        display="block"
        overflow="visible"
        role="img"
        aria-label={`Mapa con las ligas de los jugadores dirigidos: ${leagues.map((l) => l.name).join(', ')}`}
      >
        <path d={base} fill="#1A2633" stroke="#05080C" strokeWidth="0.5" />

        {/* Líneas liga → país (detrás de los países) */}
        {desktop && leagues.map((l) => {
          const g = badgeGeom(l)
          const [px, py] = pins[l.code]
          return (
            <path key={`ln-${l.code}`} className="wm-lead" d={`M${g.anchor[0]} ${g.anchor[1]} L${px} ${py}`}
              fill="none" stroke="#4CB8F2" strokeWidth="1" opacity="0.8" />
          )
        })}

        {leagues.map((l) => (
          <path key={l.code} className="wm-hl" d={hl[l.code]} fill="#4CB8F2" stroke="#05080C" strokeWidth="0.5">
            <title>{l.name}</title>
          </path>
        ))}

        {leagues.map((l) => {
          const [x, y] = pins[l.code]
          return (
            <g key={`pin-${l.code}`}>
              <circle className="wm-ring" cx={x} cy={y} r="5" fill="none" stroke="#4CB8F2" strokeWidth="1.2" />
              <circle cx={x} cy={y} r="2.6" fill="#EEF3F7" />
            </g>
          )
        })}

        {desktop && leagues.map((l) => {
          const g = badgeGeom(l)
          return (
            <g key={`bd-${l.code}`} className="wm-badge">
              <rect x={g.cx - g.w / 2} y={g.cy - BH / 2} width={g.w} height={BH} rx="3"
                fill="#0B1118" stroke="rgba(140,200,240,0.7)" strokeWidth="1" />
              <text x={g.cx} y={g.cy} textAnchor="middle" dominantBaseline="central" fill="#EEF3F7"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '0.04em' }}>
                {l.name}
              </text>
            </g>
          )
        })}
      </Box>

      {/* Móvil: ligas como etiquetas */}
      <Flex display={{ base: 'flex', lg: 'none' }} wrap="wrap" justify="center" gap={2} mt={5}>
        {leagues.map((l) => (
          <Text key={l.code} as="span" px={3} py={1.5} border="1px solid" borderColor="brand.linea" borderRadius="full"
            fontFamily="mono" fontWeight="600" fontSize="14px" color="brand.bone">
            {l.name}
          </Text>
        ))}
      </Flex>
    </Box>
  )
}
