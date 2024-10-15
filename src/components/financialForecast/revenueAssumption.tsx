'use client'

import React from 'react'
import { useGetRevenueAssumptionQuery } from "@/lib/rtkqueryAPI/revenueAssumption"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface RevenueAssumptionItem {
  unitName: string
  FY1: number
  FY2: number
  FY3: number
  FY4: number
  FY5: number
}

interface RevenueAssumption {
  id: string
  name: string
  pricePerUnit: number
  revenueAssumptionItems: RevenueAssumptionItem[]
}

const RevenueAssumption = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isLoading, isError, isFetching } = useGetRevenueAssumptionQuery(financial_forecast_id)

  const newValue = data?.data as RevenueAssumption[] | undefined

  if (isLoading || isFetching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-64"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </motion.div>
    )
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load revenue assumption data. Please try again later.
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      
      <AnimatePresence>
        {newValue?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={item.id}>
                <AccordionTrigger className={cn('text-2xl font-semibold')}>
                  {item.name}
                </AccordionTrigger>
                <AccordionContent className={cn('space-y-5')}>
                  <div className="flex space-x-4 items-center">
                    <Label htmlFor={`price-${item.id}`} className="text-lg font-semibold">
                      Price per Unit:
                    </Label>
                    <Input
                      id={`price-${item.id}`}
                      type="number"
                      value={item.pricePerUnit}
                      className="w-40"
                      onChange={(e) => {
                        // Handle price change
                        console.log('Price changed:', e.target.value)
                      }}
                    />
                  </div>
                  <div className="space-y-6">
                    {item.revenueAssumptionItems.map((itemName, itemIndex) => (
                      <motion.div
                        key={itemName.unitName}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="text-lg font-semibold space-y-2"
                      >
                        <p>{itemName.unitName}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {(['FY1', 'FY2', 'FY3', 'FY4', 'FY5'] as const).map((fy) => (
                            <div key={fy} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">{fy}</h4>
                              <Separator className="my-2" />
                              <p className="text-xl font-bold">{itemName[fy].toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default RevenueAssumption