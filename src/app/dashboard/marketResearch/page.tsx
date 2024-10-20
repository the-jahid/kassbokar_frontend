'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, BarChart2, PieChart, Users, ArrowRight, Check } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20, transition: { duration: 0.6 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const Header = () => (
  <motion.header className="text-center mb-12" variants={stagger} initial="initial" animate="animate">
    <motion.h1 className="text-4xl font-bold mb-4" variants={fadeInUp}>
      Create best-in-class reports
      <br />
      for investors, internal meetings, and more.
    </motion.h1>
    <motion.p className="text-gray-600 mb-6 max-w-2xl mx-auto" variants={fadeInUp}>
      Simply describe the type of research you need, your product, and KasboarAI will use information to build charts, graphs, and visualizations to back your team's decision-making.
    </motion.p>
    <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeInUp}>
      {[
        { name: 'Competitive Benchmarking', icon: BarChart2 },
        { name: 'Industry Analysis', icon: PieChart },
        { name: 'Customer Segmentation', icon: Users }
      ].map((item, index) => (
        <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center">
          <item.icon className="w-4 h-4 mr-2" />
          {item.name}
        </span>
      ))}
    </motion.div>
  </motion.header>
)

const ToolPreview = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Overview', 'Competitors', 'Market Size']

  return (
    <motion.div
      className="mb-12 bg-white rounded-lg shadow-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-medium ${
                activeTab === index ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 0 && (
              <div className="space-y-4">
                <motion.div
                  className="h-8 bg-gray-100 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  className="h-8 bg-gray-100 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
                <motion.div
                  className="h-8 bg-gray-100 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Competitor A</span>
                  <motion.div
                    className="h-4 bg-blue-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Competitor B</span>
                  <motion.div
                    className="h-4 bg-green-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Competitor C</span>
                  <motion.div
                    className="h-4 bg-yellow-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex items-center justify-center h-48">
                <PieChart className="w-32 h-32 text-blue-500" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const SubscribeButton = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-4">Unlock Access to Market Research Pro</h2>
      <motion.button
        className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        Subscribe
        <motion.div
          className="ml-2"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

const HowItWorks = () => {
  const steps = [
    {
      title: 'KasboarAI reads the industry and competitive data',
      description: 'Pick an industry that interests you. KasboarAI will gather relevant insights and select companies to benchmark against.',
      icon: BarChart2,
    },
    {
      title: 'The system generates your report in real-time',
      description: 'Using NLP, KasboarAI accesses various data platforms to gather the most up-to-date insights.',
      icon: PieChart,
    },
    {
      title: 'Review your report and gain insights',
      description: 'View all the insights KasboarAI has gathered. Refresh the report at any time for the most current information.',
      icon: Users,
    },
  ]

  return (
    <section className="mb-16">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How it works
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            variants={fadeInUp}
          >
            <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <step.icon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

const Testimonial = () => (
  <motion.div
    className="bg-gray-100 rounded-lg p-6 mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 1 }}
  >
    <blockquote className="text-lg italic text-gray-700 mb-4">
      "KasboarAI has revolutionized our market research process. We've cut our research time in half and gained deeper insights than ever before."
    </blockquote>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
      <div>
        <p className="font-semibold">Jane Doe</p>
        <p className="text-sm text-gray-600">CEO, TechCorp</p>
      </div>
    </div>
  </motion.div>
)

export default function AdvancedMarketResearchLanding() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans">
      <Header />
      <ToolPreview />
      <SubscribeButton />
      <HowItWorks />
      <Testimonial />
    </div>
  )
}