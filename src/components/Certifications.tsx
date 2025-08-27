import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Shield, CheckCircle, Award } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

// Certification data - replace with your actual certifications
const certificationsData = [
  {
    id: 1,
    name: 'Certified Kubernetes Administrator',
    issuer: 'Linux Foundation',
    issueDate: 'August 2025',
    expiryDate: 'August 2027',
    // Get this URL by right-clicking on your Credly badge image and copying the image address
    badgeImageUrl: 'https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png', // Replace with actual image URL
    credentialUrl: 'https://www.credly.com/badges/21cf20f8-790a-40bb-ae13-ca03a1a707ad/public_url',
    description: 'Demonstrates ability to design distributed systems on Kubernetes',
    status: 'Active'
  }
  // {
  //   id: 2,
  //   name: 'Microsoft Azure Fundamentals',
  //   issuer: 'Microsoft',
  //   issueDate: 'November 2023',
  //   badgeImageUrl: 'https://images.credly.com/size/340x340/images/your-azure-badge.png', // Replace with actual image URL
  //   credentialUrl: 'https://www.credly.com/badges/your-azure-badge-url',
  //   description: 'Foundation-level knowledge of cloud services and Azure',
  //   status: 'Active'
  // },
  // {
  //   id: 3,
  //   name: 'Google Cloud Professional',
  //   issuer: 'Google Cloud',
  //   issueDate: 'September 2023',
  //   expiryDate: 'September 2025',
  //   badgeImageUrl: 'https://images.credly.com/size/340x340/images/your-gcp-badge.png', // Replace with actual image URL
  //   credentialUrl: 'https://www.credly.com/badges/your-gcp-badge-url',
  //   description: 'Professional-level expertise in Google Cloud Platform',
  //   status: 'Active'
  // }
]

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [hoveredCert, setHoveredCert] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const handleImageError = (certId: number) => {
    setImageErrors(prev => new Set(prev).add(certId))
  }

  // Determine fallback icon based on issuer
  const getFallbackIcon = (issuer: string) => {
    const issuerLower = issuer.toLowerCase()
    if (issuerLower.includes('aws') || issuerLower.includes('amazon')) {
      return { icon: Shield, color: 'text-terminal-amber' }
    } else if (issuerLower.includes('microsoft') || issuerLower.includes('azure')) {
      return { icon: Award, color: 'text-terminal-cyan' }
    } else if (issuerLower.includes('google')) {
      return { icon: Shield, color: 'text-terminal-purple' }
    }
    return { icon: Award, color: 'text-terminal-green' }
  }

  return (
    <section id="certifications" className="min-h-screen py-20 px-4 bg-gradient-to-b from-dark-bg to-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-terminal-green">
            $ kubectl get certifications --all-namespaces
          </h2>
          <p className="text-terminal-cyan text-sm">
            Showing verified credentials and professional certifications...
          </p>
        </motion.div>

        {/* Grid with auto-centering for any number of items */}
        <div 
          ref={ref} 
          className="grid gap-6 justify-center"
          style={{
            gridTemplateColumns: certificationsData.length === 1 
              ? 'minmax(0, 400px)' 
              : certificationsData.length === 2
              ? 'repeat(auto-fit, minmax(300px, 400px))'
              : 'repeat(auto-fit, minmax(300px, 1fr))',
            maxWidth: certificationsData.length === 1 ? '400px' : certificationsData.length === 2 ? '850px' : '100%',
            margin: '0 auto'
          }}
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="terminal-window hover-glow overflow-hidden"
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Badge Image Section - Same structure as iframe but with image */}
              <div className="relative bg-gray-900/70 p-6 flex justify-center items-center min-h-[280px] border-b border-terminal-green/20">
                {cert.badgeImageUrl && !imageErrors.has(cert.id) ? (
                  <>
                    {/* Badge Image Container */}
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block group"
                    >
                      <img
                        src={cert.badgeImageUrl}
                        alt={`${cert.name} badge`}
                        className="w-[300px] h-[300px] object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={() => handleImageError(cert.id)}
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-terminal-green/0 group-hover:bg-terminal-green/10 transition-colors duration-300 rounded-lg pointer-events-none" />
                      
                      {/* Click indicator on hover */}
                      {hoveredCert === cert.id && (
                        <div className="absolute bottom-2 right-2 text-terminal-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </a>
                    
                    {/* Subtle glow effect */}
                    {hoveredCert === cert.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full bg-gradient-radial from-terminal-green/5 to-transparent" />
                      </div>
                    )}
                  </>
                ) : (
                  // Fallback display if image fails or not provided
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[150px] h-[150px] rounded-full border-2 border-terminal-green/30 flex items-center justify-center mb-3 bg-gray-800/50">
                      {(() => {
                        const { icon: Icon, color } = getFallbackIcon(cert.issuer)
                        return <Icon className={`w-20 h-20 ${color}`} />
                      })()}
                    </div>
                    <span className="text-terminal-green/50 text-sm">Verified Certificate</span>
                  </div>
                )}
              </div>

              {/* Certification Details - Same as before */}
              <div className="p-6 space-y-3">
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-terminal-green animate-pulse" />
                    <span className="text-terminal-green text-xs">{cert.status}</span>
                  </span>
                  {cert.expiryDate && (
                    <span className="text-terminal-amber text-xs">Exp: {cert.expiryDate}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-terminal-cyan">
                  {cert.name}
                </h3>
                
                <p className="text-terminal-green/70 text-sm font-mono">
                  {cert.issuer}
                </p>

                {cert.description && (
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {cert.description}
                  </p>
                )}

                <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-terminal-green/10">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Issued: {cert.issueDate}</span>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-terminal-cyan hover:text-terminal-green transition-colors group text-sm"
                  >
                    <span className="mr-1">View on Credly</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal output style footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 terminal-window p-4"
        >
          <div className="font-mono text-xs space-y-1">
            <div className="text-terminal-green">$ certification-validator --status</div>
            <div className="text-gray-400">
              <span className="text-terminal-cyan">[INFO]</span> All certifications verified ✓
            </div>
            <div className="text-gray-400">
              <span className="text-terminal-cyan">[INFO]</span> Badges authenticated via Credly
            </div>
            <div className="text-gray-400">
              <span className="text-terminal-amber">[NOTE]</span> Click badges to view on issuer platform
            </div>
            <div className="text-terminal-green">
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
