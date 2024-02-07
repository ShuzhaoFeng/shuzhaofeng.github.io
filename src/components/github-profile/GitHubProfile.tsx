import { useEffect } from 'react'
import { Box, Grid, Link, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { GitHubProfileProps } from './gitHubProfileType'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchGitHubUser } from '../../redux/slices/gitHubProfileSlice'

const GitHubProfile = (props: GitHubProfileProps) => {
    const { username } = props

    const profile = useSelector((state: RootState) => state.gitHubProfile)[
        username
    ]

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGitHubUser(username))
    }, [dispatch, username])

    return profile ? (
        <Link
            className='github-profile'
            href={profile.html_url}
            color='inherit'
            underline='none'
        >
            <Grid className='container' container {...props}>
                <Grid item xs={4}>
                    <Box>
                        <Box
                            className='avatar'
                            component='img'
                            src={profile.avatar_url}
                            alt='GitHub Avatar'
                        />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Typography className='user-info' variant='h5'>
                        {profile.login}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    ) : (
        <Box>Loading...</Box>
    )
}

export default GitHubProfile
