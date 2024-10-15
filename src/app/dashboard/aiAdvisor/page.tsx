"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb, Rocket, PenTool, BarChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { aiAdvisor } from '@/lib/aiAdvisor'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

type SuggestionCategory = {
  icon: React.ReactNode
  title: string
  suggestions: string[]
}

const suggestionCategories: SuggestionCategory[] = [
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Content Creation",
    suggestions: [
      "Create an Instagram post for a product launch.",
      "Write a press release about my business.",
      "Design a logo for my startup.",
    ]
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Business Advice",
    suggestions: [
      "In what state should I incorporate my business?",
      "Put together a go-to-market strategy.",
      "How do I create a financial forecast?",
    ]
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Ideation",
    suggestions: [
      "Brainstorm names for my tech startup.",
      "Generate product ideas for eco-friendly packaging.",
      "Suggest innovative features for a fitness app.",
    ]
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Growth Strategies",
    suggestions: [
      "Develop a social media marketing plan.",
      "Create a customer retention strategy.",
      "Outline steps for scaling my business.",
    ]
  }
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === '') return

    const newMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInput('')
    simulateBotResponse(input.trim())
  }

  const simulateBotResponse = async (userMessage: string) => {
    const data = await aiAdvisor(userMessage)
    
    setIsTyping(true)
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now(),
        text: `${data}`,
        sender: 'bot',
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome to Chat by Kassbokar AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className={`w-8 h-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                    <AvatarFallback>{message.sender === 'user' ? <User /> : <Bot />}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-late-400 text-secondary-foreground'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-center bg-slate-400 text-secondary-foreground rounded-lg p-3">
                <Bot className="w-4 h-4 mr-2" />
                <span>AI is typing...</span>
              </div>
            </motion.div>
          )}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestionCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card text-card-foreground rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      {category.icon}
                      <h2 className="text-lg font-semibold">{category.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {category.suggestions.map((suggestion, idx) => (
                        <li key={idx}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setInput(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}