"use client"

import React, { useState, useEffect } from 'react'
import { useGetUseOfFundsQuery } from "@/lib/rtkqueryAPI/useofFunds"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from "recharts"

type UseOfFundsData = {
  id: string
  capitalExpenditures: number
  cash: number
  liabilitiesCapital: number
  currentBorrowing: number
  longTermLiabilities: number
  accountsPayable: number
  otherCurrentLiabilities: number
  initialCapital: number
  workingCapital: number
  plannedInvestment: number
  owner: number
  investor: number
  totalStartupExpenses: number
  totalStartupAssets: number
  totalLiabilites: number
  totalPlannedInvestment: number
  financialForecastId: string
}

export default function UseOfFunds({ financial_forecast_id }: { financial_forecast_id: string }) {
  const { data, isLoading, isError } = useGetUseOfFundsQuery(financial_forecast_id)
  const [chartDimensions, setChartDimensions] = useState<{ width: number; height: number; isMobile: boolean }>({ width: 0, height: 0, isMobile: false })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let height, isMobile
      if (width < 640) {
        height = 400
        isMobile = true
      } else if (width < 1024) {
        height = 500
        isMobile = false
      } else {
        height = 600
        isMobile = false
      }
      setChartDimensions({ width, height, isMobile })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (isError) return <div className="flex justify-center items-center h-screen">Error loading data</div>

  const result = data?.data as UseOfFundsData

  const chartData = Object.entries(result || {})
    .filter(([key]) => !['id', 'financialForecastId'].includes(key))
    .map(([key, value]) => ({
      category: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: typeof value === 'number' ? value : 0
    }))

  const totalFunds = chartData.reduce((sum, item) => sum + item.value, 0)

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))"
  ]

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center">Advanced Use of Funds Distribution</CardTitle>
        <CardDescription className="text-sm sm:text-base text-center">Comprehensive breakdown of fund allocation across all categories</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto ">
        <ChartContainer
          config={chartData.reduce((acc, item, index) => ({
            ...acc,
            [item.category]: {
              label: item.category,
              color: colors[index % colors.length],
            }
          }), {})}
          className="h-[400px] sm:h-[500px] md:h-[600px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ 
                top: 20, 
                right: chartDimensions.isMobile ? 10 : 30, 
                left: chartDimensions.isMobile ? 10 : 20, 
                bottom: chartDimensions.isMobile ? 120 : 100 
              }}
            >
              <XAxis
                dataKey="category"
                angle={chartDimensions.isMobile ? -90 : -45}
                textAnchor="end"
                interval={0}
                height={chartDimensions.isMobile ? 120 : 100}
                tick={{ 
                  fill: 'hsl(var(--foreground))',
                  fontSize: chartDimensions.isMobile ? 8 : 10 
                }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="hsl(var(--foreground))"
                tick={{ fontSize: chartDimensions.isMobile ? 8 : 10 }}
                width={chartDimensions.isMobile ? 30 : 60}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="hsl(var(--foreground))"
                tick={{ fontSize: chartDimensions.isMobile ? 8 : 10 }}
                width={chartDimensions.isMobile ? 30 : 60}
              />
              <ChartTooltip content={<CustomTooltip totalFunds={totalFunds} />} />
              <Legend 
                wrapperStyle={{ 
                  fontSize: chartDimensions.isMobile ? 8 : 10,
                  bottom: chartDimensions.isMobile ? -10 : 0 
                }}
              />
              <Bar dataKey="value" yAxisId="left" fill="hsl(var(--primary))" opacity={0.8}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
              <Line
                type="monotone"
                dataKey="value"
                yAxisId="right"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: chartDimensions.isMobile ? 2 : 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
  totalFunds: number
}

function CustomTooltip({ active, payload, label, totalFunds }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <ChartTooltipContent>
        <div className="font-bold text-xs sm:text-sm">{label}</div>
        <div className="flex justify-between gap-2 text-xs">
          <span className="font-medium">Value:</span>
          <span>${data.value.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-2 text-xs">
          <span className="font-medium">Percentage:</span>
          <span>{((data.value / totalFunds) * 100).toFixed(2)}%</span>
        </div>
      </ChartTooltipContent>
    )
  }
  return null
}