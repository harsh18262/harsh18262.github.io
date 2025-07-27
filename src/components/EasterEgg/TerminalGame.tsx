import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Trophy, Lock, Unlock, Star } from 'lucide-react'

interface Command {
  input: string
  output: string | React.ReactNode
}

const TerminalGame: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [achievements, setAchievements] = useState<string[]>([])
  const [secretsFound, setSecretsFound] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands for autocomplete
  const availableCommands = [
    'help', 'ls', 'whoami', 'skills', 'achievements', 'clear', 'exit',
    'sudo hire me', 'matrix', 'coffee', 'hack', '.secrets', 'cat .secrets',
    'rm -rf /', 'cat /etc/passwd', 'vim', 'ping google.com', 'top', 'gallery',
    'history', 'date', 'echo', 'pwd', 'cd', 'man'
  ]

  // ASCII Art Gallery
  const asciiGallery = [
    {
      name: 'Docker Whale',
      art: `
   ##         .
## ## ##        ==
## ## ## ## ##    ===
/""""""""""""""""\\___/ ===
{                       /  ===-
\\______ O           __/
\\    \\         __/
\\____\\_______/`
    },
    {
      name: 'Kubernetes',
      art: `
    _____
   /     \\
  | () () |
   \\  ^  /
    |||||
    |||||`
    },
    {
      name: 'Git Branch',
      art: `
    |\\
    | \\
    |  \\
    |   \\
----*----*----
    |
    |`
    }
  ]

  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-achievements')
    const history = localStorage.getItem('portfolio-command-history')
    if (saved) {
      setAchievements(JSON.parse(saved))
      setSecretsFound(JSON.parse(saved).length)
    }
    if (history) {
      setCommandHistory(JSON.parse(history))
    }
    
    // Listen for achievement unlock events
    const handleAchievementUnlock = (e: CustomEvent) => {
      unlockAchievement(e.detail)
    }
    
    window.addEventListener('unlockAchievement', handleAchievementUnlock as EventListener)
    
    return () => {
      window.removeEventListener('unlockAchievement', handleAchievementUnlock as EventListener)
    }
  }, [])

  // Konami Code Detection
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          unlockAchievement('konami')
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }

      // Ctrl+K to open terminal
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const unlockAchievement = (id: string) => {
    if (!achievements.includes(id)) {
      const newAchievements = [...achievements, id]
      setAchievements(newAchievements)
      setSecretsFound(newAchievements.length)
      localStorage.setItem('portfolio-achievements', JSON.stringify(newAchievements))
      
      // Show notification
      showNotification(getAchievementDetails(id))
    }
  }

  const getAchievementDetails = (id: string) => {
    const achievementMap: Record<string, { name: string; description: string }> = {
      konami: { name: 'Konami Master', description: 'Found the Konami Code! ↑↑↓↓←→←→BA' },
      sudo: { name: 'Root Access', description: 'Attempted to use sudo powers!' },
      hack: { name: 'L33t H4x0r', description: 'Tried to hack the system!' },
      matrix: { name: 'Red Pill', description: 'Entered the Matrix!' },
      hire: { name: 'Eager Candidate', description: 'You want to hire me? Let\'s talk!' },
      secret: { name: 'Secret Finder', description: 'Discovered the secret command!' },
      explorer: { name: 'Terminal Explorer', description: 'Mastered the terminal interface!' },
      coffee: { name: 'Coffee Driven', description: 'Discovered the developer fuel!' },
      corner: { name: 'Corner Lurker', description: 'Found the hidden corner! You\'re thorough!' },
      destroyer: { name: 'Chaos Attempt', description: 'Tried to rm -rf / ... Nice try!' },
      hacker: { name: 'System Inspector', description: 'Explored system files like a pro!' },
      vimuser: { name: 'Vim Survivor', description: 'Entered vim and lived to tell the tale!' },
      networker: { name: 'Network Explorer', description: 'Pinged the outside world!' },
      sysadmin: { name: 'Process Manager', description: 'Checked system processes!' },
      artist: { name: 'ASCII Appreciator', description: 'Browsed the ASCII gallery!' },
    }
    return achievementMap[id] || { name: 'Unknown', description: 'Mystery achievement!' }
  }

  const showNotification = (achievement: { name: string; description: string }) => {
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-terminal-green/20 border border-terminal-green p-4 rounded-lg z-50 animate-slide-in'
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="text-terminal-green">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <div class="text-terminal-green font-bold">${achievement.name}</div>
          <div class="text-terminal-green/70 text-sm">${achievement.description}</div>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 5000)
  }

  const processCommand = (input: string) => {
    const cmd = input.toLowerCase().trim()
    let output: string | React.ReactNode = ''

    // Add to history
    const newHistory = [...commandHistory, input]
    setCommandHistory(newHistory)
    localStorage.setItem('portfolio-command-history', JSON.stringify(newHistory.slice(-50))) // Keep last 50

    switch (cmd) {
      case 'help':
        output = (
          <div>
            <div className="text-terminal-cyan mb-2">Available commands:</div>
            <div className="ml-4 space-y-1">
              <div><span className="text-terminal-amber">help</span> - Show this help menu</div>
              <div><span className="text-terminal-amber">ls</span> - List portfolio sections</div>
              <div><span className="text-terminal-amber">whoami</span> - About Harshwardhan</div>
              <div><span className="text-terminal-amber">skills</span> - View technical skills</div>
              <div><span className="text-terminal-amber">achievements</span> - View unlocked achievements</div>
              <div><span className="text-terminal-amber">gallery</span> - ASCII art gallery</div>
              <div><span className="text-terminal-amber">history</span> - Command history</div>
              <div><span className="text-terminal-amber">clear</span> - Clear terminal</div>
              <div><span className="text-terminal-amber">exit</span> - Close terminal</div>
              <div className="text-terminal-green/50 mt-2">Try finding hidden commands! 🔍</div>
              <div className="text-terminal-green/50">Press Tab for autocomplete</div>
            </div>
          </div>
        )
        break

      case 'ls':
        output = (
          <div className="flex flex-wrap gap-4">
            <span className="text-terminal-cyan">about/</span>
            <span className="text-terminal-cyan">skills/</span>
            <span className="text-terminal-cyan">projects/</span>
            <span className="text-terminal-cyan">contact/</span>
            <span className="text-terminal-green">.secrets</span>
          </div>
        )
        break

      case 'whoami':
        output = 'harshwardhan@devops:~$ Cloud Administrator | DevOps Engineer | Infrastructure Enthusiast'
        break

      case 'sudo hire me':
      case 'sudo hire':
        unlockAchievement('hire')
        output = (
          <div>
            <div className="text-terminal-green mb-2">[sudo] password for recruiter: ******* </div>
            <div className="text-terminal-amber">Access granted! Redirecting to contact...</div>
          </div>
        )
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          setIsOpen(false)
        }, 2000)
        break

      case 'hack':
      case 'hack the planet':
        unlockAchievement('hack')
        output = (
          <div className="text-terminal-green">
            <pre className="text-xs">
{`
 _   _            _      _____ _            ____  _                  _   _ 
| | | | __ _  ___| | __ |_   _| |__   ___  |  _ \\| | __ _ _ __   ___| |_| |
| |_| |/ _\` |/ __| |/ /   | | | '_ \\ / _ \\ | |_) | |/ _\` | '_ \\ / _ \\ __| |
|  _  | (_| | (__|   <    | | | | | |  __/ |  __/| | (_| | | | |  __/ |_|_|
|_| |_|\\__,_|\\___|_|\\_\\   |_| |_| |_|\\___| |_|   |_|\\__,_|_| |_|\\___|\\__(_)
`}
            </pre>
            <div className="mt-2 text-sm">Nice try! But this system is secure 🔒</div>
          </div>
        )
        break

      case 'matrix':
      case 'red pill':
      case 'blue pill':
        unlockAchievement('matrix')
        output = (
          <div>
            <div className="text-terminal-green mb-2">You take the red pill...</div>
            <div className="text-terminal-cyan">The Matrix has you, Neo.</div>
          </div>
        )
        // Trigger matrix rain intensification
        const event = new CustomEvent('matrixIntensify')
        window.dispatchEvent(event)
        break

      case 'coffee':
      case 'brew coffee':
        unlockAchievement('coffee')
        output = (
          <div>
            <pre className="text-terminal-amber">
{`
      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|  
( C|/\\/\\/\\/\\/|
 '-./\\/\\/\\/\\/|
   '_________'
    '-------'
`}
            </pre>
            <div className="text-terminal-green mt-2">☕ Coffee is brewing... +100% productivity!</div>
          </div>
        )
        break

      case '.secrets':
      case 'cat .secrets':
        unlockAchievement('secret')
        output = (
          <div className="text-terminal-green">
            <div>🔐 Secret commands discovered:</div>
            <div className="ml-4 mt-2 space-y-1 text-terminal-green/70">
              <div>• Try the Konami Code on the page</div>
              <div>• Type &apos;matrix&apos; to enter the simulation</div>
              <div>• &apos;sudo hire me&apos; might work...</div>
              <div>• Developers need &apos;coffee&apos;</div>
              <div>• Check the browser console for more</div>
              <div>• Try classic Linux commands</div>
              <div>• Visit the ASCII &apos;gallery&apos;</div>
            </div>
          </div>
        )
        break

      case 'rm -rf /':
      case 'rm -rf /*':
        unlockAchievement('destroyer')
        output = (
          <div className="text-red-500">
            <div>⚠️ PERMISSION DENIED!</div>
            <div className="mt-2">Nice try! This system is protected by quantum encryption 🛡️</div>
            <div className="text-terminal-green mt-2">Besides, we have backups... lots of backups.</div>
          </div>
        )
        break

      case 'cat /etc/passwd':
        unlockAchievement('hacker')
        output = (
          <div className="font-mono text-xs">
            <div>root:x:0:0:Harshwardhan:/root:/bin/bash</div>
            <div>daemon:x:1:1:Cloud Architect:/usr/sbin:/usr/sbin/nologin</div>
            <div>bin:x:2:2:DevOps Engineer:/bin:/usr/sbin/nologin</div>
            <div>sys:x:3:3:Infrastructure Wizard:/dev:/usr/sbin/nologin</div>
            <div>sync:x:4:65534:Automation Master:/bin:/bin/sync</div>
            <div className="text-terminal-green mt-2">Just kidding! Here&apos;s my actual info at /about 😄</div>
          </div>
        )
        break

      case 'vim':
      case 'vi':
        unlockAchievement('vimuser')
        output = (
          <div>
            <div className="bg-gray-900 p-2 font-mono text-xs">
              <div>~</div>
              <div>~</div>
              <div>~  VIM - Vi IMproved</div>
              <div>~</div>
              <div>~  version 8.2.devops</div>
              <div>~  by Harshwardhan</div>
              <div>~</div>
              <div>~  type :q! to exit</div>
              <div>~  type :hire to hire me</div>
              <div>~</div>
              <div className="mt-2 bg-gray-800">-- INSERT --</div>
            </div>
            <div className="text-terminal-green mt-2">Just kidding! You&apos;re not stuck in vim... this time 😄</div>
          </div>
        )
        break

      case 'ping google.com':
      case 'ping 8.8.8.8':
        unlockAchievement('networker')
        output = (
          <div className="font-mono text-xs">
            <div>PING google.com (142.250.80.46) 56(84) bytes of data.</div>
            <div className="mt-1">64 bytes from 142.250.80.46: icmp_seq=1 ttl=117 time=11.2 ms</div>
            <div>64 bytes from 142.250.80.46: icmp_seq=2 ttl=117 time=10.8 ms</div>
            <div>64 bytes from 142.250.80.46: icmp_seq=3 ttl=117 time=11.5 ms</div>
            <div>64 bytes from 142.250.80.46: icmp_seq=4 ttl=117 time=10.9 ms</div>
            <div className="mt-2">--- google.com ping statistics ---</div>
            <div>4 packets transmitted, 4 received, 0% packet loss</div>
            <div className="text-terminal-green mt-2">✅ Internet connection is working!</div>
          </div>
        )
        break

      case 'top':
      case 'htop':
        unlockAchievement('sysadmin')
        output = (
          <div className="font-mono text-xs">
            <div className="text-terminal-cyan">top - {new Date().toLocaleTimeString()} up 2 years, 3:14, load average: 0.00, 0.01, 0.05</div>
            <div>Tasks: 12 total, 1 running, 11 sleeping, 0 zombie</div>
            <div className="mt-2 text-terminal-amber">  PID USER      PR   %CPU %MEM    TIME+ COMMAND</div>
            <div>    1 harsh     20   95.0  2.1   750:23 kubernetes</div>
            <div>    2 harsh     20   88.0  1.8   620:15 docker</div>
            <div>    3 harsh     20   92.0  1.5   680:42 terraform</div>
            <div>    4 harsh     20   90.0  2.3   710:18 aws-cli</div>
            <div>    5 harsh     20   85.0  1.2   550:09 python</div>
            <div className="text-terminal-green mt-2">All systems operational! 🚀</div>
          </div>
        )
        break

      case 'gallery':
        unlockAchievement('artist')
        let galleryIndex = 0
        output = (
          <div>
            <div className="text-terminal-cyan mb-2">ASCII Art Gallery (Use arrow keys in console)</div>
            <pre className="text-terminal-green text-xs">{asciiGallery[0].art}</pre>
            <div className="text-terminal-amber mt-2">{asciiGallery[0].name}</div>
            <div className="text-gray-500 text-xs mt-1">1/{asciiGallery.length}</div>
          </div>
        )
        // Note: Arrow key navigation would require more complex state management
        break

      case 'history':
        output = (
          <div>
            <div className="text-terminal-cyan mb-2">Command History:</div>
            {commandHistory.slice(-10).map((cmd, i) => (
              <div key={i} className="text-terminal-green/70">
                {commandHistory.length - 10 + i + 1}: {cmd}
              </div>
            ))}
          </div>
        )
        break

      case 'date':
        output = new Date().toString()
        break

      case 'pwd':
        output = '/home/harshwardhan/portfolio'
        break

      case 'echo':
        output = 'echo: missing operand'
        break

      case 'achievements':
        output = (
          <div>
            <div className="text-terminal-cyan mb-2">🏆 Achievements ({achievements.length}/15):</div>
            <div className="space-y-2">
              {achievements.map(id => {
                const detail = getAchievementDetails(id)
                return (
                  <div key={id} className="flex items-center gap-2 text-terminal-green">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{detail.name}</span>
                  </div>
                )
              })}
              {achievements.length === 0 && (
                <div className="text-terminal-green/50">No achievements yet. Start exploring!</div>
              )}
            </div>
          </div>
        )
        break

      case 'clear':
        setCommands([])
        return

      case 'exit':
        setIsOpen(false)
        return

      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5)
        } else if (cmd.startsWith('cd ')) {
          output = `cd: ${cmd.substring(3)}: No such file or directory`
        } else {
          output = `Command not found: ${input}. Type 'help' for available commands.`
        }
    }

    setCommands([...commands, { input, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      processCommand(currentInput)
      setCurrentInput('')
      setHistoryIndex(-1)
      setShowSuggestions(false)
      if (commands.length >= 10) {
        unlockAchievement('explorer')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(currentInput.toLowerCase())
      )
      if (matches.length === 1) {
        setCurrentInput(matches[0])
        setShowSuggestions(false)
      } else if (matches.length > 1) {
        setShowSuggestions(true)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-terminal-green/20 border border-terminal-green p-4 rounded-full hover:bg-terminal-green/30 transition-all hover-glow group z-40"
        title="Open Terminal (Ctrl+K)"
      >
        <Terminal className="w-6 h-6 text-terminal-green group-hover:animate-pulse" />
        {secretsFound > 0 && (
          <span className="absolute -top-2 -right-2 bg-terminal-amber text-dark-bg text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {secretsFound}
          </span>
        )}
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-8 w-96 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-md border border-terminal-green rounded-lg shadow-2xl z-50"
          >
            <div className="flex items-center justify-between p-3 border-b border-terminal-green/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:opacity-70" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-terminal-green text-sm">harshwardhan@terminal</span>
            </div>
            
            <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm">
              <div className="text-terminal-green mb-2">
                Welcome to Harsh&apos;s Portfolio Terminal v1.0.0
                <br />Type &apos;help&apos; for available commands.
              </div>
              
              {commands.map((cmd, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-cyan">$</span>
                    <span className="text-terminal-green">{cmd.input}</span>
                  </div>
                  <div className="ml-4 text-terminal-green/90">{cmd.output}</div>
                </div>
              ))}
              
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-terminal-cyan">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-terminal-green"
                  spellCheck={false}
                />
              </form>
              
              {/* Autocomplete suggestions */}
              {showSuggestions && currentInput && (
                <div className="ml-4 mt-1 text-terminal-green/60 text-xs">
                  {availableCommands
                    .filter(cmd => cmd.startsWith(currentInput.toLowerCase()))
                    .slice(0, 5)
                    .map(cmd => (
                      <div key={cmd}>{cmd}</div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

export default TerminalGame
