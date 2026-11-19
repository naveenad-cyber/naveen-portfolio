import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import ExperienceSection from '@/components/Experience'
import TrainingPortfolio from '@/components/TrainingPortfolio'
import Testimonials from '@/components/Testimonials'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import Achievements from '@/components/Achievements'
import TechnicalFoundations from '@/components/TechnicalFoundations'
import PhishQuiz from '@/components/PhishQuiz'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { testimonials } from '@/data/testimonials'
import { getCertificateImages, getFeedbackScreenshots, getTrainingGallery } from '@/lib/media'

export default function Home() {
  const { images, categories } = getTrainingGallery()
  const screenshots = getFeedbackScreenshots()
  const certImages = getCertificateImages()

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-accent px-5 py-3 text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <ExperienceSection />
        <TrainingPortfolio images={images} categories={categories} />
        <Certifications images={certImages} />
        <Testimonials quotes={testimonials} screenshots={screenshots} />
        <Skills />
        <Achievements />
        <TechnicalFoundations />
        <PhishQuiz />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
