import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {}

export const fetchGitHubUser = createAsyncThunk(
    'gitHubProfile/fetchUser',
    async (userId: number) =>
        fetch(`https://api.github.com/users/${userId}`).then((response) =>
            response.json()
        )
)

const gitHubProfileSlice = createSlice({
    name: 'gitHubProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGitHubUser.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload.login]: action.payload,
            }
        })
    },
})

export default gitHubProfileSlice.reducer
