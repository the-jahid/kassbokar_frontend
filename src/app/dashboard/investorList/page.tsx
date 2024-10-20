"use client"

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const steps = [
  {
    title: "What is your company stage?",
    options: [
      "Idea stage",
      "We have MVP or Beta",
      "Product is live but pre-revenue",
      "$1,000-$10,000 /mo revenue",
      "$10,000-$50,000 /mo revenue",
      "$50,000+ /mo revenue"
    ]
  },
  {
    title: "What kind of funding are you looking for?",
    options: [
      "$100K-$250K : Friends & Family",
      "$250K-$750K : Angel Round",
      "$750K-$1.5M : Seed Round",
      "$1.5M+:Series A or later"
    ]
  },
  {
    title: "What is your investor preferences ?",
    options: [
      "Angel Investors",
      "Venture Capitalists",
      "Private Equity",
      "Family Offices",
      "Venture Debt"
    ]
  }
]

export default function InvestorList() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      selections: Array(steps.length).fill('')
    }
  })
  const [currentStep, setCurrentStep] = useState(0)
  const selections = watch('selections')

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelect = (value: string) => {
    setValue(`selections.${currentStep}`, value)
  }

  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Investor List</h2>
          <p className="text-gray-600 mb-6">Linking you with potential investors</p>
          
          <Progress value={progress} className="mb-6" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h3>
              <div className="space-y-2">
                {steps[currentStep].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selections[currentStep] === option ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button onClick={handleNext} className="ml-auto">
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-0 right-0 m-4 flex items-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="KasboKar.ai" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kasbokar">KasboKar.ai</SelectItem>
            <SelectItem value="other">Other Project</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="ml-2">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="ml-2">
          <img src="/avatar-placeholder.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
        </Button>
      </div>
    </form>
  )
}