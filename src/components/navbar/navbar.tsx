'use client'

import { useEffect, useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton, useSession, useUser } from "@clerk/nextjs"
// import { Clerk } from "@clerk/clerk-sdk-node"
import Image from "next/image"
import Link from "next/link"
import { useGetAllCompaniesQuery } from "@/lib/rtkqueryAPI/companies"
import { useLoginMutation, useRegisterMutation } from "@/lib/rtkqueryAPI/auth"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import PhoneScreenNav from "./phoneScreenNav"


type Company = {
  id: string
  title: string
}

const Navbar = () => {
  const { isSignedIn, user } = useUser()
  const { isLoaded, session } = useSession()

  const { data: companies, error: companiesError, isLoading: isCompaniesLoading, refetch } = useGetAllCompaniesQuery()


  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  
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
  }, [companies, isSignedIn])

  const handleCompanyChange = (value: string) => {
    const selectedItem = companies?.find((item: Company) => item.id === value)
    if (selectedItem) {
      localStorage.setItem('selectedCompanyId', selectedItem.id)
      setSelectedCompanyId(selectedItem.id)
      window.location.reload()
    }
  }
  
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 bg-white bg-opacity-30 p-2 px-4 text-black backdrop-blur-md">
      <Link href="/" className="flex items-center">
        <Image src="/KASSOBOKAR-V3-03[1].png" width={100} height={100} alt="Kassbokar logo" />
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
        <ul className="flex items-center space-x-4 font-normal">
          <li className="hidden lg:block">
            <SignedIn>
              <Link href="/dashboard">Dashboard</Link>
            </SignedIn>
          </li>
          <li className="hidden lg:block">
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <SignedIn>
              <UserButton  />
            </SignedIn>
          </li>
          <li>
            <SignedOut>
              <Button className={cn("bg-primary p-2 px-4 hover:bg-hoverColor")}>
                <SignInButton />
              </Button>
            </SignedOut>
          </li>
          <li className="lg:hidden">
            <PhoneScreenNav />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar