import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();

interface ProductService {
  product_service_name: string;
  price: string;
  product_service_description_benefits: string;
}

interface Competitor {
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
interface CompanyDescription {
  id: string;
  overview: string;
  products: string;
  mission: string;
  vision: string;
  values: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface CompetitiveComparison {
  id: string;
  competitors: string;
  competitiveAdvantage: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface ExecutiveSummary {
  id: string;
  ProblemStateMent: string;
  ProposedSolution: string;
  ValueProposition: string;
  ThreeYearsObective: string;
  KeysToSuccess: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface IndustryOverview {
  id: string;
  industryDescription: string;
  marketNeeds: string;
  marketTrends: string;
  marketSegementation: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface MarketingPlan {
  id: string;
  localizedDigitalMarketingCampaigns: string;
  educationalWebinarsWorkshop: string;
  strategicPartnerShipBuisnessIncubators: string;
  influencerMarketing: string;
  contentMarketingSeo: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface Strategy {
  id: string;
  managementTeam: string;
  swotAnalysis: string;
  pestleAnalysis: string;
  createdAt: string;
  updatedAt: string;
  buisnessplanId: string;
}

interface BuisnessPlanResponse {
  id: string;
  companyDescription: CompanyDescription;
  competitiveComparison: CompetitiveComparison;
  executiveSummary: ExecutiveSummary;
  industryOverview: IndustryOverview;
  marketingPlan: MarketingPlan;
  strategy: Strategy;
  createdAt: string;
  updatedAt: string;
}

interface CreateBuisnessPlanRequest {
  company_id: string;
  is_new_company: string;
  main_goal_of_business_plan: string;
  selected_language_for_plan: string;
  company_name: string;
  country: string;
  city: string;
  success_factors: string;
  products_services: ProductService[];
  direct_competitors: Competitor[];
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

interface UpdateBuisnessPlanRequest extends Partial<CreateBuisnessPlanRequest> {}



export const buisnessApi = createApi({
  reducerPath: 'buisnessApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    createBuisnessPlan: builder.mutation<void, CreateBuisnessPlanRequest>({
      query: ({ company_id, ...inputData }) => ({
        url: `buisnessPlan/${company_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    getBuisnessPlan: builder.query<BuisnessPlanResponse, string>({
      query: (company_id) => ({
        url: `buisnessPlan/${company_id}`,
        method: 'GET',
      }),

      transformResponse: (response:any) =>  response.buisnessPlan 
    }),
    updateBuisnessPlan: builder.mutation<void, { company_id: string; data: UpdateBuisnessPlanRequest }>({
      query: ({ company_id, data }) => ({
        url: `buisnessPlan/${company_id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteBusinessPlan: builder.mutation<void, string>({
      query: (company_id) => ({
        url: `buisnessPlan/:${company_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateBuisnessPlanMutation,
  useGetBuisnessPlanQuery,
  useUpdateBuisnessPlanMutation,
  useDeleteBusinessPlanMutation,
} = buisnessApi;