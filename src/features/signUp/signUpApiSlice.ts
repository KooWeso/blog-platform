import type { UserApiResponse } from '../api/types'
import apiSlice from '../api/apiSlice'

interface SignUpApiRequest {
  email: string
  username: string
  password: string
}

export interface ServerValidationError {
  errors: {
    email?: string
    username?: string
    password?: string
  }
}

export const signUpApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createProfile: build.mutation<UserApiResponse, SignUpApiRequest>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        headers: {
          // exist by default, but just in case I made thi implicit>
          'content-type': 'application/json',
        },
        body: { user: { email: data.email, username: data.username, password: data.password } },
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useCreateProfileMutation } = signUpApiSlice
