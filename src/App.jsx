import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Navbar from './components/UI/Navbar'
import Hero from './components/Hero/Hero'
import ProfileSection from './components/Profile/ProfileSection'
import CareerSection from './components/Career/CareerSection'
import DiversitySection from './components/Stats/DiversitySection'
import FormationSection from './components/Formation/FormationSection'
import PlayerCareerSection from './components/Stats/PlayerCareerSection'
import MediaSection from './components/Media/MediaSection'
import ContactSection from './components/Contact/ContactSection'
import Footer from './components/UI/Footer'
import { Seo } from './components/SEO/Seo'

// El panel admin (Auth + Storage) no se descarga en la landing pública
const AdminPage = lazy(() => import('./pages/AdminPage'))

function Landing() {
  return (
    <Box bg="brand.ink" overflowX="hidden">
      <Seo path="/" />
      <Navbar />
      <Box as="main">
        <Hero />
        <Box mt="-100vh" position="relative" zIndex={21}>
          <ProfileSection />
          <CareerSection />
          <DiversitySection />
          <FormationSection />
          <PlayerCareerSection />
          <MediaSection />
          <ContactSection />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

function Admin() {
  return (
    <>
      <Seo path="/admin" title="Admin | Ramiro Gonzalez Sales" noindex />
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />} />
      <Route path="/admin"     element={<Admin />} />
    </Routes>
  )
}
