'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, Globe, PieChart } from 'lucide-react'
import Image from 'next/image'

import { ReactNode } from 'react';

const Section = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <motion.div
    className={`bg-[#e6f7f7] p-6 rounded-lg shadow-md ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

const GetStartedButton = () => (
  <button className="bg-[#26b6b0] text-white px-4 py-2 rounded-full flex items-center mt-4 hover:bg-[#1a8c87] transition-colors">
    Get Started <ArrowRight className="ml-2 w-4 h-4" />
  </button>
)

export default function MultiBankCashVisibility() {
  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <motion.h1
        className="text-2xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        One login for multi-bank cash visibility
      </motion.h1>
      <motion.p
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your subscription also gives you access to research and tools of expert quality, comparable to leading consulting firms, empowering your business to advance and reach new heights.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section>
          <h2 className="text-xl font-semibold mb-4">Pitch Deck Generator</h2>
          <p className="text-sm mb-4">
            Create a pitch deck in just a few clicks. AI-generated using insights from our successful client funding pitches.
          </p>
          <GetStartedButton />
        </Section>

        <Section className="flex items-center justify-center">
          <PieChart className="w-48 h-48 text-[#26b6b0]" />
        </Section>

        <Section>
          <h2 className="text-xl font-semibold mb-4">Market Research</h2>
          <p className="text-sm mb-4">
            Research reports created using first-party data gathered by in-house experts and analysts.
          </p>
          <GetStartedButton />
        </Section>

        <Section>
          <h2 className="text-xl font-semibold mb-4">Investor List Builder</h2>
          <p className="text-sm mb-4">
            Export a personalized investor list from 100,000+ investors categorized by region, industry, and stage.
          </p>
          <GetStartedButton />
        </Section>

        <Section className="flex flex-wrap items-center justify-center gap-4">
          <Image src="/placeholder.svg" alt="BCG" width={100} height={50} />
          <Image src="/placeholder.svg" alt="Accenture" width={100} height={50} />
          <Image src="/placeholder.svg" alt="Deloitte" width={100} height={50} />
        </Section>

        <Section>
          <h2 className="text-xl font-semibold mb-4">Data Integrations</h2>
          <p className="text-sm mb-4">
            Integrate your data streams for tailored financial forecasts and more accurate insights with 100% security.
          </p>
          <GetStartedButton />
        </Section>

        <Section>
          <h2 className="text-xl font-semibold mb-4">Marketing Plan</h2>
          <p className="text-sm mb-4">
            Get a plan created to execute the top-line items contained with proprietary data and actionable insights.
          </p>
          <GetStartedButton />
        </Section>

        <Section>
          <h2 className="text-xl font-semibold mb-4">IO+ Tools</h2>
          <div className="flex justify-around mt-4">
            <BarChart2 className="w-8 h-8 text-[#26b6b0]" />
            <Globe className="w-8 h-8 text-[#26b6b0]" />
            <PieChart className="w-8 h-8 text-[#26b6b0]" />
          </div>
        </Section>
      </div>
    </div>
  )
}