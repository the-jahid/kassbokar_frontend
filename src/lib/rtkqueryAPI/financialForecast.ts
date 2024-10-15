import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";


interface ProductService {
    product_service_name: string;
    price: string;
    product_service_description_benefits: string;
  }
  
  interface Competitor {
    competitor_name: string;
    locations: string;
  }
  
  interface ManagementTeamMember {
    name: string;
    title: string;
    background?: string;
  }
  
  interface OperatingExpense {
    category: string;
    amount: string;
    currency: string;
    growth_rate: string;
    growth_rate_unit: string;
    assumptions: string;
  }
  
  interface CreateFinancialForecastRequest {
    company_id: string;
    is_new_company: string;
    company_description: string;
    main_goal_of_business_plan: string;
    selected_language_for_plan: string;
    company_name: string;
    country: string;
    city: string;
    success_factors: string;
    products_services: ProductService[];
    direct_competitors: Competitor[];
    management_team_members: ManagementTeamMember[];
    is_business_raising_funding: string;
    is_business_seeking_bank_loan: string;
    initial_capital: string;
    initial_capital_assumptions: string;
    working_capital: string;
    working_capital_assumptions: string;
    capital_expenditure: string;
    capital_expenditure_assumptions: string;
    operating_expenses: OperatingExpense[];
  }

  interface RevenueAssumption {
    id: string;
    name: string;
    pricePerUnit: number;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
    financialForecastId: string;
  }
  
  interface Scenario {
    id: string;
    name: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
    financialForecastId: string;
  }
  
  interface BalanceSheetItem {
    id: string;
    name: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
    financialForecastId: string;
  }
  
  interface CashFlowItem {
    id: string;
    name: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
    financialForecastId: string;
  }
  
  interface ProfitLossItem {
    id: string;
    name: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
    financialForecastId: string;
  }
  
  interface UseOfFunds {
    id: string;
    capitalExpenditures: number;
    cash: number;
    liabilitiesCapital: number;
    currentBorrowing: number;
    longTermLiabilities: number;
    accountsPayable: number;
    otherCurrentLiabilities: number;
    initialCapital: number;
    workingCapital: number;
    plannedInvestment: number;
    owner: number;
    investor: number;
    totalStartupExpenses: number;
    totalStartupAssets: number;
    totalLiabilites: number;
    totalPlannedInvestment: number;
    createdAt: string;
    updatedAt: string;
    financialForecastId: string;
  }
  
  interface FinancialForecastResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    revenueAssumption: RevenueAssumption[];
    bestCaseScenario: Scenario[];
    projectedBalanceSheet: BalanceSheetItem[];
    projectedCashFlow: CashFlowItem[];
    projectedProfitLoss: ProfitLossItem[];
    useofFunds: UseOfFunds;
    worstCaseScenario: Scenario[];
  }



  
const token = tokenManager.getToken();

export const financialForecastApi = createApi({
  reducerPath: 'financialForecastApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getFinancialForecast: builder.query<FinancialForecastResponse, string>({
      query: (company_id) => ({
        url: `financialForecast/${company_id}`,
        method: 'GET',
      }),
    }),
    createFinancialForecast: builder.mutation<void, CreateFinancialForecastRequest>({
      query: ({ company_id, ...inputData }) => ({
        url: `financialForecast/${company_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    // updateFinancialForecast: builder.mutation<void, { financial_forecast_id: string; data: UpdateFinancialForecastRequest }>({
    //   query: ({ financial_forecast_id, data }) => ({
    //     url: `financialForecast/${financial_forecast_id}`,
    //     method: 'PATCH',
    //     body: data,
    //   }),
    // }),
    deleteFinancialForecast: builder.mutation<void, string>({
      query: (financial_forecast_id) => ({
        url: `financialForecast/:${financial_forecast_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFinancialForecastQuery,
  useCreateFinancialForecastMutation,
 
  useDeleteFinancialForecastMutation,
} = financialForecastApi;