"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, FileText, CheckCircle, ArrowRight } from "lucide-react"

const features = [
  { icon: Sparkles, text: "AI Powered", color: "bg-purple-100 text-purple-600" },
  { icon: FileText, text: "Office Compatible", color: "bg-blue-100 text-blue-600" },
  { icon: CheckCircle, text: "ISO Certified", color: "bg-green-100 text-green-600" },
]

const steps = [
  "Analyzing market trends",
  "Generating financial projections",
  "Crafting marketing strategies",
  "Finalizing your business plan",
]

export default function AIBusinessPlan() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const startGeneration = () => {
    setIsGenerating(true)
    setProgress(0)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        setCurrentStep(Math.floor((prevProgress + 5) / 25))
        return prevProgress + 5
      })
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-2xl"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-3xl font-bold tracking-tight">
            AI Business Plan Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg mb-6 text-gray-700">
            Harness the power of AI to create a comprehensive business plan tailored to your unique vision and market dynamics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 260, damping: 20 }}
              >
                <Badge variant="secondary" className={`text-sm py-2 px-4 ${feature.color}`}>
                  <feature.icon className="w-4 h-4 mr-2" />
                  {feature.text}
                </Badge>
              </motion.div>
            ))}
          </div>
          {!isGenerating ? (
            <Button onClick={startGeneration} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Generate Your Business Plan <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <div className="space-y-4">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-center text-sm text-gray-600">{steps[currentStep]}</p>
            </div>
          )}
          <AnimatePresence>
            {!isGenerating && progress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-green-600 font-semibold mb-2">Your business plan is ready!</p>
                <Button variant="outline" className="mr-2">
                  Download PDF
                </Button>
                <Button variant="outline">
                  View Online
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}