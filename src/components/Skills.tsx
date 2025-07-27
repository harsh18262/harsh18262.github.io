import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Activity, Code, Cloud, Container, GitBranch, Database, Shield, Monitor, Server } from 'lucide-react'

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [secretCode, setSecretCode] = useState<string[]>([])
  const [showSequenceHint, setShowSequenceHint] = useState(false)

  // Easter egg: Click skills in order K-D-T-A
  const handleSkillClick = (skillName: string) => {
    const firstLetter = skillName[0].toUpperCase()
    const newCode = [...secretCode, firstLetter].slice(-4)
    setSecretCode(newCode)
    
    // Show visual feedback
    const clickedElement = event?.target as HTMLElement
    const row = clickedElement?.closest('.skill-row')
    if (row) {
      row.classList.add('bg-terminal-green/20')
      setTimeout(() => row.classList.remove('bg-terminal-green/20'), 300)
    }
    
    // Check if pattern matches
    if (newCode.join('') === 'KDTA') {
      console.log('%c🏆 Master of Infrastructure unlocked!', 'color: #FFD700; font-size: 20px;')
      
      // Success animation
      const elements = document.querySelectorAll('.skill-row')
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('animate-pulse', 'bg-terminal-green/10')
          setTimeout(() => el.classList.remove('animate-pulse', 'bg-terminal-green/10'), 1000)
        }, i * 100)
      })
      
      // Show achievement notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-terminal-green/20 border border-terminal-green px-6 py-4 rounded-lg z-50'
      notification.innerHTML = `
        <div class="text-terminal-green font-bold text-lg mb-1">🏆 Infrastructure Master!</div>
        <div class="text-terminal-green/80 text-sm">You've discovered the secret sequence!</div>
      `
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
      
      setSecretCode([])
    } else if (newCode.length === 4 && newCode.join('') !== 'KDTA') {
      // Wrong sequence - reset
      setSecretCode([])
      setShowSequenceHint(true)
      setTimeout(() => setShowSequenceHint(false), 2000)
    }
  }

  const skills = [
    { name: 'Kubernetes/EKS', status: 'Running', replicas: '3/3', cpu: 95, category: 'orchestration', icon: Container },
    { name: 'Docker', status: 'Running', replicas: '5/5', cpu: 88, category: 'containerization', icon: Container },
    { name: 'Terraform', status: 'Running', replicas: '2/2', cpu: 92, category: 'iac', icon: Code },
    { name: 'AWS', status: 'Running', replicas: '4/4', cpu: 90, category: 'cloud', icon: Cloud },
    { name: 'Helm', status: 'Running', replicas: '3/3', cpu: 85, category: 'packaging', icon: Container },
    { name: 'ArgoCD', status: 'Running', replicas: '2/2', cpu: 87, category: 'gitops', icon: GitBranch },
    { name: 'Python/Bash', status: 'Running', replicas: '3/3', cpu: 85, category: 'language', icon: Code },
    { name: 'Prometheus/Grafana', status: 'Running', replicas: '2/2', cpu: 80, category: 'monitoring', icon: Monitor },
    { name: 'Jenkins', status: 'Running', replicas: '2/2', cpu: 78, category: 'cicd', icon: GitBranch },
    { name: 'Ansible', status: 'Running', replicas: '2/2', cpu: 75, category: 'automation', icon: Server },
  ]

  const categories = [
    { 
      name: 'Cloud & Infrastructure', 
      color: 'terminal-cyan', 
      items: ['AWS', 'Google Cloud', 'On-Prem', 'Windows Server', 'Linux'], 
      icon: Cloud 
    },
    { 
      name: 'DevOps & CI/CD', 
      color: 'terminal-purple', 
      items: ['Jenkins', 'ArgoCD', 'GitOps', 'AWS CodeBuild', 'AWS CodePipeline'], 
      icon: GitBranch 
    },
    { 
      name: 'Containerization & IaC', 
      color: 'terminal-amber', 
      items: ['Kubernetes', 'Docker', 'Helm', 'Karpenter', 'ECS', 'EKS', 'Terraform', 'CloudFormation'], 
      icon: Container 
    },
    { 
      name: 'Languages & Monitoring', 
      color: 'terminal-pink', 
      items: ['Python', 'Bash', 'SQL', 'Django', 'Spring Boot', 'Prometheus', 'Grafana', 'Loki'], 
      icon: Code 
    },
  ]

  return (
    <section id="skills" className="min-h-screen py-20 px-4 bg-gradient-to-b from-dark-bg to-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ kubectl get skills --output=wide
        </motion.h2>

        {/* Sequence hint */}
        {showSequenceHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 text-terminal-amber text-sm"
          >
            💡 Hint: Try the infrastructure stack order...
          </motion.div>
        )}

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="terminal-window p-6 overflow-x-auto hover-glow mb-8"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-terminal-green/30">
                <th className="pb-2 text-terminal-cyan">NAME</th>
                <th className="pb-2 text-terminal-cyan">STATUS</th>
                <th className="pb-2 text-terminal-cyan">REPLICAS</th>
                <th className="pb-2 text-terminal-cyan">PROFICIENCY</th>
                <th className="pb-2 text-terminal-cyan hidden sm:table-cell">CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {skills.map((skill, index) => (
                  <motion.tr
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                    className="border-b border-terminal-green/10 hover:bg-terminal-green/5 transition-all cursor-pointer skill-row"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleSkillClick(skill.name)}
                  >
                    <td className="py-3 flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-terminal-green/70" />
                      {skill.name}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-terminal-green animate-pulse" />
                        <span className="text-terminal-green">{skill.status}</span>
                      </span>
                    </td>
                    <td className="py-3">{skill.replicas}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.cpu}%` } : {}}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-terminal-green to-terminal-cyan h-2 rounded-full"
                          />
                        </div>
                        <span className="text-xs">{skill.cpu}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-400 hidden sm:table-cell">{skill.category}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {/* YAML Config Display */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 terminal-window p-4"
            >
              <pre className="yaml-syntax">
                <span className="yaml-key">apiVersion</span>: <span className="yaml-value">v1</span>{'\n'}
                <span className="yaml-key">kind</span>: <span className="yaml-value">Skill</span>{'\n'}
                <span className="yaml-key">metadata</span>:{'\n'}
                {'  '}<span className="yaml-key">name</span>: <span className="yaml-value">{hoveredSkill.toLowerCase().replace(/\s+/g, '-')}</span>{'\n'}
                <span className="yaml-key">spec</span>:{'\n'}
                {'  '}<span className="yaml-key">proficiency</span>: <span className="yaml-value">expert</span>{'\n'}
                {'  '}<span className="yaml-key">experience</span>: <span className="yaml-value">3+ years</span>{'\n'}
                {'  '}<span className="yaml-key">status</span>: <span className="yaml-value">active</span>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className={`terminal-window p-4 hover-glow border-${category.color}/30`}
            >
              <div className="flex items-center gap-2 mb-3">
                <category.icon className={`w-5 h-5 text-${category.color}`} />
                <h3 className={`text-${category.color} font-bold`}>{category.name}</h3>
              </div>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <div key={item} className="text-sm text-gray-300 flex items-center gap-1">
                    <span className="text-terminal-green">›</span> {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
