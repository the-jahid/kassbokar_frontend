"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Edit, Download, PieChart, BarChart, TrendingUp, DollarSign, Users, Target, Briefcase, LineChart, Presentation, Zap, Layers, ShoppingCart, Globe, Inbox, CreditCard, Percent, Shuffle, Delete, Loader2 } from "lucide-react"
import { useDeleteBusinessPlanMutation, useGetBuisnessPlanQuery } from "@/lib/rtkqueryAPI/buisnessPlan"
import { useDeleteFinancialForecastMutation, useGetFinancialForecastQuery } from "@/lib/rtkqueryAPI/financialForecast"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const backgroundIcons = [
  FileText, PieChart, BarChart, TrendingUp, DollarSign, Users, Target, Briefcase, LineChart, Zap, Layers, ShoppingCart, Globe, Inbox, CreditCard, Percent, Shuffle
]

export default function BusinessPlanDashboard() {
  const companyID = localStorage.getItem('selectedCompanyId') || ''
  const { data: buisnessPlanData, isLoading: isBuisnessPlanLoading, refetch } = useGetBuisnessPlanQuery(companyID)
  const { data: financialForecastData, isLoading: isFinancialForecastLoading } = useGetFinancialForecastQuery(companyID)
  const [deleteBuisnessPlan, { isLoading: isDeleting }] = useDeleteBusinessPlanMutation()
  const [deleteFinancialForecast] = useDeleteFinancialForecastMutation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCreate = () => router.push('/dashboard/createBuisnessPlan')
  const handleEdit = () => router.push('/dashboard/editBuisnessPlan')
  const handleDownload = () => console.log("Download button clicked")

  const handleDelete = async (company_id:string) => {
    try {
      if (buisnessPlanData?.id) {
        await deleteBuisnessPlan(company_id).unwrap()
        await deleteFinancialForecast(company_id).unwrap()
        toast({
          title: "Business plan deleted successfully",
          variant: "default",
        })
        refetch()
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Error deleting business plan",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  if (!mounted) return null

  const isLoading = isBuisnessPlanLoading || isFinancialForecastLoading
  const isBuisnessPlanNotAvailable = !buisnessPlanData
  const isFinancialForecastNotAvailable = !financialForecastData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {backgroundIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-gray-200 opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon />
        </motion.div>
      ))}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="business-plan" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="business-plan" className="text-lg">Business Plan</TabsTrigger>
            <TabsTrigger value="financial-model" className="text-lg">Financial Model</TabsTrigger>
          </TabsList>
          <TabsContent value="business-plan">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-2xl text-blue-800">Business Plan</CardTitle>
                  <CardDescription className="text-blue-600">Comprehensive strategy for success</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-24">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">
                        {isBuisnessPlanNotAvailable
                          ? "Create a business plan to outline your path to success."
                          : "Our innovative business plan outlines a clear path to market dominance and sustainable growth."}
                      </p>
                      {!isBuisnessPlanNotAvailable && (
                        <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                      )}
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 bg-gray-50 mt-4">
                  <Button onClick={handleCreate} className="w-full sm:w-auto bg-primary hover:bg-blue-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                  <Button
                    disabled={isBuisnessPlanNotAvailable}
                    onClick={handleEdit}
                    variant="outline"
                    className="w-full sm:w-auto border-blue-300 text-blue-600 hover:bg-primary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {!isBuisnessPlanNotAvailable && (
                    <Button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="w-full sm:w-auto bg-red-500 hover:bg-red-700"
                    >
                      <Delete className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="financial-model">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-2xl text-primary">Financial Model</CardTitle>
                  {isFinancialForecastNotAvailable ? (
                    <CardDescription className="text-red-500">Create a business plan to see chart and forecast</CardDescription>
                  ) : (
                    <CardDescription className="text-green-600">Explore your business's financial projections and analysis</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-24">
                      <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Button
                        disabled={isFinancialForecastNotAvailable}
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => router.push('/dashboard/financialForecast')}
                      >
                        <PieChart className="h-10 w-10 mb-2 text-green-600" />
                        <span className="text-lg font-semibold">Financial Forecast</span>
                      </Button>
                      <Button
                        disabled={isFinancialForecastNotAvailable}
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => router.push('/dashboard/financialForecastCharts')}
                      >
                        <BarChart className="h-10 w-10 mb-2 text-green-600" />
                        <span className="text-lg font-semibold">Charts</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this business plan?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your business plan and all associated financial data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Cancel</button>
            <button onClick={() => handleDelete(companyID)} className="bg-red-500 hover:bg-red-600">
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}