import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';

const token = tokenManager.getToken();

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

interface ExecutiveSummary {
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

interface CreateExecutiveSummaryRequest extends ExecutiveSummary {
  buisness_plan_id: string;
}

interface UpdateExecutiveSummaryRequest {
  executive_summary_id: string;
  problem_statement?: string;
  proposed_solution?: string;
  value_proposition?: string;
  three_years_objective?: string;
  keys_to_success?: string;
}

interface ExecutiveSummaryResponse extends ExecutiveSummary {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const executiveSummaryApi = createApi({
  reducerPath: 'executiveSummaryApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getExecutiveSummary: builder.query<ExecutiveSummaryResponse, string>({
      query: (buisness_plan_id) => ({
        url: `executiveSummary/${buisness_plan_id}`,
        method: 'GET',
      }),
    }),
    createExecutiveSummary: builder.mutation<void, CreateExecutiveSummaryRequest>({
      query: ({ buisness_plan_id, ...inputData }) => ({
        url: `executiveSummary/${buisness_plan_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateExecutiveSummary: builder.mutation<void, UpdateExecutiveSummaryRequest>({
      query: ({ executive_summary_id, ...inputData }) => ({
        url: `executiveSummary/${executive_summary_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteExecutiveSummary: builder.mutation<void, string>({
      query: (executive_summary_id) => ({
        url: `executiveSummary/${executive_summary_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExecutiveSummaryQuery,
  useCreateExecutiveSummaryMutation,
  useUpdateExecutiveSummaryMutation,
  useDeleteExecutiveSummaryMutation,
} = executiveSummaryApi;

