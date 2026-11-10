import { Box, VisuallyHidden } from '@chakra-ui/react'
import CareerChapter from './CareerChapter'
import { careerData } from '../../data/careerData'
import { useT, useLocalized } from '../../i18n/LanguageContext'

const LABEL = { es: 'Trayectoria', en: 'Career', it: 'Carriera' }

// TRAYECTORIA · un capítulo por club (ver data/careerData.js)
export default function CareerSection() {
  const t = useT()
  const clubs = useLocalized(careerData)
  return (
    <Box as="section" id="trayectoria" aria-label={t(LABEL)} position="relative" bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      <VisuallyHidden as="h2">{t(LABEL)}</VisuallyHidden>
      {clubs.map((club) => (
        <CareerChapter key={club.id} club={club} />
      ))}
    </Box>
  )
}
