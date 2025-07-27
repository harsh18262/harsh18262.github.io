import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Terminal, Home, RefreshCw } from 'lucide-react'

const Custom404 = () => {
  const router = useRouter()
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [solved, setSolved] = useState(false)

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = command.toLowerCase().trim()
    let response = ''

    switch (cmd) {
      case 'help':
        response = 'Available commands: ls, cd, pwd, whoami, fix, home, clear'
        break
      case 'ls':
        response = 'lost_files/  broken_links/  null_pointers/  undefined_behavior/'
        break
      case 'pwd':
        response = '/dev/null/404'
        break
      case 'whoami':
        response = 'lost_visitor'
        break
      case 'cd ..':
      case 'cd /':
      case 'home':
        response = 'Redirecting to home...'
        setTimeout(() => router.push('/'), 1500)
        break
      case 'fix':
        response = '🔧 Running diagnostic... System restored!'
        setSolved(true)
        setTimeout(() => router.push('/'), 2000)
        break
      case 'clear':
        setOutput([])
        setCommand('')
        return
      default:
        response = `Command not found: ${cmd}. Type 'help' for assistance.`
    }

    setOutput([...output, `$ ${command}`, response])
    setCommand('')
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="terminal-window p-8">
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-red-500">404: Page Not Found</h1>
          </div>

          <pre className="text-terminal-green text-xs sm:text-sm mb-6">
{`
 _  _    ___  _  _   
| || |  / _ \\| || |  
| || |_| | | | || |_ 
|__   _| | | |__   _|
   | | | |_| |  | |  
   |_|  \\___/   |_|  
                     
Page not found in /var/www/portfolio
`}
          </pre>

          <div className="mb-6">
            <p className="text-terminal-amber mb-2">
              Looks like you&apos;ve ventured into uncharted territory!
            </p>
            <p className="text-terminal-green/70 text-sm">
              This page might have been moved, deleted, or never existed.
              Try using the terminal below to navigate back:
            </p>
          </div>

          <div className="bg-black/50 rounded p-4 font-mono text-sm">
            <div className="mb-2 text-terminal-cyan">
              Lost Terminal v1.0.0 - Type &apos;help&apos; for commands
            </div>
            
            {output.map((line, i) => (
              <div key={i} className="text-terminal-green/90">{line}</div>
            ))}
            
            <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
              <span className="text-terminal-cyan">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent outline-none text-terminal-green"
                placeholder="Type 'help' or 'home'"
                autoFocus
              />
            </form>
          </div>
        </div>

        {solved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center text-terminal-green"
          >
            <p className="text-2xl">🎉 System Restored! 🎉</p>
            <p className="text-sm mt-2">Great debugging skills!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Custom404
