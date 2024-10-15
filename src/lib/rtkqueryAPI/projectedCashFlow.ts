import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();

interface ProjectedCashFlow {
  id: string;
  name: string;
  FY1: number;
  FY2: number;
  FY3: number;
  FY4: number;
  FY5: number;
  financialForecastId: string;
}

interface CreateProjectedCashFlowRequest {
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

interface UpdateProjectedCashFlowRequest {
  projectedCashFlow: ProjectedCashFlow[];
}

interface ProjectedCashFlowResponse {
  data: ProjectedCashFlow[];
}

export const projectedCashFlowApi = createApi({
  reducerPath: 'projectedCashFlowApi',
  baseQuery: baseQuery(),
  tagTypes: ['ProjectedCashFlow'],
  endpoints: (builder) => ({
    getAllProjectedCashFlows: builder.query<ProjectedCashFlow[], string>({
      query: (financial_forecast_id) => `projectedCashFlow/${financial_forecast_id}`,
      transformResponse: (response: ProjectedCashFlowResponse) => response?.data,
    }),
    createProjectedCashFlow: builder.mutation<ProjectedCashFlow, { financial_forecast_id: string; newProjectedCashFlow: CreateProjectedCashFlowRequest }>({
      query: ({ financial_forecast_id, newProjectedCashFlow }) => ({
        url: `projectedCashFlow/${financial_forecast_id}`,
        method: 'POST',
        body: newProjectedCashFlow,
      }),
      invalidatesTags: [{ type: 'ProjectedCashFlow', id: 'LIST' }],
    }),
    updateProjectedCashFlow: builder.mutation<ProjectedCashFlow, { financial_forecast_id: string; data: UpdateProjectedCashFlowRequest }>({
      query: ({ financial_forecast_id, data }) => ({
        url: `projectedCashFlow/${financial_forecast_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { financial_forecast_id }) => [{ type: 'ProjectedCashFlow', id: financial_forecast_id }],
    }),
    deleteProjectedCashFlow: builder.mutation<{ success: boolean; id: string }, string>({
      query: (financial_forecast_id) => ({
        url: `projectedCashFlow/${financial_forecast_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, financial_forecast_id) => [{ type: 'ProjectedCashFlow', id: financial_forecast_id }],
    }),
  }),
});

export const {
  useGetAllProjectedCashFlowsQuery,
  useCreateProjectedCashFlowMutation,
  useUpdateProjectedCashFlowMutation,
  useDeleteProjectedCashFlowMutation,
} = projectedCashFlowApi;