"use client"

import { useState } from 'react'
import { useGetAllProjectedBalanceSheetsQuery } from "@/lib/rtkqueryAPI/projectedBalanceSheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BalanceSheetItem {
  id: string
  name: string
  FY1: number
  FY2: number
  FY3: number
  FY4: number
  FY5: number
  financialForecastId: string
}

interface Metric {
  key: string
  label: string
  color: string
  type: 'bar' | 'line'
}

interface ChartDataItem {
  name: string
  [key: string]: string | number
}

const ProjectedBalanceSheet = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isError, isFetching, isLoading, isSuccess } = useGetAllProjectedBalanceSheetsQuery(financial_forecast_id)
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['total_assets', 'total_liabilities', 'retained_earnings'])

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !isSuccess || !data) {
    return <div>Error loading data</div>
  }

  const metrics: Metric[] = [
    { key: 'cash', label: 'Cash', color: 'var(--color-chart-1)', type: 'bar' },
    { key: 'other_current_assets', label: 'Other Current Assets', color: 'var(--color-chart-2)', type: 'bar' },
    { key: 'total_current_assets', label: 'Total Current Assets', color: 'var(--color-chart-3)', type: 'line' },
    { key: 'intangible_assets', label: 'Intangible Assets', color: 'var(--color-chart-4)', type: 'bar' },
    { key: 'tangible_assets', label: 'Tangible Assets', color: 'var(--color-chart-5)', type: 'bar' },
    { key: 'total_long_term_assets', label: 'Total Long Term Assets', color: 'var(--color-chart-6)', type: 'line' },
    { key: 'total_assets', label: 'Total Assets', color: 'var(--color-chart-7)', type: 'line' },
    { key: 'current_liabilities', label: 'Current Liabilities', color: 'var(--color-chart-8)', type: 'bar' },
    { key: 'debt_outstanding', label: 'Debt Outstanding', color: 'var(--color-chart-9)', type: 'bar' },
    { key: 'total_liabilities', label: 'Total Liabilities', color: 'var(--color-chart-10)', type: 'line' },
    { key: 'share_capital', label: 'Share Capital', color: 'var(--color-chart-11)', type: 'bar' },
    { key: 'retained_earnings', label: 'Retained Earnings', color: 'var(--color-chart-12)', type: 'line' },
  ]

  const chartData: ChartDataItem[] = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5'].map(fy => {
    const fyData: ChartDataItem = { name: fy }
    metrics.forEach(metric => {
      const item = data.find((item: BalanceSheetItem) => item.name === metric.key)
      if (item) {
        fyData[metric.label] = item[fy as keyof BalanceSheetItem] as number
      }
    })
    return fyData
  })

  const toggleMetric = (metricKey: string) => {
    setActiveMetrics(prev => 
      prev.includes(metricKey) 
        ? prev.filter(key => key !== metricKey)
        : [...prev, metricKey]
    )
  }

  const formatYAxis = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle>Projected Balance Sheet</CardTitle>
        <CardDescription>5-Year Projection of Balance Sheet Items</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto " >
        <ScrollArea className=" w-full mb-4">
          <div className="flex flex-wrap gap-2 p-4">
            {metrics.map(metric => (
              <Button
                key={metric.key}
                variant={activeMetrics.includes(metric.key) ? "default" : "outline"}
                onClick={() => toggleMetric(metric.key)}
                className="mb-2"
              >
                {metric.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <ChartContainer
          config={Object.fromEntries(metrics.map(m => [m.label, { label: m.label, color: m.color }]))}
          className="h-[400px] sm:h-[500px] md:h-[600px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxis} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {metrics.filter(m => activeMetrics.includes(m.key)).map(metric => (
                metric.type === 'bar' ? (
                  <Bar
                    key={metric.key}
                    dataKey={metric.label}
                    fill={metric.color}
                    stackId="a"
                  />
                ) : (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.label}
                    stroke={metric.color}
                    strokeWidth={2}
                  />
                )
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ProjectedBalanceSheet