import { configureStore } from '@reduxjs/toolkit'
import galleryReducer from './slices/gallerySlice'
import gitHubProfileReducer from './slices/gitHubProfileSlice'

const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        gitHubProfile: gitHubProfileReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
