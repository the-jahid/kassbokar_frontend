'use client'

import React, { useState, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Overview from '@/components/buisnessPlan/overview'
import CoverPageIntformation from '@/components/buisnessPlan/coverPageIntformation'
import Company from '@/components/buisnessPlan/company'
import Competition from '@/components/buisnessPlan/competition'
import Team from '@/components/buisnessPlan/team'

import { useToast } from '@/hooks/use-toast'
import ExpenseAssumption from '@/components/buisnessPlan/expenseAssumption'
import RevenueAssumption from '@/components/buisnessPlan/revenueAssumption'
import { cn } from '@/lib/utils'


 // Ensure this path is correct

const steps = [
  { title: 'Overview', component: Overview },
  { title: 'Cover Page Information', component: CoverPageIntformation },
  { title: 'Company', component: Company },
  { title: 'Competition', component: Competition },
  { title: 'Team', component: Team },
  { title: 'Expense Assumption', component: ExpenseAssumption },
  { title: 'Revenue Assumption', component: RevenueAssumption },
]

const formSchema = z.object({
  // Define your form schema here
  is_new_company: z.boolean(),
  company_description: z.string().min(1, "Company description is required"),
  main_goal_of_business_plan: z.string().min(1, "Main goal is required"),
  selected_language_for_plan: z.string().min(1, "Language selection is required"),
  company_name: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  success_factors: z.string().min(1, "Success factors are required"),
  products_services: z.array(z.object({
    product_service_name: z.string().min(1, "Product/Service name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    product_service_description_benefits: z.string().min(1, "Description/Benefits are required")
  })),
  direct_competitors: z.array(z.object({
    competitor_name: z.string().min(1, "Competitor name is required"),
    locations: z.string().min(1, "Locations are required")
  })),
  management_team_members: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    background: z.string().min(1, "Background is required")
  })),
  initial_capital: z.number().min(0, "Initial capital must be a positive number"),
  initial_capital_assumptions: z.string().min(1, "Initial capital assumptions are required"),
  working_capital: z.number().min(0, "Working capital must be a positive number"),
  working_capital_assumptions: z.string().min(1, "Working capital assumptions are required"),
  capital_expenditure: z.number().min(0, "Capital expenditure must be a positive number"),
  capital_expenditure_assumptions: z.string().min(1, "Capital expenditure assumptions are required"),
  operating_expenses: z.array(z.object({
    category: z.string().min(1, "Category is required"),
    amount: z.number().min(0, "Amount must be a positive number"),
    growth_rate: z.number(),
    growth_rate_unit: z.string().min(1, "Growth rate unit is required"),
    assumptions: z.string().min(1, "Assumptions are required"),
    currency: z.string().min(1, "Currency is required")
  })),
  is_business_raising_funding: z.boolean(),
  is_business_seeking_bankLoan: z.boolean()
})

type FormData = z.infer<typeof formSchema>

const CreateBusinessPlan = () => {

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const methods = useForm<FormData>({
   
    mode: 'onChange',
    defaultValues: {
      is_new_company: false,
      company_description: '',
      main_goal_of_business_plan: '',
      selected_language_for_plan: 'english',
      company_name: '',
      country: '',
      city: '',
      success_factors: '',
      products_services: [{ product_service_name: '', price: 0, product_service_description_benefits: '' }],
      direct_competitors: [{ competitor_name: '', locations: '' }],
      management_team_members: [{ name: '', title: '', background: '' }],
      initial_capital: 0,
      initial_capital_assumptions: '',
      working_capital: 0,
      working_capital_assumptions: '',
      capital_expenditure: 0,
      capital_expenditure_assumptions: '',
      operating_expenses: [{ category: '', amount: 0, growth_rate: 0, growth_rate_unit: '', assumptions: '', currency: '' }],
      is_business_raising_funding: false,
      is_business_seeking_bankLoan: false
    }
  })

  const { handleSubmit, trigger, formState: { errors, isValid } } = methods

  const nextStep = useCallback(async () => {
    const isStepValid = await trigger()
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
    }
  }, [trigger, toast])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
    
     
      toast({
        title: "Success",
        description: "Your business plan has been submitted successfully!",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your business plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center">Create Your Business Plan</h1>
          <p className="text-muted-foreground text-center">Complete all steps to generate your comprehensive business plan</p>
        </div>

        <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full" />

        <div className="flex flex-col md:flex-row flex-wrap justify-start gap-2 md:gap-4 mb-6 md:mb-8">
            {steps.map((step, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`flex items-center p-2 rounded-btn text-sm md:text-base ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStep
                    ? 'bg-primary/50 text-primary-foreground'
                    : ' text-secondary-foreground'
                }`}
                disabled={index > currentStep}
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full mr-2 bg-white text-primary">
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                {step.title}
              </button>
            ))}
          </div>

        <div className="min-h-[400px] p-6 border rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent control={methods.control} errors={errors} handleSubmit={handleSubmit} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
            variant="outline"
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                'Submit Plan'
              )}
            </Button>
          ) : (
            <Button className={cn('bg-primary rounded-btn ')} type="button" onClick={nextStep} disabled={isSubmitting}>
              Next
            </Button>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-destructive/15 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm font-medium text-destructive">Please correct the following errors:</p>
            </div>
            <ul className="mt-2 list-disc list-inside text-sm text-destructive">
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{value.message}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </form>
    </FormProvider>
  )
}

export default CreateBusinessPlan