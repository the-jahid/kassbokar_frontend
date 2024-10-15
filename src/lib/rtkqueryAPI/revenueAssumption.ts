import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';

const token = tokenManager.getToken();

interface RevenueData {
  unitName: string;
  FY1: number;
  FY2: number;
  FY3: number;
  FY4: number;
  FY5: number;
}

interface RevenueLineItem {
  name: string;
  pricePerUnit: number;
  
revenueAssumptionItems: RevenueData[];
}

interface RevenueAssumptionResponse {
  message: string;
  data:  RevenueLineItem[];
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

export const revenueAssumptionApi = createApi({
  reducerPath: 'revenueAssumptionApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getRevenueAssumption: builder.query<RevenueAssumptionResponse, string>({
      query: (financial_forecast_id) => ({
        url: `revenueAssumption/${financial_forecast_id}`,
        method: 'GET',
      }),
      
    }),
    createRevenueAssumption: builder.mutation<void, CreateRevenueAssumptionRequest>({
      query: (inputData) => ({
        url: `revenueAssumption`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateRevenueAssumption: builder.mutation<void, Partial<RevenueLineItem> & { financialForecastId: string }>({
      query: ({ financialForecastId, ...inputData }) => ({
        url: `revenueAssumption/${financialForecastId}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteRevenueAssumption: builder.mutation<void, string>({
      query: (financial_forecast_id) => ({
        url: `revenueAssumption/${financial_forecast_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRevenueAssumptionQuery,
  useCreateRevenueAssumptionMutation,
  useUpdateRevenueAssumptionMutation,
  useDeleteRevenueAssumptionMutation,
} = revenueAssumptionApi;