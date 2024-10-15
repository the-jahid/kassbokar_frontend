'use client'

import React, { useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, Clock, Users } from "lucide-react"

const features = [
  {
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to generate data-driven business strategies and forecasts.",
    icon: Brain,
  },
  {
    title: "Real-time Market Analysis",
    description: "Stay ahead with up-to-date market trends and competitor insights.",
    icon: TrendingUp,
  },
  {
    title: "Rapid Plan Generation",
    description: "Create comprehensive business plans in minutes, not weeks.",
    icon: Clock,
  },
  {
    title: "Collaborative Planning",
    description: "Work seamlessly with your team to refine and perfect your business strategy.",
    icon: Users,
  },
]

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const [hovered, setHovered] = useState(false)
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let { currentTarget, clientX, clientY } = event
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-0"
          style={{
            opacity: useTransform(mouseX, [0, 300], [0, 0.3]),
            background: useMotionTemplate`radial-gradient(
              circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )`,
          }}
        />
        <CardHeader>
          <CardTitle className="flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: hovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {React.createElement(feature.icon as React.ComponentType<{ className: string }>, { className: "w-6 h-6 mr-2 text-blue-600" })}
            </motion.div>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {feature.title}
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {feature.description.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundImage: [
            'radial-gradient(circle at 20% 20%, #4299e1 0%, transparent 70%)',
            'radial-gradient(circle at 80% 80%, #4299e1 0%, transparent 70%)',
            'radial-gradient(circle at 20% 80%, #4299e1 0%, transparent 70%)',
            'radial-gradient(circle at 80% 20%, #4299e1 0%, transparent 70%)',
            'radial-gradient(circle at 20% 20%, #4299e1 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features for Modern Business Planning
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}