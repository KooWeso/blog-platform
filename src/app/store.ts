import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore, combineSlices } from '@reduxjs/toolkit'

// import apiSlice from '../features/api/apiSlice'
import apiSlice from '../features/api/apiSlice'
import { profileSlice } from '../features/profile/profileSlice'

export const rootReducer = combineSlices(apiSlice, profileSlice)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
})

type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
