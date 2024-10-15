

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

interface IndustryOverview {
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

interface CreateIndustryOverviewRequest extends IndustryOverview {
  buisness_plan_id: string;
}

interface UpdateIndustryOverviewRequest {
  industry_description: string;
  market_needs: string;
  market_trends: string;
  market_segmentation: string;
  industry_overview_id: string;
}

interface IndustryOverviewResponse extends IndustryOverview {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const industryOverviewApi = createApi({
  reducerPath: 'industryOverviewApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getIndustryOverview: builder.query<IndustryOverviewResponse, string>({
      query: (buisness_plan_id) => ({
        url: `industryOverview/${buisness_plan_id}`,
        method: 'GET',
      }),
    }),
    createIndustryOverview: builder.mutation<void, CreateIndustryOverviewRequest>({
      query: ({ buisness_plan_id, ...inputData }) => ({
        url: `industryOverview/${buisness_plan_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateIndustryOverview: builder.mutation<void, UpdateIndustryOverviewRequest>({
      query: ({ industry_overview_id, ...inputData }) => ({
        url: `industryOverview/${industry_overview_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteIndustryOverview: builder.mutation<void, string>({
      query: (industry_overview_id) => ({
        url: `industryOverview/${industry_overview_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetIndustryOverviewQuery,
  useCreateIndustryOverviewMutation,
  useUpdateIndustryOverviewMutation,
  useDeleteIndustryOverviewMutation,
} = industryOverviewApi;

















