import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenManager from "../tokenManager";
import { baseQuery } from "../utils";

const token = tokenManager.getToken();


interface ExpertiseBooking {
    id: string;
    booked_by_user_id: string;
    booked_by_user_name: string;
    expertise_id: string;
    expertise_name: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface CreateExpertiseBookingRequest {
    booked_by_user_id: string;
    booked_by_user_name: string;
    expertise_id: string;
    expertise_name: string;
  }
  
  interface UpdateExpertiseBookingRequest {
    booked_by_user_id?: string;
    booked_by_user_name?: string;
    expertise_id?: string;
    expertise_name?: string;
  }
  
  interface ExpertiseBookingResponse {
    expertiseBookings: ExpertiseBooking[];
  }
  
export const expertiseBookingApi = createApi({
  reducerPath: 'expertiseBookingApi',
  baseQuery: baseQuery(),
  tagTypes: ['ExpertiseBooking'],
  endpoints: (builder) => ({
    getAllExpertiseBookings: builder.query<ExpertiseBooking[], void>({
      query: () => 'expertiseBooking/getall',
      transformResponse: (response: ExpertiseBookingResponse) => response.expertiseBookings,
    }),
    createExpertiseBooking: builder.mutation<ExpertiseBooking, CreateExpertiseBookingRequest>({
      query: (newExpertiseBooking) => ({
        url: 'expertiseBooking/create',
        method: 'POST',
        body: newExpertiseBooking,
      }),
      invalidatesTags: [{ type: 'ExpertiseBooking', id: 'LIST' }],
    }),
    updateExpertiseBooking: builder.mutation<ExpertiseBooking, { id: string; data: UpdateExpertiseBookingRequest }>({
      query: ({ id, data }) => ({
        url: `expertiseBooking/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'ExpertiseBooking', id }],
    }),
    deleteExpertiseBooking: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `expertiseBooking/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'ExpertiseBooking', id }],
    }),
  }),
});

export const {
  useGetAllExpertiseBookingsQuery,
  useCreateExpertiseBookingMutation,
  useUpdateExpertiseBookingMutation,
  useDeleteExpertiseBookingMutation,
} = expertiseBookingApi;