"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Shield, Lock, Eye } from "lucide-react"

const features = [
  { icon: Shield, title: "ISO 27001", description: "Information Security Management" },
  { icon: Lock, title: "ISO 27701", description: "Privacy Information Management" },
  { icon: Eye, title: "GDPR Compliant", description: "Data Protection Regulation" },
]

export default function SecurityCompliance() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl shadow-2xl"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Uncompromising Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg mb-6 text-gray-700">
            Kassobokar, developed by industry leaders, ensures your data's integrity with top-tier certifications and stringent compliance measures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <feature.icon className="w-12 h-12 mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-lg flex items-center justify-center"
                    >
                      <p className="text-white text-center p-4">
                        Your data is protected by industry-leading standards and protocols.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              Learn More About Our Security Measures
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}