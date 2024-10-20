'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CheckCircle, BarChart, PieChart, TrendingUp, FileText, Users } from 'lucide-react'

const features = [
  { name: "Custom Plans", icon: FileText },
  { name: "Financial Forecasts", icon: TrendingUp },
  { name: "Market Analysis", icon: PieChart },
  { name: "Competitor Insights", icon: Users },
  { name: "Performance Metrics", icon: BarChart },
]

const backgroundIcons = [BarChart, PieChart, TrendingUp, FileText, Users]

export default function BusinessPlanSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      {backgroundIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-gray-200"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon />
        </motion.div>
      ))}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build Your <span className="text-blue-600">Business Plan</span> in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create a personalized business plan with our AI-driven generator. Craft unique, compelling plans backed by dependable market research.
            </p>
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card>
                    <CardContent className="flex items-center p-2">
                      <feature.icon className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">{feature.name}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className={cn('bg-blue-600 hover:bg-blue-700 text-white')}
                disabled={isSubmitted}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isSubmitted ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isSubmitted ? (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                </motion.div>
                {isSubmitted ? 'Submitted' : 'Get Started'}
              </Button>
            </motion.form>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-white shadow-xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-4">Business Plan Generator</h2>
                <div className="space-y-4">
                  {['Executive Summary', 'Market Analysis', 'Financial Projections', 'Marketing Strategy'].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-3" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}