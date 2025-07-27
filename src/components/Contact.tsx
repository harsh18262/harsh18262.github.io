import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // REPLACE THIS WITH YOUR FORMSPREE ENDPOINT
  // Sign up at https://formspree.io and create a form
  // You'll get an endpoint like: https://formspree.io/f/YOUR_FORM_ID
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrgnegor' // <-- REPLACE WITH YOUR FORMSPREE URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: formData.subject || 'New contact from portfolio'
        })
      })

      if (response.ok) {
        setStatus('success')
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' })
          setStatus('idle')
        }, 3000)
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ echo &quot;contact@harshwardhan&quot; | sendmail
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="terminal-window p-6 h-fit"
          >
            <h3 className="text-xl text-terminal-cyan mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="bg-black/50 rounded p-4">
                <div className="font-mono text-sm">
                  <span className="text-terminal-cyan">$</span> <span className="text-terminal-green">cat contact.info</span>
                </div>
                <div className="mt-2 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-terminal-amber" />
                    <span>harsh18262.work@gmail.com</span>
                  </div>
                  <div className="text-gray-400">
                    Available for DevOps consulting, cloud architecture design, and infrastructure automation projects.
                  </div>
                </div>
              </div>

              <div className="bg-black/50 rounded p-4 font-mono text-xs">
                <div className="text-gray-400"># Quick contact</div>
                <div className="text-terminal-green">$ mail -s &quot;DevOps Opportunity&quot; \</div>
                <div className="text-terminal-green ml-4">harsh18262.work@gmail.com</div>
              </div>

              <div className="text-sm text-gray-400">
                <p>Response time: Usually within 24-48 hours</p>
                <p>Time zone: IST (UTC+5:30)</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="terminal-window p-6"
          >
            <h3 className="text-xl text-terminal-purple mb-4">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-black/50 border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-cyan transition-colors disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-black/50 border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-cyan transition-colors disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="w-full bg-black/50 border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-cyan transition-colors disabled:opacity-50"
                  placeholder="DevOps Consultation"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  rows={4}
                  className="w-full bg-black/50 border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-cyan transition-colors resize-none disabled:opacity-50"
                  placeholder="Your message here..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-terminal-purple/20 border border-terminal-purple/50 rounded px-6 py-3 hover:bg-terminal-purple/30 transition-all hover-glow group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-terminal-purple border-t-transparent" />
                    <span className="text-terminal-purple font-bold">Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-terminal-green" />
                    <span className="text-terminal-green font-bold">Message Sent!</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-bold">Error Sending</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-terminal-purple group-hover:translate-x-1 transition-transform" />
                    <span className="text-terminal-purple font-bold">Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Formspree Attribution */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              Secured by Formspree
            </p>
          </motion.div>
        </div>

        {/* Terminal Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 bg-black/50 rounded p-4 font-mono text-xs"
        >
          <div className="text-gray-400"># Alternative contact methods</div>
          <div className="text-terminal-green">$ curl -X POST https://linkedin.com/in/harshwardhan-mehrotra</div>
          <div className="text-terminal-green">$ git clone https://github.com/harshwardhan-mehrotra</div>
          <div className="text-terminal-green">$ ssh harsh@devops.zs-associates.com</div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
