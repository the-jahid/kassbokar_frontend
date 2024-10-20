'use client'

import React from 'react'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TeamProps {
  control: Control<any>
  errors: any
}

export default function Team({ control, errors }: TeamProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'management_team_members',
  })

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold">Team</h2>
        <Separator />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold">Management Team Members</h2>
        <p className="text-sm md:text-base text-muted-foreground">For each key person on your current team, including yourself, complete the information below.</p>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name_${index}`}>Name</Label>
                  <Controller
                    name={`management_team_members.${index}.name`}
                    control={control}
                    rules={{ required: 'Please enter the name' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={`name_${index}`}
                        placeholder="Enter name"
                      />
                    )}
                  />
                  {errors.management_team_members?.[index]?.name && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.management_team_members[index].name.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title_${index}`}>Title</Label>
                  <Controller
                    name={`management_team_members.${index}.title`}
                    control={control}
                    rules={{ required: 'Please enter the title' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={`title_${index}`}
                        placeholder="Enter title"
                      />
                    )}
                  />
                  {errors.management_team_members?.[index]?.title && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {errors.management_team_members[index].title.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`background_${index}`}>Background</Label>
                <Controller
                  name={`management_team_members.${index}.background`}
                  control={control}
                  rules={{ required: 'Please enter the background' }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id={`background_${index}`}
                      placeholder="Enter background information"
                      className="min-h-[100px]"
                    />
                  )}
                />
                {errors.management_team_members?.[index]?.background && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {errors.management_team_members[index].background.message}
                    </AlertDescription>
                  </Alert>
                )}
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

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => append({ name: '', title: '', background: '' })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>
    </div>
  )
}