import { createSlice } from '@reduxjs/toolkit'
import { JourneyState } from '../states/journeyState'

const initialState: JourneyState = {
    focusedPosition: 0,
}

const journeySlice = createSlice({
    name: 'journey',
    initialState,
    reducers: {
        setFocusedPosition: (state, action) => {
            state.focusedPosition = action.payload
        },
        incrementFocusedPosition: (state, action) => {
            state.focusedPosition =
                (state.focusedPosition + 1) % action.payload.length
        },
        decrementFocusedPosition: (state, action) => {
            state.focusedPosition =
                (state.focusedPosition + action.payload.length - 1) %
                action.payload.length
        },
    },
})

export const {
    setFocusedPosition,
    incrementFocusedPosition,
    decrementFocusedPosition,
} = journeySlice.actions

export default journeySlice.reducer
