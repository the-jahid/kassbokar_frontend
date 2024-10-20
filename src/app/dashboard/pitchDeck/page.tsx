'use client'

import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react'

type FundAllocation = {
  percentage: string
  category: string
}

type Milestone = {
  date: string
  description: string
}

type FormData = {
  companyName: string
  stage: string
  problem: string
  solution: string
  founders: { fullName: string; bio: string }[]
  competitorComparison: string
  businessModel: string
  fundRaisingAmount: string
  fundAllocation: FundAllocation[]
  goToMarketStrategy: string
  milestones: Milestone[]
}

const formSections = [
  {
    title: 'What is your company Name?',
    name: 'companyName',
    type: 'text',
  },
  {
    title: 'What stage are you at?',
    name: 'stage',
    type: 'radio',
    options: ['Pre Product', 'Pre Revenue', 'Revenue < $1M', 'Growth Stage'],
  },
  {
    title: 'What is the problem you are trying to solve?',
    name: 'problem',
    type: 'textarea',
  },
  {
    title: 'How do you solve this problem?',
    name: 'solution',
    type: 'textarea',
  },
  {
    title: 'Who is your founding team?',
    name: 'founders',
    type: 'founders',
  },
  {
    title: 'Why is your company better than your competitors?',
    name: 'competitorComparison',
    type: 'textarea',
  },
  {
    title: 'How does your business make money?',
    name: 'businessModel',
    type: 'textarea',
  },
  {
    title: 'How much money are you raising?',
    name: 'fundRaisingAmount',
    type: 'text',
  },
  {
    title: 'What are you using the funds for?',
    name: 'fundAllocation',
    type: 'fundAllocation',
  },
  {
    title: 'What is your go-to-market strategy?',
    name: 'goToMarketStrategy',
    type: 'textarea',
  },
  {
    title: 'What are your near-term objectives or milestones?',
    name: 'milestones',
    type: 'milestones',
  },
]

export default function ExtendedPitchDeckForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const { register, control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      founders: [{ fullName: '', bio: '' }],
      fundAllocation: [
        { percentage: '50', category: 'Product Development' },
        { percentage: '25', category: 'Market Research' },
        { percentage: '15', category: 'Marketing & Outreach' },
        { percentage: '10', category: 'Operational Costs' },
      ],
      milestones: [{ date: '', description: '' }],
    },
  })
  const { fields: founderFields, append: appendFounder, remove: removeFounder } = useFieldArray({
    control,
    name: 'founders',
  })
  const { fields: fundFields, append: appendFund, remove: removeFund } = useFieldArray({
    control,
    name: 'fundAllocation',
  })
  const { fields: milestoneFields, append: appendMilestone, remove: removeMilestone } = useFieldArray({
    control,
    name: 'milestones',
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    // Handle form submission
  }

  const nextStep = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateWithAI = (field: string) => {
    // Implement AI generation logic here
    console.log(`Generating AI content for ${field}`)
  }

  const renderFormField = (section: typeof formSections[0]) => {
    switch (section.type) {
      case 'text':
        return (
          <input
            {...register(section.name as keyof FormData)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={`Enter ${section.name}`}
          />
        )
      case 'radio':
        return (
          <div className="space-y-2">
            {section.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register(section.name as keyof FormData)}
                  value={option}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )
      case 'textarea':
        return (
          <>
            <textarea
              {...register(section.name as keyof FormData)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              rows={4}
              placeholder={`Enter ${section.name}`}
            />
            <button
              type="button"
              onClick={() => generateWithAI(section.name)}
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Generate with AI
            </button>
          </>
        )
      case 'founders':
        return (
          <div>
            {founderFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 border border-gray-300 rounded-md">
                <h4 className="font-semibold mb-2">Founder {index + 1}</h4>
                <input
                  {...register(`founders.${index}.fullName` as const)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Full Name"
                />
                <textarea
                  {...register(`founders.${index}.bio` as const)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  rows={3}
                  placeholder="Bio"
                />
                <button
                  type="button"
                  onClick={() => removeFounder(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendFounder({ fullName: '', bio: '' })}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Add Founder
            </button>
          </div>
        )
      case 'fundAllocation':
        return (
          <div>
            {fundFields.map((field, index) => (
              <div key={field.id} className="mb-4 flex items-center space-x-2">
                <input
                  {...register(`fundAllocation.${index}.percentage` as const)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md"
                  placeholder="% of funds"
                />
                <input
                  {...register(`fundAllocation.${index}.category` as const)}
                  className="w-3/4 p-2 border border-gray-300 rounded-md"
                  placeholder="Category"
                />
                <button
                  type="button"
                  onClick={() => removeFund(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendFund({ percentage: '', category: '' })}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Add Fund Allocation
            </button>
          </div>
        )
      case 'milestones':
        return (
          <div>
            {milestoneFields.map((field, index) => (
              <div key={field.id} className="mb-4 flex items-center space-x-2">
                <input
                  {...register(`milestones.${index}.date` as const)}
                  className="w-1/4 p-2 border border-gray-300 rounded-md"
                  placeholder="Date"
                />
                <input
                  {...register(`milestones.${index}.description` as const)}
                  className="w-3/4 p-2 border border-gray-300 rounded-md"
                  placeholder="Milestone description"
                />
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendMilestone({ date: '', description: '' })}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Add Milestone
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Pitch Deck</h1>
        <p className="mb-4">Provide the following information to get your AI generated Pitch deck.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">{formSections[currentStep].title}</h2>
              {renderFormField(formSections[currentStep])}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <span className="text-sm text-gray-500">
              {currentStep + 1} out of {formSections.length} steps
            </span>
            {currentStep === formSections.length - 1 ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Generate Pitch
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}