import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  tagTypes: ['Posts', 'SinglePost', 'User'],
  // inject endpoints in other slices
  endpoints: () => ({}),
})

export default apiSlice
