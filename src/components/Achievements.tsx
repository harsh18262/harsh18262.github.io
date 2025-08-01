import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GitBranch, Zap } from 'lucide-react'

const Achievements: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const achievements = [
    {
      date: '2024-2025',
      title: 'Multi-tenant EKS Architect',
      description: 'Designed scalable multi-tenant EKS setup for 50 tenants with 15 GenAI microservices using ArgoCD and Helm',
      impact: '75% cost reduction per tenant with one-click deployment',
      color: 'terminal-cyan'
    },
    {
      date: '2024',
      title: 'CrowdStrike BSOD Recovery Champion',
      description: 'Developed recovery script restoring 90% of Windows servers within 24 hours during critical incident',
      impact: 'Industry benchmark: 27 days → Our recovery: 24 hours',
      color: 'terminal-green'
    },
    {
      date: '2023',
      title: 'Infrastructure Automation Leader',
      description: 'Automated EC2 cleanup and image provisioning, reducing setup time from 2.5 hours to 15 minutes',
      impact: '25% cost reduction, 90% time savings',
      color: 'terminal-purple'
    },
    {
      date: '2023',
      title: 'Container Security Expert',
      description: 'Standardized Dockerfiles for Python, Node.js, & .NET across 150+ applications',
      impact: '40% image size reduction, enhanced security posture',
      color: 'terminal-amber'
    },
    {
      date: '2023',
      title: 'DevOps Adoption Evangelist',
      description: 'Advised 150+ app teams on deployment best practices and CI/CD implementation',
      impact: '20% productivity increase, seamless DevOps adoption',
      color: 'terminal-pink'
    },
    {
      date: '2022',
      title: 'Peace Haven DevOps Transformation',
      description: 'Automated infrastructure for clients like Trident and Palmolive using Terraform and Ansible',
      impact: '30% faster deployments, 95% issue resolution rate',
      color: 'terminal-blue'
    }
  ]

  return (
    <section id="achievements" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ git log --professional --graph
        </motion.h2>

        <div ref={ref} className="relative">
          {/* Git branch line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-terminal-green/30"></div>

          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="relative flex items-start mb-8"
            >
              {/* Git commit node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="absolute left-8 w-4 h-4 bg-terminal-green rounded-full -translate-x-1/2 z-10"
              />
              
              <motion.div
                className="ml-16 flex-1 terminal-window p-6 hover-glow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-terminal-amber font-mono text-sm">commit {achievement.date}</span>
                  <GitBranch className="w-4 h-4 text-terminal-green" />
                </div>
                <h3 className={`text-xl text-${achievement.color} mb-2`}>{achievement.title}</h3>
                <p className="text-gray-300 mb-2">{achievement.description}</p>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">{achievement.impact}</span>
                </div>

                {/* Git command display */}
                <div className="mt-4 bg-black/50 rounded p-2 text-xs font-mono">
                  <span className="text-gray-500">$</span>{' '}
                  <span className="text-terminal-green">git show --stat HEAD~{index}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
