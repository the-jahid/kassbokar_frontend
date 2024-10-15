// useOfFundsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';
// useOfFunds.ts
export interface ProductService {
    product_service_name: string;
    price: string;
    product_service_description_benefits: string;
  }
  
  export interface DirectCompetitor {
    competitor_name: string;
    locations: string;
  }
  
  export interface ManagementTeamMember {
    name: string;
    title: string;
    background?: string;
  }
  
  export interface OperatingExpense {
    category: string;
    amount: string;
    currency: string;
    growth_rate: string;
    growth_rate_unit: string;
    assumptions: string;
  }
  
  export interface UseOfFunds {
    id?: string;
    accounts_payable?: number;
    capital_expenditures?: number;
    cash?: number;
    current_borrowing?: number;
    initial_capital?: number;
    investor?: number;
    liabilities_capital?: number;
    long_term_liabilities?: number;
    other_current_liabilities?: number;
    total_liabilities?: number;
    owner?: number;
    planned_investment?: number;
    total_planned_investment?: number;
    total_startup_assets?: number;
    total_startup_expenses?: number;
    working_capital?: number;
    financialForecastId?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateUseOfFundsRequest {
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
    initial_capital: number;
    initial_capital_assumptions: string;
    working_capital: number;
    working_capital_assumptions: string;
    capital_expenditure: number;
    capital_expenditure_assumptions: string;
    operating_expenses: OperatingExpense[];
  }
  
  export interface UpdateUseOfFundsRequest {
    accounts_payable?: number;
    capital_expenditures?: number;
    cash?: number;
    current_borrowing?: number;
    initial_capital?: number;
    investor?: number;
    liabilities_capital?: number;
    long_term_liabilities?: number;
    other_current_liabilities?: number;
    total_liabilities?: number;
    owner?: number;
    planned_investment?: number;
    total_planned_investment?: number;
    total_startup_assets?: number;
    total_startup_expenses?: number;
    working_capital?: number;
  }
  
  export interface UseOfFundsResponse extends UseOfFunds {
    id: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface GetUseOfFundsResponse {
    message: string;
    data: UseOfFunds;
  }

const token = tokenManager.getToken();

export const useOfFundsApi = createApi({
  reducerPath: 'useOfFundsApi',
  baseQuery: baseQuery(),
  tagTypes: ['UseOfFunds'],
  endpoints: (builder) => ({
    getUseOfFunds: builder.query<GetUseOfFundsResponse, string>({
      query: (financial_forecast_id) => ({
        url: `useOfFund/${financial_forecast_id}`,
        method: 'GET',
      })

    }),
    createUseOfFunds: builder.mutation<UseOfFundsResponse, { financial_forecast_id: string; data: CreateUseOfFundsRequest }>({
      query: ({ financial_forecast_id, data }) => ({
        url: `useOfFund/${financial_forecast_id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'UseOfFunds', id: 'LIST' }],
    }),
    updateUseOfFunds: builder.mutation<UseOfFundsResponse, { useof_fund_id: string; data: UpdateUseOfFundsRequest }>({
      query: ({ useof_fund_id, data }) => ({
        url: `useOfFund/${useof_fund_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { useof_fund_id }) => [{ type: 'UseOfFunds', id: useof_fund_id }],
    }),
    deleteUseOfFunds: builder.mutation<{ success: boolean; id: string }, string>({
      query: (useof_fund_id) => ({
        url: `useOfFund/${useof_fund_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'UseOfFunds', id }],
    }),
  }),
});

export const {
  useGetUseOfFundsQuery,
  useCreateUseOfFundsMutation,
  useUpdateUseOfFundsMutation,
  useDeleteUseOfFundsMutation,
} = useOfFundsApi;