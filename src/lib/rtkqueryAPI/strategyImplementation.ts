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

interface StrategyImplementation {
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

interface CreateStrategyImplementationRequest extends StrategyImplementation {
  buisness_plan_id: string;
}

interface UpdateStrategyImplementationRequest {
  management_team: string;
  swot_analysis: string;
  pestle_analysis: string;
  strategy_implementation_id: string;
}

interface StrategyImplementationResponse extends StrategyImplementation {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const strategyImplementationApi = createApi({
  reducerPath: 'strategyImplementationApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getStrategyImplementation: builder.query<StrategyImplementationResponse, string>({
      query: (buisness_plan_id) => ({
        url: `strategyImplementation/${buisness_plan_id}`,
        method: 'GET',
      }),
    }),
    createStrategyImplementation: builder.mutation<void, CreateStrategyImplementationRequest>({
      query: ({ buisness_plan_id, ...inputData }) => ({
        url: `strategyImplementation/${buisness_plan_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateStrategyImplementation: builder.mutation<void, UpdateStrategyImplementationRequest>({
      query: ({ strategy_implementation_id, ...inputData }) => ({
        url: `strategyImplementation/${strategy_implementation_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteStrategyImplementation: builder.mutation<void, string>({
      query: (strategy_implementation_id) => ({
        url: `strategyImplementation/${strategy_implementation_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStrategyImplementationQuery,
  useCreateStrategyImplementationMutation,
  useUpdateStrategyImplementationMutation,
  useDeleteStrategyImplementationMutation,
} = strategyImplementationApi;