import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { label: 'Cost Optimization', value: 75, color: 'from-terminal-green to-terminal-cyan' },
    { label: 'Automation Coverage', value: 92, color: 'from-terminal-purple to-terminal-pink' },
    { label: 'System Reliability', value: 99.9, color: 'from-terminal-amber to-orange-400' },
  ]

  return (
    <section id="profile" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ cat /proc/profile
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="terminal-window p-6 hover-glow"
          >
            <h3 className="text-xl text-terminal-cyan mb-4">System Information</h3>
            <div className="space-y-2 text-sm">
              {[
                { key: 'Role', value: 'Cloud Administrator @ ZS Associates', color: 'text-terminal-amber' },
                { key: 'Location', value: 'Pune, India', color: 'text-terminal-green' },
                { key: 'Experience', value: '2+ years (2023-Present)', color: 'text-terminal-green' },
                { key: 'Teams Supported', value: '150+ application teams', color: 'text-terminal-green' },
                { key: 'Education', value: 'B.Tech CS&E, MIT ADT (2023)', color: 'text-terminal-cyan' },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="flex justify-between"
                >
                  <span className="text-gray-400">{item.key}:</span>
                  <span className={item.color}>{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="terminal-window p-6 hover-glow"
          >
            <h3 className="text-xl text-terminal-cyan mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${stat.value}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: 'easeOut' }}
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 terminal-window p-6 hover-glow"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-green">cat README.md</span>
          </div>
          <p className="text-terminal-green/90 leading-relaxed">
            Dynamic and results-driven DevOps Engineer with a strong focus on automation, Cloud Infrastructure Management, 
            and Continuous Integration & Delivery (CI/CD) practices. Currently working as a Cloud Administrator at ZS Associates,
            with hands-on experience in cloud-native infrastructure, automation, and CI/CD implementations.
          </p>
          <p className="text-terminal-green/90 leading-relaxed mt-4">
            Proven ability to architect and manage secure, scalable, and cost-efficient multi-tenant cloud environments using 
            tools like EKS, ArgoCD, and Helm. Strong focus on infrastructure resilience and operational excellence, with experience 
            creating custom automation solutions that reduce manual overhead and enhance system reliability.
          </p>
          <p className="text-terminal-green/90 leading-relaxed mt-4">
            Experienced in implementing infrastructure as code (IaC) to ensure repeatable and auditable provisioning across 
            cloud and hybrid environments. Passionate about continuous learning and applying emerging technologies such as 
            GenAI-integrated microservices, container security, and advanced observability tools.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About
