import { createSelector, type PayloadAction } from '@reduxjs/toolkit'

import createSlice from '../../app/createAppSlice'
import type { UserData } from '../api/types'

const initialState: UserData = {
  username: undefined,
  image: undefined,
}

const selectUsername = (state: UserData) => state.username
const selectImage = (state: UserData) => state.image

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: (create) => ({
    addNewProfileValues: create.reducer((state, action: PayloadAction<UserData>) => {
      // Immer will update the state immutably
      // eslint-disable-next-line no-param-reassign
      state.username = action.payload.username
      // eslint-disable-next-line no-param-reassign
      state.image = action.payload.image
    }),
  }),
  selectors: {
    selectProfile: createSelector([selectUsername, selectImage], (username, image) => {
      return { username, image }
    }),
  },
})

// Action creators
export const { addNewProfileValues } = profileSlice.actions

// Selectors
export const { selectProfile } = profileSlice.selectors
