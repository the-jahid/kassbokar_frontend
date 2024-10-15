import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();

interface BestCaseScenario {
  id: string;
  name: string;
  FY1: number;
  FY2: number;
  FY3: number;
  FY4: number;
  FY5: number;
  financialForecastId: string;
}

interface CreateBestCaseScenarioRequest {
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

interface UpdateBestCaseScenarioRequest {
  bestCaseScenario: BestCaseScenario[];
}

interface BestCaseScenarioResponse {
  data: BestCaseScenario[];
}


export const bestCaseScenarioApi = createApi({
  reducerPath: 'bestCaseScenarioApi',
  baseQuery: baseQuery(),
  tagTypes: ['BestCaseScenario'],
  endpoints: (builder) => ({
    getAllBestCaseScenarios: builder.query<BestCaseScenario[], string>({
      query: (financial_forecast_id) => `bestCaseScenario/${financial_forecast_id}`,
      transformResponse: (response: BestCaseScenarioResponse) => response?.data,
    }),
    createBestCaseScenario: builder.mutation<BestCaseScenario, { financial_forecast_id: string; newBestCaseScenario: CreateBestCaseScenarioRequest }>({
      query: ({ financial_forecast_id, newBestCaseScenario }) => ({
        url: `bestCaseScenario/${financial_forecast_id}`,
        method: 'POST',
        body: newBestCaseScenario,
      }),
      invalidatesTags: [{ type: 'BestCaseScenario', id: 'LIST' }],
    }),
    updateBestCaseScenario: builder.mutation<BestCaseScenario, { financial_forecast_id: string; data: UpdateBestCaseScenarioRequest }>({
      query: ({ financial_forecast_id, data }) => ({
        url: `bestCaseScenario/${financial_forecast_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { financial_forecast_id }) => [{ type: 'BestCaseScenario', id: financial_forecast_id }],
    }),
    deleteBestCaseScenario: builder.mutation<{ success: boolean; id: string }, string>({
      query: (financial_forecast_id) => ({
        url: `bestCaseScenario/${financial_forecast_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, financial_forecast_id) => [{ type: 'BestCaseScenario', id: financial_forecast_id }],
    }),
  }),
});

export const {
  useGetAllBestCaseScenariosQuery,
  useCreateBestCaseScenarioMutation,
  useUpdateBestCaseScenarioMutation,
  useDeleteBestCaseScenarioMutation,
} = bestCaseScenarioApi;