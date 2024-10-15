"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, ChevronRight, Download, Edit, FileText, Share2, Star, Users } from "lucide-react"
import { useRouter } from "next/navigation"


export default function BuisnessPlanCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(67)

  const router = useRouter()


  const handleCreate = () => {
    router.push('/dashboard/createBuisnessPlan')
  }

  const handleEdit = () => {
    router.push('/dashboard/editBuisnessPlan')
  }

  const handleDownload = () => {
    console.log("Download button clicked")
    // Add your download logic here
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Image
            src="https://i.ibb.co/NjCrNJg/5608318.jpg"
            width={800}
            height={400}
            alt="Business Plan Image"
            className="w-full h-64 object-cover"
          />
        </motion.div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <Button variant="secondary">View Details</Button>
          </motion.div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Business Plan</CardTitle>
          <Badge variant="secondary" className="text-xs">NEW</Badge>
        </div>
        <CardDescription>Comprehensive strategy for success</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Our innovative business plan outlines a clear path to market dominance and sustainable growth.
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Last updated: 2 days ago</span>
        </div>
       
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-between items-center w-full">
         
          <TooltipProvider>
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Favorite</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="flex justify-between w-full">
          <Button onClick={handleCreate} className="flex-1 mr-2">
            <FileText className="w-4 h-4 mr-2" />
            Create
          </Button>
          <Button onClick={handleEdit} variant="outline" className="flex-1 mx-2">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button onClick={handleDownload} variant="secondary" className="flex-1 ml-2">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
