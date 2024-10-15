import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';

const token = tokenManager.getToken();

interface OperatingExpense {
    id: string;
    category: string;
    amount: string;
    currency: string;
    growthRate: string;
    growthRateUnit: string;
    assumptions: string;
    expenseAssumptionId: string;
  }
  
  interface ExpenseAssumption {
    id: string;
    initialCapital: string;
    initialCapitalAssumptions: string;
    workingCapital: string;
    workingCapitalAssumptions: string;
    capitalExpenditure: string;
    capitalExpenditureAssumptions: string;
    financialForecastId: string;
    operatingExpenses: OperatingExpense[];
  }
  
  interface CreateExpenseAssumptionRequest {
    financial_forecast_id: string;
    initialCapital: string;
    initialCapitalAssumptions: string;
    workingCapital: string;
    workingCapitalAssumptions: string;
    capitalExpenditure: string;
    capitalExpenditureAssumptions: string;
    operatingExpenses: Omit<OperatingExpense, 'id' | 'expenseAssumptionId'>[];
  }
  
  interface UpdateExpenseAssumptionRequest {
    financial_forecast_id: string;
    initialCapital?: string;
    initialCapitalAssumptions?: string;
    workingCapital?: string;
    workingCapitalAssumptions?: string;
    capitalExpenditure?: string;
    capitalExpenditureAssumptions?: string;
    operatingExpenses?: Omit<OperatingExpense, 'id' | 'expenseAssumptionId'>[];
  }
  
  interface ExpenseAssumptionResponse extends ExpenseAssumption {
    createdAt: string;
    updatedAt: string;
  }

export const expenseAssumptionApi = createApi({
  reducerPath: 'expenseAssumptionApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getExpenseAssumption: builder.query<ExpenseAssumptionResponse, string>({
      query: (financial_forecast_id) => ({
        url: `expenseAssumption/${financial_forecast_id}`,
        method: 'GET',
      }),
      transformResponse:(response:any) => response.data
    }),
    createExpenseAssumption: builder.mutation<void, CreateExpenseAssumptionRequest>({
      query: ({ financial_forecast_id, ...inputData }) => ({
        url: `expenseAssumption/${financial_forecast_id}`,
        method: 'POST',
        body: inputData,
      }),
    }),
    updateExpenseAssumption: builder.mutation<void, UpdateExpenseAssumptionRequest>({
      query: ({ financial_forecast_id, ...inputData }) => ({
        url: `expenseAssumption/${financial_forecast_id}`,
        method: 'PATCH',
        body: inputData,
      }),
    }),
    deleteExpenseAssumption: builder.mutation<void, string>({
      query: (financial_forecast_id) => ({
        url: `expenseAssumption/${financial_forecast_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExpenseAssumptionQuery,
  useCreateExpenseAssumptionMutation,
  useUpdateExpenseAssumptionMutation,
  useDeleteExpenseAssumptionMutation,
} = expenseAssumptionApi;