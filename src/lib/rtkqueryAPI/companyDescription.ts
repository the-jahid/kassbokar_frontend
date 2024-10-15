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

interface CompanyDescription {
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

interface CreateCompanyDescriptionRequest extends CompanyDescription {
  company_description_id: string;
}

interface UpdateCompanyDescriptionRequest {
  overview?: string;
  products?: string;
  mission?: string;
  vision?: string;
  values?: string;
  company_description_id: string;
}

interface CompanyDescriptionResponse extends CompanyDescription {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const companyDescriptionApi = createApi({
  reducerPath: 'companyDescriptionApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getCompanyDescription: builder.query<CompanyDescriptionResponse, string>({
      query: (company_description_id) => ({
        url: `companyDescription/${company_description_id}`,
        method: 'GET',
      }),
    }),
    createCompanyDescription: builder.mutation<void, CreateCompanyDescriptionRequest>({
      query: ({ company_description_id, ...inputData }) => ({
        url: `companyDescription/${company_description_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateCompanyDescription: builder.mutation<void, UpdateCompanyDescriptionRequest>({
      query: ({ company_description_id, ...inputData }) => ({
        url: `companyDescription/${company_description_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteCompanyDescription: builder.mutation<void, string>({
      query: (company_description_id) => ({
        url: `companyDescription/${company_description_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCompanyDescriptionQuery,
  useCreateCompanyDescriptionMutation,
  useUpdateCompanyDescriptionMutation,
  useDeleteCompanyDescriptionMutation,
} = companyDescriptionApi;