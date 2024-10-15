'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const plans = [
  {
    name: 'Basic',
    price: 100,
    features: [
      'Basic business plan template',
      'Financial projections for 1 year',
      'Up to 10 pages',
      'Email support',
    ],
    notIncluded: [
      'Custom branding',
      'Market analysis',
      'Competitor analysis',
      'Revision rounds',
    ],
  },
  {
    name: 'Pro',
    price: 200,
    features: [
      'Advanced business plan template',
      'Financial projections for 3 years',
      'Up to 25 pages',
      'Email and chat support',
      'Custom branding',
      'Market analysis',
    ],
    notIncluded: [
      'Competitor analysis',
      'Unlimited revision rounds',
    ],
  },
  {
    name: 'Enterprise',
    price: 300,
    features: [
      'Premium business plan template',
      'Financial projections for 5 years',
      'Unlimited pages',
      'Priority email, chat, and phone support',
      'Custom branding',
      'Comprehensive market analysis',
      'Detailed competitor analysis',
      'Unlimited revision rounds',
    ],
    notIncluded: [],
  },
]

const FeatureItem = ({ included, children }: { included: boolean; children: React.ReactNode }) => (
  <li className="flex items-center space-x-2">
    {included ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    )}
    <span className={included ? 'text-gray-700' : 'text-gray-500 line-through'}>{children}</span>
  </li>
)

const PricingCard = ({ plan, isPopular, yearlyBilling }: { plan: typeof plans[0]; isPopular: boolean; yearlyBilling: boolean }) => {
  const annualPrice = plan.price * 12 * 0.8 // 20% discount for annual billing

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className={`relative ${isPopular ? 'border-primary' : ''}`}>
        {isPopular && (
          <Badge className="absolute top-0 right-0 m-4" variant="secondary">
            Most Popular
          </Badge>
        )}
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>
            <span className="text-3xl font-bold">${yearlyBilling ? Math.round(annualPrice / 12) : plan.price}</span>
            {yearlyBilling ? '/month billed annually' : '/month'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <FeatureItem key={index} included={true}>
                {feature}
              </FeatureItem>
            ))}
            {plan.notIncluded.map((feature, index) => (
              <FeatureItem key={index} included={false}>
                {feature}
              </FeatureItem>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={isPopular ? 'default' : 'outline'}>
            Choose {plan.name}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function PricingPage() {
  const [yearlyBilling, setYearlyBilling] = useState(false)

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        Choose the perfect plan for your business needs
      </p>

      <div className="flex items-center justify-center space-x-2 mb-8">
        <Label htmlFor="billing-toggle">Monthly</Label>
        <Switch
          id="billing-toggle"
          checked={yearlyBilling}
          onCheckedChange={setYearlyBilling}
        />
        <Label htmlFor="billing-toggle">
          Yearly <span className="text-green-500 font-semibold">(Save 20%)</span>
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isPopular={index === 1}
            yearlyBilling={yearlyBilling}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a custom plan?</h2>
        <p className="text-gray-600 mb-4">
          We offer tailored solutions for businesses with specific requirements.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
    </div>
  )
}