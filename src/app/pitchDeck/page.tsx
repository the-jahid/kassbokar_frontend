"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, Variants, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowRight, DollarSign, TrendingUp, Award, BarChart2, Share, Search } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const features = [
  { title: "Secure the funding you need", icon: DollarSign, color: "from-blue-400 to-blue-600" },
  { title: "Grow faster with custom strategies", icon: TrendingUp, color: "from-green-400 to-green-600" },
  { title: "Stay ahead of the competition", icon: Award, color: "from-purple-400 to-purple-600" },
  { title: "Track your progress and scale", icon: BarChart2, color: "from-red-400 to-red-600" },
]

const mockupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.5,
    },
  },
}

const marketData = [
  { name: "TAM", value: 5000, color: "#10B981" },
  { name: "SAM", value: 1250, color: "#3B82F6" },
  { name: "SOM", value: 187, color: "#F59E0B" },
]

const financialData = [
  { name: "Sales", value: 40 },
  { name: "Marketing", value: 30 },
  { name: "R&D", value: 20 },
  { name: "Admin", value: 10 },
]

const forecastData = [
  { year: 2022, revenue: 50000 },
  { year: 2023, revenue: 75000 },
  { year: 2024, revenue: 100000 },
  { year: 2025, revenue: 136020 },
]

const steps = [
  { title: "Share", icon: Share, description: "Complete a brief questionnaire so ProAI fully understands the unique qualities of your business, like having an onboarding session with a top consultant." },
  { title: "Research", icon: Search, description: "ProAI combines proprietary data with third-party reports and data to analyze your industry, competitors, and other key facts about your target market." },
  { title: "Forecast", icon: BarChart2, description: "Utilize the expert recommendations, crafted from experiences assisting over 3,600 global clients. Traditional business plans are a comprehensive document that forecast multiple years into the future and contain every detail contributing to the business's success." },
]

export default function UltimatePitchDeck() {
  const controls = useAnimation()
  const [activeTab, setActiveTab] = useState("market")
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-br from-white to-teal-50"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600"
      >
        Create Investor Ready Pitch Decks in Minutes
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl text-center mb-12 text-gray-600"
      >
        Craft Your Tailored, Investor-Ready Pitch Deck with AI-Powered Insights
      </motion.p>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
          <TabsTrigger value="market">Market Research</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="why">Why Kassobokar?</TabsTrigger>
          <TabsTrigger value="investors">Investors List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Market Research</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base sm:text-lg">Get cutting-edge insights to your industry including key trends and market size.</p>
              <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex justify-center">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">Get Started For Free</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financials">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Financials Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base sm:text-lg">Get cutting-edge insights to your industry including key trends and market size.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {financialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData}>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">Get Started For Free</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="why">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Why Choose Kassobokar?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-base sm:text-lg">
                Kassobokar helps craft a tailored pitch deck to raise capital on your terms by creating AI-generated pitch decks, which save hours of work.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      onHoverStart={() => setHoveredFeature(index)}
                      onHoverEnd={() => setHoveredFeature(null)}
                      className={`flex items-center p-4 bg-gradient-to-r ${feature.color} text-white rounded-lg shadow-md transition-all duration-300`}
                    >
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 mr-4" />
                      <span className="font-semibold text-sm sm:text-base">{feature.title}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  variants={mockupVariants}
                  className="relative h-64 sm:h-80 bg-white rounded-lg shadow-xl overflow-hidden"
                >
                  <img
                    src="/placeholder.svg?height=320&width=480"
                    alt="Pitch Deck Mockup"
                    className="w-full h-full object-cover"
                  />
                  <AnimatePresence>
                    {hoveredFeature !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`absolute inset-0 bg-gradient-to-r ${features[hoveredFeature].color} bg-opacity-90 flex items-center justify-center`}
                      >
                        <p className="text-white text-lg sm:text-xl font-semibold text-center px-4">
                          {features[hoveredFeature].title}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investors">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">Your Investors List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base sm:text-lg">Get custom recommendations on which investors to target using the same methodology of our in-house team of fundraising professionals.</p>
              <div className="flex justify-center mb-8">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">Get Started For Free</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["LinkedIn", "Snov.io", "Pro Business Plans"].map((platform, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-center h-24 sm:h-32">
                        <h3 className="text-lg sm:text-xl font-semibold">{platform}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div variants={itemVariants} className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">How it works?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-16 text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-teal-600 to-blue-600 text-white text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:shadow-lg transition-all duration-300  hover:scale-105"
        >
          Create Your Pitch Deck Now <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}