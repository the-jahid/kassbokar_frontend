'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, CheckCircle } from 'lucide-react'

const features = [
  "Fully Custom Plans",
  "Financial Forecasts",
  "Proven Strategies",
  "Market Analysis",
  "Competitor Insights"
]

export default function BusinessPlanSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const springConfig = useMemo(() => ({ stiffness: 100, damping: 30, restDelta: 0.001 }), [])
  const ySpring = useSpring(y, springConfig)
  const opacitySpring = useSpring(opacity, springConfig)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/z296fbX/aerial-view-business-team.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: ySpring,
          opacity: opacitySpring
        }}
      />
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Build Your Business Plan in Minutes
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Create a personalized business plan with an AI-driven generator that crafts unique, compelling plans backed by dependable market research.
            </p>
            <motion.div 
              className="flex flex-wrap gap-3 mb-8"
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
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold transition-colors duration-300 hover:bg-blue-600"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature}
                </motion.span>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit" 
                  className={cn('bg-primary')} 
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
              </motion.div>
            </motion.form>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="https://i.ibb.co/SXB1qrX/Default-double-exposure-a-woman-silhouette-against-a-city-back-0-1920x1086.webp"
              width={1920}
              height={1086}
              alt="Business plan illustration"
              className="rounded-lg shadow-2xl"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}