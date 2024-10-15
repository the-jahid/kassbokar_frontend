import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Input Your Business Details",
    description: "Provide basic information about your business and goals.",
  },
  {
    title: "AI Analyzes Market Data",
    description: "Our AI processes vast amounts of market data and trends.",
  },
  {
    title: "Generate Custom Plan",
    description: "Receive a tailored business plan with actionable insights.",
  },
  {
    title: "Refine and Collaborate",
    description: "Fine-tune your plan with team input and AI suggestions.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Kassbokar AI Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}