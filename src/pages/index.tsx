import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Homelab from '@/components/Homelab'
import Achievements from '@/components/Achievements'
import Projects from '@/components/Projects'
import Metrics from '@/components/Metrics'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import MatrixBackground from '@/components/MatrixBackground'
import Footer from '@/components/Footer'

export default function Home() {
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
        <Projects />
        <Metrics />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
