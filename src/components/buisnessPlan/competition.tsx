'use client'

import React, { useState } from 'react'
import { useForm, Controller, useFieldArray, Control } from 'react-hook-form'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from '@/hooks/use-toast'

interface CompetitionProps {
  control: Control<any>
  errors: any
}

export default function Competition({ control, errors }: CompetitionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'direct_competitors',
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
      description: "Competitors have been generated.",
    })
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Competitive Analysis</h2>
        <Separator />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Direct Competitors</h2>
            <p className="text-sm text-muted-foreground">Please add each of your direct competitors below, or let the AI generate them (recommended):</p>
          </div>

          <Button
            variant="outline"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate from AI'
            )}
          </Button>
        </div>
        
        {fields.map((item, index) => (
          <Card key={item.id} className="my-4">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`competitor_name_${index}`}>Competitor Name</Label>
                  <Controller
                    name={`direct_competitors.${index}.competitor_name`}
                    control={control}
                    rules={{ required: 'Please enter the competitor name' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={`competitor_name_${index}`}
                        placeholder="Enter competitor name"
                      />
                    )}
                  />
                  {errors.direct_competitors?.[index]?.competitor_name && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.direct_competitors[index].competitor_name.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`locations_${index}`}>Locations</Label>
                  <Controller
                    name={`direct_competitors.${index}.locations`}
                    control={control}
                    rules={{ required: 'Please enter the locations' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={`locations_${index}`}
                        placeholder="Enter locations"
                      />
                    )}
                  />
                  {errors.direct_competitors?.[index]?.locations && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.direct_competitors[index].locations.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="destructive"
                className="w-full sm:w-auto"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => append({ competitor_name: '', locations: '' })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Competitor
      </Button>
    </div>
  )
}