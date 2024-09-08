import { getCookie } from '../../utils/cookie'
import apiSlice from '../api/apiSlice'
import type { Post } from '../api/types'

export interface CreatePostData {
  title: string
  description: string
  body: string
  tagList?: string[]
}

export interface ServerValidationError {
  errors: {
    title?: string
    description?: string
    body?: string
  }
}

export const createPostApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<Post, CreatePostData>({
      query: (data: CreatePostData) => {
        const body: { article: CreatePostData } = {
          article: { title: data.title, description: data.description, body: data.body },
        }

        if (data.tagList && data.tagList.length > 0) {
          body.article.tagList = data.tagList
        }

        return {
          url: '/articles',
          method: 'POST',
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
          body,
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const { useCreatePostMutation } = createPostApiSlice
