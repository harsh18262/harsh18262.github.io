import React, { useEffect, useState } from 'react'

const ResponsiveEasterEggs: React.FC = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [shakeCount, setShakeCount] = useState(0)
  const [touchPattern, setTouchPattern] = useState<number[]>([])

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Mobile: Shake detection
  useEffect(() => {
    if (deviceType !== 'mobile') return

    let lastX: number | null = null
    let lastY: number | null = null
    let lastZ: number | null = null
    let shakeThreshold = 15

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity
      if (!current) return

      if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(lastX - (current.x || 0))
        const deltaY = Math.abs(lastY - (current.y || 0))
        const deltaZ = Math.abs(lastZ - (current.z || 0))

        if (deltaX + deltaY + deltaZ > shakeThreshold) {
          setShakeCount(prev => {
            const newCount = prev + 1
            if (newCount >= 5) {
              // Trigger easter egg
              console.log('%c📱 Shake achievement unlocked!', 'color: #FFD700; font-size: 16px;')
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
                text-align: center;
              `
              message.innerHTML = `
                <h3>🎉 Shake Master!</h3>
                <p>You shook the portfolio back to life!</p>
                <p style="font-size: 12px; margin-top: 10px;">Portfolio restarting...</p>
              `
              document.body.appendChild(message)
              
              // Simulate restart
              setTimeout(() => {
                document.body.style.opacity = '0'
                setTimeout(() => {
                  document.body.style.opacity = '1'
                  message.remove()
                }, 500)
              }, 2000)
              
              return 0 // Reset count
            }
            return newCount
          })
        }
      }

      lastX = current.x || 0
      lastY = current.y || 0
      lastZ = current.z || 0
    }

    // Request permission for iOS devices
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion)
          }
        })
        .catch(console.error)
    } else {
      window.addEventListener('devicemotion', handleMotion)
    }

    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [deviceType])

  // Tablet: Two-finger gesture
  useEffect(() => {
    if (deviceType !== 'tablet') return

    let touches: Touch[] = []

    const handleTouchStart = (e: TouchEvent) => {
      touches = Array.from(e.touches)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touches.length === 2) {
        // Calculate pinch or rotation
        const dx1 = e.touches[0].clientX - touches[0].clientX
        const dy1 = e.touches[0].clientY - touches[0].clientY
        const dx2 = e.touches[1].clientX - touches[1].clientX
        const dy2 = e.touches[1].clientY - touches[1].clientY

        // Simple rotation detection
        if (Math.abs(dx1 - dx2) > 50 || Math.abs(dy1 - dy2) > 50) {
          console.log('%c✌️ Two-finger gesture detected!', 'color: #FFD700; font-size: 16px;')
          // Draw terminal symbols
          const symbol = document.createElement('div')
          symbol.style.cssText = `
            position: fixed;
            left: ${e.touches[0].clientX}px;
            top: ${e.touches[0].clientY}px;
            color: #00FF00;
            font-size: 20px;
            pointer-events: none;
            animation: fade-out 1s ease-out forwards;
            z-index: 9999;
          `
          symbol.textContent = ['$', '#', '>', '_', '|'][Math.floor(Math.random() * 5)]
          document.body.appendChild(symbol)
          setTimeout(() => symbol.remove(), 1000)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [deviceType])

  // Desktop: Mouse position affects Matrix rain
  useEffect(() => {
    if (deviceType !== 'desktop') return

    const handleMouseMove = (e: MouseEvent) => {
      // Send mouse position to Matrix background
      const event = new CustomEvent('matrixMouseMove', {
        detail: { x: e.clientX, y: e.clientY }
      })
      window.dispatchEvent(event)
    }

    // Only activate on hover over specific areas
    const matrixArea = document.querySelector('canvas')
    if (matrixArea) {
      matrixArea.addEventListener('mousemove', handleMouseMove)
      return () => matrixArea.removeEventListener('mousemove', handleMouseMove)
    }
  }, [deviceType])

  return null
}

export default ResponsiveEasterEggs
