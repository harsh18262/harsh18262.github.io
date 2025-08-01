import React, { useEffect, useState } from 'react'
import { ChevronDown, Download, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
// import { triggerVisitorAPI } from '../utils/visitorAPI';

const Hero: React.FC = () => {
  const [showCursor, setShowCursor] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // triggerVisitorAPI('RU4Jrp2a4QVvAbypiceL');
    const timer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  const asciiArt = `
 _   _                 _                         _ _               
| | | | __ _ _ __ ___| |____      ____ _ _ __ | | |__   __ _ _ __  
| |_| |/ _\` | '__/ __| '_ \\ \\ /\\ / / _\` | '__|| | '_ \\ / _\` | '_ \\ 
|  _  | (_| | |  \\__ \\ | | \\ V  V / (_| | |   | | | | | (_| | | | |
|_| |_|\\__,_|_|  |___/_| |_|\\_/\\_/ \\__,_|_|   |_|_| |_|\\__,_|_| |_|
`

  // Shorter ASCII art for mobile with "HARSH"
  const mobileAsciiArt = `
 _   _    _    ____  ____  _   _ 
| | | |  / \\  |  _ \\/ ___|| | | |
| |_| | / _ \\ | |_) \\___ \\| |_| |
|  _  |/ ___ \\|  _ < ___) |  _  |
|_| |_/_/   \\_\\_| \\_\\____/|_| |_|
`

  // Option 3: Technology Stack Focus
  const badges = [
    { text: 'AWS | EKS | Terraform', color: 'terminal-cyan' },
    { text: 'ArgoCD | Helm | GitOps', color: 'terminal-purple' },
    { text: 'Python | Bash | Powershell ', color: 'terminal-amber' }
  ]

  return (
    <section id="whoami" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 pt-16 overflow-x-hidden">
      <div className="text-center z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Mobile ASCII art - HARSH */}
          <div 
            className="sm:hidden w-full text-center cursor-pointer"
            onClick={() => {
              console.log('%c🎯 You found the ASCII secret!', 'color: #00FF00; font-size: 16px;');
              document.body.style.transform = 'rotateY(180deg)';
              setTimeout(() => {
                document.body.style.transform = '';
              }, 1000);
            }}
          >
            <pre className="text-terminal-green text-base xs:text-lg opacity-80 neon-glow whitespace-pre font-mono inline-block">
              {mobileAsciiArt}
            </pre>
          </div>
          
          {/* Desktop ASCII art - Harshwardhan */}
          <div 
            className="hidden sm:block w-full overflow-x-auto pb-2 cursor-pointer"
            onClick={() => {
              console.log('%c🎯 You found the ASCII secret!', 'color: #00FF00; font-size: 16px;');
              document.body.style.transform = 'rotateY(180deg)';
              setTimeout(() => {
                document.body.style.transform = '';
              }, 1000);
            }}
          >
            <pre className="text-terminal-green text-sm md:text-base lg:text-lg inline-block opacity-80 neon-glow whitespace-pre font-mono min-w-max">
              {asciiArt}
            </pre>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="terminal-window p-4 sm:p-6 max-w-full sm:max-w-xl md:max-w-2xl mx-auto hover-glow"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-[0.65rem] sm:text-xs text-gray-500 ml-2">terminal@portfolio</span>
          </div>
          
          <div className="text-left font-mono text-sm sm:text-base">
            <div className="terminal-prompt">whoami</div>
            {mounted ? (
              <div className="text-terminal-green">
                <TypeAnimation
                  sequence={[
                    'harshwardhan_mehrotra',
                    1000,
                    'harshwardhan_mehrotra\n$ echo $ROLE',
                    1000,
                    'harshwardhan_mehrotra\n$ echo $ROLE\nCloud Administrator | DevOps Engineer @ ZS Associates',
                    1000,
                  ]}
                  speed={50}
                  className="inline whitespace-pre-wrap"
                  cursor={false}
                  repeat={0}
                />
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
              </div>
            ) : (
              <pre className="text-terminal-green inline">harshwardhan_mehrotra<span className="opacity-0">_</span></pre>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-0"
        >
          {badges.map((badge, index) => (
            <div 
              key={index}
              className={`bg-${badge.color}/20 border border-${badge.color}/50 rounded px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-${badge.color}/30 transition-all hover-glow text-xs sm:text-sm`}
            >
              <span className={`text-${badge.color}`}>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Download CV Button - ENSURE PROPER Z-INDEX AND NO OVERLAYS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0 relative z-30"
        >
          <a
            href="/Harshwardhan_Mehrotra_Resume.pdf"
            download="Harshwardhan_Mehrotra_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 bg-terminal-green/20 border border-terminal-green/50 rounded px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-terminal-green/30 transition-all hover-glow group text-sm sm:text-base"
            onClick={(e) => {
              // Ensure the click goes through
              e.stopPropagation();
            }}
          >
            <Download className="w-5 h-5 text-terminal-green group-hover:animate-bounce" />
            <span className="text-terminal-green font-bold">Download Resume</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-terminal-cyan/20 border border-terminal-cyan/50 rounded px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-terminal-cyan/30 transition-all hover-glow group text-sm sm:text-base"
            onClick={(e) => {
              // Ensure the click goes through
              e.stopPropagation();
            }}
          >
            <Mail className="w-5 h-5 text-terminal-cyan" />
            <span className="text-terminal-cyan font-bold">Get in Touch</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12"
        >
          <ChevronDown className="w-8 h-8 mx-auto text-terminal-green/50 animate-bounce" />
        </motion.div>
      </div>

      {/* Floating kubectl commands - hidden on mobile for better UX */}
      {mounted && (
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none z-0">
          {['kubectl get nodes', 'terraform apply', 'helm install alterigo', 'docker build --multi-stage'].map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 20,
                delay: i * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute text-terminal-green/30 font-mono text-sm"
              style={{ top: `${20 + i * 20}%` }}
            >
              $ {cmd}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}


export default Hero