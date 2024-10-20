"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  { title: "Natural Language Processing", description: "Understand and respond to complex queries" },
  { title: "Personalized Recommendations", description: "Tailored advice based on your business needs" },
  { title: "Real-time Data Analysis", description: "Up-to-date insights for informed decisions" },
  { title: "Multi-platform Support", description: "Seamless integration across all devices" },
]

export default function AiAdvisor() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [demoQuery, setDemoQuery] = useState("")
  const [demoResponse, setDemoResponse] = useState("")

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDemoResponse(`Based on your query "${demoQuery}", here's my advice: [AI-generated response would appear here]`)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">AI Advisor for Business</h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Intelligent insights for modern enterprises</p>
          <div className="flex items-center justify-center">
            <Label htmlFor="dark-mode" className="mr-2">
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Label>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/aiadvisor.png"
              width={600}
              height={500}
              alt="AI Advisor"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">Experience AI Advisor</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="demo-query" className="sr-only">
                    Enter your business question
                  </Label>
                  <Input
                    id="demo-query"
                    type="text"
                    placeholder="Enter your business question..."
                    value={demoQuery}
                    onChange={(e) => setDemoQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Get AI Advice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              {demoResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <p className="text-sm">{demoResponse}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}