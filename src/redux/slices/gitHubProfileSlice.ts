import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GitHubProfileType } from '../../components/github-profile/gitHubProfileType'

const initialState: { [key: string]: GitHubProfileType } = {}

export const fetchGitHubUser = createAsyncThunk(
    'gitHubProfile/fetchUser',
    async (username: string) =>
        fetch(`https://api.github.com/users/${username}`).then((response) => {
            console.log(response)
            return response.json()
        })
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
