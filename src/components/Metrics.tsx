import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Activity, Cloud, Zap, CheckCircle, TrendingUp, BarChart3, Users, DollarSign } from 'lucide-react'

const Metrics: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [mounted, setMounted] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    costReduction: 0,
    teamsSupported: 0,
    deploymentTime: 0,
    recoveryTime: 0
  })

  const [liveMetrics, setLiveMetrics] = useState({
    cpu: 45,
    memory: 68,
    network: 82,
    requests: 1250
  })

  // Fix hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Animate counter values
  useEffect(() => {
    if (inView && mounted) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        setAnimatedValues({
          costReduction: Math.min(75, Math.floor((75 * currentStep) / steps)),
          teamsSupported: Math.min(150, Math.floor((150 * currentStep) / steps)),
          deploymentTime: Math.min(90, Math.floor((90 * currentStep) / steps)),
          recoveryTime: Math.min(24, Math.floor((24 * currentStep) / steps))
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [inView, mounted])

  // Simulate live metrics
  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setLiveMetrics(prev => ({
        cpu: Math.min(100, Math.max(20, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(30, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.min(100, Math.max(10, prev.network + (Math.random() - 0.5) * 15)),
        requests: Math.floor(1000 + Math.random() * 500)
      }))
    }, 1500)
    return () => clearInterval(timer)
  }, [mounted])

  const impactMetrics = [
    {
      label: 'Cost Reduction',
      value: mounted ? animatedValues.costReduction : 0,
      unit: '%',
      subtitle: '$2M+ saved annually',
      icon: DollarSign,
      color: 'terminal-green'
    },
    {
      label: 'Teams Supported',
      value: mounted ? animatedValues.teamsSupported : 0,
      unit: '+',
      subtitle: 'Across ZS Associates',
      icon: Users,
      color: 'terminal-cyan'
    },
    {
      label: 'Deployment Efficiency',
      value: mounted ? animatedValues.deploymentTime : 0,
      unit: '%',
      subtitle: '2.5hr → 15min',
      icon: Zap,
      color: 'terminal-purple'
    },
    {
      label: 'Recovery Time',
      value: mounted ? animatedValues.recoveryTime : 0,
      unit: 'hr',
      subtitle: 'vs 27 days benchmark',
      icon: CheckCircle,
      color: 'terminal-amber'
    }
  ]

  return (
    <section id="metrics" className="min-h-screen py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-terminal-green"
        >
          $ prometheus query impact_metrics
        </motion.h2>

        {/* Impact Metrics Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              className={`terminal-window p-4 hover:border-${metric.color}/50 transition-all hover-glow`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{metric.label}</span>
                <metric.icon className={`w-4 h-4 text-${metric.color}`} />
              </div>
              <div className={`text-2xl font-bold text-${metric.color}`}>
                {metric.value}{metric.unit}
              </div>
              <div className="text-xs text-gray-500">{metric.subtitle}</div>
            </motion.div>
          ))}
        </div>

        {/* Live System Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="terminal-window p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-terminal-cyan">Live System Metrics</h3>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-terminal-green animate-pulse" />
              <span className="text-sm text-terminal-green">Monitoring Active</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'CPU Utilization', value: mounted ? liveMetrics.cpu : 45, color: 'from-terminal-green to-terminal-cyan' },
              { label: 'Memory Usage', value: mounted ? liveMetrics.memory : 68, color: 'from-terminal-purple to-terminal-pink' },
              { label: 'Network I/O', value: mounted ? liveMetrics.network : 82, color: 'from-terminal-amber to-orange-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span>{metric.label}</span>
                  <span>{metric.value.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`bg-gradient-to-r ${metric.color} h-3 rounded-full transition-all duration-1000`}
                    animate={{ width: `${metric.value}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Requests per second */}
          <div className="mt-6 bg-black/50 rounded p-3 font-mono text-sm">
            <div className="flex items-center justify-between">
              <span className="text-terminal-cyan">Requests/sec:</span>
              <span className="text-terminal-green font-bold">{mounted ? liveMetrics.requests : 1250}</span>
            </div>
          </div>
        </motion.div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="terminal-window p-6">
            <h3 className="text-xl text-terminal-purple mb-4">Key Accomplishments @ ZS Associates</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-terminal-green mt-0.5" />
                <span>Reduced EKS infrastructure costs by 75% per tenant</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-terminal-cyan mt-0.5" />
                <span>Designed multi-tenant platform for 50 tenants with 15 GenAI microservices</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-terminal-amber mt-0.5" />
                <span>Recovered 90% servers in 24hrs during CrowdStrike incident</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-terminal-purple mt-0.5" />
                <span>Built 15+ automation scripts reducing manual work by 30%</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-terminal-pink mt-0.5" />
                <span>Standardized containers for 150+ applications</span>
              </li>
            </ul>
          </div>

          <div className="terminal-window p-6">
            <h3 className="text-xl text-terminal-amber mb-4">Performance Metrics</h3>
            <div className="bg-black/50 rounded p-3 font-mono text-xs">
              <pre className="text-terminal-green">
{`# ZS Associates Impact Summary
┌─────────────────────────────────┐
│ Metric              │ Value     │
├─────────────────────────────────┤
│ Infrastructure Cost │ -75%      │
│ Deployment Time     │ -90%      │
│ Manual Work         │ -30%      │
│ Container Size      │ -40%      │
│ Recovery Speed      │ 26x       │
│ Teams Enabled       │ 150+      │
│ Productivity Gain   │ +20%      │
└─────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Metrics
