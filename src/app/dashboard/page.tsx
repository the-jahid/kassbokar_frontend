'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Edit3, PieChart, MessageCircle, Play } from 'lucide-react'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType;
  preview: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, preview }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <motion.img
            src={preview}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <motion.div
          className="flex items-center text-blue-500 font-medium"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <span className="mr-2">Get Started</span>
          <ChevronRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  )
}

const MarketResearchOverview = () => {
  const [activeTab, setActiveTab] = useState('Market Summary')

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Market Research Overview</h2>
      <p className="text-gray-600 mb-4">Analysis and Forecast of your business growth</p>
      <div className="flex mb-4">
        {['Market Summary', 'Competitive Analysis', 'Target Demographics'].map((tab) => (
          <motion.button
            key={tab}
            className={`mr-4 pb-2 ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-2">
          {activeTab === 'Market Summary' && 'Market size forecast'}
          {activeTab === 'Competitive Analysis' && 'Top Competitors'}
          {activeTab === 'Target Demographics' && 'Key Demographics'}
        </h3>
        <div className="h-40 bg-gray-100 rounded-lg"></div>
      </motion.div>
    </motion.div>
  )
}

const VideoTutorial = () => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 mt-8"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <h2 className="text-2xl font-semibold mb-4">Video Tutorial</h2>
    <p className="text-gray-600 mb-4">Learn how to maximize the value from Kassbokar by becoming an expert user</p>
    <motion.button
      className="flex items-center text-blue-500 font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Play size={20} className="mr-2" />
      Watch Video
    </motion.button>
  </motion.div>
)

export default function AdvancedBusinessPlanningTool() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Advanced Business Planning Tool
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Edit Business Plan"
          description="Download or continue your custom business plan"
          icon={Edit3}
          preview="/placeholder.svg?height=160&width=240"
        />
        <FeatureCard
          title="Create Pitch Deck"
          description="Craft your custom investor deck to pitch investors"
          icon={PieChart}
          preview="/placeholder.svg?height=160&width=240"
        />
        <FeatureCard
          title="Speak with an Expert"
          description="Let Kassobokar recommend an expert to assist in your objectives"
          icon={MessageCircle}
          preview="/placeholder.svg?height=160&width=240"
        />
      </div>
      <MarketResearchOverview />
      <VideoTutorial />
    </div>
  )
}