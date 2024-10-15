
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenManager from '../tokenManager';
import { baseQuery } from '../utils';


interface Blog {
    id: string;
    title: string;
    description: string;
    username: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface CreateBlogRequest {
    title: string;
    description: string;
  }
  
  interface CreateBlogResponse {
    message: string;
    data: Blog;
  }
  
  interface UpdateBlogRequest {
    title?: string;
    description?: string;
  }
  
  interface UpdateBlogResponse {
    message: string;
    data: Blog;
  }
  
  interface DeleteBlogResponse {
    message: string;
  }
  
  interface GetBlogsResponse {
    message: string;
    data: Blog[];
  }

  const token = tokenManager.getToken();

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: baseQuery(),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    createBlog: builder.mutation<CreateBlogResponse, CreateBlogRequest>({
      query: (newBlog) => ({
        url: 'blogs/create',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
    getUsersBlogs: builder.query<GetBlogsResponse, void>({
      query: () => 'blogs',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Blog' as const, id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),
    updateBlog: builder.mutation<UpdateBlogResponse, { blog_id: string; data: UpdateBlogRequest }>({
      query: ({ blog_id, data }) => ({
        url: `blogs/${blog_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { blog_id }) => [{ type: 'Blog', id: blog_id }],
    }),
    deleteBlog: builder.mutation<DeleteBlogResponse, string>({
      query: (blog_id) => ({
        url: `blogs/${blog_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, blog_id) => [{ type: 'Blog', id: blog_id }],
    }),
    getAllBlogs: builder.query<GetBlogsResponse, void>({
      query: () => 'blogs/getAll',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Blog' as const, id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetUsersBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} = blogsApi;














