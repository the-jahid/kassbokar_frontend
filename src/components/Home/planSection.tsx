"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CardDemo } from "@/components/ui/animatedCard"
import { iconTextPairs } from "@/lib/constant"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const FeatureComparison = ({ title, withAI, withoutAI }: { title: string; withAI: string; withoutAI: string }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex justify-between text-sm">
        <span>Without AI: {withoutAI}</span>
        <span>With AI: {withAI}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

const PlanSection = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-lg my-10">
      <div className="absolute inset-0 z-0">
        <Image src="/Rectangle88.png" layout="fill" objectFit="cover" alt="background" className="opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <motion.div variants={itemVariants} className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Transform Your Business Planning
            </h2>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Without KassbokarAI</h3>
              <p className="text-lg text-gray-600">Sluggish and unreliable business planning</p>
              {iconTextPairs.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center space-x-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Image src={item.src} width={item.width} height={item.height} alt={item.alt} />
                  </div>
                  <p className="text-gray-800">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4">Compare Features</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>AI vs Traditional Planning</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <FeatureComparison title="Time to Create Plan" withoutAI="2-4 weeks" withAI="24-48 hours" />
                  <FeatureComparison title="Market Analysis Depth" withoutAI="Limited" withAI="Comprehensive" />
                  <FeatureComparison title="Financial Forecast Accuracy" withoutAI="±30%" withAI="±10%" />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <CardDemo />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PlanSection