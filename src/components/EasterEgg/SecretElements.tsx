import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SecretElements: React.FC = () => {
  const [clickPattern, setClickPattern] = useState<string[]>([])
  const [glitchMode, setGlitchMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navClickSequence, setNavClickSequence] = useState<string[]>([])

  // Click pattern detection for logo
  useEffect(() => {
    const targetPattern = ['logo', 'logo', 'logo']
    
    if (clickPattern.length === 3 && clickPattern.every(p => p === 'logo')) {
      // Unlock achievement
      const event = new CustomEvent('unlockAchievement', { detail: 'logo_master' });
      window.dispatchEvent(event);
      setGlitchMode(true);
      setTimeout(() => setGlitchMode(false), 5000);
      setClickPattern([]);
    }
  }, [clickPattern])

  // URL Parameters Easter Eggs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    
    if (params.get('debug') === 'true') {
      console.log('%c🐛 Debug Mode Activated!', 'color: #FF00FF; font-size: 20px;')
      // Add debug overlay
      const debugOverlay = document.createElement('div')
      debugOverlay.id = 'debug-overlay'
      debugOverlay.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: #00FF00;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        border: 1px solid #00FF00;
      `
      debugOverlay.innerHTML = `
        <div>FPS: 60</div>
        <div>Memory: ${(performance as any).memory?.usedJSHeapSize ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) + 'MB' : 'N/A'}</div>
        <div>Load Time: ${Math.round(performance.now())}ms</div>
      `
      document.body.appendChild(debugOverlay)
    }
    
    if (params.get('theme') === 'matrix') {
      const event = new CustomEvent('matrixIntensify')
      window.dispatchEvent(event)
      document.body.style.filter = 'hue-rotate(120deg)'
    }
    
    if (params.get('hire') === 'please') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        // Show special message
        const message = document.createElement('div')
        message.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #000;
          border: 2px solid #00FF00;
          padding: 20px;
          z-index: 9999;
          font-family: monospace;
          color: #00FF00;
        `
        message.textContent = 'I appreciate your enthusiasm! Let\'s talk! 🚀'
        document.body.appendChild(message)
        setTimeout(() => message.remove(), 3000)
      }, 1000)
    }
    
    if (params.get('admin') === 'true') {
      // Show fake admin panel
      const adminPanel = document.createElement('div')
      adminPanel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        border: 2px solid #FF0000;
        padding: 30px;
        z-index: 9999;
        font-family: monospace;
        color: #FF0000;
      `
      adminPanel.innerHTML = `
        <h2>⚠️ ADMIN PANEL ⚠️</h2>
        <p>Just kidding! Nice try though 😄</p>
        <button onclick="this.parentElement.remove()" style="background: #FF0000; color: #000; border: none; padding: 5px 10px; cursor: pointer;">CLOSE</button>
      `
      document.body.appendChild(adminPanel)
    }
  }, [])

  // Keyboard Shortcuts
  useEffect(() => {
    let keysPressed: Set<string> = new Set()

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.add(e.key)

      // Ctrl+Shift+D - Ultra Dark Mode
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        document.body.style.filter = document.body.style.filter === 'brightness(0.3)' ? '' : 'brightness(0.3)'
      }

      // Ctrl+Shift+M - Crazy Metrics
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        const metrics = document.querySelectorAll('[data-metric="true"]')
        metrics.forEach(metric => {
          const valueElement = metric.querySelector('.text-2xl')
          if (valueElement) {
            const original = valueElement.textContent || ''
            let count = 0
            const interval = setInterval(() => {
              count += Math.floor(Math.random() * 100)
              valueElement.textContent = count.toString() + '%'
            }, 100)
            setTimeout(() => {
              clearInterval(interval)
              valueElement.textContent = original
            }, 3000)
          }
        })
      }

      // Ctrl+Shift+H - HIRE ME flash
      if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        const elements = document.querySelectorAll('h1, h2, h3, p')
        const originalText: Map<Element, string> = new Map()
        elements.forEach(el => {
          originalText.set(el, el.textContent || '')
          el.textContent = 'HIRE ME!'
        })
        setTimeout(() => {
          elements.forEach(el => {
            el.textContent = originalText.get(el) || ''
          })
        }, 1000)
      }

      // Alt+F4 Easter Egg
      if (e.altKey && e.key === 'F4') {
        e.preventDefault()
        alert('Nice try! This portfolio has 99.9% uptime 😄')
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Check if reached 100%
      if (progress >= 99 && !localStorage.getItem('portfolio-full-scroll')) {
        localStorage.setItem('portfolio-full-scroll', 'true')
        const event = new CustomEvent('unlockAchievement', { detail: 'fullstack' })
        window.dispatchEvent(event)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Time-based Easter Eggs
  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const hour = now.getHours()
      const day = now.getDay()
      
      // 3 AM check
      if (hour === 3) {
        const message = document.createElement('div')
        message.id = 'time-message'
        message.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          border: 1px solid #FFB000;
          padding: 15px 25px;
          border-radius: 8px;
          font-family: monospace;
          color: #FFB000;
          z-index: 9999;
          animation: slide-up 0.5s ease-out;
        `
        message.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">☕</span>
            <div>
              <div style="font-weight: bold;">You're up late!</div>
              <div style="font-size: 12px; opacity: 0.8;">Here's some virtual coffee to keep you going!</div>
            </div>
          </div>
        `
        if (!document.getElementById('time-message')) {
          document.body.appendChild(message)
          setTimeout(() => message.remove(), 10000)
        }
      }
      
      // Friday 5 PM
      if (day === 5 && hour === 17) {
        console.log('%c🎉 Happy Friday! Time to deploy... just kidding! 🎉', 'color: #00FF00; font-size: 16px;')
      }
      
      // Weekend check
      if (day === 0 || day === 6) {
        const banner = document.createElement('div')
        banner.id = 'weekend-banner'
        banner.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          background: rgba(0,0,0,0.9);
          border: 1px solid #BD93F9;
          padding: 10px 20px;
          border-radius: 8px;
          font-family: monospace;
          color: #BD93F9;
          font-size: 12px;
          z-index: 9999;
        `
        banner.textContent = 'Even my portfolio takes weekends off... but here we are! 🚀'
        if (!document.getElementById('weekend-banner')) {
          document.body.appendChild(banner)
          setTimeout(() => banner.remove(), 15000)
        }
      }
      
      // Midnight mode
      if (hour === 0) {
        document.body.style.filter = 'brightness(0.7)'
        setTimeout(() => {
          document.body.style.filter = ''
        }, 3600000) // Reset after an hour
      }
    }
    
    checkTime()
    const interval = setInterval(checkTime, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  // Console Easter Eggs
  useEffect(() => {
    console.log('%c🎮 Easter Egg Hunt Active! 🎮', 'color: #00FF00; font-size: 20px; font-weight: bold;');
    console.log('%cType secretCommands() in console for hints', 'color: #00FFFF; font-size: 14px;');
    console.log('%cOr try: revealSecrets()', 'color: #FFB000; font-size: 14px;');

    // Add global functions
    (window as any).secretCommands = () => {
      console.log(`
%c🔍 Secret Commands:
%c• Konami Code: ↑↑↓↓←→←→BA
%c• Terminal: Ctrl+K or click the terminal icon
%c• Try clicking the logo 3 times
%c• Hidden commands: matrix, coffee, hack
%c• Look for clickable elements
%c• URL params: ?debug=true, ?theme=matrix, ?hire=please
%c• Keyboard: Ctrl+Shift+D/M/H, Alt+F4
      `, 
      'color: #00FF00; font-size: 16px; font-weight: bold;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;',
      'color: #00FFFF;'
      );
      return '🎯 Happy hunting!';
    };

    (window as any).revealSecrets = () => {
      const secrets = document.querySelectorAll('[data-secret]');
      secrets.forEach((el) => {
        (el as HTMLElement).style.outline = '2px solid #00FF00';
        setTimeout(() => {
          (el as HTMLElement).style.outline = '';
        }, 3000);
      });
      return `🔦 Found ${secrets.length} secret elements!`;
    };

    (window as any).hackTheMatrix = () => {
      document.body.style.filter = 'hue-rotate(90deg)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 3000);
      return '🟢 Matrix mode activated!';
    };

    return () => {
      delete (window as any).secretCommands;
      delete (window as any).revealSecrets;
      delete (window as any).hackTheMatrix;
    };
  }, [])

  const handleLogoClick = () => {
    setClickPattern([...clickPattern, 'logo'].slice(-3));
  }

  // Navigation click sequence
  const handleNavClick = (section: string) => {
    const newSequence = [...navClickSequence, section].slice(-4)
    setNavClickSequence(newSequence)
    
    if (newSequence.join('-') === 'home-skills-projects-contact') {
      const event = new CustomEvent('unlockAchievement', { detail: 'navigator' })
      window.dispatchEvent(event)
      // Rainbow navigation effect
      const nav = document.querySelector('nav')
      if (nav) {
        nav.style.animation = 'rainbow 2s linear'
        setTimeout(() => {
          nav.style.animation = ''
        }, 2000)
      }
    }
  }

  return (
    <>
      {/* Hidden clickable areas */}
      <div
        data-secret="logo"
        onClick={handleLogoClick}
        className="fixed top-4 left-4 w-12 h-12 cursor-pointer z-50"
        title="???"
      />

      {/* Secret hover areas */}
      <div
        data-secret="corner"
        className="fixed bottom-0 left-0 w-4 h-4 hover:bg-terminal-green/20 transition-all cursor-pointer"
        onClick={() => {
          const event = new CustomEvent('unlockAchievement', { detail: 'corner' });
          window.dispatchEvent(event);
          
          // Fun visual effect - create ripple
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,255,0,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple-effect 1s ease-out;
            z-index: 9999;
          `;
          document.body.appendChild(ripple);
          
          // Add CSS animation if not exists
          if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
              @keyframes ripple-effect {
                0% {
                  transform: scale(1);
                  opacity: 1;
                }
                100% {
                  transform: scale(20);
                  opacity: 0;
                }
              }
              @keyframes fade-out {
                from { opacity: 1; }
                to { opacity: 0; }
              }
              @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
              }
            `;
            document.head.appendChild(style);
          }
          
          setTimeout(() => ripple.remove(), 1000);
          
          // Also trigger a console message
          console.log('%c🔍 Corner discovered! You have a keen eye for details!', 'color: #00FF00; font-size: 14px; background: #000; padding: 5px;');
        }}
      />

      {/* Scroll Progress Bar (Hidden) */}
      <div 
        className="fixed top-0 left-0 h-1 bg-terminal-green/50 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%`, opacity: scrollProgress > 5 ? 0.3 : 0 }}
      />

      {/* Glitch effect overlay */}
      {glitchMode && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <div className="glitch-effect" />
        </div>
      )}

      <style jsx>{`
        .glitch-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.1) 2px,
            rgba(0, 255, 0, 0.1) 4px
          );
          animation: glitch 0.5s infinite;
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </>
  )
}

export default SecretElements
