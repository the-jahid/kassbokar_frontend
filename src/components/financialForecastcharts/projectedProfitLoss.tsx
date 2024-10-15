"use client"

import { useState } from 'react'
import { useGetAllProjectedProfitLossesQuery } from "@/lib/rtkqueryAPI/projectedProfitLoss"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const FinancialForecastChart = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isError, isFetching, isLoading, isSuccess } = useGetAllProjectedProfitLossesQuery(financial_forecast_id)
  const [activeMetrics, setActiveMetrics] = useState<string[]>([])

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !isSuccess || !data) {
    return <div>Error loading data</div>
  }

  const metrics = [
    { key: 'software_and_hardware', label: 'Software & Hardware', color: 'hsl(var(--chart-1))', type: 'bar' },
    { key: 'Subtotal_cost_of_revenue', label: 'Subtotal Cost of Revenue', color: 'hsl(var(--chart-2))', type: 'bar' },
    { key: 'gross_margin', label: 'Gross Margin', color: 'hsl(var(--chart-3))', type: 'area' },
    { key: 'miscellaneous', label: 'Miscellaneous', color: 'hsl(var(--chart-4))', type: 'bar' },
    { key: 'total_cost_of_revenue', label: 'Total Cost of Revenue', color: 'hsl(var(--chart-5))', type: 'bar' },
    { key: 'office_rent', label: 'Office Rent', color: 'hsl(var(--chart-6))', type: 'bar' },
    { key: 'gross_Margin_Revenue', label: 'Gross Margin %', color: 'hsl(var(--chart-7))', type: 'line' },
    { key: 'depreciation', label: 'Depreciation', color: 'hsl(var(--chart-8))', type: 'bar' },
    { key: 'staff_salaries', label: 'Staff Salaries', color: 'hsl(var(--chart-9))', type: 'bar' },
    { key: 'amortization', label: 'Amortization', color: 'hsl(var(--chart-10))', type: 'bar' },
    { key: 'total_operating_Expenses', label: 'Total Operating Expenses', color: 'hsl(var(--chart-11))', type: 'bar' },
    { key: 'interest_expense', label: 'Interest Expense', color: 'hsl(var(--chart-12))', type: 'bar' },
    { key: 'Utilities', label: 'Utilities', color: 'hsl(var(--chart-13))', type: 'bar' },
    { key: 'marketing', label: 'Marketing', color: 'hsl(var(--chart-14))', type: 'bar' },
    { key: 'net_income_revenue', label: 'Net Income %', color: 'hsl(var(--chart-15))', type: 'line' },
    { key: 'ebitda', label: 'EBITDA', color: 'hsl(var(--chart-16))', type: 'area' },
    { key: 'net_income', label: 'Net Income', color: 'hsl(var(--chart-17))', type: 'area' },
  ]

  const chartData = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5'].map(fy => {
    const fyData: { [key: string]: any } = { name: fy }
    metrics.forEach(metric => {
      const item = data.find(item => item.name === metric.key)
      if (item && fy in item) {
        fyData[metric.label] = item[fy as keyof typeof item]
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

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle>Comprehensive Financial Forecast</CardTitle>
        <CardDescription>5-Year Projection of All Financial Metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto " >
        <ScrollArea className=" w-full">
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
          className="h-[600px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={formatYAxis} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {metrics.filter(m => activeMetrics.includes(m.key)).map(metric => {
                if (metric.type === 'bar') {
                  return (
                    <Bar
                      key={metric.key}
                      dataKey={metric.label}
                      fill={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                      yAxisId={metric.key.includes('revenue') || metric.key.includes('Margin') ? 'right' : 'left'}
                    />
                  )
                } else if (metric.type === 'line') {
                  return (
                    <Line
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.label}
                      stroke={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                      yAxisId={metric.key.includes('revenue') || metric.key.includes('Margin') ? 'right' : 'left'}
                    />
                  )
                } else if (metric.type === 'area') {
                  return (
                    <Area
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.label}
                      fill={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                      stroke={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                      yAxisId={metric.key.includes('revenue') || metric.key.includes('Margin') ? 'right' : 'left'}
                    />
                  )
                }
                return null
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default FinancialForecastChart