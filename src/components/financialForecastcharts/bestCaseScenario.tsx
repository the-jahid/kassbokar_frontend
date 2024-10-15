"use client"

import { useState } from 'react'
import { useGetAllBestCaseScenariosQuery } from "@/lib/rtkqueryAPI/bestCaseScenario"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const BestCaseScenario = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isFetching, isLoading, isSuccess } = useGetAllBestCaseScenariosQuery(financial_forecast_id)
  const [activeMetric, setActiveMetric] = useState('all')

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (!isSuccess || !data) {
    return <div>Error loading data</div>
  }

  const chartData = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5'].map(fy => {
    const fyData = {
      name: fy,
      Revenue: data.find(item => item.name === 'revenue')?.[fy as keyof typeof data[0]] ?? 0,
      'Cost of Goods Sold': data.find(item => item.name === 'cost_of_goods_sold')?.[fy as keyof typeof data[0]] ?? 0,
      'Gross Margin': data.find(item => item.name === 'gross_margin')?.[fy as keyof typeof data[0]] ?? 0,
      EBIT: data.find(item => item.name === 'ebit')?.[fy as keyof typeof data[0]] ?? 0,
      'Gross Margin %': (Number(data.find(item => item.name === 'gross_margin_revenue')?.[fy as keyof typeof data[0]]) ?? 0) * 100,
      'EBIT %': (Number(data.find(item => item.name === 'ebit_revenue')?.[fy as keyof typeof data[0]]) ?? 0) * 100,
    }
    return fyData
  })

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  const metrics = [
    { key: 'Revenue', color: 'hsl(var(--chart-1))' },
    { key: 'Cost of Goods Sold', color: 'hsl(var(--chart-2))' },
    { key: 'Gross Margin', color: 'hsl(var(--chart-3))' },
    { key: 'EBIT', color: 'hsl(var(--chart-4))' },
  ]

  const percentageMetrics = [
    { key: 'Gross Margin %', color: 'hsl(var(--chart-5))' },
    { key: 'EBIT %', color: 'hsl(var(--chart-6))' },
  ]

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle>Best Case Scenario Financial Forecast</CardTitle>
        <CardDescription>5-Year Projection of Key Financial Metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto " >
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded ${activeMetric === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setActiveMetric('all')}
          >
            All
          </button>
          {[...metrics, ...percentageMetrics].map(metric => (
            <button
              key={metric.key}
              className={`px-3 py-1 rounded ${activeMetric === metric.key ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => setActiveMetric(metric.key)}
            >
              {metric.key}
            </button>
          ))}
        </div>
        <ChartContainer
          config={{
            ...Object.fromEntries(metrics.map(m => [m.key, { label: m.key, color: m.color }])),
            ...Object.fromEntries(percentageMetrics.map(m => [m.key, { label: m.key, color: m.color }])),
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={formatYAxis} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {metrics.map(metric => (
                (activeMetric === 'all' || activeMetric === metric.key) && (
                  <Bar
                    key={metric.key}
                    dataKey={metric.key}
                    fill={`var(--color-${metric.key.toLowerCase().replace(/ /g, '-')})`}
                    yAxisId="left"
                  />
                )
              ))}
              {percentageMetrics.map(metric => (
                (activeMetric === 'all' || activeMetric === metric.key) && (
                  <Line
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={`var(--color-${metric.key.toLowerCase().replace(/ /g, '-')})`}
                    yAxisId="right"
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

export default BestCaseScenario