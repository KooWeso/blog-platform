import { getCookie } from '../../utils/cookie'
import apiSlice from '../api/apiSlice'
import type { Post } from '../api/types'

interface SinglePostApiResponse {
  article: Post
}

// theese are not articles duh
export const singlePostApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSinglePost: build.query<SinglePostApiResponse, string>({
      query: (slug: string) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
      }),

      providesTags: ['SinglePost'],
    }),
    deleteSinglePost: build.mutation<SinglePostApiResponse, string>({
      query: (slug: string) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
      }),
      invalidatesTags: ['SinglePost', 'Posts'],
    }),
  }),
})

export const { useGetSinglePostQuery, useDeleteSinglePostMutation } = singlePostApiSlice
