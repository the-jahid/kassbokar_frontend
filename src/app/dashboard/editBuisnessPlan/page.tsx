// pages/dashboard/editBuisnessPlan.tsx
'use client'
import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useGetBuisnessPlanQuery } from "@/lib/rtkqueryAPI/buisnessPlan";

import CompanyDescription from "@/components/buisnessPlan/companyDescription";
import CompetitiveComparison from "@/components/buisnessPlan/competitiveComparison";
import ExecutiveSummary from "@/components/buisnessPlan/executiveSummary";
import IndustryOverview from "@/components/buisnessPlan/industryOverview";
import MarketingPlan from "@/components/buisnessPlan/marketingPlan";
import Strategy from "@/components/buisnessPlan/strategy";

const EditBusinessPlan = () => {
  const companyId = localStorage.getItem('selectedCompanyId');

  // Check if companyId is null
  if (!companyId) {
    

    return null;
  }
    const {data:buisnessPlanData, isFetching,isSuccess,isLoading, refetch,isError} = useGetBuisnessPlanQuery(companyId || '')

    if(isError){
        return <div>Loading...</div>
    }
    
    const companyDescription = buisnessPlanData?.companyDescription;
    const competitiveComparison = buisnessPlanData?.competitiveComparison;
    const executiveSummary = buisnessPlanData?.executiveSummary
    const industryOverview = buisnessPlanData?.industryOverview
    const marketingPlan = buisnessPlanData?.marketingPlan
    const strategy = buisnessPlanData?.strategy

 

    const data = [
        {
          title: "Company Description",
          content: (
            <CompanyDescription  companyDescription={companyDescription}   />
          ),
        },
        {
          title: "Competitive comparison ",
          content: (
           <CompetitiveComparison  competitiveComparison={competitiveComparison} />
          
          ),
        },
        {
          title: "Executive Summary",
          content: (
            <ExecutiveSummary executiveSummary={executiveSummary} />
          ),
        },
        {
          title: "Industry Overview",
          content: (
            <IndustryOverview  industryOverview={industryOverview}/>
          ),
        },
        {
          title: "Marketing Plan",
          content: (
            <MarketingPlan marketingPlan={marketingPlan}  />
          ),
        },
        {
          title: "Strategy",
          content: (
            <Strategy strategy={strategy} />
          ),
        },
      ];

      
  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Edit your buisness plan
        </h2>
        
      </div>
      <Timeline data={data} />
    </div>
  );
};




export default EditBusinessPlan;