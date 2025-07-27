import React, { useEffect, useRef, useState } from 'react'

const MatrixRainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intensityRef = useRef(1)
  const [matrixIntensity, setMatrixIntensity] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ(){}[]<>?!@#$%^&*'
    const matrixArray = matrix.split('')

    const fontSize = 10
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * -100)
    }

    let animationId: number

    const draw = () => {
      ctx.fillStyle = `rgba(10, 10, 10, ${0.04 * intensityRef.current})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00FF00'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i] += intensityRef.current
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Easter egg: Matrix intensification
    const handleMatrixIntensify = () => {
      intensityRef.current = 3
      setMatrixIntensity(3)
      setTimeout(() => {
        intensityRef.current = 1
        setMatrixIntensity(1)
      }, 5000)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('matrixIntensify', handleMatrixIntensify)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('matrixIntensify', handleMatrixIntensify)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 ${
        matrixIntensity > 1 ? 'opacity-70' : 'opacity-30'
      }`}
      style={{ background: '#0A0A0A' }}
    />
  )
}

const MatrixBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)

    // Enable canvas mode on larger screens or when matrix easter egg is triggered
    const checkScreenSize = () => {
      setShowCanvas(window.innerWidth > 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    // Easter egg listener
    const handleMatrixMode = () => {
      setShowCanvas(true)
    }
    window.addEventListener('matrixIntensify', handleMatrixMode)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
      window.removeEventListener('matrixIntensify', handleMatrixMode)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10 matrix-bg" />
      </div>
    )
  }

  return (
    <>
      {showCanvas ? (
        <MatrixRainCanvas />
      ) : (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Matrix rain effect */}
          <div className="absolute inset-0 opacity-10 matrix-bg animate-matrix-rain" />
          
          {/* Scan line effect */}
          <div className="scan-line animate-scan-line" />
          
          {/* Floating particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-terminal-green/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              <div className="w-full h-full bg-terminal-green blur-sm" />
            </div>
          ))}
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      )}
    </>
  )
}

export default MatrixBackground
