import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GitHubProfileProps } from './gitHubProfileType'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchGitHubUser } from '../../redux/slices/gitHubProfileSlice'
import { Box } from '@mui/material'

const GitHubProfile = (props: GitHubProfileProps) => {
    const { username } = props

    const profile = useSelector((state: RootState) => state.gitHubProfile)[
        username
    ]

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGitHubUser(username))
    }, [dispatch, username])

    return <Box>{JSON.stringify(profile) || 'loading'}</Box>
}

export default GitHubProfile
