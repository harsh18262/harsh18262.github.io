import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Container, Database, GitBranch, Shield, Cloud, Code, Server, Lock } from 'lucide-react'

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects = [
    {
      name: 'Multi-tenant Platform on EKS',
      icon: Container,
      color: 'terminal-cyan',
      description: 'Architected scalable multi-tenant EKS infrastructure supporting 50 tenants with 15 GenAI microservices. Implemented one-click tenant deployment using Terraform custom modules.',
      technologies: ['EKS', 'Terraform', 'ArgoCD', 'Helm', 'S3', 'IAM', 'VPC'],
      metrics: { tenants: '50', cost: '75% ↓', deployment: '1-click' }
    },
    {
      name: 'CrowdStrike Recovery System',
      icon: Shield,
      color: 'terminal-purple',
      description: 'Engineered critical recovery script that restored 90% of Windows servers within 24 hours during the BSOD incident, surpassing industry recovery benchmark by 26 days.',
      technologies: ['Python', 'PowerShell', 'AWS Systems Manager', 'Automation'],
      metrics: { recovery: '24hrs', servers: '90%', benchmark: '27 days' }
    },
    {
      name: 'Infrastructure Automation Suite',
      icon: Server,
      color: 'terminal-amber',
      description: 'Built 15+ custom scripts including multi-threaded AWS token generator. Automated EC2 cleanup and image provisioning, reducing manual work by 30%.',
      technologies: ['Python', 'Bash', 'AWS SDK', 'Threading', 'CI/CD'],
      metrics: { scripts: '15+', efficiency: '30% ↑', time: '2.5hr→15min' }
    },
    {
      name: 'Container Standardization',
      icon: Database,
      color: 'terminal-pink',
      description: 'Standardized Dockerfiles across Python, Node.js, and .NET applications, reducing image sizes by 40% and hardening security for 150+ applications.',
      technologies: ['Docker', 'Multi-stage builds', 'Security scanning', 'CI/CD'],
      metrics: { apps: '150+', size: '40% ↓', languages: '3' }
    },
    {
      name: 'Secure Server Manager',
      icon: Lock,
      color: 'terminal-green',
      description: 'Personal project: Built a secure server management system to store sensitive server data, including authentication keys and IP addresses with controlled access.',
      technologies: ['Python', 'Django', 'Encryption', 'Access Control', 'REST API'],
      metrics: { security: 'AES-256', access: 'RBAC', api: 'RESTful' }
    },
    {
      name: 'Competitive Coding Calendar',
      icon: Code,
      color: 'terminal-blue',
      description: 'Personal project: Developed a centralized web platform to aggregate and display competitive coding events across multiple platforms.',
      technologies: ['Python', 'Web Scraping', 'Django', 'PostgreSQL', 'Cron Jobs'],
      metrics: { platforms: '10+', users: '500+', events: 'Real-time' }
    }
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ docker-compose up projects
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={`terminal-window p-6 hover:border-${project.color}/50 transition-all duration-300 cursor-pointer`}
              onMouseEnter={() => setHoveredProject(project.name)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl text-${project.color} flex items-center gap-2`}>
                  <project.icon className="w-6 h-6" />
                  {project.name}
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                  <span className="text-xs text-terminal-green">Running</span>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{project.description}</p>

              {/* Technology stack */}
              <div className="mb-4">
                <div className="bg-black/50 rounded p-3 font-mono text-xs">
                  <div className={`text-${project.color}`}>Technologies:</div>
                  <div className="text-gray-400">{project.technologies.join(', ')}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-gray-400 capitalize">{key}</div>
                    <div className={`text-${project.color} font-bold`}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Docker command */}
              {hoveredProject === project.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-black/50 rounded p-2 text-xs font-mono overflow-hidden"
                >
                  <span className="text-gray-500">$</span>{' '}
                  <span className="text-terminal-green">docker logs {project.name.toLowerCase().replace(/\s+/g, '-')}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        Infrastructure as Code showcase
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 terminal-window p-6"
        >
          <h3 className="text-xl text-terminal-cyan mb-4">Infrastructure as Code - Multi-tenant Application</h3>
          <div className="bg-black/50 rounded p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-terminal-green">
{`# Terraform configuration for multi-tenant EKS
module "tenant_infrastructure" {
  source = "./modules/tenant"
  
  tenant_name = var.tenant_name
  environment = var.environment
  
  # EKS Configuration
  eks_config = {
    cluster_version = "1.27"
    node_groups = {
      general = {
        instance_types = ["t3.medium"]
        scaling_config = {
          desired_size = 2
          min_size     = 1
          max_size     = 4
        }
      }
    }
  }
  
  # GenAI Microservices
  microservices = [
    "llm-gateway", "vector-db", "prompt-engine",
    "model-inference", "data-pipeline"
  ]
  
  # One-click deployment enabled
  auto_deploy = true
}`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
