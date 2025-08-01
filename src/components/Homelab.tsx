import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, Database, Lock, Cpu, Server, Network, 
  Activity, CheckCircle, Zap, RefreshCw, GitBranch,
  HardDrive, Wifi, FileText, Download, Tv, Cloud,
  Share2, Film, Radio, Search, Key, Globe, Clipboard,
  Bird, Heart, Cat
} from 'lucide-react'

const Homelab: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [metricsData, setMetricsData] = useState({
    cpu: 45,
    memory: 68,
    network: 82,
    uptime: 99.9
  })

  // Fix hydration by only rendering dynamic content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate real-time metrics
  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setMetricsData(prev => ({
        cpu: Math.min(100, Math.max(20, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(30, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.min(100, Math.max(10, prev.network + (Math.random() - 0.5) * 15)),
        uptime: 99.9
      }))
    }, 2000)
    return () => clearInterval(timer)
  }, [mounted])

  const nodes = [
    { 
      id: 1, 
      name: 'Tweety', 
      role: 'Master', 
      device: 'Raspberry Pi 4',
      specs: '8GB RAM | 4 cores | 512GB SD',
      icon: Bird,
      baseCpu: 35, 
      baseMemory: 55, 
      pods: 12,
      color: 'text-yellow-400'
    },
    { 
      id: 2, 
      name: 'Lola', 
      role: 'Worker', 
      device: 'Raspberry Pi 3B',
      specs: '1GB RAM | 4 cores | 32GB SD',
      icon: Heart,
      baseCpu: 65, 
      baseMemory: 78, 
      pods: 8,
      color: 'text-pink-400'
    },
    { 
      id: 3, 
      name: 'Sylvester', 
      role: 'Worker + GPU', 
      device: 'HP ProBook 430 G3',
      specs: '8GB RAM | i5-6200U | 1TB SSD',
      icon: Cat,
      baseCpu: 42, 
      baseMemory: 62, 
      pods: 18,
      color: 'text-gray-300'
    },
  ]

  const services = [
    { 
      name: 'Pi-hole', 
      icon: Shield, 
      status: 'healthy',
      description: 'Network-wide DNS & ad-blocking',
      metrics: { blocked: '2.3M', queries: '5.8M', clients: 42 },
      color: 'terminal-green',
      node: 'Tweety'
    },
    { 
      name: 'Arr-Stack', 
      icon: Film, 
      status: 'healthy',
      description: 'Sonarr + Radarr + Prowlarr + Searcharr',
      metrics: { shows: 180, movies: 1250, indexers: 25 },
      color: 'terminal-amber',
      node: 'Sylvester'
    },
    { 
      name: 'Media Streaming', 
      icon: Tv, 
      status: 'healthy',
      description: 'Kodi + Jellyfin (GPU accelerated)',
      metrics: { streams: 8, transcodes: 4, '4K': 'Yes' },
      color: 'terminal-cyan',
      node: 'Sylvester'
    },
    { 
      name: 'Vaultwarden', 
      icon: Lock, 
      status: 'healthy',
      description: 'Self-hosted password manager',
      metrics: { vaults: 5, items: 450, shares: 12 },
      color: 'terminal-purple',
      node: 'Lola'
    },
    { 
      name: 'VPN Services', 
      icon: Globe, 
      status: 'healthy',
      description: 'Tailscale + Twingate',
      metrics: { nodes: 15, peers: 8, networks: 3 },
      color: 'terminal-pink',
      node: 'Tweety'
    },
    { 
      name: 'Paperless-ngx', 
      icon: FileText, 
      status: 'healthy',
      description: 'Document management system',
      metrics: { docs: 3400, tags: 120, inbox: 5 },
      color: 'terminal-blue',
      node: 'Lola'
    },
    { 
      name: 'n8n', 
      icon: Cpu, 
      status: 'healthy',
      description: 'Workflow automation platform',
      metrics: { workflows: 45, executions: '1.2k', nodes: 350 },
      color: 'terminal-green',
      node: 'Sylvester'
    },
    { 
      name: 'Nextcloud', 
      icon: Cloud, 
      status: 'healthy',
      description: 'Personal cloud storage',
      metrics: { storage: '15GB', files: '10k', shares: 28 },
      color: 'terminal-amber',
      node: 'Sylvester'
    },
    { 
      name: 'Download Managers', 
      icon: Download, 
      status: 'healthy',
      description: 'Ariang + qBittorrent',
      metrics: { active: 12, speed: '45MB/s', ratio: 2.8 },
      color: 'terminal-cyan',
      node: 'Sylvester'
    },
    { 
      name: 'Resilio Sync', 
      icon: RefreshCw, 
      status: 'healthy',
      description: 'P2P file synchronization',
      metrics: { folders: 18, peers: 1, synced: '850GB' },
      color: 'terminal-purple',
      node: 'Lola'
    },
    { 
      name: 'Pastefy', 
      icon: Clipboard, 
      status: 'healthy',
      description: 'Self-hosted pastebin',
      metrics: { pastes: 20, views: '20', active: 10 },
      color: 'terminal-pink',
      node: 'Tweety'
    },
    { 
      name: 'Home Assistant', 
      icon: Server, 
      status: 'healthy',
      description: 'Home automation hub',
      metrics: { devices: 85, automations: 120, scenes: 45 },
      color: 'terminal-blue',
      node: 'Lola'
    }
  ]

  const infrastructureDiagram = `
+------------------------------------------------------------------------------+
|                 Looney Tunes Homelab - K3s Cluster v1.33                     |
+------------------------------------------------------------------------------+
|                                                                              |
|  +-------------------+     +-------------------+     +-------------------+   |
|  | Tweety            |     | Lola              |     | Sylvester         |   |
|  | [Master Node]     |---->| [Worker Node]     |---->| [Worker + GPU]    |   |
|  +-------------------+     +-------------------+     +-------------------+   |
|  | Raspberry Pi 4    |     | Raspberry Pi 3B   |     | HP ProBook 430    |   |
|  | - 8GB RAM         |     | - 1GB RAM         |     | - 8GB RAM         |   |
|  | - 4 CPU cores     |     | - 4 CPU cores     |     | - Intel i5-6200U  |   |
|  | - 64GB Storage    |     | - 32GB Storage    |     | - 256GB SSD       |   |
|  +-------------------+     +-------------------+     +-------------------+   |
|            |                         |                         |             |
|            +--------------------------+-------------------------+            |
|                                      |                                       |
|                            +-------------------+                             |
|                            |   NGINX Ingress   |                             |
|                            |   + MetalLB LB    |                             |
|                            +-------------------+                             |
|                                      |                                       |
+------------------------------------------------------------------------------+
|                         SERVICE DISTRIBUTION                                 |
+------------------------------------------------------------------------------+
| Tweety (Master):    Pi-hole, VPN Services, Pastefy                           |
| Lola (Worker):      Vaultwarden, Paperless-ngx, Home Assistant, Resilio      |
| Sylvester (GPU):    Jellyfin/Kodi, Arr-Stack, n8n, Nextcloud, Downloads      |
+------------------------------------------------------------------------------+
| Storage: Local-Path   | Network: Direct Router   | K3s v1.33                 |
| Deploy: Helm + Bash   | Backup: Restic (TBD)     | Monitor: TBD              |
+------------------------------------------------------------------------------+`

  return (
    <section id="homelab" className="min-h-screen py-20 px-4 bg-gradient-to-b from-gray-950 to-black relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ helm status looney-tunes-cluster
        </motion.h2>

        {/* Cluster Status */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="terminal-window p-6 mb-8 hover-glow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-terminal-cyan">
              Looney Tunes Cluster Status: <span className="text-terminal-green">That&apos;s All Folks! ✓</span>
            </h3>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-terminal-green animate-pulse" />
              <span className="text-sm">All toons operational</span>
            </div>
          </div>

          {/* Node Status Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="bg-black/50 border border-terminal-green/20 rounded-lg p-4 hover:border-terminal-green/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <node.icon className={`w-5 h-5 ${node.color}`} />
                    <span className="text-terminal-green font-bold">{node.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-terminal-green" />
                    <span className="text-xs text-gray-400">{node.role}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">{node.device}</div>
                <div className="text-xs text-gray-400 mb-2">{node.specs}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>CPU:</span>
                    <span className={node.baseCpu > 60 ? 'text-terminal-amber' : 'text-terminal-green'}>
                      {mounted ? `${node.baseCpu + Math.round((Math.random() - 0.5) * 5)}%` : `${node.baseCpu}%`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className={node.baseMemory > 75 ? 'text-terminal-amber' : 'text-terminal-green'}>
                      {mounted ? `${node.baseMemory + Math.round((Math.random() - 0.5) * 3)}%` : `${node.baseMemory}%`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pods:</span>
                    <span>{node.pods}/25</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Deployment Command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-black/50 rounded p-3 font-mono text-sm"
          >
            <div>
              <span className="text-gray-500">$</span>{' '}
              <span className="text-terminal-green">kubectl apply -k ./looney-tunes/overlays/production</span>
            </div>
            <div className="text-gray-400 mt-1">deployment.apps/toons-services configured</div>
            <div className="text-gray-400">service/acme-ingress configured</div>
            <div className="text-terminal-green mt-1">✓ That&apos;s all folks! All services deployed successfully</div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
              className={`group terminal-window p-6 hover:border-${service.color}/50 transition-all duration-300 cursor-pointer`}
              onClick={() => setSelectedService(service.name)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <service.icon className={`w-8 h-8 text-${service.color} group-hover:text-${service.color} transition-colors`} />
                  <div>
                    <h3 className="text-lg font-bold text-terminal-green">{service.name}</h3>
                    <p className="text-xs text-gray-400">{service.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-terminal-green">Healthy</span>
                  </div>
                  <span className="text-xs text-gray-500">@{service.node}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(service.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-gray-400 capitalize">{key}</div>
                    <div className="text-terminal-green font-bold">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="terminal-window p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/5 to-terminal-purple/5" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-terminal-cyan flex items-center gap-2">
                <span>🎬</span> Infrastructure Overview <span>🎬</span>
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="animate-pulse">●</span>
                <span>Live Architecture</span>
              </div>
            </div>
            
            {/* Node Icons Legend */}
            <div className="mb-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐤</span>
                <span className="text-yellow-400">Tweety</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💗</span>
                <span className="text-pink-400">Lola</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐱</span>
                <span className="text-gray-300">Sylvester</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-6 border border-terminal-green/20 shadow-2xl overflow-x-auto">
              <pre className="text-xs text-terminal-green whitespace-pre font-mono leading-relaxed">
                {infrastructureDiagram}
              </pre>
            </div>
            
            {/* Feature Icons */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-1">💾</div>
                <div className="text-terminal-amber text-xs">Local Storage</div>
                <div className="text-gray-400 text-xs">Path Provisioner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🌐</div>
                <div className="text-terminal-cyan text-xs">Direct Network</div>
                <div className="text-gray-400 text-xs">Router Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-terminal-purple text-xs">K3s Cluster</div>
                <div className="text-gray-400 text-xs">Version 1.33</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-gradient-to-br from-terminal-cyan/10 to-terminal-purple/10 border border-terminal-cyan/30 rounded-lg p-6"
          >
            <h3 className="text-xl text-terminal-cyan mb-4">Infrastructure Features</h3>
            <ul className="space-y-2 text-sm">
              {[
                { icon: Zap, text: 'K3s v1.33 lightweight Kubernetes', color: 'yellow' },
                { icon: RefreshCw, text: 'Custom Helm charts deployment', color: 'green' },
                { icon: Shield, text: 'NGINX Ingress + MetalLB', color: 'blue' },
                { icon: Activity, text: 'GPU passthrough for Jellyfin', color: 'purple' },
                { icon: HardDrive, text: 'Local-path storage provisioner', color: 'pink' },
                { icon: Network, text: 'Direct router connection', color: 'amber' },
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <feature.icon className={`w-4 h-4 text-${feature.color}-400`} />
                  <span>{feature.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-gradient-to-br from-terminal-purple/10 to-terminal-pink/10 border border-terminal-purple/30 rounded-lg p-6"
          >
            <h3 className="text-xl text-terminal-purple mb-4">Deployment Scripts</h3>
            <div className="bg-black/50 rounded p-3 font-mono text-xs space-y-2">
              <div>
                <span className="text-gray-400"># Deploy all toons</span>
                <div><span className="text-terminal-green">$</span> ./deploy-toons.sh --all</div>
              </div>
              <div>
                <span className="text-gray-400"># Node-specific deployment</span>
                <div><span className="text-terminal-green">$</span> ./deploy.sh --node tweety</div>
              </div>
              <div>
                <span className="text-gray-400"># Backup strategy (coming soon)</span>
                <div><span className="text-terminal-green">$</span> ./backup-acme.sh --restic</div>
              </div>
              <div>
                <span className="text-gray-400"># Health check</span>
                <div><span className="text-terminal-green">$</span> ./check-toons.sh --verbose</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated network connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff00" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {mounted && [...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 15}%`}
            y1="20%"
            x2={`${30 + i * 15}%`}
            y2="80%"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </svg>
    </section>
  )
}

export default Homelab
