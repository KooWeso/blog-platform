import { getCookie } from '../../utils/cookie'
import apiSlice from '../api/apiSlice'
import type { PostsApiResponse } from '../api/types'

// theese are not articles duh
export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsApiResponse, number>({
      // XXX hardcoded limit to 6 posts per page
      query: (page = 1) => ({
        url: `articles?limit=6&offset=${(page - 1) * 6}`,
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
      }),
      providesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery } = postsApiSlice
