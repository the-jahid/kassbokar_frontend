"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, ChevronRight, Download, Edit, FileText, Share2, Star } from "lucide-react"
import {
  IconChartBar,

  IconPresentationAnalytics,
 
} from "@tabler/icons-react"

const financialLinks = [
  {
    title: "Financial Forecast",
    icon: <IconPresentationAnalytics className="h-5 w-5" />,
    href: "/dashboard/financialForecast",
  },
  {
    title: "Charts",
    icon: <IconChartBar className="h-5 w-5" />,
    href: "/dashboard/financialForecastcharts",
  },
 
  
]

export default function BusinessPlanPage() {
  const router = useRouter()

  const handleCreate = () => router.push('/dashboard/createBuisnessPlan')
  const handleEdit = () => router.push('/dashboard/editBuisnessPlan')
  const handleDownload = () => console.log("Download button clicked")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Business Plan Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://i.ibb.co.com/NjCrNJg/5608318.jpg"
              width={800}
              height={400}
              alt="Business Plan Image"
              className="w-full h-64 object-cover"
            />
          </motion.div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Business Plan</CardTitle>
              <Badge variant="secondary" className="text-xs">NEW</Badge>
            </div>
            <CardDescription>Comprehensive strategy for success</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our innovative business plan outlines a clear path to market dominance and sustainable growth.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Last updated: 2 days ago</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex justify-between items-center w-full">
              <TooltipProvider>
                <div className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Star className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Favorite</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
            <div className="flex justify-between w-full">
              <Button onClick={handleCreate} className="flex-1 mr-2">
                <FileText className="w-4 h-4 mr-2" />
                Create
              </Button>
              <Button onClick={handleEdit} variant="outline" className="flex-1 mx-2">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleDownload} variant="secondary" className="flex-1 ml-2">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardFooter>
        </Card>

        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-dot-white/[0.2] dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Financial Model
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Explore your business's financial projections and analysis
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://i.ibb.co.com/NjCrNJg/5608318.jpg"
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Financial Model Illustration"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-6">
              <CardItem
                translateZ={20}
                as={Badge}
                className="px-4 py-2 text-xs font-normal dark:text-white"
              >
                Your Business
              </CardItem>
              <CardItem
                translateZ={20}
                as="div"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="group-hover/card:shadow-xl">
                        NEW
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Latest financial data updated</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardItem>
            </div>
            <div className="flex justify-between items-center mt-6">
              <CardItem
                translateZ={20}
                as={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div>Hover or tap me!</div>
              </CardItem>
              <CardItem translateZ={20} className="w-64">
                <FloatingDock items={financialLinks} />
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}