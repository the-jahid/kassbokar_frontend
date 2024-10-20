"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Award, BarChart, ArrowRight } from "lucide-react"

const features = [
  {
    icon: DollarSign,
    title: "Secure Funding",
    description: "Our AI-driven financial projections and market analysis help you create compelling pitches to investors.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Accelerate Growth",
    description: "Leverage data-driven strategies and insights to outpace your competition and scale your business.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: Award,
    title: "Industry Leadership",
    description: "Stay ahead with cutting-edge market trends and innovative business models tailored to your niche.",
    color: "from-purple-400 to-pink-600",
  },
  {
    icon: BarChart,
    title: "Performance Tracking",
    description: "Monitor your progress with real-time analytics and adjust your strategies for optimal results.",
    color: "from-orange-400 to-red-600",
  },
]

export default function WhyChoose() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-gray-50 to-blue-50 p-12 rounded-xl shadow-2xl"
    >
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Why Choose Kassobokar?</h2>
      <p className="text-xl mb-12 text-center text-gray-600 max-w-3xl mx-auto">
        Kassobokar empowers your business with AI-driven insights and strategies, giving you the edge in today's competitive landscape.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="h-full overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} text-white mr-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-4"
                    >
                      <Button variant="link" className="p-0 h-auto font-semibold text-blue-600">
                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
          Get Started with Kassobokar
        </Button>
      </div>
    </motion.div>
  )
}