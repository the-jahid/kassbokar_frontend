"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const faqs = [
  { question: "What is Kassobokar?", answer: "Kassobokar is an advanced AI-powered business planning and market research tool designed to help startups and SMEs accelerate their growth." },
  { question: "How does the AI Business Plan Generator work?", answer: "Our AI analyzes vast amounts of industry data and market trends to create customized business plans tailored to your specific needs and goals." },
  { question: "Is my data secure with Kassobokar?", answer: "Absolutely. We prioritize data security with ISO 27001/27701 certifications and full GDPR compliance. Your information is encrypted and only accessible with your permission." },
  { question: "Can I use Kassobokar for any type of business?", answer: "Yes, Kassobokar is versatile and can be used for various industries and business models, from tech startups to traditional brick-and-mortar establishments." },
  { question: "How accurate are the AI-generated business plans?", answer: "Our AI-generated plans are highly accurate, based on real-time market data and industry insights. However, we always recommend reviewing and adjusting the plans to your specific circumstances." },
  { question: "What makes Kassobokar different from other business planning tools?", answer: "Kassobokar combines cutting-edge AI technology with extensive market research capabilities, providing insights typically only available through top-tier consulting firms." },
  { question: "Is there a free trial available?", answer: "Yes, we offer a free trial that allows you to experience the power of our AI Business Plan Generator and see how it can benefit your business." },
]

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItem, setOpenItem] = useState<string | null>(null)

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full  mx-auto p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg"
    >
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h2>
      <p className="text-center mb-8 text-gray-600 text-lg">Find quick answers to your questions about Kassobokar</p>
      
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-blue-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <AnimatePresence>
        {filteredFaqs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-gray-600"
          >
            No matching questions found. Please try a different search term.
          </motion.p>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border border-blue-200 rounded-lg overflow-hidden">
                  <AccordionTrigger
                    onClick={() => setOpenItem(openItem === `item-${index}` ? null : `item-${index}`)}
                    className="px-6 py-4 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 bg-white"
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </AnimatePresence>
    </motion.div>
  )
}