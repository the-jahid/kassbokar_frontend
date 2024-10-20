'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { ArrowRight, BarChart, PieChart, TrendingUp, Zap } from "lucide-react"

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const backgroundIcons = [BarChart, PieChart, TrendingUp]

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
      <div className="absolute inset-0 z-0">
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
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              AI-Powered <span className="text-primary">Business Strategy</span> Creator
            </h1>
            <p className="text-xl mb-8 text-gray-700 leading-relaxed">
              Craft tailored business plans, insightful market research, and strategic roadmaps with our AI, built on expertise from thousands of successful projects.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className={cn('bg-primary text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300')}>
                <Link href="/dashboard/createBusinessPlan">
                  Generate Business Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-primary/10 rounded-2xl"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <Image
                src="https://i.ibb.co.com/sJdc8jd/18363.jpg"
                width={700}
                height={500}
                alt="Business Strategy Illustration"
                className="rounded-xl shadow-2xl"
              />
              <motion.div
                className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-3 shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Zap className="h-8 w-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 flex justify-center space-x-12"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {["OpenAI", "Google AI"].map((logo, index) => (
            <motion.div
              key={index}
              variants={variants}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <Image src={`/${logo.toLowerCase().replace(' ', '-')}-logo.png`} width={120} height={48} alt={`${logo} Logo`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection