import type { UserApiResponse } from '../api/types'
import apiSlice from '../api/apiSlice'
import { getCookie } from '../../utils/cookie'

interface EditProfileApiRequest {
  email?: string
  token?: string
  username?: string
  bio?: string
  image?: string | null
}

export interface ServerValidationError {
  errors: {
    email?: string
    token?: string
    username?: string
    bio?: string
    image?: string
  }
}

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<UserApiResponse, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
        timeout: 60000 * 60 * 24,
      }),
      providesTags: ['User'],
    }),
    editProfile: build.mutation<UserApiResponse | ServerValidationError, EditProfileApiRequest>({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${getCookie('token')}`,
          // exist by default, but just in case I made thi implicit>
          'content-type': 'application/json',
        },
        body: { user: { ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) } },
      }),

      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetProfileQuery, useEditProfileMutation } = profileApiSlice
