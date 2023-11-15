import { configureStore } from '@reduxjs/toolkit'
import galleryReducer from './slices/gallerySlice'

const store = configureStore({
    reducer: {
        gallery: galleryReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
