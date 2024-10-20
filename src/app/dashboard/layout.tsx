'use client'

import {
  
  IconBrandTabler,
  
  IconUserBolt,
  IconBuildingSkyscraper,
  IconRobot,
  IconUsers,
  IconCalendarTime,
  IconReportSearch,
  IconBusinessplan
} from "@tabler/icons-react";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import Dashboard from "@/components/Dashboard/dashboard";


// Define the links for the sidebar
const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Business Plan",
    href: "/dashboard/buisnessPlan",
    icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Pitch Deck",
    href: "/dashboard/pitchDeck",
    icon: <IconBusinessplan className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Companies",
    href: "/dashboard/companies",
    icon: <IconBuildingSkyscraper className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "My AI Advisor",
    href: "/dashboard/aiAdvisor",
    icon: <IconRobot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Market Research",
    href: "/dashboard/marketResearch",
    icon: <IconReportSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Investor List",
    href: "/dashboard/investorList",
    icon: <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Book an Expert",
    href: "/dashboard/expertBook",
    icon: <IconCalendarTime className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  }
];

// Main DashboardLayout component
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to control sidebar open/close
  const [open, setOpen] = useState(false);
  


  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "min-h-[91vh]" 
      )}
    >
      {/* Sidebar component */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
           
            
            {/* Navigation links */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main content area */}
      <Dashboard children={children} />
    </div>
  );
}



