import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();

interface Expertise {
    id: string;
    name: string;
    image_url: string;
    price_per_hour: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface CreateExpertiseRequest {
    name: string;
    image_url: string;
    price_per_hour: number;
  }
  
  interface UpdateExpertiseRequest {
    name?: string;
    image_url?: string;
    price_per_hour?: number;
  }
  
  interface ExpertiseResponse {
    expertises: Expertise[];
  }

export const expertiseApi = createApi({
  reducerPath: 'expertiseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Expertise'],
  endpoints: (builder) => ({
    getAllExpertises: builder.query<Expertise[], void>({
      query: () => 'expertise/getall',
      transformResponse: (response: ExpertiseResponse) => response.expertises,
    }),
    createExpertise: builder.mutation<Expertise, CreateExpertiseRequest>({
      query: (newExpertise) => ({
        url: 'expertise/create',
        method: 'POST',
        body: newExpertise,
      }),
      invalidatesTags: [{ type: 'Expertise', id: 'LIST' }],
    }),
    updateExpertise: builder.mutation<Expertise, { id: string; data: UpdateExpertiseRequest }>({
      query: ({ id, data }) => ({
        url: `expertise/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Expertise', id }],
    }),
    deleteExpertise: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `expertise/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Expertise', id }],
    }),
  }),
});

export const {
  useGetAllExpertisesQuery,
  useCreateExpertiseMutation,
  useUpdateExpertiseMutation,
  useDeleteExpertiseMutation,
} = expertiseApi;