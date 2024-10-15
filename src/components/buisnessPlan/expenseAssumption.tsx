'use client'

import { useState } from "react"
import { Control, Controller, useFieldArray } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Plus, Trash2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"


interface ExpenseAssumptionProps {
  control: Control<any>
  errors: any
}

const ExpenseAssumption = ({ control, errors }: ExpenseAssumptionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'operating_expenses',
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
      description: "Expense assumptions have been generated.",
    })
  }

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle>Expense Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="space-y-5">
            <h2 className="text-xl font-semibold">Financial Assumptions</h2>
            <p>Please share if your business is raising funding:</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="is_business_raising_funding">Is the business raising funding?</Label>
                <Controller
                  name="is_business_raising_funding"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="is_business_seeking_bankLoan">If raising funds, is the business seeking a bank loan?</Label>
                <Controller
                  name="is_business_seeking_bankLoan"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Capital Requirements</h2>
                <p className="text-sm text-muted-foreground">Please add your capital requirements</p>
              </div>
              <Button onClick={handleGenerateAI} disabled={isGenerating}>
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

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="initial_capital">Initial Capital</Label>
                      <Controller
                        name="initial_capital"
                        control={control}
                        rules={{ required: 'Please enter the initial capital' }}
                        render={({ field }) => (
                          <Input {...field} id="initial_capital" placeholder="Enter initial capital" />
                        )}
                      />
                      {errors.initial_capital && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.initial_capital.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="working_capital">Working Capital</Label>
                      <Controller
                        name="working_capital"
                        control={control}
                        rules={{ required: 'Please enter the working capital' }}
                        render={({ field }) => (
                          <Input {...field} id="working_capital" placeholder="Enter working capital" />
                        )}
                      />
                      {errors.working_capital && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{errors.working_capital.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capital_expenditure">Capital Expenditure</Label>
                    <Controller
                      name="capital_expenditure"
                      control={control}
                      rules={{ required: 'Please enter the capital expenditure' }}
                      render={({ field }) => (
                        <Input {...field} id="capital_expenditure" placeholder="Enter capital expenditure" />
                      )}
                    />
                    {errors.capital_expenditure && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.capital_expenditure.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capital_assumptions">Initial Capital Assumptions</Label>
                    <Controller
                      name="initial_capital_assumptions"
                      control={control}
                      rules={{ required: 'Please enter the capital assumptions' }}
                      render={({ field }) => (
                        <Textarea {...field} id="capital_assumptions" placeholder="Enter capital assumptions" />
                      )}
                    />
                    {errors.capital_assumptions && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.capital_assumptions.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capital_expenditure_assumptions">Capital Expenditure Assumptions</Label>
                    <Controller
                      name="capital_expenditure_assumptions"
                      control={control}
                      rules={{ required: 'Please enter the capital assumptions' }}
                      render={({ field }) => (
                        <Textarea {...field} id="capital_expenditure_assumptions" placeholder="Enter capital assumptions" />
                      )}
                    />
                    {errors.capital_assumptions && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.capital_assumptions.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="working_capital_assumptions">Working Capital Assumptions</Label>
                    <Controller
                      name="working_capital_assumptions"
                      control={control}
                      rules={{ required: 'Please enter the capital assumptions' }}
                      render={({ field }) => (
                        <Textarea {...field} id="working_capital_assumptions" placeholder="Enter capital assumptions" />
                      )}
                    />
                    {errors.capital_assumptions && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.capital_assumptions.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          <section className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Operating Expenses</h2>
                <p className="text-sm text-muted-foreground">Please list your monthly operating expenses:</p>
              </div>
              <Button variant="outline" onClick={handleGenerateAI} disabled={isGenerating}>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`category_${index}`}>Category</Label>
                          <Controller
                            name={`operating_expenses.${index}.category`}
                            control={control}
                            rules={{ required: 'Please enter the category' }}
                            render={({ field }) => (
                              <Input {...field} id={`category_${index}`} placeholder="Enter category" />
                            )}
                          />
                          {errors.operating_expenses?.[index]?.category && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{errors.operating_expenses[index].category.message}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`amount_${index}`}>Amount</Label>
                          <Controller
                            name={`operating_expenses.${index}.amount`}
                            control={control}
                            rules={{ required: 'Please enter the amount' }}
                            render={({ field }) => (
                              <Input {...field} id={`amount_${index}`} placeholder="Enter amount" type="number" />
                            )}
                          />
                          {errors.operating_expenses?.[index]?.amount && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{errors.operating_expenses[index].amount.message}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`growth_rate_${index}`}>Growth Rate</Label>
                          <Controller
                            name={`operating_expenses.${index}.growth_rate`}
                            control={control}
                            rules={{ required: 'Please enter the growth rate' }}
                            render={({ field }) => (
                              <Input {...field} id={`growth_rate_${index}`} placeholder="Enter growth rate" type="number" />
                            )}
                          />
                          {errors.operating_expenses?.[index]?.growth_rate && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{errors.operating_expenses[index].growth_rate.message}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`growth_rate_unit_${index}`}>Growth Rate Unit</Label>
                          <Controller
                            name={`operating_expenses.${index}.growth_rate_unit`}
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id={`growth_rate_unit_${index}`}>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="%">Percentage (%)</SelectItem>
                                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`currency_${index}`}>Currency</Label>
                          <Controller
                            name={`operating_expenses.${index}.currency`}
                            control={control}
                            rules={{ required: 'Please enter the currency' }}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id={`currency_${index}`}>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor={`assumptions_${index}`}>Assumptions</Label>
                        <Controller
                          name={`operating_expenses.${index}.assumptions`}
                          control={control}
                          rules={{ required: 'Please enter the assumptions' }}
                          render={({ field }) => (
                            <Textarea {...field} id={`assumptions_${index}`} placeholder="Enter assumptions" />
                          )}
                        />
                        {errors.operating_expenses?.[index]?.assumptions && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.operating_expenses[index].assumptions.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="mt-4"
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
              onClick={() => append({ category: '', amount: '', currency: 'USD', growth_rate: '', growth_rate_unit: '%', assumptions: '' })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Expense
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExpenseAssumption