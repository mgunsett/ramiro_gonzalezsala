import { Box } from '@chakra-ui/react'
import PlayerTimeline from './PlayerTimeline'
import { playerCareer as playerCareerData } from '../../data/statsData'
import { useLocalized } from '../../i18n/LanguageContext'

// ─────────────────────────────────────────────────────────────
// TRAYECTORIA COMO JUGADOR · sección propia (link "Jugador" del navbar)
//  · Línea deslizante: riel horizontal fijado en desktop, vertical en móvil.
// ─────────────────────────────────────────────────────────────

export default function PlayerCareerSection() {
  const { title, clubs } = useLocalized(playerCareerData)
  return (
    <Box as="section" id="jugador" aria-label={title} bg="brand.ink">
      <PlayerTimeline title={title} clubs={clubs} />
    </Box>
  )
}
