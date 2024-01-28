import { Box, Grid, Typography } from '@mui/material'

import Profile from '../components/profile/Profile'

const MainPage = () => {
    return (
        <Box component='div' className='page' display='flex'>
            <Profile />
            <Grid container className='intro'>
                <Grid item xs={12}>
                    <Typography variant='h3' className='intro-title'>
                        Hello, I'm Shuzhao Feng
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className='intro-body'>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>
                                Hello, I'm Shuzhao Feng, and this will be my
                                personal website.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>
                                I'm actively developing this website in my free
                                time, so please check back later!
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MainPage
