// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthResponse {
  token: string;
  message: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    authType: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface AuthRequest {
  email: string;
  oauthId: string;
}

export const authapi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://27fd-116-204-228-167.ngrok-free.app/api/v1/' }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, AuthRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authapi;