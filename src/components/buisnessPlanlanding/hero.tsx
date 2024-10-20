"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function WorldClassPlan() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full  mx-auto px-4 py-16 bg-gradient-to-br from-white to-teal-50"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-2"
      >
        Create a World Class Business Plan
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl font-semibold text-center mb-6 text-teal-600"
      >
        For Internal Reviews
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center text-gray-600 mb-8 max-w-2xl mx-auto"
      >
        Kassobokar combines proprietary data from top consulting firms and AI to instantly build world-class business plans.
      </motion.p>

      <div className="flex justify-center space-x-4 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            Get started for free
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" variant="outline" className="flex items-center">
            <Play className="w-4 h-4 mr-2" /> Watch Video
          </Button>
        </motion.div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Sources</h4>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-48 h-48"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 70 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-2xl font-bold">72%</p>
                  <p className="text-sm">Wholesale</p>
                </div>
              </motion.div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Consumption by Sector</h4>
              <div className="space-y-2">
                {[
                  { label: "Craft Trade Textile", value: 15 },
                  { label: "Industry", value: 39 },
                  { label: "Private", value: 26 },
                  { label: "Traffic", value: 20 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                  >
                    <div
                      className={`h-6 bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-between px-2 text-white text-sm`}
                      style={{ width: `${item.value}%` }}
                    >
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="text-5xl font-bold text-teal-600"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              $47.97 B
            </motion.div>
            <p className="text-gray-600">Total Sales</p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}