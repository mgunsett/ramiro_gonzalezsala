import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Navbar from './components/UI/Navbar'
import Hero from './components/Hero/Hero'
import ProfileSection from './components/Profile/ProfileSection'
import CareerSection from './components/Career/CareerSection'
import DiversitySection from './components/Stats/DiversitySection'
import FormationSection from './components/Formation/FormationSection'
import StatsSection from './components/Stats/StatsSection'
import VideosSection from './components/Videos/VideosSection'
import GallerySection from './components/Gallery/GallerySection'
import PressSection from './components/Press/PressSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/UI/Footer'
import AdminPage from './pages/AdminPage'

function Landing() {
  return (
    <Box as="main" bg="brand.dark" overflowX="hidden">
      <Navbar />
      <Hero />
      <Box mt="-100vh" position="relative" zIndex={21}>
        <ProfileSection />
        <CareerSection />
        <DiversitySection />
        <FormationSection />
        <StatsSection />
        <VideosSection />
        <GallerySection />
        <PressSection />
        <ContactSection />
        <Footer />
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />} />
      <Route path="/admin"     element={<AdminPage />} />
    </Routes>
  )
}
