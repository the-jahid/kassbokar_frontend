'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toolsItems } from '@/lib/constant'
import { ChevronDown, ChevronUp } from 'lucide-react'

const ToolsSection = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  }

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Tools for Unleashing Your Business Potential
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform empowers startups and SMEs with expert-level consulting services, providing the tools you need to succeed.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {toolsItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <motion.div
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="bg-primary/10 p-3 rounded-full"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image src={item.icon} width={40} height={40} alt="" className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-primary" />
                  </motion.div>
                </motion.div>
                <AnimatePresence initial={false}>
                  {expandedItem === index && (
                    <motion.div
                      key={`content-${index}`}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={expandVariants}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ToolsSection