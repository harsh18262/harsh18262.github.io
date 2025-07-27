import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const Footer: React.FC = () => {
  const contacts = [
    { icon: Mail, text: 'harsh18262.work@gmail.com', href: 'mailto:harsh18262.work@gmail.com' },
    { icon: Phone, text: '+91 7771008804', href: 'tel:+917771008804' },
    { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/in/harshwardhan-mehrotra' },
    { icon: Github, text: 'GitHub', href: 'https://github.com/harshwardhan-mehrotra' },
  ]

  return (
    <footer className="py-8 px-4 border-t border-terminal-green/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-terminal-green/50 text-sm font-mono mb-4"
          >
            <span>harshwardhan@devops:~$</span>{' '}
            <span className="animate-typing-cursor">_</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-4"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 text-terminal-green/70 hover:text-terminal-cyan transition-colors"
              >
                <contact.icon className="w-4 h-4" />
                <span className="text-sm">{contact.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 text-xs text-center"
        >
          Built with Next.js 15 | Deployed on Github 
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-2 text-xs text-gray-600 text-center"
        >
          <span className="text-terminal-green">©</span> {new Date().getFullYear()} Harshwardhan Mehrotra | B.Tech CS&E, MIT ADT Pune
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
