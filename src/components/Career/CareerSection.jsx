import { Box } from '@chakra-ui/react'
import CareerChapter from './CareerChapter'
import { careerData } from '../../data/careerData'

// TRAYECTORIA · un capítulo por club (ver data/careerData.js)
export default function CareerSection() {
  return (
    <Box as="section" id="trayectoria" aria-label="Trayectoria" position="relative" bg="brand.ink" borderTop="1px solid" borderColor="brand.linea">
      {careerData.map((club) => (
        <CareerChapter key={club.id} club={club} />
      ))}
    </Box>
  )
}
