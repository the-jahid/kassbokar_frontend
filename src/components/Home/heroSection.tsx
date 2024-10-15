'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Compare } from "@/components/ui/compare"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()
  const y = useMotionValue(0)
  const opacity = useTransform(y, [-100, 0, 100], [0, 1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
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

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/grid-pattern.svg')",
          backgroundSize: "cover",
          opacity: 0.1,
        }}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
      />
      <div className="container mx-auto px-4 py-20">
        <div className="hero-content flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <Compare
              firstImage="https://i.ibb.co.com/sJdc8jd/18363.jpg"
              secondImage="https://i.ibb.co.com/GMMrnGV/4668603.jpg"
              secondImageClassname="object-cover object-left-top"
              className="h-[250px] w-[200px] md:h-[500px] md:w-[500px] rounded-lg shadow-2xl"
              slideMode="hover"
              autoplay={true}
            />
          </motion.div>
          <motion.div
            className="lg:w-1/2 relative"
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              style={{ y, opacity }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              AI-Powered Business Strategy Creator
            </motion.h1>
            <motion.div
              className="absolute top-0 -right-5"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image src="/Lightning1.png" width={30} height={30} alt="lightning" priority />
            </motion.div>
            <motion.p
              className="text-lg mb-8 text-gray-700"
              variants={textVariants}
            >
              Craft tailored business plans, insightful market research, and strategic roadmaps with our AI, built on expertise from thousands of successful projects.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className={cn('bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg')} >
               <Link href={'/dashboard/createBuisnessPlan'}>Generate Buisness Plan</Link>
              </Button>
            </motion.div>
            <motion.div
              className="flex space-x-8 mt-8"
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
              {["OpenAI Logo.png", "Goodle AI Logo.png"].map((logo, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image src={`/${logo}`} width={100} height={100} alt={`AI Logo ${index + 1}`} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  )
}

export default HeroSection