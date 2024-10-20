import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
import Link from "next/link";
  import { TbMenuDeep } from "react-icons/tb";
  import { CiHome } from "react-icons/ci";
  import { MdDashboard } from "react-icons/md";
  import { IoIosBusiness, IoIosFastforward, IoIosPricetags } from "react-icons/io";
  import { Separator } from "@/components/ui/separator"

const PhoneScreenNav = () => {
      return (
        <Sheet>
        <SheetTrigger   >
            <TbMenuDeep />
        </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription className={cn('flex flex-col justify-start space-y-4 font-semibold from-neutral-950 ')} >
                   <div className="flex items-center space-x-4" >
                            <CiHome />
                        <Link href='/' >
                                Home
                            </Link>
                   </div>
                   <Separator />

                   <div className="flex items-center space-x-4" >
                            <MdDashboard />
                        <Link href='/dashboard' >
                                Dashboard
                        </Link>
                   </div>
                   <Separator />

                   <div className="flex items-center space-x-4" >
                            <IoIosPricetags />
                        <Link href='/pricing' >
                                Pricing
                        </Link>
                   </div>
                   <Separator />
                   <div className="flex items-center space-x-4" >
                            <IoIosBusiness />
                        <Link href='/buisnessPlan' >
                                Buisness Plan
                        </Link>
                   </div>
                   <Separator />
                   <div className="flex items-center space-x-4" >
                            <IoIosFastforward />
                        <Link href='/pitchDeck' >
                                Pitch deck
                        </Link>
                   </div>
                   <Separator />


                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
      )    
}

export default PhoneScreenNav