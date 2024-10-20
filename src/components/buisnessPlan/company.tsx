'use client'

import React, { useState } from 'react'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, Plus, Trash2, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from '@/hooks/use-toast'

interface CompanyProps {
  control: Control<any>
  errors: any
}

export default function Company({ control, errors }: CompanyProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products_services',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateAI = async () => {
    setIsGenerating(true)
    // Simulating AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    toast({
      title: "AI Generation Complete",
      description: "Success factors have been generated.",
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto my-4 md:my-8">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Company Information</CardTitle>
        <CardDescription className="text-sm md:text-base">Provide details about your company's success factors and products/services.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-lg font-semibold">Success Factors</h3>
            <Button 
              onClick={handleGenerateAI} 
              disabled={isGenerating}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate From AI'
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="success_factors" className="text-sm md:text-base">
              Please explain the unique features of your business compared to the competitors.
            </Label>
            <Controller
              name="success_factors"
              control={control}
              rules={{ required: 'Please provide a description of your company\'s unique features' }}
              render={({ field }) => (
                <>
                  <Textarea
                    {...field}
                    id="success_factors"
                    placeholder="Enter your company's success factors"
                    className="min-h-[100px] md:min-h-[150px]"
                  />
                  {errors.success_factors && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.success_factors.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Products/Services & Pricing</h3>
            <p className="text-sm text-muted-foreground">
              Please list each of your businesses' products and/or services below:
            </p>
          </div>

          <AnimatePresence>
            {fields.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`product_name_${index}`} className="text-sm md:text-base">Product/Service Name</Label>
                        <Controller
                          name={`products_services.${index}.product_service_name`}
                          control={control}
                          rules={{ required: 'Please enter the product/service name' }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id={`product_name_${index}`}
                              placeholder="Enter product/service name"
                            />
                          )}
                        />
                        {errors.products_services?.[index]?.product_service_name && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {errors.products_services[index].product_service_name.message}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`price_${index}`} className="text-sm md:text-base">Price</Label>
                        <Controller
                          name={`products_services.${index}.price`}
                          control={control}
                          rules={{ required: 'Please enter the price' }}
                          render={({ field }) => (
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <Input
                                {...field}
                                id={`price_${index}`}
                                placeholder="Enter price"
                                className="pl-8"
                              />
                            </div>
                          )}
                        />
                        {errors.products_services?.[index]?.price && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {errors.products_services[index].price.message}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description_${index}`} className="text-sm md:text-base">Description/Benefits</Label>
                      <Controller
                        name={`products_services.${index}.product_service_description_benefits`}
                        control={control}
                        rules={{ required: 'Please enter the description/benefits' }}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id={`description_${index}`}
                            placeholder="Enter description and benefits"
                            className="min-h-[100px]"
                          />
                        )}
                      />
                      {errors.products_services?.[index]?.product_service_description_benefits && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {errors.products_services[index].product_service_description_benefits.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      className="mt-4 w-full sm:w-auto"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => append({ product_service_name: '', price: '', product_service_description_benefits: '' })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product/Service
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}