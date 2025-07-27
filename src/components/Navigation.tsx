import React, { useState, useEffect } from 'react'
import { Terminal, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const sections = [
    { name: 'whoami', label: 'Home' },
    { name: 'profile', label: 'About' },
    { name: 'skills', label: 'Skills' },
    { name: 'homelab', label: 'Homelab' },
    { name: 'achievements', label: 'Career' },
    { name: 'projects', label: 'Projects' },
    { name: 'metrics', label: 'Impact' },
    { name: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Find which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 3 // Adjusted offset for better detection
      
      // Check if we're at the bottom of the page (for contact section)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      
      if (isAtBottom) {
        setActiveSection(sections.length - 1) // Set to contact section
        return
      }
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].name)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index].name)
    if (section) {
      const yOffset = -80 // Offset for fixed header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="border-b border-terminal-green/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-terminal-green neon-glow" />
              <span className="text-terminal-green font-bold hidden sm:inline">
                harshwardhan@devops:~$
              </span>
              <span className="text-terminal-green font-bold sm:hidden">hm@devops:~$</span>
              <span className="animate-typing-cursor">_</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section.name}
                  onClick={() => scrollToSection(index)}
                  className={`relative hover:text-terminal-cyan transition-colors duration-300 ${
                    activeSection === index ? 'text-terminal-cyan' : 'text-terminal-green'
                  }`}
                >
                  <span className={activeSection === index ? 'neon-glow' : ''}>
                    ./{section.name}
                  </span>
                  {activeSection === index && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terminal-cyan"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-terminal-green hover:text-terminal-cyan transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-dark-bg/95 backdrop-blur-md border-b border-terminal-green/30"
      >
        <div className="px-4 py-2 space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.name}
              onClick={() => scrollToSection(index)}
              className={`block w-full text-left py-2 px-3 rounded hover:bg-terminal-green/10 transition-colors ${
                activeSection === index ? 'text-terminal-cyan bg-terminal-green/10' : 'text-terminal-green'
              }`}
            >
              ./{section.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navigation
