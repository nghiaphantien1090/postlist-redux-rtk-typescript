import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../type'
export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => 'posts',
            providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'posts' as const, id })),
            { type: 'posts', id: 'LIST' }]
                : [{ type: 'posts', id: 'LIST' }]
        }),
        getPost: builder.query<Post, string>({
            query: (id) => `posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'posts', id }]
        },
        ),
        addPost: builder.mutation<Post, Partial<Post>>({
            query: (body) => {
                return {
                    url: 'posts',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [{ type: 'posts', id: 'LIST' }]
        },
        ),
        deletePost: builder.mutation<void, string>({
            query: (id) => {
                return{
                    url: `posts/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags:(result,error,id) =>  [{ type: 'posts', id }]
        },
        ),
        updatePost: builder.mutation<Post,Pick<Post,'id'>& Partial<Post>>({
            query: ({id,...patch}) => {
                return {
                    url: `posts/${id}`,
                    method: 'PUT',
                    body:{id,...patch}
                }
            },
            invalidatesTags:(result,error,{id})=> [{ type: 'posts', id: id }]
        },
        ),
    }),
})
export const { useGetPostsQuery, useGetPostQuery,useUpdatePostMutation ,useAddPostMutation,useDeletePostMutation} = postApi