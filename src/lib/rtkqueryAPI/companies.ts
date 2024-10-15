import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

interface User {
  id: string;
  email: string;
  oauthId: string;
  role: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface BusinessPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyId: string;
}

interface FinancialForecast {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyId: string;
}


interface Company {
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  buisnessPlan: BusinessPlan;
  financialForecast: FinancialForecast;
  pitchDeck: any; // Adjust this type if you have more information
  user: User;
}

interface CreateCompanyRequest {
  company_title: string;
  description: string;
  image: string;
}

interface UpdateCompanyRequest {
  company_title?: string;
  description?: string;
  image?: string;
}

interface CompanyResponse {
  companies: Company[];
}

interface GetSingleCompanyResponse {
  message: string;
  data: Company;
}

const token = tokenManager.getToken();

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: baseQuery(),
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<Company[], void>({
      query: () => 'companies/getAll',
      transformResponse: (response: CompanyResponse) => response?.companies,
    }),
    getSingleCompany: builder.query<GetSingleCompanyResponse, string>({
      query: (company_id) => ({
        url: `companies/${company_id}`,
        method: 'GET',
         transformResponse: (response: any) => response?.data,
      }),
    }),
    createCompany: builder.mutation<Company, CreateCompanyRequest>({
      query: (newCompany) => ({
        url: 'companies',
        method: 'POST',
        body: newCompany,
      }),
      invalidatesTags: [{ type: 'Company', id: 'LIST' }],
    }),
    updateCompany: builder.mutation<Company, { id: string; data: UpdateCompanyRequest }>({
      query: ({ id, data }) => ({
        url: `companies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Company', id }],
    }),
    deleteCompany: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `companies/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetSingleCompanyQuery
} = companiesApi;




