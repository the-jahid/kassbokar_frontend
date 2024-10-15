'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { useDeleteCompanyMutation } from "@/lib/rtkqueryAPI/companies"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Card {
  company_id: string
  description: string
  title: string
  src: string
  content: () => JSX.Element
}

interface CompanyCardProps {
  active: Card | boolean | null
  setActive: (card: Card | boolean | null) => void
  id: string
  refetch: () => void
}

const CompanyCard: React.FC<CompanyCardProps> = ({ active, setActive, id, refetch }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation()
  const { toast } = useToast()

  const handleDelete = async (company_id: string) => {
    try {
      await deleteCompany(company_id).unwrap()
      toast({
        title: "Company deleted successfully",
        variant: "default",
      })
      setActive(null)
      refetch()
    } catch (error) {
      toast({
        title: "Failed to delete the company",
        description: "An error occurred while deleting the company.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active, setActive])

  useOutsideClick(ref, () => setActive(null))

  if (!active || typeof active !== 'object') return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10"
        />
        <div className="fixed inset-0 grid place-items-center z-[100]">
          <motion.button
            key={`button-${active.title}-${id}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}
          >
            <CloseIcon />
          </motion.button>
          <motion.div
            layoutId={`card-${active.title}-${id}`}
            ref={ref}
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
          >
            <motion.div layoutId={`image-${active.title}-${id}`}>
              <Image
                priority
                width={200}
                height={200}
                src={active.src}
                alt={active.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              />
            </motion.div>
            <div>
              <div className="flex justify-between items-start p-4">
                <div>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200 flex space-x-2"
                  >
                    {active.title}
                  </motion.h3>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(active.company_id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </Button>
              </div>
              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  )
}

export default CompanyCard

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}