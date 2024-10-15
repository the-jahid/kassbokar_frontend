import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();

interface WorstCaseScenario {
  id: string;
  name: string;
  FY1: number;
  FY2: number;
  FY3: number;
  FY4: number;
  FY5: number;
  financialForecastId: string;
}

interface CreateWorstCaseScenarioRequest {
  is_new_company: string;
  company_description: string;
  main_goal_of_business_plan: string;
  selected_language_for_plan: string;
  company_name: string;
  country: string;
  city: string;
  success_factors: string;
  products_services: Array<{
    product_service_name: string;
    price: string;
    product_service_description_benefits: string;
  }>;
  direct_competitors: Array<{
    competitor_name: string;
    locations: string;
  }>;
  management_team_members: Array<{
    name: string;
    title: string;
    background?: string;
  }>;
  is_business_raising_funding: string;
  is_business_seeking_bank_loan: string;
  initial_capital: string;
  initial_capital_assumptions: string;
  working_capital: string;
  working_capital_assumptions: string;
  capital_expenditure: string;
  capital_expenditure_assumptions: string;
  operating_expenses: Array<{
    category: string;
    amount: string;
    currency: string;
    growth_rate: string;
    growth_rate_unit: string;
    assumptions?: string;
  }>;
}

interface UpdateWorstCaseScenarioRequest {
  worstCaseScenario: WorstCaseScenario[];
}

interface WorstCaseScenarioResponse {
  data: WorstCaseScenario[];
}

export const worstCaseScenarioApi = createApi({
  reducerPath: 'worstCaseScenarioApi',
  baseQuery: baseQuery(),
  tagTypes: ['WorstCaseScenario'],
  endpoints: (builder) => ({
    getAllWorstCaseScenarios: builder.query<WorstCaseScenario[], string>({
      query: (financial_forecast_id) => `worstCaseScenario/${financial_forecast_id}`,
      transformResponse: (response: WorstCaseScenarioResponse) => response?.data,
    }),
    createWorstCaseScenario: builder.mutation<WorstCaseScenario, { financial_forecast_id: string; newWorstCaseScenario: CreateWorstCaseScenarioRequest }>({
      query: ({ financial_forecast_id, newWorstCaseScenario }) => ({
        url: `worstCaseScenario/${financial_forecast_id}`,
        method: 'POST',
        body: newWorstCaseScenario,
      }),
      invalidatesTags: [{ type: 'WorstCaseScenario', id: 'LIST' }],
    }),
    updateWorstCaseScenario: builder.mutation<WorstCaseScenario, { financial_forecast_id: string; data: UpdateWorstCaseScenarioRequest }>({
      query: ({ financial_forecast_id, data }) => ({
        url: `worstCaseScenario/${financial_forecast_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { financial_forecast_id }) => [{ type: 'WorstCaseScenario', id: financial_forecast_id }],
    }),
    deleteWorstCaseScenario: builder.mutation<{ success: boolean; id: string }, string>({
      query: (financial_forecast_id) => ({
        url: `worstCaseScenario/${financial_forecast_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, financial_forecast_id) => [{ type: 'WorstCaseScenario', id: financial_forecast_id }],
    }),
  }),
});

export const {
  useGetAllWorstCaseScenariosQuery,
  useCreateWorstCaseScenarioMutation,
  useUpdateWorstCaseScenarioMutation,
  useDeleteWorstCaseScenarioMutation,
} = worstCaseScenarioApi;