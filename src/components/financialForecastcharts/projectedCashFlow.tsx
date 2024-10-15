"use client"

import { useState } from 'react'
import { useGetAllProjectedCashFlowsQuery } from "@/lib/rtkqueryAPI/projectedCashFlow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = [
  '#53c76b',
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#FF8C33',
  '#33FFF5',
  '#FF33F5',
  '#F5FF33',
  '#33FF8C',
  '#8C33FF',
  '#FF338C',
  '#338CFF',
  '#8CFF33',
]

interface CashFlowItem {
  id: string
  name: string
  FY1: number
  FY2: number
  FY3: number
  FY4: number
  FY5: number
  financialForecastId: string
}

interface ChartDataItem {
  name: string
  value: number
  actualValue: number
}

const ProjectedCashFlow = ({ financial_forecast_id }: { financial_forecast_id: string }) => {
  const { data, isError, isFetching, isLoading, isSuccess } = useGetAllProjectedCashFlowsQuery(financial_forecast_id)
  const [activeYear, setActiveYear] = useState<string>('FY1')
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError || !isSuccess || !data) {
    return <div>Error loading data</div>
  }

  const years: string[] = ['FY1', 'FY2', 'FY3', 'FY4', 'FY5']

  const prepareChartData = (year: string): ChartDataItem[] => {
    return data
      .filter((item: CashFlowItem) => item[year as keyof CashFlowItem] !== 0)
      .map((item: CashFlowItem) => ({
        name: item.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value: Math.abs(item[year as keyof CashFlowItem] as number),
        actualValue: item[year as keyof CashFlowItem] as number,
      }))
      .sort((a: ChartDataItem, b: ChartDataItem) => b.value - a.value)
  }

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value}`
  }

  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background p-2 border rounded shadow-sm">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">
            Value: {formatValue(data.actualValue)}
          </p>
        </div>
      )
    }
    return null
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${formatValue(payload.actualValue)} (${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  return (
    <Card className="w-full max-w-full md:flex md:flex-col md:justify-center md:items-center ">
      <CardHeader>
        <CardTitle>Projected Cash Flow</CardTitle>
        <CardDescription>Distribution of Cash Flow Components by Fiscal Year</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 overflow-y-auto " >
        <Tabs value={activeYear} onValueChange={setActiveYear}>
          <TabsList className="grid w-full grid-cols-5">
            {years.map(year => (
              <TabsTrigger key={year} value={year}>{year}</TabsTrigger>
            ))}
          </TabsList>
          {years.map(year => (
            <TabsContent key={year} value={year}>
              <ChartContainer className="h-[400px] sm:h-[500px] md:h-[600px]" config={{ /* your config here */ }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={prepareChartData(year)}
                      cx="50%"
                      cy="50%"
                      innerRadius="30%"
                      outerRadius="60%"
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                    >
                      {prepareChartData(year).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<CustomTooltip />} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default ProjectedCashFlow