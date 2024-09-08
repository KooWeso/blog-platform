import { getCookie } from '../../utils/cookie'
import apiSlice from '../api/apiSlice'
import type { Post } from '../api/types'

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    like: build.mutation<Post, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
        body: { slug },
      }),
      invalidatesTags: ['SinglePost', 'Posts'],
    }),
    dislike: build.mutation<Post, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
        body: { slug },
      }),
      invalidatesTags: ['SinglePost', 'Posts'],
    }),
  }),
})

export const { useLikeMutation, useDislikeMutation } = likeApiSlice
