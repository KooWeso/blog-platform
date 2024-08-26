import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore, combineSlices } from '@reduxjs/toolkit'

export const rootReducer = combineSlices()

export const store = configureStore({
  reducer: rootReducer,
})

type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
