'use client'
import ExpenseAssumption from "@/components/financialForecast/expenseAssumption";
import RevenueAssumption from "@/components/financialForecast/revenueAssumption";
import { Timeline } from "@/components/ui/timeline";
import { useGetSingleCompanyQuery } from "@/lib/rtkqueryAPI/companies";
import Image from "next/image";
import { useEffect, useState } from "react";


const FinancialForecast = () => {
    const [companyId, setCompanyId] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedCompanyId = localStorage.getItem('selectedCompanyId');
        setCompanyId(storedCompanyId);
      }
    }, []);

    const { data: singleCompanyData, error, isLoading } = useGetSingleCompanyQuery(companyId || "");

    useEffect(() => {
      if (error) {
        console.error('Error fetching company data:', error);
      }
    }, [error]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>No financial Forecast</div>;

    const financialForecastId = singleCompanyData?.data?.financialForecast?.id;


    const data = [
        {
          title: "Expense Assumptions",
          content: (
            <ExpenseAssumption financial_forecast_id={financialForecastId || ''} />
          ),
        },
        {
          title: "Revenue Assumptions",
          content: (
            <RevenueAssumption financial_forecast_id={financialForecastId || ''} />
          ),
        },
       
      ];
      return (
        <div className="w-full">
          <Timeline data={data} />
        </div>
      );
}

export default FinancialForecast