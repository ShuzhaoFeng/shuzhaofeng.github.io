import { Box, Grid, Typography } from '@mui/material'

import Journey from '../components/journey/Journey'

const JourneyPage = () => {
    return (
        <Box component='div' className='page' display='flex'>
            <Grid container className='intro'>
                <Grid item xs={12}>
                    <Typography variant='h3' className='intro-title'>
                        My Journey
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className='intro-body'>
                        <Grid item xs={12}>
                            <Journey />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default JourneyPage
