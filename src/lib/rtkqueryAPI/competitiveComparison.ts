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

interface CompetitiveComparison {
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

interface CreateCompetitiveComparisonRequest extends CompetitiveComparison {
  buisness_plan_id: string;
}

interface UpdateCompetitiveComparisonRequest {
  competitors?: string;
  competitive_advantage?: string;
  competitive_comparison_id?: string;
}

interface CompetitiveComparisonResponse extends CompetitiveComparison {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const competitiveComparisonApi = createApi({
  reducerPath: 'competitiveComparisonApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getCompetitiveComparison: builder.query<CompetitiveComparisonResponse, string>({
      query: (buisness_plan_id) => ({
        url: `competitiveComparison/${buisness_plan_id}`,
        method: 'GET',
      }),
    }),
    createCompetitiveComparison: builder.mutation<void, CreateCompetitiveComparisonRequest>({
      query: ({ buisness_plan_id, ...inputData }) => ({
        url: `competitiveComparison/${buisness_plan_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateCompetitiveComparison: builder.mutation<void, UpdateCompetitiveComparisonRequest>({
      query: ({ competitive_comparison_id, ...inputData }) => ({
        url: `competitiveComparison/${competitive_comparison_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteCompetitiveComparison: builder.mutation<void, string>({
      query: (competitive_comparison_id) => ({
        url: `competitiveComparison/${competitive_comparison_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCompetitiveComparisonQuery,
  useCreateCompetitiveComparisonMutation,
  useUpdateCompetitiveComparisonMutation,
  useDeleteCompetitiveComparisonMutation,
} = competitiveComparisonApi;