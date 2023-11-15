import { createSlice } from '@reduxjs/toolkit'
import { GalleryState } from '../states/GalleryState'

const initialState: GalleryState = {
    timer: 0,
    focusedPosition: 0,
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        setTimer: (state, action) => {
            state.timer = action.payload
        },
        setFocusedPosition: (state, action) => {
            state.focusedPosition = action.payload
        },
        incrementFocusedPosition: (state, action) => {
            state.focusedPosition = (state.focusedPosition + 1) % action.payload
        },
    },
})

export const { setTimer, setFocusedPosition, incrementFocusedPosition } =
    gallerySlice.actions

export default gallerySlice.reducer
