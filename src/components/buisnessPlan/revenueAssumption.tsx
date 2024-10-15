'use client'

import { useState, useEffect } from 'react'
import { useCreateBuisnessPlanMutation, useDeleteBusinessPlanMutation } from "@/lib/rtkqueryAPI/buisnessPlan"
import { useCreateFinancialForecastMutation, useDeleteFinancialForecastMutation } from "@/lib/rtkqueryAPI/financialForecast"
import { Control } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, Trash2, Edit, ChartBar, FileText } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RevenueAssumptionProps {
  control: Control<any>
  errors: any
  handleSubmit: any
}

const RevenueAssumption = ({ control, errors, handleSubmit }: RevenueAssumptionProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const [createBusinessPlan, { isLoading: isBusinessPlanLoading, isSuccess: isBusinessPlanSuccess, error: businessPlanError }] = useCreateBuisnessPlanMutation()
  const [createFinancialForecast, { isLoading: isFinancialForecastLoading, isSuccess: isFinancialForecastSuccess, error: financialForecastError }] = useCreateFinancialForecastMutation()

  const [deleteFinancialForecast] = useDeleteFinancialForecastMutation()
  const [deleteBusinessPlan] = useDeleteBusinessPlanMutation()

 

  useEffect(() => {
    setCompanyId(localStorage.getItem('selectedCompanyId'))
  }, [])

  const generateBusinessPlan = async (data: any) => {
    if (!companyId) {
      toast({
        title: "Error",
        description: "No company selected. Please select a company first.",
        variant: "destructive",
      })
      return
    }

    try {
      setGenerationProgress(0)
      const interval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const businessPlanResponse = await createBusinessPlan({
        ...data,
        company_id: companyId,
      }).unwrap()

      const financialForecastResponse = await createFinancialForecast({
        company_id: companyId,
        ...data
      }).unwrap()

      clearInterval(interval)
      setGenerationProgress(100)

      toast({
        title: "Success",
        description: "Business plan and financial forecast created successfully.",
        variant: "default",
      })

      router.push('/dashboard/editBuisnessPlan')
    } catch (error: any) {
      if (error.status === 409) {
        toast({
          title: "Conflict",
          description: "A business plan already exists for this company. You can update or delete it.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating the business plan and financial forecast.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteBusinessPlan = async () => {
    if (!companyId) {
      toast({
        title: "Error",
        description: "No company selected. Please select a company first.",
        variant: "destructive",
      })
      return
    }

    try {
      await deleteFinancialForecast(companyId).unwrap()
      await deleteBusinessPlan(companyId).unwrap()

      toast({
        title: "Success",
        description: "Business plan and financial forecast deleted successfully.",
        variant: "default",
      })
      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the business plan and financial forecast.",
        variant: "destructive",
      })
    }
  }

  const isLoading = isBusinessPlanLoading || isFinancialForecastLoading
  const isSuccess = isBusinessPlanSuccess && isFinancialForecastSuccess
  const error = businessPlanError || financialForecastError

  return (
    <Card className="w-full max-w-3xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Now</CardTitle>
        <CardDescription>Generate your business plan and financial forecast</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {'status' in error && error.status === 409
                ? "This user already has a business plan. You can update or delete to create a new one."
                : "An error occurred while processing your request. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert variant="default" className="bg-green-100 border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Business plan and financial forecast have been created successfully.
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="space-y-2">
            <Progress value={generationProgress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              {generationProgress < 100 ? 'Generating...' : 'Generation complete!'}
            </p>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit(generateBusinessPlan)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Generate Business Plan'
          )}
        </Button>

        {error && 'status' in error && error.status === 409 && (
          <Tabs defaultValue="update" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
              <TabsTrigger value="view">View</TabsTrigger>
            </TabsList>
            <TabsContent value="update">
              <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/editBuisnessPlan')}>
                <Edit className="mr-2 h-4 w-4" />
                Update Existing Plan
              </Button>
            </TabsContent>
            <TabsContent value="delete">
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Existing Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your business plan and financial forecast.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteBusinessPlan}>Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
            <TabsContent value="view">
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => router.push('/dashboard/financialForecast')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Financial Forecast
                </Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/financialForecastcharts')}>
                  <ChartBar className="mr-2 h-4 w-4" />
                  View Financial Charts
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {isSuccess && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Link href="/dashboard/editBuisnessPlan" passHref>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Business Plan
              </Button>
            </Link>
            <Link href="/dashboard/financialForecast" passHref>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Financial Forecast
              </Button>
            </Link>
            <Link href="/dashboard/financialForecastcharts" passHref>
              <Button variant="outline" className="w-full">
                <ChartBar className="mr-2 h-4 w-4" />
                Financial Charts
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RevenueAssumption