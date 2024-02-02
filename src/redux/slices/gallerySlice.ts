import { createSlice } from '@reduxjs/toolkit'
import { GalleryState } from '../states/galleryState'

const initialState: GalleryState = {}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        createGallery: (state, action) => {
            state[action.payload] = {
                timer: 0,
                focusedPosition: 0,
            }
        },
        setTimer: (state, action) => {
            state[action.payload.gallery].timer = action.payload.timer
        },
        setFocusedPosition: (state, action) => {
            state[action.payload.gallery].focusedPosition =
                action.payload.focusedPosition
        },
        incrementFocusedPosition: (state, action) => {
            state[action.payload.gallery].focusedPosition =
                (state[action.payload.gallery].focusedPosition + 1) %
                action.payload.length
        },
    },
})

export const {
    createGallery,
    setTimer,
    setFocusedPosition,
    incrementFocusedPosition,
} = gallerySlice.actions

export default gallerySlice.reducer
