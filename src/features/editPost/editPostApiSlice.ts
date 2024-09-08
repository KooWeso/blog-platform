import { getCookie } from '../../utils/cookie'
import apiSlice from '../api/apiSlice'
import type { Post } from '../api/types'

export interface EditPostData {
  slug?: string
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

export const editPostApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    editPost: build.mutation<Post, EditPostData>({
      query: (data: EditPostData) => {
        const body: { article: EditPostData } = {
          article: { title: data.title, description: data.description, body: data.body },
        }

        if (data.tagList) {
          body.article.tagList = data.tagList
        }

        return {
          url: `/articles/${data.slug}`,
          method: 'PUT',
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
          body,
        }
      },
      invalidatesTags: ['Posts', 'SinglePost'],
    }),
  }),
})

export const { useEditPostMutation } = editPostApiSlice
