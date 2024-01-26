import { Box, Grid, Typography } from '@mui/material'

import Profile from '../components/profile/Profile'

const MainPage = () => {
    return (
        <Box component='div' className='page' display='flex'>
            <Profile />
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        Hello, I'm Shuzhao Feng
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Hello, I'm Shuzhao Feng, and this will be my personal
                        website.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        I'm actively developing this website in my free time, so
                        please check back later!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MainPage
