"use client"

import Image from "next/image"
import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import {
  IconChartBar,
  IconCurrencyDollar,
  IconPresentationAnalytics,
  IconReportMoney,
} from "@tabler/icons-react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const links = [
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
  {
    title: "Cash Flow",
    icon: <IconCurrencyDollar className="h-5 w-5" />,
    href: "/dashboard/cashflow",
  },
  {
    title: "Profit & Loss",
    icon: <IconReportMoney className="h-5 w-5" />,
    href: "/dashboard/profitloss",
  },
]

export function FinancialModelCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <CardContainer className="inter-var">
      <div 
        className="bg-gray-50 relative group/card dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-dot-white/[0.2] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody>
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
        <div className="flex justify-between items-center mt-20">
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
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              View Details
            </Button>
          </CardItem>
          <CardItem translateZ={20} className="w-64">
            <FloatingDock items={links} />
          </CardItem>
        </div>
        </CardBody>
      </div>
    </CardContainer>
  )
}