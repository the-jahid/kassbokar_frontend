


'use client'

import { Control, Controller, FieldErrors } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CoverPageInformationProps {
  control: Control<any>
  errors: FieldErrors
}

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  // Add more countries as needed
]

export default function CoverPageInformation({ control, errors }: CoverPageInformationProps) {
  const renderField = (name: string, label: string, rules: object = {}) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input {...field} id={name} placeholder={`Enter ${label.toLowerCase()}`} />
            {errors[name] && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errors[name]?.message as string}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      />
    </div>
  )

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Cover Page Information</CardTitle>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="space-y-6">
        {renderField('company_name', 'Company Name', { required: 'Please enter the company name' })}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Please select a country' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.country.message as string}</AlertDescription>
              </Alert>
            )}
          </div>

          {renderField('city', 'City', { required: 'Please enter the city' })}
        </div>

      
      </CardContent>
    </Card>
  )
}



















