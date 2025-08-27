import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Homelab from '@/components/Homelab'
import Achievements from '@/components/Achievements'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Metrics from '@/components/Metrics'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import MatrixBackground from '@/components/MatrixBackground'
import Footer from '@/components/Footer'
import TerminalGame from '@/components/EasterEgg/TerminalGame'
import SecretElements from '@/components/EasterEgg/SecretElements'
import ResponsiveEasterEggs from '@/components/EasterEgg/ResponsiveEasterEggs'
import VisitorTracker from '@/components/StaticVisitorTracker';

export default function Home() {
  // Add source code comment
  if (typeof window !== 'undefined') {
    console.log('<!-- Congratulations, you view source! Here\'s a secret: /humans.txt -->')
  }

  return (
    <>
      <MatrixBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Homelab />
        <Achievements />
        <Certifications />
        <Projects />
        <Metrics />
        <Contact />
      </main>
      <Footer />
      <TerminalGame />
      <SecretElements />
      <ResponsiveEasterEggs />
      <VisitorTracker />

    </>
  )
}
