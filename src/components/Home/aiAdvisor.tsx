"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const features = [
  { title: "Natural Language Processing", description: "Understand and respond to user queries in natural language" },
  { title: "Personalized Recommendations", description: "Provide tailored advice based on user preferences and history" },
  { title: "Real-time Data Analysis", description: "Process and analyze data in real-time for up-to-date insights" },
  { title: "Multi-platform Support", description: "Available on web, mobile, and as an API for seamless integration" },
]

export default function AiAdvisor() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [demoQuery, setDemoQuery] = useState("")
  const [demoResponse, setDemoResponse] = useState("")

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDemoResponse(`AI Advisor: Based on your query "${demoQuery}", here's my advice...`)
  }

  return (
    <section className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-200 via-violet-500 to-cyan-100"}`}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Meet Your AI Advisor</h1>
          <p className="text-xl mb-8">Built for the modern business to engage users and provide intelligent insights</p>
          <div className="flex items-center justify-center">
            <Label htmlFor="dark-mode" className="mr-2">
              {isDarkMode ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
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
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm opacity-70">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Try AI Advisor Demo</h2>
          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <div>
              <Label htmlFor="demo-query" className="sr-only">
                Enter your question
              </Label>
              <Input
                id="demo-query"
                type="text"
                placeholder="Enter your question for AI Advisor..."
                value={demoQuery}
                onChange={(e) => setDemoQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Get AI Advice
            </Button>
          </form>
          {demoResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <p className="text-sm">{demoResponse}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}