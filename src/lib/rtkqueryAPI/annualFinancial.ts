import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';
// import { cookies } from 'next/headers';

const token = tokenManager.getToken();


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

interface RevenueAssumptionResponse {
  message: string;
  data: RevenueAssumption[];
}

interface ProductService {
  product_service_name: string;
  price: string;
  product_service_description_benefits: string;
}

interface DirectCompetitor {
  competitor_name: string;
  locations: string;
}

interface ManagementTeamMember {
  name: string;
  title: string;
  background: string;
}

interface OperatingExpense {
  category: string;
  amount: string;
  currency: string;
  growth_rate: string;
  growth_rate_unit: string;
  assumptions: string;
}

interface CreateRevenueAssumptionRequest {
  is_new_company: string;
  company_description: string;
  main_goal_of_business_plan: string;
  selected_language_for_plan: string;
  company_name: string;
  country: string;
  city: string;
  success_factors: string;
  products_services: ProductService[];
  direct_competitors: DirectCompetitor[];
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

interface AnnualFinancial {
  id: string;
  FY1: number;
  FY2: number;
  FY3: number;
  FY4: number;
  FY5: number;
  type: string;
  financialForecastId: string;
}

interface AnnualFinancialResponse {
  message: string;
  data: AnnualFinancial[];
}

export const annualFinancialApi = createApi({
  reducerPath: 'annualFinancialApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getAnnualFinancial: builder.query<AnnualFinancialResponse, string>({
      query: (financial_forecast_id) => ({
        url: `annualFinancial/${financial_forecast_id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
    createAnnualFinancial: builder.mutation<void, CreateRevenueAssumptionRequest>({
      query: (inputData) => ({
        url: `annualFinancial`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateAnnualFinancial: builder.mutation<void, Partial<AnnualFinancial> & { financialForecastId: string }>({
      query: ({ financialForecastId, ...inputData }) => ({
        url: `annualFinancial/${financialForecastId}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteAnnualFinancial: builder.mutation<void, string>({
      query: (financial_forecast_id) => ({
        url: `annualFinancial/${financial_forecast_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAnnualFinancialQuery,
  useCreateAnnualFinancialMutation,
  useUpdateAnnualFinancialMutation,
  useDeleteAnnualFinancialMutation,
} = annualFinancialApi;