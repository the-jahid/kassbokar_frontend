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

interface MarketingPlan {
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

interface CreateMarketingPlanRequest extends MarketingPlan {
  buisness_plan_id: string;
}

interface UpdateMarketingPlanRequest {
  content_marketing_seo: string;
  educationl_webinar_workshop: string;
  influencer_marketing: string;
  localized_digital_marketing_campaigns: string;
  strategic_partnership_buisness_incubators: string;
  marketing_plan_id: string;
}

interface MarketingPlanResponse extends MarketingPlan {
  id: string;
  
  createdAt: string;
  updatedAt: string;
}

export const marketingPlanApi = createApi({
  reducerPath: 'marketingPlanApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getMarketingPlan: builder.query<MarketingPlanResponse, string>({
      query: (buisness_plan_id) => ({
        url: `marketingPlan/${buisness_plan_id}`,
        method: 'GET',
      }),
    }),
    createMarketingPlan: builder.mutation<void, CreateMarketingPlanRequest>({
      query: ({ buisness_plan_id, ...inputData }) => ({
        url: `marketingPlan/${buisness_plan_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateMarketingPlan: builder.mutation<void, UpdateMarketingPlanRequest>({
      query: ({ marketing_plan_id, ...inputData }) => ({
        url: `marketingPlan/${marketing_plan_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteMarketingPlan: builder.mutation<void, string>({
      query: (marketing_plan_id) => ({
        url: `marketingPlan/${marketing_plan_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMarketingPlanQuery,
  useCreateMarketingPlanMutation,
  useUpdateMarketingPlanMutation,
  useDeleteMarketingPlanMutation,
} = marketingPlanApi;

