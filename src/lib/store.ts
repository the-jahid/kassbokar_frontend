import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counter/counterSlice';
import { companiesApi } from './rtkqueryAPI/companies';
import { buisnessApi } from './rtkqueryAPI/buisnessPlan';
import { executiveSummaryApi } from './rtkqueryAPI/executitveSummary';
import { companyDescriptionApi } from './rtkqueryAPI/companyDescription';
import { competitiveComparisonApi } from './rtkqueryAPI/competitiveComparison';
import { marketingPlanApi } from './rtkqueryAPI/marketingPlan';
import { strategyImplementationApi } from './rtkqueryAPI/strategyImplementation';
import { industryOverviewApi } from './rtkqueryAPI/industryOverview';
import { authapi } from './rtkqueryAPI/auth';
import { financialForecastApi } from './rtkqueryAPI/financialForecast';
import { expenseAssumptionApi } from './rtkqueryAPI/expenseAssumption';
import { revenueAssumptionApi } from './rtkqueryAPI/revenueAssumption';
import { useOfFundsApi } from './rtkqueryAPI/useofFunds';
import { bestCaseScenarioApi } from './rtkqueryAPI/bestCaseScenario';
import { worstCaseScenarioApi } from './rtkqueryAPI/worstCaseScenario';
import { projectedBalanceSheetApi } from './rtkqueryAPI/projectedBalanceSheet';
import { projectedCashFlowApi } from './rtkqueryAPI/projectedCashFlow';
import { projectedProfitLossApi } from './rtkqueryAPI/projectedProfitLoss';
import { blogsApi } from './rtkqueryAPI/blogs';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
   
      [companiesApi.reducerPath]: companiesApi.reducer,
      [buisnessApi.reducerPath]: buisnessApi.reducer,
      [executiveSummaryApi.reducerPath]: executiveSummaryApi.reducer,
      [companyDescriptionApi.reducerPath]: companyDescriptionApi.reducer,
      [competitiveComparisonApi.reducerPath]: competitiveComparisonApi.reducer,
      [marketingPlanApi.reducerPath]: marketingPlanApi.reducer,
      [strategyImplementationApi.reducerPath]: strategyImplementationApi.reducer,
      [industryOverviewApi.reducerPath]: industryOverviewApi.reducer,
      [authapi.reducerPath]:authapi.reducer,
      [financialForecastApi.reducerPath]:financialForecastApi.reducer,
      [expenseAssumptionApi.reducerPath]:expenseAssumptionApi.reducer,
      [revenueAssumptionApi.reducerPath]:revenueAssumptionApi.reducer,
      [useOfFundsApi.reducerPath]:useOfFundsApi.reducer,
      [bestCaseScenarioApi.reducerPath]:bestCaseScenarioApi.reducer,
      [worstCaseScenarioApi.reducerPath]:worstCaseScenarioApi.reducer,
      [projectedBalanceSheetApi.reducerPath]:projectedBalanceSheetApi.reducer,
      [projectedCashFlowApi.reducerPath]:projectedCashFlowApi.reducer,
      [projectedProfitLossApi.reducerPath]:projectedProfitLossApi.reducer,
      [blogsApi.reducerPath]:blogsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
       
        companiesApi.middleware,
        buisnessApi.middleware,
        executiveSummaryApi.middleware,
        companyDescriptionApi.middleware,
        competitiveComparisonApi.middleware,
        marketingPlanApi.middleware,
        strategyImplementationApi.middleware,
        industryOverviewApi.middleware,
        authapi.middleware,
        financialForecastApi.middleware,
        expenseAssumptionApi.middleware,
        revenueAssumptionApi.middleware,
        useOfFundsApi.middleware,
        bestCaseScenarioApi.middleware,
        worstCaseScenarioApi.middleware,
        projectedBalanceSheetApi.middleware,
        projectedCashFlowApi.middleware,
        projectedProfitLossApi.middleware,
        blogsApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];