"use client"

import { useState } from 'react'
import { useGetAllWorstCaseScenariosQuery } from "@/lib/rtkqueryAPI/worstCaseScenario"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { Button } from "@/components/ui/button"

const WorstCaseScenario = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isError, isFetching, isSuccess, isLoading } = useGetAllWorstCaseScenariosQuery(financial_forecast_id)
  const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'operating_expenses', 'gross_margin', 'ebit', 'cost_of_goods_sold'])

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !isSuccess || !data) {
    return <div>Error loading data</div>
  }

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: 'hsl(var(--chart-1))' },
    { key: 'operating_expenses', label: 'Operating Expenses', color: 'hsl(var(--chart-2))' },
    { key: 'gross_margin', label: 'Gross Margin', color: 'hsl(var(--chart-3))' },
    { key: 'ebit', label: 'EBIT', color: 'hsl(var(--chart-4))' },
    { key: 'cost_of_goods_sold', label: 'Cost of Goods Sold', color: 'hsl(var(--chart-5))' },
  ]

  type DataItem = {
    name: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
  };

  const chartData = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5'].map(fy => {
    const fyData: { [key: string]: any } = { name: fy };
    metrics.forEach(metric => {
      const item = data.find((item: DataItem) => item.name === metric.key);
      if (item) {
        fyData[metric.label] = item[fy as keyof DataItem];
      }
    });
    return fyData;
  });

  const toggleMetric = (metricKey: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricKey) 
        ? prev.filter(key => key !== metricKey)
        : [...prev, metricKey]
    )
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle>Worst Case Scenario Financial Forecast</CardTitle>
        <CardDescription>5-Year Projection of Key Financial Metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto " >
        <div className="mb-4 flex flex-wrap gap-2">
          {metrics.map(metric => (
            <Button
              key={metric.key}
              variant={selectedMetrics.includes(metric.key) ? "default" : "outline"}
              onClick={() => toggleMetric(metric.key)}
            >
              {metric.label}
            </Button>
          ))}
        </div>
        <ChartContainer
          config={Object.fromEntries(metrics.map(m => [m.label, { label: m.label, color: m.color }]))}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis tickFormatter={formatValue} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {metrics.filter(m => selectedMetrics.includes(m.key)).map(metric => (
                <Radar
                  key={metric.key}
                  name={metric.label}
                  dataKey={metric.label}
                  stroke={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                  fill={`var(--color-${metric.label.toLowerCase().replace(/ /g, '-')})`}
                  fillOpacity={0.6}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default WorstCaseScenario

