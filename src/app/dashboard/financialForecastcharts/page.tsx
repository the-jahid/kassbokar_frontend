'use client'

import BestCaseScenario from "@/components/financialForecastcharts/bestCaseScenario"
import ProjectedBalanceSheet from "@/components/financialForecastcharts/projectedBalanceSheet"
import ProjectedCashFlow from "@/components/financialForecastcharts/projectedCashFlow"
import ProjectedProfitLoss from "@/components/financialForecastcharts/projectedProfitLoss"
import UseofFunds from "@/components/financialForecastcharts/useofFunds"
import WorstCaseScenario from "@/components/financialForecastcharts/worstCaseScenario"
import { useGetSingleCompanyQuery } from "@/lib/rtkqueryAPI/companies"
import { useEffect, useState } from "react"

const FinancialForecastChart = () => {

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

    const financialForecastId = singleCompanyData?.data?.financialForecast?.id || "";
  return (
    <div className="space-y-10" >
      <UseofFunds financial_forecast_id={financialForecastId} />
      <BestCaseScenario financial_forecast_id={financialForecastId} />
      <WorstCaseScenario financial_forecast_id={financialForecastId} />
      <ProjectedProfitLoss financial_forecast_id={financialForecastId} />
      <ProjectedCashFlow financial_forecast_id={financialForecastId} />
      <ProjectedBalanceSheet financial_forecast_id={financialForecastId} />
    </div>
  )
}

export default FinancialForecastChart
