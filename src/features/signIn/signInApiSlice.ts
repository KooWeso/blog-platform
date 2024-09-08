import apiSlice from '../api/apiSlice'
import type { UserApiResponse } from '../api/types'

interface SignInData {
  email: string
  password: string
}

export const signInApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<UserApiResponse, SignInData>({
      query: (data: SignInData) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: { ...data } },
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useSignInMutation } = signInApiSlice
