"use client"

import { useEffect, useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useSession } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useGetAllCompaniesQuery } from "@/lib/rtkqueryAPI/companies"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { TbMenuDeep } from "react-icons/tb"
import { CiHome } from "react-icons/ci"
import { MdDashboard } from "react-icons/md"
import { IoIosBusiness, IoIosCloudCircle, IoIosPricetags } from "react-icons/io"
import { FaBlog } from "react-icons/fa"

type Company = {
  id: string
  title: string
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: MdDashboard },
  { href: "/buisnessPlan", label: "Business Plan", icon: IoIosBusiness },
  { href: "/pitchDeck", label: "Pitch Deck", icon: IoIosCloudCircle },
  { href: "/pricing", label: "Pricing", icon: IoIosPricetags },
  { href: "/blogs", label: "Blogs", icon: FaBlog },
]

const Navbar = () => {
  const { isSignedIn } = useUser()
  const { isLoaded, session } = useSession()
  const { data: companies, error: companiesError, isLoading: isCompaniesLoading, refetch } = useGetAllCompaniesQuery()
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const storedCompanyId = localStorage.getItem('selectedCompanyId')
    if (storedCompanyId && storedCompanyId.length > 0) {
      setSelectedCompanyId(storedCompanyId)
    } else if (companies && companies.length > 0) {
      refetch()
      const firstItem = companies[0]
      localStorage.setItem('selectedCompanyId', firstItem.id)
      setSelectedCompanyId(firstItem.id)
    }
  }, [companies, isSignedIn, refetch])

  const handleCompanyChange = (value: string) => {
    const selectedItem = companies?.find((item: Company) => item.id === value)
    if (selectedItem) {
      localStorage.setItem('selectedCompanyId', selectedItem.id)
      setSelectedCompanyId(selectedItem.id)
      window.location.reload()
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white bg-opacity-30 backdrop-blur-md transition-all duration-300",
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/KASSOBOKAR-V3-03[1].png" width={100} height={100} alt="Kassbokar logo" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            {!isCompaniesLoading && !companiesError && companies && (
              <Select onValueChange={handleCompanyChange} value={selectedCompanyId || ''}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((item: Company) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </SignedIn>
          <ul className="hidden items-center space-x-4 font-normal lg:flex">
            <AnimatePresence>
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link href={item.href} className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button className={cn("bg-primary p-2 px-4 hover:bg-hoverColor")}>
              <SignInButton />
            </Button>
          </SignedOut>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <TbMenuDeep className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="flex flex-col justify-start space-y-4 font-semibold">
                    {navItems.map((item) => (
                      <div key={item.href}>
                        <Link href={item.href} className="flex items-center space-x-4 py-2 text-gray-700 hover:text-primary">
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                        <Separator />
                      </div>
                    ))}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar